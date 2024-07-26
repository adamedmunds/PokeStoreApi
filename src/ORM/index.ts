import mongoose from 'mongoose';

export const initalizeDatabase = async (): Promise<void> => {
  const mongoConnectionString = process.env.DATABASE_URL;
  if (!mongoConnectionString) {
    throw new Error('Missing DATABASE_URL');
  }
  await mongoose.connect(mongoConnectionString).then(() => {
    console.log('[mongo]: connected to mongo database');
  });
};
