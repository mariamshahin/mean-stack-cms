import jwt from 'jsonwebtoken';
import User from '../models/user';

/**
 * @description Check request authentication
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next function
 * @returns {Promise<*>}
 */
export default (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, user) => {
      if (err) {
        return next();
      }
      const userId = user.userId;
      // Check if the user deleted even if authenticated
      User.findOne({ _id: userId })
        .then((user) => {
          if (user) {
            req.user = user;
          }
          return next();
        })
        .catch((error) => error);
    });
  } else {
    return next();
  }
};
