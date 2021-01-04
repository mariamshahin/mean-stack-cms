import express from 'express';
import authMiddleware from '../middlewares/authentication';
import AuthController from '../controllers/AuthController';
import {
  registerValidator,
  loginValidator,
  validationHandler,
} from '../middlewares/validators';

const router = express.Router();
const { register, login, forgotPassword, resetPassword } = new AuthController();

router.post('/register', registerValidator, validationHandler, register);
router.post('/login', loginValidator, validationHandler, login);
router.get('/forgot-password/:userEmail', authMiddleware, forgotPassword);
router.put('/forgot-password/:userEmail', resetPassword);

export default router;
