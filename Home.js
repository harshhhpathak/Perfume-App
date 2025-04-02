import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #9c27b0 30%, #f50057 90%)',
  color: 'white',
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(6),
}));

const FeaturedProduct = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const featuredProducts = [
  {
    id: 1,
    name: 'Luxury Rose',
    description: 'A delicate blend of rose petals and vanilla',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&auto=format&fit=crop&q=60',
    price: '$99.99',
  },
  {
    id: 2,
    name: 'Ocean Breeze',
    description: 'Fresh and invigorating marine scent',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&auto=format&fit=crop&q=60',
    price: '$89.99',
  },
  {
    id: 3,
    name: 'Midnight Mystery',
    description: 'Deep and mysterious oriental fragrance',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&auto=format&fit=crop&q=60',
    price: '$109.99',
  },
  {
    id: 4,
    name: 'Spring Blossom',
    description: 'Light and floral spring fragrance',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&auto=format&fit=crop&q=60',
    price: '$79.99',
  },
  {
    id: 5,
    name: 'Autumn Spice',
    description: 'Warm and cozy autumn scent',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&auto=format&fit=crop&q=60',
    price: '$94.99',
  },
  {
    id: 6,
    name: 'Summer Citrus',
    description: 'Bright and refreshing citrus blend',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&auto=format&fit=crop&q=60',
    price: '$84.99',
  }
];

function Home() {
  return (
    <Box>
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Discover Your Signature Scent
          </Typography>
          <Typography variant="h5" paragraph>
            Explore our collection of premium perfumes and find the perfect fragrance for any occasion.
          </Typography>
          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            color="secondary"
            size="large"
          >
            Shop Now
          </Button>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <FeaturedProduct>
                <CardActionArea component={RouterLink} to={`/products/${product.id}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h3">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                      {product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </FeaturedProduct>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home; 