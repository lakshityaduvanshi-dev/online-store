const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create Order Secure Routing
router.post('/', async (req, res, next) => {
  try {
    const { userId, items, subtotal, shipping, tax, total } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items inside cart session' });
    }

    // Explicit checking and payload processing
    const order = new Order({ 
      user: userId, 
      items, 
      subtotal: Number(subtotal), 
      shipping: Number(shipping), 
      tax: Number(tax), 
      total: Number(total) 
    });
    
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("🚨 Checkout Engine Failed:", error.message);
    next(error); // central error response middleware triggered
  }
});

// Fetch Order Logs for Specific User Account
router.get('/:userId', async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;