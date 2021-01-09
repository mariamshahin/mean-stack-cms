import Mongoose from './MongooseService';
import { deletePw } from '../utils/utility';
import { roles, status } from '../utils/constants';

export default class PostService extends Mongoose {
  constructor(model) {
    super(model);
  }

  async createPost(req) {
    const { user, body, file } = req;
    const { title, content } = body;
    const user_id = user._id;
    const image_url = file ? `static/${file.path}` : null;
    try {
      const result = await this.create({
        title,
        content,
        user: user_id,
        image_url,
      });
      return { result };
    } catch (error) {
      return { error };
    }
  }

  async getAllPosts() {
    try {
      const result = await this.findAll();
      return { result };
    } catch (error) {
      return { error };
    }
  }

  async getPost(id) {
    try {
      const post = await this.findByIdAndPopulate(id, 'user');
      const result = { ...post._doc, user: deletePw(post.user) };
      return { result };
    } catch (error) {
      return { error };
    }
  }

  async updatePost(id, req) {
    const { user, body, file } = req;
    const user_id = user._id;
    const { title, content } = body;
    const image_url = file ? `static/${file.path}` : null;
    try {
      let result;
      const post = await this.findById(id);
      if (
        post &&
        user.role === roles.AUTHOR &&
        post.user.toString() !== user_id.toString()
      ) {
        return { post, result };
      }
      result = await this.update(id, {
        title,
        content,
        user: user_id,
        image_url,
      });
      return { post, result };
    } catch (error) {
      return { error };
    }
  }

  async findPost(obj) {
    try {
      const result = await this.find(obj);
      return { result };
    } catch (error) {
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
        user.role === roles.AUTHOR &&
        post.user.toString() !== user_id.toString()
      ) {
        return { post, result };
      }
      result = await this.delete(id);
      return { post, result };
    } catch (error) {
      return { error };
    }
  }
}
