import Comment from '../models/comment';
import CommentService from '../services/CommentService';
import Controller from './Controller';

export default class CommentController extends Controller {
  constructor() {
    super(Comment.modelName);
    this.commentService = new CommentService(Comment);
  }

  createOne = async (req, res) => {
    const { result, error } = await this.commentService.createComment(req.body);

    if (result) {
      return this.created(res);
    }
    return this.failed(res, error);
  };

  getAll = async (req, res) => {
    const { result, error } = await this.commentService.getAllComments();
    if (result) {
      return this.found(res, result);
    }
    return this.failed(res, error);
  };

  getAllByPostId = async (req, res) => {
    const { id } = req.params;
    const { result, error } = await this.commentService.getAllPostComments({
      post_id: id,
    });
    if (result) {
      return this.found(res, result);
    }
    return this.failed(res, error);
  };

  getOne = async (req, res) => {
    const { id } = req.params;
    const { result, error } = await this.commentService.getComment(id);
    if (error) {
      return this.failed(res, error);
    }
    if (!result) {
      return this.notFound(res);
    }
    return this.found(res, result);
  };

  deleteOne = async (req, res) => {
    const { id } = req.params;
    const { result, error } = await this.commentService.deleteComment(id);
    if (error) {
      return this.failed(res, error);
    }
    if (!result) {
      return this.notFound(res);
    }
    return this.deleted(res);
  };
}
