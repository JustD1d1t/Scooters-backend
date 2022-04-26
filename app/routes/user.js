import express from "express";
import { UserController } from "../controllers/UserController.js";

export const userRouter = new express.Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.post("/reset", UserController.changePassword);
userRouter.post("/update", UserController.udpateUserData);
