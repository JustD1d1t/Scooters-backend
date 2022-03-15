import express from "express";
import mongoose from "mongoose";
import { config } from "./config.js";
import { orderRouter } from "./routes/order.js";
import { scootersRouter } from "./routes/scooter.js";
import { userRouter } from "./routes/user.js";

export const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

app.use("/scooters", scootersRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);

mongoose.connect(config.database);
