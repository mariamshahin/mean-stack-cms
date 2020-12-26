import express from 'express';
import authMiddleware from '../middlewares/authentication';
import authorization from '../middlewares/authorization';
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
  //authorization(roles.ADMIN, roles.EDITOR, roles.AUTHOR),
  createOne
);
router.get('/', authMiddleware, getAll);
router.get('/:id', authMiddleware, getOne);
router.put(
  '/:id',
  authMiddleware,
  //authorization(roles.ADMIN, roles.EDITOR, roles.AUTHOR),
  updateOne
);
router.delete(
  '/:id',
  authMiddleware,
  // authorization(roles.ADMIN, roles.EDITOR, roles.AUTHOR),
  deleteOne
);

export default router;
