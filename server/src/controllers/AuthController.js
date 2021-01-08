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
    const { body, file } = req;
    const { result, error } = await this.userService.createPost({ body, file });
    if (result) {
      return this.created(res);
    }
    return this.failed(res, error);
  };

  login = async (req, res) => {
    const {
      user,
      matchPw,
      result,
      error,
    } = await this.userService.AuthenticateUser(req.body);
    if (error) {
      return this.failed(res, error);
    }
    if (!user) {
      return this.notFound(res);
    }
    if (!matchPw) {
      return res.status(status.UNAUTHORIZED).json({
        message: 'Incorrect user credentials!',
      });
    }
    return res.status(status.OK).json({
      data: result,
    });
  };

  forgotPassword = async (req, res, next) => {
    console.log(req);
    res.json({ message: 'forgotPassword!' });
  };

  resetPassword = async (req, res, next) => {
    console.log(req);
    res.json({ message: 'resetPassword!' });
  };
}
