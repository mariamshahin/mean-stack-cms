import express from 'express';
import authMiddleware from '../middlewares/authentication';
import authorization from '../middlewares/authorization';
import checkUser from '../middlewares/checkUser';

import {
  createPostValidator,
  updatePostValidator,
  idValidator,
  validationHandler,
} from '../middlewares/validators';
import { roles } from '../utils/constants';
import PostController from '../controllers/PostController';

const router = express.Router();

const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = new PostController();

router.post(
  '/',
  authMiddleware,
  authorization(roles.ADMIN, roles.EDITOR, roles.AUTHOR),
  createPostValidator,
  validationHandler,
  createOne
);
router.get('/', checkUser, getAll);
router.get('/:id', idValidator(), validationHandler, getOne);
router.put(
  '/:id',
  authMiddleware,
  authorization(roles.ADMIN, roles.EDITOR, roles.AUTHOR),
  updatePostValidator,
  validationHandler,
  updateOne
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
