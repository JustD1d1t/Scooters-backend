import { User } from "../db/models/user.js";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

class UserControllerClass {
  async register(req, res) {
    const { email, password } = req.body;
    const user = new User({
      email,
      password,
    });
    try {
      await user.save();
      res.json({ message: "User has been created" });
    } catch (e) {
      res.status(422).json({ error: "Something gone wrong" });
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
        },
        config.jwt,
        {
          expiresIn: "12h",
        },
        { algorithm: "HS512" }
      );
      await User.findOneAndUpdate(
        { email: req.body.email },
        {
          token: token,
        }
      );
      res
        .header("auth-token", token)
        .json({ token: token, message: "Succesfully logged in" });
    } catch (e) {
      return res.json({ errors: "Invalid data" });
    }
  }
}
export const UserController = new UserControllerClass();
