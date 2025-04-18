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

/**
 * Profiles should not include:
 * Current User
 * Liked matches
 * Disliked matches
 * invalid Gender preference
 * Profile's gender preference matches current user's gender
 */

export const getUserProfiles = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    const { id, likes, dislikes, matches, gender, genderPreference } =
      currentUser || {};

    const users = await User.find({
      $and: [
        { _id: { $ne: id } },
        { _id: { $nin: likes } },
        { _id: { $nin: dislikes } },
        { _id: { $nin: matches } },
        {
          gender:
            genderPreference === 'both'
              ? { $in: ['male', 'female'] }
              : genderPreference
        },
        { genderPreference: { $in: [gender, 'both'] } }
      ]
    }).select('name image');

    res.status(200).json({ success: true, users });
  } catch (err) {
    console.log('Error in getUserProfiles controller: ', err);
    res.send({ success: false, message: 'Server error' });
  }
};
