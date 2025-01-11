import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number; // Price per item
}

const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Item 1",
    image: "https://via.placeholder.com/50",
    quantity: 2,
    price: 15,
  },
  {
    id: 2,
    name: "Item 2",
    image: "https://via.placeholder.com/50",
    quantity: 1,
    price: 25,
  },
  {
    id: 3,
    name: "Item 3",
    image: "https://via.placeholder.com/50",
    quantity: 3,
    price: 10,
  },
];

const CartPage: React.FC = () => {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    // Add form validation if needed before navigation
    navigate("/checkout-details");
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
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Typography variant="body1" gutterBottom>
        Review your selected items here before checkout.
      </Typography>

      <Grid container spacing={4}>
        {/* Left Side: Cart Items */}
        <Grid item xs={12} md={9}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
            }}
          >
            {cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 2,
                  marginBottom: 2,
                  borderRadius: 2,
                  backgroundColor: "#ffffff",
                }}
              >
                {/* Item Info */}
                <Box display="flex" alignItems="center" gap={2}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 5,
                      objectFit: "cover",
                    }}
                  />
                  <Box>
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price.toFixed(2)} each
                    </Typography>
                  </Box>
                </Box>

                {/* Quantity Controls */}
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton size="small">
                    <Remove />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton size="small">
                    <Add />
                  </IconButton>
                </Box>

                {/* Item Total */}
                <Box>
                  <Typography>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>

                {/* Remove Button */}
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </Box>
            ))}

            <Divider sx={{ marginY: 2 }} />

            {/* Subtotal Section */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 1,
              }}
            >
              <Typography variant="h6">Subtotal:</Typography>
              <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Grid>
        {/* Right Side: Total and Checkout */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              position: "sticky",
              top: 16,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <Typography variant="body1">Subtotal:</Typography>
              <Typography variant="body1">${totalPrice.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ marginY: 2 }} />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
