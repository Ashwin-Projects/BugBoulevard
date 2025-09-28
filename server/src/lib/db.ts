import mongoose from 'mongoose';

// Leave empty by default so dev can run without a DB
const connectionString = process.env.MONGODB_URI || process.env.DATABASE_URL || '';

export async function connectToDatabase(): Promise<void> {
  if (!connectionString) {
    console.log('No DB connection string set; running with in-memory models.');
    return;
  }
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.warn('MongoDB connection failed; continuing without DB:', (error as any)?.message || error);
  }
}

export async function testConnection(): Promise<{ ok: boolean; error?: string }> {
  if (!connectionString) return { ok: false, error: 'DB connection string not set' };
  try {
    if (mongoose.connection.readyState === 1) {
      return { ok: true };
    }
    await mongoose.connect(connectionString);
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Unknown DB error' };
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
  }
}
