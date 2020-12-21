import express from "express";
import auth from "../middlewares/auth";
import { addUser } from "../../controllers/user";

const router = express.Router();

router.post("/users", auth, addUser);

export default router;
