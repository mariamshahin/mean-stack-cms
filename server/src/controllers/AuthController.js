import User from '../models/user';
import UserService from '../services/UserService';
import Controller from './Controller';
import { status } from '../utils/constants';

export default class AuthController extends Controller {
  constructor() {
    super(User.modelName);
    this.userService = new UserService(User);
  }
  register = async (req, res) => {
    const { result, error } = await this.userService.createUser(req.body);
    if (result) {
      return this.created(res);
    }
    return this.failed(res, error);
  };

  login = async (req, res) => {
    const { user, result, error } = await this.userService.AuthenticateUser(
      req.body
    );
    if (error) {
      return this.failed(res, error);
    }
    if (!user) {
      return this.notFound(res);
    }
    if (!result) {
      return res.status(status.UNPROCESSABLE_ENTITY).json({
        message: 'Incorrect user credentials!',
      });
    }
    return res.status(status.OK).json({
      ...result,
    });
  };

  updateProfile = async (req, res) => {
    const { user, body } = req;
    const { result, error } = await this.userService.updateUser({
      user,
      body,
    });
    if (error) {
      return this.failed(res, error);
    }
    if (!result) {
      return res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
    return this.updated(res);
  };

  updateProfileImage = async (req, res) => {
    const { user, file } = req;
    const { result, error } = await this.userService.updateImage({
      user,
      file,
    });
    if (error) {
      return this.failed(res, error);
    }
    if (!result) {
      return res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
    return this.updated(res);
  };

  changePassword = async (req, res) => {
    const { user, body } = req;
    const { result, error } = await this.userService.changePassword({
      user,
      body,
    });
    if (error) {
      return this.failed(res, error);
    }
    if (!result) {
      return res.status(status.UNPROCESSABLE_ENTITY).json({
        error: 'Incorrect Password',
      });
    }
    return this.updated(res);
  };
}
