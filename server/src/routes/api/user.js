import express from "express";
import auth from "../middlewares/auth";
import { addUser } from "../../controllers/user";

const router = express.Router();

router.post("/users", addUser);

export default router;
