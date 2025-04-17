import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  genderPreference: {
    type: String,
    required: true,
    enum: ['male', 'female', 'both']
  },
  about: { type: String, default: '' },
  image: { type: String, default: '' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

userSchema.pre('save', async function (next) {
  // Don't hash if password not modified
  if (!this.isModified('password')) {
    return next();
  }

  /// Hash password before saving
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Check if passwords match
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create JWT
userSchema.methods.getJWT = async function () {
  const token = await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
  return token;
};

const User = mongoose.model('User', userSchema);

export default User;
