import express from "express";
import { getGroup } from "./controller.js";

const router = express.Router();

router.route("/group/:id").get(getGroup);

export default router;
