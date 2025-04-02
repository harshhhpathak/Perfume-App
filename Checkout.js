import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const steps = ['Shipping Address', 'Payment Details', 'Review Order'];

// Mock data - replace with actual cart state management
const mockCartItems = [
  {
    id: 1,
    name: 'Luxury Rose',
    price: 99.99,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Ocean Breeze',
    price: 89.99,
    quantity: 2,
  },
];

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const calculateTotal = () => {
    return mockCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address line 1"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address line 2"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="State/Province/Region"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Zip / Postal code"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Name on card"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Card number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Expiry date"
                name="expDate"
                value={formData.expDate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="CVV"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
            {mockCartItems.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography>
                      {item.name} x {item.quantity}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="h6">Total</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">${calculateTotal().toFixed(2)}</Typography>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <FormSection>{getStepContent(activeStep)}</FormSection>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
            >
              {activeStep === steps.length - 2 ? 'Place Order' : 'Next'}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              {mockCartItems.map((item) => (
                <Box key={item.id} sx={{ mb: 2 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography>
                        {item.name} x {item.quantity}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">Total</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">${calculateTotal().toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Checkout; 