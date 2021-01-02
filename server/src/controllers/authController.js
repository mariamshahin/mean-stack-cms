import User from '../models/user';

import UserService from '../services/UserService';

const userService = new UserService(User);

export const register = async (req, res) => {
  const { result, error } = await userService.createPost(req.body);
  if (result) {
    return res.status(200).json({
      message: 'User created successfully!',
    });
  }
  return res.status(500).json({ error: error.message });
};

export const login = async (req, res) => {
  const { user, matchPw, result, error } = await userService.AuthenticateUser(
    req.body
  );
  if (!user) {
    return res.status(404).json({
      message: 'User not found!',
    });
  }
  if (!matchPw) {
    return res.status(401).json({
      message: 'Incorrect user credentials!',
    });
  }
  if (result) {
    return res.status(200).json({
      data: result,
    });
  }
  return res.status(500).json({ error: error.message });
};

export const forgotPassword = (req, res, next) => {
  console.log(req);
  res.json({ message: 'forgotPassword!' });
};

export const resetPassword = (req, res, next) => {
  console.log(req);
  res.json({ message: 'resetPassword!' });
};
