import User from '../models/User.js';

export const getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      'matches',
      'name image'
    );

    res.send({ success: true, matches: user.matches });
  } catch (err) {
    console.log('Error in getMatches controller: ', err);
    res.send({ success: false, message: 'Server error' });
  }
};
