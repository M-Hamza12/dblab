import express from "express";
const router = express.Router();

import { getAllUser } from "../controller/userController";
import { login } from "../controller/authController";

router.route("/").get(getAllUser);
router.route("/login").post(login);

export default router;
