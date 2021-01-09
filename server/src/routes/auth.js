import express from 'express';
import authMiddleware from '../middlewares/authentication';
import AuthController from '../controllers/AuthController';
import {
  registerValidator,
  loginValidator,
  profileValidator,
  imageValidator,
  passwordValidator,
  validationHandler,
} from '../middlewares/validators';

const router = express.Router();
const {
  register,
  login,
  updateProfile,
  updateProfileImage,
  changePassword,
} = new AuthController();

router.post('/register', registerValidator, validationHandler, register);
router.post('/login', loginValidator, validationHandler, login);
router.put(
  '/profile',
  authMiddleware,
  profileValidator,
  validationHandler,
  updateProfile
);
router.patch(
  '/profile-image',
  authMiddleware,
  imageValidator,
  validationHandler,
  updateProfileImage
);
router.put(
  '/change-password',
  authMiddleware,
  passwordValidator,
  validationHandler,
  changePassword
);

export default router;
