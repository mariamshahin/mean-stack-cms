import User from '../models/user';
import { checkId } from '../utils/constants';

export const getAll = async (req, res, next) => {
  try {
    const fetchedUsers = await User.find();
    const users = fetchedUsers.map((user) => {
      return {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
    });
    res.status(200).json({
      users,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getOne = (req, res, next) => {
  const userId = req.params.id;
  if (checkId(userId)) {
    User.findById(userId)
      .then((user) => {
        if (!user) {
          const error = new Error('User not found.');
          error.statusCode = 404;
          throw error;
        }
        console.log(user);
        res.status(200).json({ user: user });
      })
      .catch((err) => {
        console.log(err);
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        res.status(err.statusCode).json({ error: err });
      });
  } else {
    res.status(422).json({ message: 'Invalid id' });
  }
};

export const deleteOne = (req, res, next) => {
  const userId = req.params.id;
  if (checkId(userId)) {
    User.findByIdAndDelete(userId)
      .then((user) => {
        if (!user) {
          const error = new Error('User not found.');
          error.statusCode = 404;
          throw error;
        }
        console.log(user);
        res.status(200).json({ message: 'User deleted successfully!' });
      })
      .catch((err) => {
        console.log(err);
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        res.status(err.statusCode).json({ error: err });
      });
  } else {
    res.status(422).json({ message: 'Invalid id' });
  }
};
