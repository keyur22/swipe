import { uploadImage } from '../config/cloudinary.js';
import User from '../models/User.js';
import { USER_SAFE_FIELDS } from '../utils/constants.js';

export const updateProfile = async (req, res) => {
  const prohibitedUpdates = ['email', 'password'];

  const isUpdateAllowed = Object.keys(req.body).every(
    (field) => !prohibitedUpdates.includes(field)
  );

  if (!isUpdateAllowed) {
    return res
      .status(400)
      .send('Update not allowed! Please check fields to be updated!');
  }

  try {
    const { image, ...otherData } = req.body;

    let updatedData = otherData;

    if (image) {
      // base64 format
      if (image.startsWith('data:image')) {
        try {
          const imageUrl = await uploadImage(image);
          updatedData.image = imageUrl;
        } catch (err) {
          console.log('Err in image update controller ', err);
          return res.status(400).json({ success: false, message: err });
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updatedData,
      { new: true, runValidators: true }
    ).select(USER_SAFE_FIELDS);

    res.status(200).json({
      success: true,
      user: updatedUser
    });
  } catch (err) {
    console.log('Error in update controller: ', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
