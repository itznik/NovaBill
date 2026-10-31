// src/lib/db.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('FATAL: MONGODB_URI is missing in environment variables.');
}

// Cache the connection globally to prevent connection spiking in serverless environments
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // If we already have a connection, return it immediately (Lightning fast)
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection is currently being formed, start one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Strict limit to keep the free tier perfectly stable
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      console.log('🟢 Successfully connected to MongoDB');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error('🔴 MongoDB connection failed:', error);
    throw error;
  }

  return cached.conn;
}
