export const roleMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
};
