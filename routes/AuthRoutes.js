const express = require('express')
const router = express.Router()
const {
  login,
  loginStatus,
  register,
  logout,
  changePassword,
  changeGroup,
  getUsers,
  sendVerificationEmail,
  verifyUser,
  forgotPassword,
  resetPassword,
  sendLoginCode,
  loginWithCode,
} = require('../controllers/AuthController')
const { auth, adminOnly } = require('../middleware/authHandler')

router.post('/login', login)
router.get('/login-status', loginStatus)
router.post('/register', register)
router.get('/logout', logout)
router.get('/forgot-password/:username', forgotPassword)
router.patch('/reset-password/:resetToken', resetPassword)
router.post('/change-password', auth, changePassword)
router.patch('/change-group', auth, adminOnly, changeGroup)
router.get('/users', auth, adminOnly, getUsers)
router.get('/send-verification-email', auth, sendVerificationEmail)
router.patch('/verify/:verificationToken', verifyUser)

router.get('/send-login-code/:username', sendLoginCode)
router.post('/login-with-code/:username', loginWithCode)
module.exports = router
