import express from 'express';
import authMiddleware from '../middlewares/authentication';
import authorization from '../middlewares/authorization';
import {
  createDraftValidator,
  updateDraftValidator,
  idValidator,
  validationHandler,
} from '../middlewares/validators';
import { roles } from '../utils/constants';
import DraftController from '../controllers/DraftController';

const router = express.Router();
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = new DraftController();

router.post(
  '/',
  authMiddleware,
  authorization(roles.ADMIN, roles.EDITOR, roles.AUTHOR, roles.CONTRIBUTER),
  createDraftValidator,
  validationHandler,
  createOne
);
router.get(
  '/',
  authMiddleware,
  authorization(roles.ADMIN, roles.EDITOR, roles.AUTHOR, roles.CONTRIBUTER),
  getAll
);
router.get(
  '/:id',
  authMiddleware,
  authorization(roles.ADMIN, roles.EDITOR, roles.AUTHOR, roles.CONTRIBUTER),
  idValidator(),
  validationHandler,
  getOne
);
router.put(
  '/:id',
  authMiddleware,
  authorization(roles.ADMIN, roles.EDITOR, roles.AUTHOR, roles.CONTRIBUTER),
  updateDraftValidator,
  validationHandler,
  updateOne
);
router.delete(
  '/:id',
  authMiddleware,
  authorization(roles.ADMIN, roles.EDITOR, roles.AUTHOR, roles.CONTRIBUTER),
  idValidator(),
  validationHandler,
  deleteOne
);

export default router;
