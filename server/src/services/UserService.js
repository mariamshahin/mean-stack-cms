import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Mongoose from './MongooseService';
import { roles } from '../utils/constants';

export default class UserService extends Mongoose {
  constructor(model) {
    super(model);
  }

  deletePw(user) {
    const updatedUser = { ...user._doc };
    delete updatedUser.password;
    return updatedUser;
  }

  async createUser(body) {
    const { username, email, password, first_name, last_name, summary } = body;
    try {
      const hashedPw = await bcrypt.hash(password, 12);
      const result = await this.create({
        username,
        email,
        password: hashedPw,
        role: roles.SUBSCRIBER,
        first_name,
        last_name,
        summary,
      });
      return { result };
    } catch (error) {
      return { error };
    }
  }

  async AuthenticateUser(body) {
    const { email, password } = body;
    try {
      let token, result;
      const user = await this.findOne({ email });
      const matchPw = await bcrypt.compare(password, user.password);
      if (user && matchPw) {
        token = jwt.sign(
          {
            email: user.email,
            userId: user._id.toString(),
          },
          process.env.AUTH_SECRET_KEY,
          { expiresIn: '7d' }
        );
        user.password = undefined;
        result = { token, user };
      }
      return { user, matchPw, result };
    } catch (error) {
      return { error };
    }
  }

  async getAllUsers() {
    try {
      const users = await this.findAll();
      const result = users.map((user) => this.deletePw(user));
      return { result };
    } catch (error) {
      return { error };
    }
  }

  async getUser(id) {
    try {
      const user = await this.findById(id);
      const result = this.deletePw(user);
      return { result };
    } catch (error) {
      return { error };
    }
  }

  async deleteUser(id) {
    try {
      const result = await this.delete(id);
      return { result };
    } catch (error) {
      return { error };
    }
  }
}
