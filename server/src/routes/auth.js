import express from 'express';
import authMiddleware from '../middlewares/authentication';
import AuthController from '../controllers/AuthController';
import {
  registerValidator,
  loginValidator,
  profileValidator,
  imageValidator,
  validationHandler,
} from '../middlewares/validators';

const router = express.Router();
const {
  register,
  login,
  updateProfile,
  updateProfileImage,
  forgotPassword,
  resetPassword,
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

router.get('/forgot-password/:userEmail', authMiddleware, forgotPassword);
router.put('/forgot-password/:userEmail', resetPassword);

export default router;
