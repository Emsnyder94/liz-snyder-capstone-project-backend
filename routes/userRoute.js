import express from "express";
import * as userController from "../controllers/user-controller.js";

const router = express.Router();

router.route("/").get(userController.index).post(userController.addUser);
router.route("/:id").get(userController.getSingleUser);
router.route("/:userId/classes/:classId").post(userController.addClass);

export default router;
