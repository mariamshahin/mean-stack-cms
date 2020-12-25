import jwt from 'jsonwebtoken';
import User from '../models/user';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'somesuperprivatesecret', (err, user) => {
      if (err) {
        return res.sendStatus(500);
      }
      const userId = user.userId;
      User.findOne({ _id: userId })
        .then((user) => {
          if (user) {
            req.user = user;
            next();
          } else {
            return res.sendStatus(401);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    res.sendStatus(401);
  }
};
