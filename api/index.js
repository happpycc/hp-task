import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import groupRoute from "./routes/groupRoute.js";
import taskRoute from "./routes/taskRoute.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use(groupRoute);
app.use(taskRoute);

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connect to mongodb well");
    app.listen(process.env.PORT, process.env.IP, () => {
      console.log(`server running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
