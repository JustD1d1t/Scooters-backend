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
  token: {
    type: String,
    required: false,
  },
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
