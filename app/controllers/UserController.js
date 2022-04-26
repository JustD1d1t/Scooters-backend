import { User } from "../db/models/user.js";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

class UserControllerClass {
  async register(req, res) {
    const {
      email,
      username,
      name,
      lastName,
      phoneNumber,
      street,
      houseNumber,
      flatNumber,
      zipCode,
      city,
      country,
      password,
    } = req.body;
    const user = new User({
      email,
      username,
      name,
      lastName,
      phoneNumber,
      street,
      houseNumber,
      flatNumber,
      zipCode,
      city,
      country,
      password,
      admin: false,
    });
    try {
      await user.save();
      res.json({ message: "User has been created" });
    } catch (e) {
      res.status(422).json({ errors: e });
    }
  }
  async login(req, res) {
    let user;
    try {
      if (req.body.email) {
        user = await User.findOne({ email: req.body.email });
      }
      if (!user) {
        return res.status(401).json({ errors: { user: "User not found" } });
      }
      const isValidPassword = user.comparePassword(req.body.password);
      if (!isValidPassword) {
        return res.json({ errors: { password: "Credentials are not valid" } });
      }
      const token = jsonwebtoken.sign(
        {
          email: user.email,
          username: user.username,
          name: user.name,
          lastName: user.lastName,
          street: user.street,
          houseNumber: user.houseNumber,
          flatNumber: user.flatNumber,
          zipCode: user.zipCode,
          country: user.country,
          city: user.city,
          phoneNumber: user.phoneNumber,
          favourite: user.favourite,
          orders: user.orders,
          id: user._id,
          admin: user.admin,
        },
        config.jwt,
        {
          expiresIn: "20m",
        },
        { algorithm: "HS512" }
      );
      res.header("auth-token", token).json({ token: token });
    } catch (e) {
      return res.json({ errors: "Invalid data" });
    }
  }
  async udpateUserData(req, res) {
    const {
      name,
      lastName,
      street,
      houseNumber,
      flatNumber,
      zipCode,
      city,
      country,
      userId,
    } = req.body;
    try {
      await User.findByIdAndUpdate(userId, {
        name,
        lastName,
        street,
        houseNumber,
        flatNumber,
        zipCode,
        city,
        country,
      });
    } catch (error) {
      return res.json({ error: "User not found" });
    }
    res.json({ message: "Data changed" });
  }
  async changePassword(req, res) {
    const { password, userId } = req.body;
    let user;
    try {
      user = await User.findById(userId);
      user.password = password;
    } catch (error) {
      return res.json({ error: "User not found" });
    }
    try {
      await user.save();
      res.json({ message: "Password changed" });
    } catch (error) {
      res.json({ error: error });
    }
  }
}
export const UserController = new UserControllerClass();
