import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";

import {
  registerValidator,
  loginValidator,
} from "../middlewares/validators/authValidator";
import validationHandler from "../middlewares/validators/errorHandler";

const router = express.Router();

router.post("/register", registerValidator, validationHandler, register);
router.post("/login", loginValidator, validationHandler, login);
router.get("/forgot-password/:userEmail", authMiddleware, forgotPassword);
router.put("/forgot-password/:userEmail", resetPassword);

export default router;
