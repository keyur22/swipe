import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [1, 'This field is required'],
    maxLength: [30, 'Length cannot be greater than 30']
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email already exists!'],
    lowercase: true,
    trim: true,
    immutable: true,
    validate: [
      (email) => validator.isEmail(email),
      'Enter a valid email address'
    ]
  },
  password: {
    type: String,
    required: true,
    validate: [
      (pass) => validator.isStrongPassword(pass),
      'Enter a strong password'
    ]
  },
  age: {
    type: Number,
    min: [18, 'You must be atleast 18 years old'],
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is invalid gender'
    }
  },
  genderPreference: {
    type: String,
    required: true,
    enum: {
      values: ['male', 'female', 'both'],
      message: '{VALUE} is invalid gender'
    }
  },
  about: { type: String, default: '' },
  image: {
    type: String,
    default: ''
  },
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
