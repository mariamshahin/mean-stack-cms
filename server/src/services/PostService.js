import Mongoose from './MongooseService';

export default class PostService extends Mongoose {
  constructor(model) {
    super(model);
  }

  async createPost(body) {
    const { title, content, user_id } = body;
    try {
      const result = await this.create({ title, content, user_id });
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
      const result = await this.findById(id);
      return { result };
    } catch (error) {
      return { error };
    }
  }

  async updatePost(body) {
    const { title, content, user_id } = body;
    try {
      const result = await this.update({ title, content, user_id });
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
