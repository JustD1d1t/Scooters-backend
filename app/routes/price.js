import express from "express";
import { PriceController } from "../controllers/PriceController.js";

export const priceRouter = new express.Router();

priceRouter.get("/all", PriceController.getPrices);
priceRouter.get("/single", PriceController.getPrice);
