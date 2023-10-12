/* eslint-disable no-unused-vars */
import {
  Schema, model,
} from 'mongoose';
import bcrypt from 'bcryptjs';

// export interface UserDocument extends Document {
//   role: 'USER' | 'ADMIN';
//   email: string;
//   password: string;
//   country: string;
//   createdAt: Date;
//   updatedAt: Date;
//   profile: userProfileType;
//   comparePassword: (password: string) => Promise<boolean>;
//   isActive?: Boolean;
// }

const UserSchema = new Schema(
  {
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    isActive: Boolean,
    password: {
      type: String,
      required: true,
    },
    country: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  },
);

// Middlewares
// eslint-disable-next-line consistent-return
UserSchema.pre('save', async function save(next) {
  const user = this;

  try {
    if (!user.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (error) {
    next(error);
  }
});

// Virtuals
UserSchema.virtual('profile').get(function profile() {
  const {
    _id, role, email, country,
  } = this;

  return {
    _id,
    role,
    email,
    country,
  };
});

// Methods
UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  const match = await bcrypt.compare(candidatePassword, this.password);
  return match;
};

const User = model('User', UserSchema);

export default User;
