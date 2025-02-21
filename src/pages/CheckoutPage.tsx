import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateDeliveryDetails } from "../redux/deliverySlice";
import BackButton from "../components/BackButton";
import SmartPostWidget from "../components/SmartPostWidget";
import DPDWidget from "../components/DPDWidget";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deliveryDetails = useSelector((state: RootState) => state.delivery);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateDeliveryDetails({ [e.target.name]: e.target.value }));
    // Clear the error when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Check for empty fields
    Object.entries(deliveryDetails).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "This field is required";
      }
    });

    // Email validation
    if (
      deliveryDetails.email &&
      !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(deliveryDetails.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone number validation (only digits, min 7 and max 15 digits)
    if (
      deliveryDetails.phoneNumber &&
      !/^\d{7,15}$/.test(deliveryDetails.phoneNumber)
    ) {
      newErrors.phoneNumber = "Enter a valid phone number (7-15 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNavigateToPayment = () => {
    if (validateForm()) {
      navigate("/checkout-payment");
    }
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
      <BackButton />
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
        <form>
          {/* first name Field */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={deliveryDetails.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Box>

          {/* Email Field */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={deliveryDetails.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
          </Box>

          {/* User Details */}

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={deliveryDetails.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={deliveryDetails.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 2, display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={deliveryDetails.country}
              onChange={handleChange}
              error={!!errors.country}
              helperText={errors.country}
              required
            />
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={deliveryDetails.postalCode}
              onChange={handleChange}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={deliveryDetails.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              required
            />
          </Box>

          <Divider sx={{ marginY: 2 }} />

          {/* Shipping Method Selection */}
          <Box sx={{ marginBottom: 3, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Choose Parcel Locker Service
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant={
                  selectedMethod === "smartpost" ? "contained" : "outlined"
                }
                onClick={() => setSelectedMethod("smartpost")}
                sx={{ width: "150px", height: "100px" }}
              >
                SmartPost
              </Button>
              <Button
                variant={selectedMethod === "dpd" ? "contained" : "outlined"}
                onClick={() => setSelectedMethod("dpd")}
                sx={{ width: "150px", height: "100px" }}
              >
                DPD
              </Button>
            </Box>
          </Box>

          {/* Expand Widgets Based on Selection */}
          {selectedMethod === "smartpost" && <SmartPostWidget />}
          {selectedMethod === "dpd" && <DPDWidget />}

          {/* Submit Button */}
          <Button
            type="button"
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
