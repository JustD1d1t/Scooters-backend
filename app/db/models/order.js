import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  scooters: [{ type: mongoose.Types.ObjectId, required: true, ref: "Scooter" }],
});

export const Order = mongoose.model("Order", orderSchema);
