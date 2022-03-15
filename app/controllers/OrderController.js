import { Order } from "../db/models/order.js";

class OrderControllerClass {
  async addOrder(req, res) {
    const order = new Order({
      scooters: req.body.scooters,
    });
    try {
      await order.save();
      res.status(201).json(order);
    } catch (e) {
      res.status(422).json({ errors: e.errors });
    }
  }

  async getOrder(req, res) {
    console.log(req.params.oid);
    res.json({ message: "success" });
  }
}
export const OrderController = new OrderControllerClass();
