import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  createdAt: { type: Date, default: new Date().toISOString() },
});

export const Post = mongoose.model('posts', PostSchema);

