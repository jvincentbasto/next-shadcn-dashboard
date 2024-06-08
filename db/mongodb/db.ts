import mongoose from 'mongoose'
import nextConfig from 'next/config'

//
const { publicRuntimeConfig } = nextConfig()
const { environment } = publicRuntimeConfig

//
const MONGODB_URI = process.env.MONGODB_URI as string
if (!MONGODB_URI) {
  throw new Error('MongoDB URI missing')
}

//
let cached = (global as any).mongoose
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

async function connectToDatabase() {
  console.log('environment', environment)

  //
  if (cached.conn) {
    console.log('Reuse existing connection')
    return cached.conn
  }

  //
  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    }

    //
    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      return mongoose
    })
  }

  //
  cached.conn = await cached.promise
  console.log('New connection')

  //
  return cached.conn
}

export default connectToDatabase
