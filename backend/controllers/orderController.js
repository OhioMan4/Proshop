const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) { res.status(400); throw new Error('No order items'); }
  const order = new Order({ orderItems, user: req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice });
  const created = await order.save();
  res.status(201).json(created);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) return res.json(order);
  res.status(404);
  throw new Error('Order not found');
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = { id: req.body.id, status: req.body.status, update_time: req.body.update_time, email_address: req.body.payer.email_address };
    return res.json(await order.save());
  }
  res.status(404);
  throw new Error('Order not found');
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    return res.json(await order.save());
  }
  res.status(404);
  throw new Error('Order not found');
});

const getMyOrders = asyncHandler(async (req, res) =>
  res.json(await Order.find({ user: req.user._id }))
);

const getOrders = asyncHandler(async (req, res) =>
  res.json(await Order.find({}).populate('user', 'id name'))
);

module.exports = { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders };
