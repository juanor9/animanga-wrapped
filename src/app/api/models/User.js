import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // AniList OAuth data
  anilistId: {
    type: Number,
    required: true,
    unique: true,
  },
  anilistUsername: {
    type: String,
    required: true,
  },
  anilistAvatar: String,
  anilistAccessToken: String,
  anilistTokenExpiry: Date,

  // User provided data
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
  },
  isAdult: {
    type: Boolean,
    required: true,
    default: false,
  },

  // Email verification
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerifiedAt: Date,

  // Consent tracking
  consents: {
    termsAccepted: {
      type: Boolean,
      required: true,
    },
    termsAcceptedAt: Date,
    privacyAccepted: {
      type: Boolean,
      required: true,
    },
    privacyAcceptedAt: Date,
  },

  // User data
  lists: {
    type: Array,
    default: [],
  },

  // Security
  loginAttempts: {
    type: Number,
    default: 0,
  },
  lockoutUntil: Date,

  // Account status
  status: {
    type: String,
    enum: ['active', 'suspended', 'deleted'],
    default: 'active',
  },
  suspendedAt: Date,
  suspendedReason: String,
  deletedAt: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
UserSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
