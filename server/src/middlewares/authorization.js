/**
 * @description Check user authorization using user role
 * @param role {string} Any number of roles to check
 * @returns {Function}
 */
export default (...roles) => {
  return function (req, res, next) {
    const { user } = req;
    try {
      if (!roles.includes(user.role)) {
        return res.sendStatus(403);
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };
};
