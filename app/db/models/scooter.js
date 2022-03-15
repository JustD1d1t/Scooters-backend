import mongoose from "mongoose";

const scooterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You have to type name"],
    minLength: [3, "At least 3 characters"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "You have to type price"],
    min: [999, "Minimum price is 999"],
    max: [29999, "Maximum price is 29999"],
    default: 999,
  },
  // image: {
  //   type: String,
  //   required: [true, "You have to add image"],
  // },
  color: [
    {
      type: String,
      required: [true, "You have to add image"],
    },
  ],
  deliveryDate: [
    {
      type: Object,
      required: [true, "You have to add image"],
    },
  ],
  rate: {
    type: Number,
    default: null,
  },
  manufacturer: {
    type: String,
    required: [true, "You have to type manufacturer"],
    minLength: [3, "At least 3 characters"],
    trim: true,
    lowercase: true,
  },
  country: {
    type: String,
    required: [true, "You have to type country"],
    minLength: [3, "At least 3 characters"],
    trim: true,
    lowercase: true,
  },
  powerType: {
    type: String,
    required: [true, "You have to type power type"],
    minLength: [3, "At least 3 characters"],
    trim: true,
    lowercase: true,
  },
  engineCapacity: {
    type: Number,
    required: [true, "You have to type power type"],
    min: [49, "Minimum value is 49"],
    max: [999, "Maximum value is 999"],
    default: 49,
  },
  wheelSize: {
    type: Number,
    required: [true, "You have to type wheel size"],
    min: [8, "Minimum value is 8"],
    max: [20, "Maximum value is 20"],
    default: 8,
  },
  seats: {
    type: Number,
    required: [true, "You have to type available seats"],
    min: [1, "Minimum value is 1"],
    max: [2, "Maximum value is 2"],
    default: 2,
  },
  description: {
    type: String,
    required: [true, "You have to type description"],
    minLength: [15, "At least 15 characters"],
    maxLength: [350, "Maximum 350 characters"],
    trim: true,
    lowercase: true,
  },
  topSpeed: {
    type: Number,
    required: [true, "You have to type top speed"],
    min: [30, "Minimum value is 30"],
    max: [150, "Maximum value is 150"],
    default: 30,
  },
});

export const Scooter = mongoose.model("Scooter", scooterSchema);
