import express from "express";
import { OrderController } from "../controllers/OrderController.js";

export const orderRouter = new express.Router();

orderRouter.post("/", OrderController.addOrder);
orderRouter.get("/", OrderController.getAllOrders);
orderRouter.get("/:oid", OrderController.getOrder);
