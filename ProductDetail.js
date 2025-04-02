import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Rating,
  Divider,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';

const ProductImage = styled('img')({
  width: '100%',
  height: 'auto',
  maxHeight: '500px',
  objectFit: 'cover',
  borderRadius: '8px',
});

const ProductInfo = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

// Mock data - replace with API call
const mockProduct = {
  id: 1,
  name: 'Luxury Rose',
  description: 'A delicate blend of rose petals and vanilla',
  longDescription: 'Experience the essence of luxury with our signature rose fragrance. This exquisite perfume combines the delicate sweetness of Bulgarian rose petals with warm vanilla notes, creating a sophisticated and timeless scent that lingers throughout the day. Perfect for special occasions and everyday elegance.',
  image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&auto=format&fit=crop&q=60',
  price: '$99.99',
  category: 'Floral',
  rating: 4.5,
  reviews: 128,
  volume: '100ml',
  ingredients: [
    'Bulgarian Rose',
    'Vanilla Bean',
    'Bergamot',
    'Musk',
    'Amber',
    'Patchouli'
  ],
  features: [
    'Long-lasting fragrance',
    'Alcohol-free formula',
    'Suitable for all skin types',
    'Eco-friendly packaging'
  ],
  usage: 'Apply to pulse points for best results. Can be layered with matching body lotion for enhanced longevity.',
  storage: 'Store in a cool, dry place away from direct sunlight.'
};

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(mockProduct);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch product details from API using id
    // For now, using mock data
    setProduct(mockProduct);
  }, [id]);

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log(`Adding ${quantity} of ${product.name} to cart`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ProductImage src={product.image} alt={product.name} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductInfo>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviews} reviews)
              </Typography>
            </Box>
            <Typography variant="h5" color="primary" gutterBottom>
              {product.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.longDescription}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Volume: {product.volume}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Ingredients:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              {product.ingredients.map((ingredient, index) => (
                <Typography component="li" key={index} variant="body2">
                  {ingredient}
                </Typography>
              ))}
            </Box>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Features:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              {product.features.map((feature, index) => (
                <Typography component="li" key={index} variant="body2">
                  {feature}
                </Typography>
              ))}
            </Box>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Usage:
            </Typography>
            <Typography variant="body2" paragraph>
              {product.usage}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Storage:
            </Typography>
            <Typography variant="body2" paragraph>
              {product.storage}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                fullWidth
              >
                Add to Cart
              </Button>
            </Box>
          </ProductInfo>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail; 