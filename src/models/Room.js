import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Room admin
  members: [
    {
      // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { 
        type: String, 
        enum: ['admin', 'editor', 'content writer'], 
        // required: true 
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Automatically update the `updatedAt` field
roomSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Room', roomSchema);
