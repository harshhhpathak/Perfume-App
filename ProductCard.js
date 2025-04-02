import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Rating,
    CardActionArea,
    CardActions,
    Button
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.shadows[8],
    },
}));

const ProductCard = ({ product }) => {
    return (
        <StyledCard>
            <CardActionArea component={Link} to={`/product/${product._id}`}>
                <CardMedia
                    component="img"
                    height="200"
                    image={product.images[0]}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {product.description.substring(0, 100)}...
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating value={product.rating} precision={0.5} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({product.numReviews})
                        </Typography>
                    </Box>
                    <Typography variant="h6" color="primary">
                        ${product.price.toFixed(2)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/product/${product._id}`}
                    fullWidth
                >
                    View Details
                </Button>
            </CardActions>
        </StyledCard>
    );
};

export default ProductCard; 