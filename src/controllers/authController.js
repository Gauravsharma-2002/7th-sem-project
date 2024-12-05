import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const googleLogin = async (req, res) => {
  try {
    const { email, name } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, name, role: 'content writer' });
      await user.save();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

export const verifyToken = (req, res) => {
  res.status(200).json({ user: req.user });
};
