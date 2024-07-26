import mongoose from 'mongoose';
import { User } from '../Types/User';

const { Schema } = mongoose;

export const userSchema = new Schema<User>({
  name: String,
  age: Number,
});

export const UserModel = mongoose.model('User', userSchema);
