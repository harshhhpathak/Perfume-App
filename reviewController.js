const Review = require('../models/Review');
const Product = require('../models/Product');

// Get reviews for a product
exports.getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create review
exports.createReview = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Review({
            ...req.body,
            product: req.params.productId
        });

        const newReview = await review.save();

        // Update product rating
        const reviews = await Review.find({ product: req.params.productId });
        const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
        
        product.rating = avgRating;
        product.numReviews = reviews.length;
        await product.save();

        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update review
exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        
        Object.assign(review, req.body);
        const updatedReview = await review.save();

        // Update product rating
        const reviews = await Review.find({ product: review.product });
        const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
        
        const product = await Product.findById(review.product);
        product.rating = avgRating;
        await product.save();

        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const productId = review.product;
        await review.remove();

        // Update product rating
        const reviews = await Review.find({ product: productId });
        const avgRating = reviews.length > 0 
            ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
            : 0;
        
        const product = await Product.findById(productId);
        product.rating = avgRating;
        product.numReviews = reviews.length;
        await product.save();

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 