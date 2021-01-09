import Mongoose from './MongooseService';
import { deletePw } from '../utils/utility';
import { roles } from '../utils/constants';

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
        user.role !== (roles.ADMIN || roles.EDITOR) &&
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
