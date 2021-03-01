import Mongoose from './MongooseService';
import { deletePw } from '../utils/utility';
import { roles } from '../utils/constants';

export default class PostService extends Mongoose {
  constructor(model) {
    super(model);
  }

  async createPost({ user, body, file }) {
    let image_url;
    const { title, content } = body;
    const user_id = user._id;
    if (file) {
      image_url = `static/${file.path}`;
    }
    try {
      const result = await this.create({
        title,
        content,
        user: user_id,
        image_url,
      });
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }

  async getAllPosts(req) {
    const { user } = req;
    try {
      let result;
      if (user && user.role !== roles.ADMIN && user.role !== roles.AUTHOR) {
        result = await this.findLast({ user: user._id }, '-updated_at', null);
      } else {
        result = await this.findAllAndPopulate(null, '-updated_at', 'user');
      }
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }

  async getPost(id) {
    try {
      let result;
      const post = await this.findByIdAndPopulate(id, 'user');
      if (post) {
        result = {
          ...post._doc,
          user: post.user ? deletePw(post.user) : null,
        };
      }
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }

  async updatePost({ user, body, file }, id) {
    let image_url;
    const user_id = user._id;
    const { title, content } = body;
    if (file) {
      image_url = `static/${file.path}`;
    }
    try {
      let result;
      const post = await this.findById(id);
      if (
        post &&
        user.role !== (roles.ADMIN || roles.EDITOR) &&
        post.user.toString() !== user_id.toString()
      ) {
        return { post, result };
      }
      result = await this.updateOne(id, {
        title,
        content,
        user: user_id,
        image_url,
      });
      return { post, result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }

  async findPost(obj) {
    try {
      const result = await this.find(obj, '-updated_at');
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }

  async findlastPost(obj, sort, limit) {
    try {
      const result = await this.findLast(obj, sort, limit);
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }

  async deletePost(id, user) {
    const user_id = user._id;

    try {
      let result;
      const post = await this.findById(id);
      if (
        post &&
        user.role !== (roles.ADMIN || roles.EDITOR) &&
        post.user.toString() !== user_id.toString()
      ) {
        return { post, result };
      }
      result = await this.delete(id);
      return { post, result };
    } catch (error) {
      this.logger.error(error);
      return { error };
    }
  }
}
