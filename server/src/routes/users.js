import express from 'express';
import authMiddleware from '../middlewares/authentication';
import authorization from '../middlewares/authorization';
import { roles } from '../utils/constants';
import { getAll, getOne, deleteOne } from '../controllers/userController';

const router = express.Router();

router.get('/', authMiddleware, authorization(roles.ADMIN), getAll);
router.get('/:id', authMiddleware, authorization(roles.ADMIN), getOne);
router.delete('/:id', authMiddleware, authorization(roles.ADMIN), deleteOne);

export default router;
