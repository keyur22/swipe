import User from '../models/User.js';
import validator from 'validator';
import { allowedGenderPreference, allowedGenders } from '../utils/constants.js';
import { getUserSafeFields } from '../utils/user.js';

const setAuthCookie = async (newUser, res) => {
  const token = await newUser.getJWT();

  res.cookie('token', token, {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true, // prevents XSS attacks
    sameSite: 'strict', // prevents CSRF attacks
    secure: process.env.NODE_ENV === 'production'
  });
};

export const signup = async (req, res) => {
  let validationErrorMessge = '';

  try {
    const { name, email, age, password, gender, genderPreference } =
      req.body || {};

    // Validations
    if (!name || !email || !age || !password || !gender || !genderPreference) {
      validationErrorMessge = 'All fields are required';
    }

    if (name.length < 1 || name.length > 30) {
      validationErrorMessge = 'Name cannot be greater than 30 characters';
    }

    if (!validator.isEmail(email)) {
      validationErrorMessge = 'Enter a valid email address';
    }

    if (age < 18) {
      validationErrorMessge = 'You must be atleast 18 years old';
    }

    if (!validator.isStrongPassword(password)) {
      validationErrorMessge = 'Enter a strong password';
    }

    if (!allowedGenders.includes(gender)) {
      validationErrorMessge = 'Enter a valid gender';
    }

    if (!allowedGenderPreference.includes(genderPreference)) {
      validationErrorMessge = 'Enter a valid gender preference';
    }

    if (validationErrorMessge) {
      return res.status(400).json({
        success: false,
        message: validationErrorMessge
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      age,
      gender,
      genderPreference
    });

    await setAuthCookie(newUser, res);

    res.status(201).json({
      success: true,
      user: getUserSafeFields(newUser)
    });
  } catch (err) {
    console.log('Error in signup controller: ', err.message);
    res
      .status(500)
      .json({ success: false, message: err.message | 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    await setAuthCookie(user, res);

    res.json({ success: true, user: getUserSafeFields(user) });
  } catch (err) {
    console.log('Error in login controller: ', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    console.log('Error in logout controller: ', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
