import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Box,
    Button,
    Paper,
    useTheme
} from '@mui/material';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <Box>
            {/* Hero Banner */}
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    mb: 4,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: 'url(https://source.unsplash.com/random?perfume)',
                    height: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.3)',
                    }}
                />
                <Container
                    sx={{
                        position: 'relative',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h2" component="h1" gutterBottom>
                        Discover Your Signature Scent
                    </Typography>
                    <Typography variant="h5" paragraph>
                        Explore our collection of premium fragrances
                    </Typography>
                    <Button
                        component={Link}
                        to="/products"
                        variant="contained"
                        size="large"
                        sx={{ mt: 4 }}
                    >
                        Shop Now
                    </Button>
                </Container>
            </Paper>

            {/* Featured Products */}
            <Container>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
                    Featured Products
                </Typography>
                <Grid container spacing={4}>
                    {products.slice(0, 4).map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={3}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default HomePage; 