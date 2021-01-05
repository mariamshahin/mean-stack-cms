import express from 'express';
import authMiddleware from '../middlewares/authentication';
import authorization from '../middlewares/authorization';
import {
  createCommentValidator,
  idValidator,
  validationHandler,
} from '../middlewares/validators';
import { roles } from '../utils/constants';
import CommentController from '../controllers/CommentController';

const router = express.Router();

const {
  createOne,
  getAll,
  getAllByPostId,
  getOne,
  deleteOne,
} = new CommentController();

router.post('/', createCommentValidator, validationHandler, createOne);
router.get(
  '/',
  authMiddleware,
  authorization(roles.ADMIN, roles.EDITOR, roles.AUTHOR),
  getAll
);
router.get('/post/:id', idValidator(), validationHandler, getAllByPostId);
router.get(
  '/:id',
  authMiddleware,
  authorization(roles.ADMIN, roles.EDITOR, roles.AUTHOR),
  idValidator(),
  validationHandler,
  getOne
);
router.delete(
  '/:id',
  authMiddleware,
  authorization(roles.ADMIN, roles.EDITOR, roles.AUTHOR),
  idValidator(),
  validationHandler,
  deleteOne
);

export default router;
