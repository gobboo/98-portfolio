import mongoose from 'mongoose';

export type IUser = {
  username: string;
  password: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, collation: { locale: 'en', strength: 2 } }
);

export const User = mongoose.model<IUser>("User", UserSchema);