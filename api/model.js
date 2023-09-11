import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TaskSchema = new Schema(
  {
    content: { type: String, required: true },
    state: {
      type: String,
      required: true,
      enum: ["done", "todo", "abandon"],
      default: "todo",
    },
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: "update_time",
    },
  },
);

const GroupSchema = new Schema(
  {
    tasks: [TaskSchema],
    name: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "create_time",
      updatedAt: "update_time",
    },
  },
);

const GroupModel = model("Group", GroupSchema);

export default GroupModel;
