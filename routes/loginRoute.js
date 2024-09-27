import express from "express";
import * as loginController from "../controllers/login-controller.js";

const router = express.Router();

router.route("/").post(loginController.userLogin);

export default router;
