import User from '../models/User.js';

export const signup = async (req, res) => {
  try {
    const { name, email, age, password, gender, genderPreference } =
      req.body || {};

    if (!name || !email || !password || !gender || !genderPreference || !age) {
      return res.json({
        success: false,
        message: 'All fields are required'
      });
    }
    if (age < 18) {
      return res.json({
        success: false,
        message: 'You must be atleast 18 years old'
      });
    }
    if (password.length < 6) {
      return res.json({
        success: false,
        message: 'Password must be atleast 6 characters'
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      gender,
      age,
      genderPreference
    });

    const token = await newUser.getJWT();

    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true, // prevents XSS attacks
      sameSite: 'strict', // prevents CSRF attacks
      secure: process.env.NODE_ENV === 'production'
    });

    res.status(201).json({
      success: true,
      user: newUser
    });
  } catch (err) {
    console.log('Error in signup controller: ', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
