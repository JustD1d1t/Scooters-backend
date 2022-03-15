import { User } from "../db/models/user.js";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

class UserControllerClass {
  async register(req, res) {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
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
        return res
          .status(401)
          .json({ errors: { password: "Password is not valid" } });
      }
      const token = jsonwebtoken.sign(
        { user: user },
        config.jwt,
        {
          expiresIn: "20m",
        },
        { algorithm: "HS512" }
      );
      res.header("auth-token", token).json({ token: token });
    } catch (e) {
      return res.status(401).json({ errors: e.errors });
    }
  }
}
export const UserController = new UserControllerClass();
