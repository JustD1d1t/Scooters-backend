import { Order } from "../db/models/order.js";
import { User } from "../db/models/user.js";

class OrderControllerClass {
  async addOrder(req, res) {
    console.log(req.body);
    let user;
    const {
      items,
      totalQuantity,
      deliveryMethod,
      paymentMethod,
      address,
      userId,
      totalPriceForAll,
    } = req.body;
    const order = new Order({
      items: items,
      totalQuantity,
      deliveryMethod,
      paymentMethod,
      address,
      user: userId,
      totalPriceForAll,
    });
    try {
      await order.save();
      user = await User.findById(userId);
      const userOrders = user.orders;
      const updatedUserOrders = [...userOrders, order];
      await User.findByIdAndUpdate(userId, {
        orders: updatedUserOrders,
      });
      res.status(201).json({ message: "Ordered succesfully" });
    } catch (e) {
      res.status(422).json({ errors: e.errors });
    }
  }

  async getOrder(req, res) {
    res.json({ message: "success" });
  }
  async getAllOrders(req, res) {
    const { userId } = req.query;
    let user;
    let orders = [];
    try {
      user = await User.findById(userId);
    } catch (e) {
      res.status(422).json({ error: e.error });
    }
    for (const order of user.orders) {
      try {
        const simpleOrder = await Order.findById(order);
        orders.push(simpleOrder);
      } catch (e) {
        res.status(422).json({ error: e.errors });
      }
    }

    res.json(orders);
  }
}
export const OrderController = new OrderControllerClass();
