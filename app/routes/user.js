import express from "express";
import { UserController } from "../controllers/UserController.js";

export const userRouter = new express.Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.post("/reset", UserController.changePassword);
userRouter.patch("/update", UserController.udpateUserData);
userRouter.patch("/add-to-favourite", UserController.addToFavoutire);
userRouter.get("/favourite", UserController.getFavourite);
