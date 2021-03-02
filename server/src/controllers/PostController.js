import Post from '../models/post';
import PostService from '../services/PostService';
import Controller from './Controller';

export default class PostController extends Controller {
  constructor(modelName) {
    super(modelName || Post.modelName);
    this.postService = new PostService(Post);
  }

  createOne = async (req, res) => {
    const { user, body, file } = req;
    const { result, error } = await this.postService.createPost({
      user,
      body,
      file,
    });
    if (result) {
      return this.created(res);
    }
    return this.failed(res, error);
  };

  getAll = async (req, res) => {
    const { result, error } = await this.postService.getAllPosts(req);
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
    const { user, body, file } = req;
    const { id } = req.params;
    const { post, result, error } = await this.postService.updatePost(
      {
        user,
        body,
        file,
      },
      id
    );
    if (error) {
      return this.failed(res, error);
    }
    if (!post) {
      return this.notFound(res);
    }
    if (!result) {
      return this.forbidden(res);
    }
    return this.updated(res);
  };

  deleteOne = async (req, res) => {
    const { id } = req.params;
    const { post, result, error } = await this.postService.deletePost(
      id,
      req.user
    );
    if (error) {
      return this.failed(res, error);
    }
    if (!post) {
      return this.notFound(res);
    }
    if (!result) {
      return this.forbidden(res);
    }
    return this.deleted(res);
  };
}
