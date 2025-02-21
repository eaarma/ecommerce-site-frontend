import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Paper, Typography, Divider } from "@mui/material";
import { OrderItemType } from "../../config/Types";
// Adjust import path as needed

const OrderItemPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order: OrderItemType | undefined = location.state?.item;

  if (!order) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6" color="error">
          No order details available.
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 5, padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Sale Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1">
          <strong>Item Name:</strong> {order.name}
        </Typography>
        <Typography variant="body1">
          <strong>Sold Price:</strong> ${order.soldPrice.toFixed(2)}
        </Typography>
        <Typography variant="body1">
          <strong>Quantity Sold:</strong> {order.quantitySold}
        </Typography>
        <Typography variant="body1">
          <strong>Sale Date:</strong>{" "}
          {new Date(order.saleDate).toLocaleString()}
        </Typography>
        <Typography variant="body1">
          <strong>Buyer ID:</strong> {order.buyerId}
        </Typography>
        <Typography variant="body1">
          <strong>Shop ID:</strong> {order.shopId}
        </Typography>
        <Typography variant="body1" color="success.main">
          <strong>Profit:</strong> ${order.profit.toFixed(2)}
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 3, width: "100%" }}
          onClick={() => navigate(-1)}
        >
          Back to Orders
        </Button>
      </Paper>
    </Box>
  );
};

export default OrderItemPage;
