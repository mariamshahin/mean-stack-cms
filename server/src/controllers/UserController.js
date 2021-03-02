import User from '../models/user';
import UserService from '../services/UserService';
import Controller from './Controller';

export default class UserController extends Controller {
  constructor() {
    super(User.modelName);
    this.userService = new UserService(User);
  }

  getAll = async (req, res) => {
    const { user } = req;
    const { result, error } = await this.userService.getAllUsers(user);
    if (result) {
      return this.found(res, result);
    }
    return this.failed(res, error);
  };

  getOne = async (req, res) => {
    const { id } = req.params;
    const { result, error } = await this.userService.getUser(id);
    if (error) {
      return this.failed(res, error);
    }
    if (!result) {
      return this.notFound(res);
    }
    return this.found(res, result);
  };

  deleteOne = async (req, res) => {
    const { id } = req.params;
    const { result, error } = await this.userService.deleteUser(id);
    if (error) {
      return this.failed(res, error);
    }
    if (!result) {
      return this.notFound(res);
    }
    return this.deleted(res);
  };

  changeRole = async (req, res) => {
    const { id } = req.params;
    const { result, error } = await this.userService.changeRole(id, req.body);
    if (error) {
      return this.failed(res, error);
    }
    if (!result) {
      return this.notFound(res);
    }
    return this.updated(res, result);
  };

  dashboard = async (req, res) => {
    const { user } = req;
    const { result, error } = await this.userService.getUserData(user);
    if (error) {
      return this.failed(res, error);
    }
    return this.found(res, result);
  };
}
