const Product = require("../models/productModel");
const ApiFeature = require("../utils/feature");
const cloudinary = require("cloudinary");
const multer = require("multer");

//create Product - Only Admin has access to create the product

exports.createProduct = async (req, res, next) => {
  try {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images); //if user select only one image
    } else {
      images = req.body.images; //if user select multiple images
    }

    //multer
    const storage = multer.memoryStorage();
    const upload = multer({
      storage: storage,
      limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit for uploaded files
    });

    upload.array("images", 7);

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.user = req.user.id;
    req.body.images = imagesLink;
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

//GET PRODUCT DETAILS

exports.getProductDetails = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

//GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  const resultPerPage = 8;

  const apiFeature = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  let products = await apiFeature.query;

  const productsCount = await Product.countDocuments();
  // let filteredProductsCount = products.length;
  apiFeature.pagination(resultPerPage);

  // console.log(products, productsCount)
  return res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    // filteredProductsCount,
  });
};

//GET ALL PRODUCTS ---ADMIN
exports.getAdminProducts = async (req, res) => {
  const products = await Product.find();

  return res.status(200).json({
    success: true,
    products,
  });
};

//UPDATE PRODUCT - ONLY ADMIN HAS RIGHTS TO UPDATE ANY PRODUCT

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  //cloudinary images part

  let images = [];
  if (typeof req.body.images === "string") {
    //checking the length of an image array. one image of an array of image
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  //multer
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit for uploaded files
  });

  upload.array("images", 7);

  if (images !== undefined) {
    //if image already stored incloudinary
    //delete images from cloudinary

    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLink;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  // console.log(req.params.id , product);
  res.status(200).json({
    success: true,
    product,
  });
};

//DELETE PRODUCT- ADMIN

exports.deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    //delete images from cloudinary

    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    // console.log(product)
    // await product.findByIdAndDelete(req.params.id)
    await product.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      message: "Product deleted",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

//create new review and update it

exports.createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);
    const isReceived = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    ); //checking the previous reviews, if done or not

    if (isReceived) {
      product.reviews.forEach((rev) => {
        if ((rev) => rev.user.toString() === req.user._id.toString()) {
          (rev.rating = rating), (rev.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    // overall ratings
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

//GET ALL REVIEWS OF A PRODUCT

exports.getProductRevviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

//DELETE REVIEWS
exports.deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    let ratings = 0;
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;
    await product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

// module.exports = getAllProducts
