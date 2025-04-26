import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true
    })
    console.log('MongoDB connected')
  } catch (error) {
    console.error('Connection error:', error, error.message)
    process.exit(1)
  }
}
