const User = require('../models/UserModel')
const Token = require('../models/TokenModel')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createJWT, verifyToken, hashToken } = require('../token')
const sendEmail = require('../utils/sendEmail')
const parser = require('ua-parser-js')
const crypto = require('crypto')
const Cryptr = require('cryptr')

const cryptr = new Cryptr(process.env.CRYPTR_KEY)

const register = async (req, res) => {
  //destructing and parameterizing values to stop sql injection
  const { username, email, password } = req.body
  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists')
  }
  const ua = parser(req.headers['user-agent'])
  const userAgent = [ua.ua]
  const user = await User.create({ ...req.body, userAgent })
  const token = createJWT(user._id)
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'none',
    secure: true,
  })
  res.status(StatusCodes.CREATED).json({
    user: { id: user._id, verified: user.isVerified },
    token,
    msg: 'User registered successfully',
  })
}

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new CustomError.BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({
    $or: [{ username: username }, { email: username }],
  })
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  if (user.group === 'suspended') {
    throw new CustomError.UnauthenticatedError(
      'Sorry but you are suspended, please contact support'
    )
  }
  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError(
      'Sorry but this account is not verified yet'
    )
  }
  // two-factor
  const ua = parser(req.headers['user-agent'])
  const currentAgent = ua.ua
  const allowedAgent = user.userAgent.includes(currentAgent)
  if (!allowedAgent) {
    // Genrate 6 digit code
    const loginCode = Math.floor(100000 + Math.random() * 900000)

    // Encrypt login code before saving to DB
    const encryptedLoginCode = cryptr.encrypt(loginCode.toString())

    // Delete Token if it exists in DB
    let userToken = await Token.findOne({ userId: user._id })
    if (userToken) {
      await userToken.deleteOne()
    }
    // Save Token to DB
    await new Token({
      userId: user._id,
      lToken: encryptedLoginCode,
      createdAt: Date.now(),
      expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
    }).save()

    throw new CustomError.UnauthorizedError(
      'New browser or device detected, check your email for login code'
    )
  }
  const token = createJWT(user._id)
  // Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'none',
    secure: true,
  })
  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      verified: user.isVerified,
      group: user.group,
    },
    token,
    msg: 'Login successful',
  })
}
const loginStatus = async (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json(false)
  }
  if (verifyToken(token)) {
    return res.json({ loggedIn: true })
  }
  return res.json({ loggedIn: false })
}

const sendVerificationEmail = async (req, res) => {
  const user = await User.findById(req.user._id)
  // Delete Token if it exists in DB
  let token = await Token.findOne({ userId: user._id })
  if (token) {
    await token.deleteOne()
  }

  //Create Verification Token and Save
  const verificationToken = crypto.randomBytes(32).toString('hex') + user._id
  // Hash token and save
  const hashedToken = hashToken(verificationToken)
  await new Token({
    userId: user._id,
    vToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
  }).save()

  // Construct Verification URL
  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`

  // Send Email
  const subject = 'Verify Your Account'
  const send_to = user.email
  const sent_from = process.env.EMAIL_USER
  const reply_to = 'noreply@tendi.com'
  const template = 'verifyEmail'
  const name = user.username
  const link = verificationUrl
  console.log(subject, send_to, sent_from, reply_to, template, name, link)
  await sendEmail(subject, send_to, sent_from, reply_to, template, name, link)
  res.status(200).json({ msg: 'Verification Email Sent' })
}

// Verify User
const verifyUser = async (req, res) => {
  const { verificationToken } = req.params
  const hashedToken = hashToken(verificationToken)
  const userToken = await Token.findOne({
    vToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  })
  if (!userToken) {
    throw new CustomError.BadRequestError('Invalid or Expired Token')
  }
  // Find User
  const user = await User.findOne({ _id: userToken.userId })
  if (user.isVerified) {
    throw new CustomError.BadRequestError('User is already verified')
  }
  // Now verify user
  await User.findByIdAndUpdate(user._id, {
    $set: { isVerified: true },
  })
  const ua = parser(req.headers['user-agent'])
  const allowedAgent = user.userAgent.includes(ua.ua)
  const token = createJWT(user._id)
  // Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'none',
    secure: true,
  })
  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      verified: user.isVerified,
    },
    token,
    msg: 'Account Verification Successful',
  })
}
const changePassword = async (req, res) => {
  const { oPassword, nPassword } = req.body
  const user = await User.findById(req.user._id)
  const isValidOldPassword = await user.comparePassword(oPassword)
  if (!isValidOldPassword) {
    throw new CustomError.UnauthenticatedError(
      'Current Password did not matched'
    )
  }
  //password change
  const usedPassword = await user.checkPasswordHistory(nPassword)
  if (usedPassword) {
    throw new CustomError.BadRequestError(
      'This password has been already used, try new one'
    )
  }
  user.password = nPassword
  await user.save()
  res.status(StatusCodes.CREATED).json({ msg: 'Password changed successfully' })
}
// Forgot Password
const forgotPassword = async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({
    $or: [{ email: username }, { username: username }],
  })
  if (!user) {
    throw new CustomError.BadRequestError('No user with this email')
  }
  // Delete Token if it exists in DB
  let token = await Token.findOne({ userId: user._id })
  if (token) {
    await token.deleteOne()
  }
  //   Create Verification Token and Save
  const resetToken = crypto.randomBytes(32).toString('hex') + user._id
  // Hash token and save
  const hashedToken = hashToken(resetToken)
  await new Token({
    userId: user._id,
    rToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
  }).save()

  // Construct Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

  // Send Email
  const subject = 'Password Reset Request'
  const send_to = user.email
  const sent_from = process.env.EMAIL_USER
  const reply_to = 'noreply@zino.com'
  const template = 'forgotPassword'
  const name = user.username
  const link = resetUrl

  await sendEmail(subject, send_to, sent_from, reply_to, template, name, link)
  res
    .status(200)
    .json({ msg: 'Password Reset Email Sent , Please check you email' })
}

// Reset Password
const resetPassword = async (req, res) => {
  const { resetToken } = req.params
  const { password } = req.body

  const hashedToken = hashToken(resetToken)

  const userToken = await Token.findOne({
    rToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  })

  if (!userToken) {
    res.status(404)
    throw new Error('Invalid or Expired Token')
  }

  // Find User
  const user = await User.findOne({ _id: userToken.userId })
  const usedPassword = await user.checkPasswordHistory(password)

  if (usedPassword) {
    throw new CustomError.BadRequestError(
      'This password has been already used, try new one'
    )
  }
  // Now Reset password
  user.password = password
  await user.save()

  // Construct Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

  // Send Email
  const subject = 'Password Reset Notification'
  const send_to = user.email
  const sent_from = process.env.EMAIL_USER
  const reply_to = 'noreply@zino.com'
  const template = 'changePassword'
  const name = user.username
  const link = resetUrl

  await sendEmail(subject, send_to, sent_from, reply_to, template, name, link)
  res.status(200).json({ msg: 'Password Reset Successful, please login' })
}
// Send Login Code
const sendLoginCode = async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({
    $or: [{ email: username }, { username: username }],
  })

  if (!user) {
    throw new CustomError.BadRequestError('User not found')
  }

  // Find Login Code in DB
  let userToken = await Token.findOne({
    userId: user._id,
    expiresAt: { $gt: Date.now() },
  })
  if (!userToken) {
    throw new CustomError.BadRequestError(
      'Invalid or Expired token, please login again'
    )
  }
  const loginCode = userToken.lToken
  const decryptedLoginCode = cryptr.decrypt(loginCode)

  // Send Login Code
  const subject = 'Login Access Code'
  const send_to = user.email
  const sent_from = process.env.EMAIL_USER
  const reply_to = 'noreply@tendi.com'
  const template = 'loginCode'
  const name = user.username
  const link = decryptedLoginCode

  await sendEmail(subject, send_to, sent_from, reply_to, template, name, link)
  res.status(200).json({ msg: `Access code sent to ${user.email}` })
}

// Login With Code
const loginWithCode = async (req, res) => {
  const { username } = req.params
  const { loginCode } = req.body

  const user = await User.findOne({
    $or: [{ email: username }, { username: username }],
  })

  if (!user) {
    throw new CustomError.BadRequestError('User not found')
  }

  // Find user Login Token
  const userToken = await Token.findOne({
    userId: user.id,
    expiresAt: { $gt: Date.now() },
  })

  if (!userToken) {
    throw new CustomError.BadRequestError(
      'Invalid or Expired token, please login again'
    )
  }

  const decryptedLoginCode = cryptr.decrypt(userToken.lToken)

  if (loginCode !== decryptedLoginCode) {
    throw new CustomError.BadRequestError(
      'Incorrect login code, please try again'
    )
  } else {
    // Register userAgent
    const ua = parser(req.headers['user-agent'])
    await User.findOneAndUpdate(
      { email: user.email },
      {
        $push: { userAgent: ua.ua },
      }
    )
    // Generate Token
    const token = createJWT(user._id)

    // Send HTTP-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: 'none',
      secure: true,
    })
    res.status(StatusCodes.OK).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        verified: user.isVerified,
        group: user.group,
      },
      token,
      msg: 'Login Successful',
    })
  }
}
const getUsers = async (req, res) => {
  const allUsers = await User.find()
    .sort('-createdAt')
    .select('-password -userAgent -createdAt -updatedAt -oldPasswords')
  const users = allUsers.filter((x) => x.group !== 'admin')
  res.status(200).json(users)
}
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  })
  res.status(StatusCodes.OK).json({ msg: 'Logout successful' })
}
const changeGroup = async (req, res) => {
  const { email, group } = req.body
  const user = await User.findOneAndUpdate(
    { email },
    {
      $set: { group: group },
    }
  )
  // Send Email
  const subject = 'Membership changed'
  const send_to = user.email
  const sent_from = process.env.EMAIL_USER
  const reply_to = 'noreply@tendi.com'
  const template = 'changeRole'
  const name = user.username

  await sendEmail(subject, send_to, sent_from, reply_to, template, name)
  res.status(StatusCodes.OK).json({ msg: `User is moved to ${group} group ` })
}

module.exports = {
  changeGroup,
  changePassword,
  login,
  loginStatus,
  register,
  logout,
  getUsers,
  sendVerificationEmail,
  verifyUser,
  forgotPassword,
  resetPassword,
  sendLoginCode,
  loginWithCode,
}
