import jwt from 'jsonwebtoken';

export const generateInviteToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};
