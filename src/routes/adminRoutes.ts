import express from "express";
import { addCabin, addGuest } from "./../controller/adminController";
const router = express.Router();

router.route("/addCabin").post(addCabin);
router.route("/addGuest").post(addGuest);

export default router;
