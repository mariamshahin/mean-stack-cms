import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Mongoose from './MongooseService';
import { roles } from '../utils/constants';
import { deletePw } from '../utils/utility';
import PostService from './PostService';
import Post from '../models/post';
import Draft from '../models/draft';
import config from '../config';

export default class UserService extends Mongoose {
  constructor(model) {
    super(model);
    this.post = new PostService(Post);
    this.draft = new PostService(Draft);
  }

  handleAuth(user) {
    return jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      config.authKey,
      { expiresIn: '7d' }
    );
  }

  async createUser(body) {
    const { username, email, password } = body;
    try {
      let token, result;
      const hashedPw = await bcrypt.hash(password, 12);
      const user = await this.create({
        username,
        email,
        password: hashedPw,
        role: roles.SUBSCRIBER,
      });
      if (user) {
        token = this.handleAuth(user);
        result = { token, user };
      }
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }

  async authenticateUser(body) {
    const { email, password } = body;
    try {
      let token, result;
      const user = await this.findOne({ email });
      const matchPw = user
        ? await bcrypt.compare(password, user.password)
        : null;
      if (user && matchPw) {
        token = this.handleAuth(user);
        user.password = undefined;
        result = { token, user };
      }
      return { user, result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }

  async updateUser(req) {
    const { user, body } = req;
    const id = user._id;
    const { username, email, full_name, summary } = body;
    const options = { new: true };
    try {
      const user = await this.updateOne(
        id,
        {
          username,
          email,
          full_name,
          summary,
        },
        options
      );
      const result = deletePw(user);
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }

  async updateImage(req) {
    const { user, file } = req;
    const id = user._id;
    const options = { new: true };
    try {
      const user = await this.updateOne(
        id,
        {
          image_url: `static/${file.path}`,
        },
        options
      );
      const result = deletePw(user);
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }

  async changePassword(req) {
    const { user, body } = req;
    const id = user._id;
    const { old_password, new_password } = body;
    try {
      let result;
      const matchPw = await bcrypt.compare(old_password, user.password);
      if (matchPw) {
        const hashedPw = await bcrypt.hash(new_password, 12);
        result = await this.updateOne(id, {
          password: hashedPw,
        });
      }
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }

  async getAllUsers(user) {
    const options = { _id: { $ne: user._id } };
    try {
      const users = await this.findAll(options, '-created_at');
      const result = users.map((user) => deletePw(user));
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }

  async getUser(id) {
    try {
      const user = await this.findById(id);
      let userResult, posts, drafts, result;
      if (user) {
        userResult = deletePw(user);
        posts = await this.post.findlastPost(user);
        drafts = await this.draft.findlastPost(user);
        result = { ...userResult, posts: posts.result, drafts: drafts.result };
      }
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }

  async deleteUser(id) {
    try {
      const result = await this.delete(id);
      if (result) {
        this.post.updateMany(
          {
            user: id,
          },
          { user: null }
        );
        this.draft.updateMany(
          {
            user: id,
          },
          { user: null }
        );
      }
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }

  async changeRole(id, body) {
    const { role } = body;
    const options = { new: true };
    try {
      const result = await this.updateOne(id, { role }, options);
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }

  async getUserData(user) {
    try {
      let result;
      if (user.role === roles.CONTRIBUTER) {
        const drafts = await this.draft.findlastPost(user);
        result = { user: { darfts: drafts.result } };
      } else if (user.role === roles.AUTHOR) {
        const posts = await this.post.findlastPost(user);
        const drafts = await this.draft.findlastPost(user);
        result = { user: { posts: posts.result, darfts: drafts.result } };
      } else if (user.role === roles.EDITOR || user.role === roles.ADMIN) {
        const posts = await this.post.findlastPost(user);
        const drafts = await this.draft.findlastPost(user);
        const lastPosts = await this.post.getPostsAndPopulate();
        const lastDrafts = await this.draft.getPostsAndPopulate();
        result = {
          user: { posts: posts.result, drafts: drafts.result },
          posts: lastPosts.result,
          drafts: lastDrafts.result,
        };
      }
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }
}
