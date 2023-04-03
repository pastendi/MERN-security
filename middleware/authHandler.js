const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError, UnauthorizedError } = require('../errors')

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (token == null) {
      throw new UnauthorizedError('Not authorized, please login')
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // Get user from token payload id
    req.user = await User.findById(payload.id).select('-password')
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}
const adminOnly = async (req, res, next) => {
  if (req.user.group === 'admin') {
    next()
  } else {
    res.status(401)
    throw new UnauthorizedError('Authorization error')
  }
}
module.exports = { auth, adminOnly }
