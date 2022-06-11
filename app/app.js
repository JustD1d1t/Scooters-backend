import express from "express";
import mongoose from "mongoose";
import { config } from "./config.js";
import { priceRouter } from "./routes/price.js";
import { userRouter } from "./routes/user.js";

export const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

app.use("/prices", priceRouter);
app.use("/user", userRouter);

mongoose.connect(config.database);
