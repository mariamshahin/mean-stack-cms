import User from '../models/user';

import UserService from '../services/UserService';

const userService = new UserService(User);

export const getAll = async (req, res) => {
  const { result, error } = await userService.getAllUsers();
  if (result) {
    return res.status(200).json({
      data: result,
    });
  }
  return res.status(500).json({ error: error.message });
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  const { result, error } = await userService.getUser(id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  if (!result) {
    return res.status(404).json({
      message: 'User not found.',
    });
  }
  return res.status(200).json({
    data: result,
  });
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;
  const { result, error } = await userService.deleteUser(id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  if (!result) {
    return res.status(404).json({
      message: 'User not found.',
    });
  }
  return res.status(200).json({
    message: 'User deleted successfully!',
  });
};
