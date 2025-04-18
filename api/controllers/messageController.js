import Message from '../models/Message.js';
import User from '../models/User.js';

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
      senderId: req.user.id,
      receiverId,
      content
    });

    res.status(201).json({ success: true, message: newMessage });
  } catch (err) {
    console.log('Error in sendMessage Controller: ', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
