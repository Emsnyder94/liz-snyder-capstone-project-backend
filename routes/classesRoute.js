import express from "express";
import * as classesController from "../controllers/classes-controller.js";

const router = express.Router();

router
  .route("/")
  .get(classesController.index)
  .post(classesController.createClass);

export default router;
