import mongoose from 'mongoose';

const MagicLinkSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-delete expired tokens
MagicLinkSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.MagicLink || mongoose.model('MagicLink', MagicLinkSchema);
