import User from '../models/User.js';
import { getConnectedUsers, getIO } from '../socket/socket.server.js';

export const getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      'matches',
      'name image'
    );

    res.status(200).json({ success: true, matches: user.matches });
  } catch (err) {
    console.log('Error in getMatches controller: ', err);
    res.status(500).json({ success: false, message: 'Server error' });
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
    }).select('name image age about');

    res.status(200).json({ success: true, users });
  } catch (err) {
    console.log('Error in getUserProfiles controller: ', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const swipeLeft = async (req, res) => {
  const dislikedUserId = req.params?.dislikedUserId;

  try {
    const dislikedUser = await User.findById(dislikedUserId);

    if (!dislikedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const currentUser = await User.findById(req.user.id);

    if (!currentUser.dislikes.includes(dislikedUserId)) {
      currentUser.dislikes.push(dislikedUserId);
      await currentUser.save();
    }

    res.status(200).json({ success: true, user: currentUser });
  } catch (err) {
    console.log('Error in Swipe Left controller: ', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const swipeRight = async (req, res) => {
  const likedUserId = req.params?.likedUserId;

  try {
    const likedUser = await User.findById(likedUserId);

    if (!likedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const currentUser = await User.findById(req.user.id);

    if (!currentUser.likes.includes(likedUserId)) {
      currentUser.likes.push(likedUserId);
      await currentUser.save();

      // If other user has liked us, it's a match for both
      if (likedUser.likes.includes(currentUser.id)) {
        likedUser.matches.push(currentUser.id);
        currentUser.matches.push(likedUserId);

        // save both users
        await Promise.all([await likedUser.save(), await currentUser.save()]);

        // Real time notification
        const connectedUsers = getConnectedUsers();
        const io = getIO();

        // Send real time notification to likedUser who is already loggedin, if current user likes his profile
        const likedUserSocketId = connectedUsers.get(likedUserId);

        if (likedUserSocketId) {
          io.to(likedUserSocketId).emit('newMatch', {
            _id: currentUser._id,
            name: currentUser.name,
            image: currentUser.image
          });
        }

        // Send real time notification to currentUser who is already loggedin, if liked user likes his profile
        const currentUserSocketId = connectedUsers.get(currentUser._id);

        if (currentUserSocketId) {
          io.to(currentUserSocketId).emit('newMatch', {
            _id: likedUserId,
            name: likedUserId,
            image: likedUserId
          });
        }
      }
    }

    res.status(200).json({ success: true, user: currentUser });
  } catch (err) {
    console.log('Error in Swipe Right controller: ', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
