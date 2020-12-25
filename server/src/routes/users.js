import express from 'express';
import authMiddleware from '../middlewares/authentication';
import authorization from '../middlewares/authorization';
import { roles } from '../utils/roles';
import { getAll, getOne, deleteOne } from '../controllers/userController';

const router = express.Router();

router.get('/', authMiddleware, authorization(roles.ADMIN), getAll);
router.get('/:id', authMiddleware, authorization(roles.SUBSCRIBER), getOne);
router.delete(
  '/:id',
  authMiddleware,
  authorization(roles.SUBSCRIBER),
  deleteOne
);

export default router;
