import { config } from "../config.js";
import fetch from "node-fetch";
import { User } from "../db/models/user.js";

class PriceControllerClass {
  async getPrices(req, res) {
    const pairs = req.query.pairs;

    const promises = pairs.map(async (pair) => {
      const response = await fetch(config.priceURL + pair);
      const data = await response.json();
      return data;
    });

    Promise.all(promises).then((promises) => res.json({ data: promises }));
  }
  async getPrice(req, res) {
    const pair = req.query.pair;
    const percentGrow = req.query.grow;
    const oldPrice = req.query.oldprice;
    const token = req.query.token;
    const response = await fetch(config.priceURL + pair);
    const data = await response.json();
    let user = await User.findOne({ token: token });

    if (!user) {
      res.json({ error: "Wrong token" });
      return;
    }

    if (
      parseFloat(oldPrice * (1 + percentGrow / 100)) < parseFloat(data.price)
    ) {
      res.json({ price: data.price, message: "play" });
      return;
    }

    res.json({ price: data.price, message: "watch" });
  }
}
export const PriceController = new PriceControllerClass();
