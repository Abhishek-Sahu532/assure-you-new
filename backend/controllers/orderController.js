const Order = require("../models/orderModel");
const Product = require("../models/productModel");

//creating new orders
exports.newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItem,
      paymentInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItem,
      paymentInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      order,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

//get single order
exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      //populate method will go and search in user table and provide the name and email for the particular user
      "user",
      "name email"
    );
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

//myorders for logged in user
exports.myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }); // will check, not working
    // console.log(req.user._id)
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

//GET ALL ORDERS -- ADMIN
exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};

//UPDATE ORDER STATUS-- ADMIN

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    if (order.orderStatus === "Delivered") {
      return res.status(404).json({
        message: "You have already delivered this order",
      });
    }

    if (req.body.status === "Shipped") {
      order.orderItem.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    return res.status(200).json({
      message: true,
      order,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

//DELETE ORDERS -- ADMIN
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    await order.deleteOne();

    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
