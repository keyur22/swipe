import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - No token provided'
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized - Invalid token' });
    }

    const currentUser = await User.findById(decoded.id);

    console.log(currentUser, decoded);

    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    console.log('Error in auth middleware: ', err);

    if (err instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized - Invalid token' });
    } else {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
};

export default auth;
