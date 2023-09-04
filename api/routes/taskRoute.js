import express from "express";
import {
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.route("/task/:id").post(addTask).put(updateTask);
router.route("/task/:group_id/:task_id").delete(deleteTask);

export default router;
