const mongoose = require('mongoose');
const Product = require('./models/Product');
const Review = require('./models/Review');
require('dotenv').config();

const products = [
    {
        name: "Ocean Breeze",
        description: "A fresh and invigorating scent that captures the essence of the ocean. Perfect for summer days and beach outings.",
        price: 49.99,
        images: [
            "https://source.unsplash.com/random?perfume-bottle",
            "https://source.unsplash.com/random?fragrance",
            "https://source.unsplash.com/random?perfume"
        ],
        sizes: ["30ml", "50ml", "100ml"],
        brand: "Ocean Scents",
        category: "Fresh",
        rating: 4.5,
        numReviews: 12
    },
    {
        name: "Midnight Rose",
        description: "A sophisticated and romantic fragrance with notes of rose, vanilla, and musk. Perfect for evening wear.",
        price: 79.99,
        images: [
            "https://source.unsplash.com/random?rose-perfume",
            "https://source.unsplash.com/random?luxury-perfume",
            "https://source.unsplash.com/random?perfume-bottle"
        ],
        sizes: ["50ml", "100ml"],
        brand: "Luxury Fragrances",
        category: "Floral",
        rating: 4.8,
        numReviews: 8
    },
    {
        name: "Mountain Pine",
        description: "A woody and earthy scent inspired by mountain forests. Features notes of pine, cedar, and fresh air.",
        price: 59.99,
        images: [
            "https://source.unsplash.com/random?pine-perfume",
            "https://source.unsplash.com/random?wood-perfume",
            "https://source.unsplash.com/random?perfume"
        ],
        sizes: ["30ml", "50ml", "100ml"],
        brand: "Nature Scents",
        category: "Woody",
        rating: 4.2,
        numReviews: 15
    },
    {
        name: "Citrus Sunrise",
        description: "A bright and energizing fragrance with notes of orange, lemon, and grapefruit. Perfect for morning wear.",
        price: 39.99,
        images: [
            "https://source.unsplash.com/random?citrus-perfume",
            "https://source.unsplash.com/random?fresh-perfume",
            "https://source.unsplash.com/random?perfume-bottle"
        ],
        sizes: ["30ml", "50ml"],
        brand: "Fresh Scents",
        category: "Citrus",
        rating: 4.6,
        numReviews: 10
    },
    {
        name: "Vanilla Dreams",
        description: "A sweet and comforting fragrance with rich vanilla notes and hints of caramel and almond.",
        price: 69.99,
        images: [
            "https://source.unsplash.com/random?vanilla-perfume",
            "https://source.unsplash.com/random?sweet-perfume",
            "https://source.unsplash.com/random?perfume"
        ],
        sizes: ["50ml", "100ml"],
        brand: "Sweet Scents",
        category: "Gourmand",
        rating: 4.7,
        numReviews: 9
    }
];

const reviews = [
    {
        rating: 5,
        comment: "Absolutely love this fragrance! It's perfect for summer days.",
        user: "Sarah Johnson"
    },
    {
        rating: 4,
        comment: "Great scent, but the longevity could be better.",
        user: "Mike Smith"
    },
    {
        rating: 5,
        comment: "My new favorite perfume! The vanilla notes are divine.",
        user: "Emma Wilson"
    },
    {
        rating: 4,
        comment: "Nice fresh scent, perfect for daily wear.",
        user: "David Brown"
    },
    {
        rating: 5,
        comment: "The best woody fragrance I've ever tried!",
        user: "Lisa Anderson"
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/perfume-shop');
        console.log('Connected to MongoDB');

        // Clear existing data
        await Product.deleteMany({});
        await Review.deleteMany({});
        console.log('Cleared existing data');

        // Insert products
        const insertedProducts = await Product.insertMany(products);
        console.log('Inserted products');

        // Insert reviews for each product
        for (const product of insertedProducts) {
            const productReviews = reviews.map(review => ({
                ...review,
                product: product._id
            }));
            await Review.insertMany(productReviews);
        }
        console.log('Inserted reviews');

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase(); 