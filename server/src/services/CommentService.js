import Mongoose from './MongooseService';

export default class CommentService extends Mongoose {
  constructor(model) {
    super(model);
  }

  async createComment(body) {
    const { comment, name, email, post_id } = body;
    try {
      const result = await this.create({ comment, name, email, post_id });
      return { result };
    } catch (error) {
      return { error };
    }
  }

  async getAllComments() {
    try {
      const result = await this.findAll();
      return { result };
    } catch (error) {
      return { error };
    }
  }

  async getAllPostComments(obj) {
    try {
      const result = await this.find(obj);
      return { result };
    } catch (error) {
      return { error };
    }
  }

  async getComment(id) {
    try {
      const result = await this.findById(id);
      return { result };
    } catch (error) {
      return { error };
    }
  }

  async deleteComment(id) {
    try {
      const result = await this.delete(id);
      return { result };
    } catch (error) {
      return { error };
    }
  }
}
