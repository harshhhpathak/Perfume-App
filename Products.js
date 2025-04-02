import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const FilterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  display: 'flex',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
}));

// Mock data - replace with API call
const mockProducts = [
  {
    id: 1,
    name: 'Luxury Rose',
    description: 'A delicate blend of rose petals and vanilla',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&auto=format&fit=crop&q=60',
    price: '$99.99',
    category: 'Floral',
  },
  {
    id: 2,
    name: 'Ocean Breeze',
    description: 'Fresh and invigorating marine scent',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&auto=format&fit=crop&q=60',
    price: '$89.99',
    category: 'Fresh',
  },
  {
    id: 3,
    name: 'Midnight Mystery',
    description: 'Deep and mysterious oriental fragrance',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&auto=format&fit=crop&q=60',
    price: '$109.99',
    category: 'Oriental',
  },
  {
    id: 4,
    name: 'Spring Blossom',
    description: 'Light and floral spring fragrance',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&auto=format&fit=crop&q=60',
    price: '$79.99',
    category: 'Floral',
  },
  {
    id: 5,
    name: 'Autumn Spice',
    description: 'Warm and cozy autumn scent',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&auto=format&fit=crop&q=60',
    price: '$94.99',
    category: 'Oriental',
  },
  {
    id: 6,
    name: 'Summer Citrus',
    description: 'Bright and refreshing citrus blend',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&auto=format&fit=crop&q=60',
    price: '$84.99',
    category: 'Fresh',
  },
  {
    id: 7,
    name: 'Vanilla Dreams',
    description: 'Sweet and comforting vanilla fragrance',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&auto=format&fit=crop&q=60',
    price: '$89.99',
    category: 'Oriental',
  },
  {
    id: 8,
    name: 'Lavender Fields',
    description: 'Calming lavender and herbs',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&auto=format&fit=crop&q=60',
    price: '$74.99',
    category: 'Floral',
  },
  {
    id: 9,
    name: 'Mountain Air',
    description: 'Crisp and clean mountain breeze',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&auto=format&fit=crop&q=60',
    price: '$79.99',
    category: 'Fresh',
  }
];

function Products() {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    // Filter products based on search term and category
    const filteredProducts = mockProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });
    setProducts(filteredProducts);
  }, [searchTerm, category]);

  const categories = ['all', 'Floral', 'Fresh', 'Oriental'];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Our Products
      </Typography>

      <FilterSection>
        <TextField
          label="Search products"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FilterSection>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard>
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
            </ProductCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Products; 