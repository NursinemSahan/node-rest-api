const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const { deleteProduct, updateProduct, getProduct, getProducts, createProduct } = require("../controllers/productController");

router.post("/", createProduct)

router.get("/", getProducts);

router.get("/:id", getProduct)

router.put("/:id", updateProduct)

router.delete("/:id", deleteProduct)


module.exports = router;