import { Order } from "../db/models/order.js";

class OrderControllerClass {
  async addOrder(req, res) {
    const {
      items,
      totalQuantity,
      deliveryMethod,
      paymentMethod,
      address,
      user,
    } = req.body;
    const order = new Order({
      items: items,
      totalQuantity,
      deliveryMethod,
      paymentMethod,
      address,
      user,
    });
    try {
      await order.save();
      res.status(201).json(order);
    } catch (e) {
      res.status(422).json({ errors: e.errors });
    }
  }

  async getOrder(req, res) {
    res.json({ message: "success" });
  }
}
export const OrderController = new OrderControllerClass();
