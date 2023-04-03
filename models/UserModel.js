const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide username'],
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: [6, 'Password needs to be more that 6 characters'],
    },
    oldPasswords: {
      type: Array,
      default: [],
    },
    isVerified: { type: Boolean, default: false },
    group: {
      type: String,
      required: true,
      default: 'member',
    },
    userAgent: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
)

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  this.oldPasswords.push(this.password)
})

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}
UserSchema.methods.checkPasswordHistory = async function (nPassword) {
  let isMatch = false
  for (let index = 0; index < this.oldPasswords.length; index++) {
    let result = await bcrypt.compare(nPassword, this.oldPasswords[index])
    if (result) {
      isMatch = true
      break
    }
  }
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
