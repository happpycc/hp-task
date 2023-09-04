import express from "express";
import {
  deleteGroup,
  addGroup,
  getGroup,
  updateGroupName,
} from "../controllers/groupController.js";

const router = express.Router();

router
  .route("/group/:id")
  .get(getGroup)
  .delete(deleteGroup)
  .put(updateGroupName);
router.route("/group").post(addGroup);

export default router;
