import Message from '../models/Message.js';
import User from '../models/User.js';

import { getConnectedUsers, getIO } from '../socket/socket.server.js';

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body || {};

    if (!receiverId || !content) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
    }

    const receiverUser = await User.findById(receiverId);

    if (!receiverUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const newMessage = await Message.create({
      senderId: req.user._id,
      receiverId,
      content
    });

    const io = getIO();
    const connectedUsers = getConnectedUsers();
    const receiverSocketId = connectedUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', {
        message: content
      });
    }

    res.status(201).json({ success: true, message: newMessage });
  } catch (err) {
    console.log('Error in sendMessage Controller: ', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const getConversation = async (req, res) => {
  const userId = req.params?.userId;
  const currentUser = req.user;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const messages = await Message.find({
      // getting conversation between two users who can be either sender or receiver
      $or: [
        { senderId: currentUser.id, receiverId: userId },
        { senderId: userId, receiverId: currentUser.id }
      ]
    }).sort('createdAt');

    res.status(200).json({ success: true, messages });
  } catch (err) {
    console.log('Error in getConversation Controller, ', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
