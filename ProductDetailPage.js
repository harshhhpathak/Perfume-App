import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Box,
    Button,
    Rating,
    TextField,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newReview, setNewReview] = useState({
        rating: 0,
        comment: '',
        user: 'Anonymous'
    });
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/reviews/product/${id}`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, [id]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href
            });
        } else {
            setOpenDialog(true);
        }
    };

    const handleSubmitReview = async () => {
        try {
            await axios.post(`http://localhost:5000/api/reviews/product/${id}`, newReview);
            const response = await axios.get(`http://localhost:5000/api/reviews/product/${id}`);
            setReviews(response.data);
            setNewReview({ rating: 0, comment: '', user: 'Anonymous' });
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    if (!product) return <Typography>Loading...</Typography>;

    return (
        <Container sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* Product Images */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ position: 'relative' }}>
                        <img
                            src={product.images[selectedImage]}
                            alt={product.name}
                            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                        />
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${product.name} ${index + 1}`}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        border: selectedImage === index ? '2px solid #1976d2' : 'none'
                                    }}
                                    onClick={() => setSelectedImage(index)}
                                />
                            ))}
                        </Box>
                    </Box>
                </Grid>

                {/* Product Info */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={product.rating} precision={0.5} readOnly />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({product.numReviews} reviews)
                        </Typography>
                    </Box>
                    <Typography variant="h5" color="primary" gutterBottom>
                        ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {product.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Available Sizes:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {product.sizes.map((size, index) => (
                                <Button key={index} variant="outlined">
                                    {size}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="contained" color="primary" size="large">
                            Add to Cart
                        </Button>
                        <IconButton onClick={handleShare} color="primary">
                            <ShareIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>

            {/* Reviews Section */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Reviews
                </Typography>
                <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Write a Review
                    </Typography>
                    <Rating
                        value={newReview.rating}
                        onChange={(event, newValue) => {
                            setNewReview({ ...newReview, rating: newValue });
                        }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Write your review..."
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        sx={{ mt: 2 }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSubmitReview}
                        sx={{ mt: 2 }}
                    >
                        Submit Review
                    </Button>
                </Paper>

                <List>
                    {reviews.map((review, index) => (
                        <React.Fragment key={review._id}>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="subtitle1">
                                                {review.user}
                                            </Typography>
                                            <Rating value={review.rating} readOnly size="small" sx={{ ml: 1 }} />
                                        </Box>
                                    }
                                    secondary={
                                        <>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {review.comment}
                                            </Typography>
                                            <Typography variant="caption" display="block" color="text.secondary">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                            {index < reviews.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </Box>

            {/* Share Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Share Product</DialogTitle>
                <DialogContent>
                    <Typography>
                        Copy this link to share:
                    </Typography>
                    <TextField
                        fullWidth
                        value={window.location.href}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProductDetailPage; 