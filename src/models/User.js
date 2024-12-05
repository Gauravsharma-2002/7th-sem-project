import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, unique: true },
  avatar: { type: String }, // Optional: For storing Google profile picture URL
  role: { 
    type: String, 
    enum: ['admin', 'editor', 'content writer'], 
    default: 'admin' 
  },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }], // Rooms the user belongs to
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
