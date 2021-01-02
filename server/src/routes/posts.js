import express from 'express';
import authMiddleware from '../middlewares/authentication';
import authorization from '../middlewares/authorization';
import {
  createPostValidator,
  idValidator,
  validationHandler,
} from '../middlewares/validators';
import { roles } from '../utils/constants';
import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from '../controllers/postController';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  authorization(roles.ADMIN, roles.EDITOR, roles.AUTHOR),
  createPostValidator,
  validationHandler,
  createOne
);
router.get('/', getAll);
router.get('/:id', idValidator, validationHandler, getOne);
router.put(
  '/:id',
  authMiddleware,
  authorization(roles.ADMIN, roles.EDITOR, roles.AUTHOR),
  idValidator(),
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
