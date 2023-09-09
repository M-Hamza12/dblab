import express from "express";
const router = express.Router();

import { getAllUser } from "../controller/userController";
import { login, signup } from "../controller/authController";

router.route("/").get(getAllUser);
router.route("/login").post(login);
router.route("/signup").post(signup);

export default router;
