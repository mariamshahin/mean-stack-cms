import Draft from '../models/draft';
import User from '../models/user';
import PostService from '../services/PostService';
import PostController from './PostController';

export default class DraftController extends PostController {
  constructor() {
    super(Draft.modelName);
    this.postService = new PostService(Draft);
  }
}
