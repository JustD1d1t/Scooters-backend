import express from "express";
import { ScooterController } from "../controllers/ScooterController.js";

export const scootersRouter = new express.Router();

scootersRouter.get("/", ScooterController.getAllScooters);
scootersRouter.get("/:sid", ScooterController.getScooter);

scootersRouter.post("/add", ScooterController.addScooter);
