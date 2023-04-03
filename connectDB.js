const mongoose = require('mongoose')
const connectDB = (url) => {
  try {
    const connection = mongoose.connect(url)
    console.log('Database connected')
    return connection
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}
module.exports = connectDB
