import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
    shippingMethod: "standard",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Delivery Details:", formData);
    // Proceed to payment or confirmation page
  };

  const handleNavigateToPayment = () => {
    // Add form validation if needed before navigation
    navigate("/checkout-payment");
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "1%",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          maxWidth: 600,
          margin: "auto",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Delivery Details
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please fill in your information for delivery.
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Box>

          {/* User Details */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 2, display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Box>

          <Divider sx={{ marginY: 2 }} />

          {/* Shipping Method */}
          <Box sx={{ marginBottom: 3 }}>
            <FormLabel component="legend">Choose Shipping Method</FormLabel>
            <RadioGroup
              name="shippingMethod"
              value={formData.shippingMethod}
              onChange={handleChange}
            >
              <FormControlLabel
                value="standard"
                control={<Radio />}
                label="Standard Shipping (Free, 5-7 business days)"
              />
              <FormControlLabel
                value="express"
                control={<Radio />}
                label="Express Shipping ($10.99, 2-3 business days)"
              />
              <FormControlLabel
                value="overnight"
                control={<Radio />}
                label="Overnight Shipping ($24.99, next day delivery)"
              />
            </RadioGroup>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleNavigateToPayment}
          >
            Continue to Payment
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CheckoutPage;
