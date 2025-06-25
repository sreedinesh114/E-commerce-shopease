import Order from '../models/Order.js';

export const placeOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const order = new Order({ user: req.user.id, products: items, total });
    await order.save();
    res.status(201).json({ msg: 'Order placed' });
  } catch {
    res.status(500).json({ msg: 'Order failed' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch {
    res.status(500).json({ msg: 'Fetch failed' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'email');
    res.json(orders);
  } catch {
    res.status(500).json({ msg: 'Fetch failed' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.json({ msg: 'Order status updated' });
  } catch {
    res.status(500).json({ msg: 'Update failed' });
  }
};
