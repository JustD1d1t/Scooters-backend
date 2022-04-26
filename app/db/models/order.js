import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      scooter: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Scooter",
      },
      color: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  address: {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    houseNumber: {
      type: Number,
      required: true,
    },
    flatNumber: {
      type: Number,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  totalQuantity: {
    type: Number,
    required: true,
  },
  deliveryMethod: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
});

export const Order = mongoose.model("Order", orderSchema);
