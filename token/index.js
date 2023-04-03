const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const createJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
// Hash Token
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token.toString()).digest('hex')
}
module.exports = {
  createJWT,
  hashToken,
}
