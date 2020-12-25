import User from '../models/user';

/**
 * @description Check user authorization using user role
 * @param role {string} Any number of roles to check
 * @returns {Promise<*>}
 */
export default (...roles) => {
  return function (req, res, next) {
    const userId = req.user.userId;
    User.findOne({ _id: userId })
      .then((user) => {
        if (!roles.includes(user.role)) {
          return res.sendStatus(403);
        }
        next();
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  };
};
