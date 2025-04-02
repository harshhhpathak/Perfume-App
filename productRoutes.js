const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// Get all products and create new product
router.route('/')
    .get(getProducts)
    .post(createProduct);

// Get, update and delete single product
router.route('/:id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router; 