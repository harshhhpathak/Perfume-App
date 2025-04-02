const express = require('express');
const router = express.Router();
const {
    getProductReviews,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');

// Get reviews for a product and create new review
router.route('/product/:productId')
    .get(getProductReviews)
    .post(createReview);

// Update and delete review
router.route('/:id')
    .put(updateReview)
    .delete(deleteReview);

module.exports = router; 