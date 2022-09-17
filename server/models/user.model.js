import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    require: [true, 'user must have an email'],
    unique: [true, 'this email is already in use'],
    lowercase: true,
  },
  phone: { type: Number, required: true, unique: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

export const User = mongoose.model('users', UserSchema);
