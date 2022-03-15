import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "You have to type email"],
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [4, "At least 4 characters"],
    maxlength: [30, "Max length is 30 characters"],
  },
  username: {
    type: String,
    required: true,
    minLength: [4, "At least 4 characters"],
    maxlength: [30, "Max length is 30 characters"],
    unique: true,
  },
  name: {
    type: String,
    minLength: [4, "At least 4 characters"],
    maxlength: [30, "Max length is 30 characters"],
  },
  lastName: {
    type: String,
    minLength: [4, "At least 4 characters"],
    maxlength: [30, "Max length is 30 characters"],
  },
  street: {
    type: String,
    minLength: [4, "At least 4 characters"],
    maxlength: [30, "Max length is 30 characters"],
  },
  houseNumber: {
    type: Number,
    min: [1, "Minimum value is 1"],
    max: [999, "Minimum value is 999"],
  },
  flatNumber: {
    type: Number,
    min: [1, "Minimum value is 1"],
    max: [30, "Minimum value is 30"],
  },
  zipCode: {
    type: Number,
    min: [0, "Minimum value is 1"],
    max: [99999, "Minimum value is 5"],
    minlength: [4, "At least 4 characters"],
    maxlength: [5, "Maximum 5 characters"],
  },
  country: {
    type: String,
    minLength: [4, "At least 4 characters"],
    maxlength: [30, "Max length is 30 characters"],
  },
  phoneNumber: {
    type: String,
    minLength: [4, "At least 4 characters"],
    maxlength: [30, "Max length is 30 characters"],
  },
  favourite: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Scooter" },
  ],
  orders: [{ type: mongoose.Types.ObjectId, required: true, ref: "Order" }],
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
});

userSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    error = { user: "This user is already registered" };
  }
  next(error);
});

userSchema.methods = {
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

export const User = mongoose.model("User", userSchema);
