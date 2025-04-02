import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  TextField,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const CartItem = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
}));

const CartItemContent = styled(CardContent)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

// Mock data - replace with actual cart state management
const mockCartItems = [
  {
    id: 1,
    name: 'Luxury Rose',
    price: 99.99,
    image: 'https://source.unsplash.com/random/200x200?perfume',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Ocean Breeze',
    price: 89.99,
    image: 'https://source.unsplash.com/random/200x200?fragrance',
    quantity: 2,
  },
];

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(mockCartItems);

  const handleQuantityChange = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <CartItem key={item.id}>
                <CardMedia
                  component="img"
                  sx={{ width: 140 }}
                  image={item.image}
                  alt={item.name}
                />
                <CartItemContent>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body1" color="primary">
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        size="small"
                        sx={{ width: 60, mx: 1 }}
                        inputProps={{ readOnly: true }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CartItemContent>
              </CartItem>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ my: 2 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography>Subtotal</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>${calculateSubtotal().toFixed(2)}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography>Shipping</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>Free</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h6">Total</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">
                      ${calculateSubtotal().toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleCheckout}
                  sx={{ mt: 2 }}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Cart; 