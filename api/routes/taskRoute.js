import express from "express";
import {
  addTask,
  deleteTask,
  updateTaskContent,
  updateTaskPosition,
  updateTaskState,
} from "../controllers/taskController.js";

const router = express.Router();

router.route("/task/:id").post(addTask);
router.route("/task/:group_id/:task_id").delete(deleteTask);
router.route("/task/position/:id").put(updateTaskPosition);
router.route("/task/content/:id").put(updateTaskContent);
router.route("/task/state/:id").put(updateTaskState);

export default router;
