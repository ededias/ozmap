import mongoose, { Schema, Document } from 'mongoose';
import { hashPassword } from '../utils/crypt';

export interface User extends Document {
  name: string;
  email: string;
  age: number;
  password: string;
  localtions: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    regions: [{ type: Schema.Types.ObjectId, ref: 'Region' }],
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.set('password', await hashPassword(this.get('password')));
  }
})


export default mongoose.model<User>('User', UserSchema);
