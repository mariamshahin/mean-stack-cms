import Post from '../models/post';
import User from '../models/user';

import PostService from '../services/PostService';
import Controller from './Controller';

export default class PostController extends Controller {
  constructor() {
    super(Post.modelName);
    this.postService = new PostService(Post);
  }

  createOne = async (req, res) => {
    const { result, error } = await this.postService.createPost({
      user: req.user,
      post: req.body,
    });

    if (result) {
      return this.created(res);
    }
    return this.failed(res, error);
  };

  getAll = async (req, res) => {
    const { result, error } = await this.postService.getAllPosts();
    if (result) {
      return this.found(res, result);
    }
    return this.failed(res, error);
  };

  getOne = async (req, res) => {
    const { id } = req.params;
    const { result, error } = await this.postService.getPost(id);
    if (error) {
      return this.failed(res, error);
    }
    if (!result) {
      return this.notFound(res);
    }
    return this.found(res, result);
  };

  updateOne = async (req, res) => {
    const { id } = req.params;
    const { result, error } = await this.postService.updatePost(id, {
      user: req.user,
      post: req.body,
    });
    if (error) {
      return this.failed(res, error);
    }
    if (!result) {
      return this.notFound(res);
    }
    return this.updated(res);
  };

  deleteOne = async (req, res) => {
    const { id } = req.params;
    const { result, error } = await this.postService.deletePost(id);
    if (error) {
      return this.failed(res, error);
    }
    if (!result) {
      return this.notFound(res);
    }
    return this.deleted(res);
  };
}
