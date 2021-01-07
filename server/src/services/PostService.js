import Mongoose from './MongooseService';
import { deletePw } from '../utils/utility';

export default class PostService extends Mongoose {
  constructor(model) {
    super(model);
  }

  async createPost(body) {
    const { user, post } = body;
    const { title, content } = post;
    const user_id = user._id;
    try {
      const result = await this.create({ title, content, user: user_id });
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

  async updatePost(id, body) {
    const { user, post } = body;
    const user_id = user._id;
    const { title, content } = post;
    try {
      const result = await this.update(id, { title, content, user: user_id });
      return { result };
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

  async deletePost(id) {
    try {
      const result = await this.delete(id);
      return { result };
    } catch (error) {
      return { error };
    }
  }
}
