import express from 'express';
import authMiddleware from '../middlewares/authentication';
import authorization from '../middlewares/authorization';
import {
  changeRoleValidator,
  idValidator,
  validationHandler,
} from '../middlewares/validators';
import { roles } from '../utils/constants';
import UserController from '../controllers/UserController';

const router = express.Router();

const { getAll, getOne, deleteOne, changeRole } = new UserController();

router.get('/', authMiddleware, authorization(roles.ADMIN), getAll);
router.get(
  '/:id',
  authMiddleware,
  authorization(roles.ADMIN),
  idValidator(),
  validationHandler,
  getOne
);
router.delete(
  '/:id',
  authMiddleware,
  authorization(roles.ADMIN),
  idValidator(),
  validationHandler,
  deleteOne
);
router.patch(
  '/:id/change-role',
  authMiddleware,
  authorization(roles.ADMIN),
  changeRoleValidator,
  validationHandler,
  changeRole
);

export default router;
