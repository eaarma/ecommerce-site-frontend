import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addItem } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

const ItemPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const item = location.state?.item; // Retrieve item from navigation state

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  if (!item) {
    return (
      <Box sx={{ textAlign: "center", padding: 5 }}>
        <Typography variant="h6">No item found.</Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    );
  }

  const {
    id,
    name,
    price,
    description,
    imageUrl,
    colors,
    stock,
    width,
    length,
    height,
    trait1,
    trait2,
    trait3,
    trait4,
    trait5,
    category,
    shopId,
  } = item;

  const traits = [trait1, trait2, trait3, trait4, trait5].filter(Boolean); // Remove null/undefined traits

  // Ensure colors is correctly parsed from JSON if needed
  const availableColors: string[] =
    typeof colors === "string" ? JSON.parse(colors) : colors || [];

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value > stock) {
      setError(`Only ${stock} items left`);
    } else {
      setError(""); // Clear error if within stock
    }

    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (quantity > stock) {
      alert(`Only ${stock} items left`); // Show alert if exceeding stock
      return;
    }

    // Build the new cart item
    const newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      shopId: item.shopId,
      // Use selectedColor or default to the first available color
      color:
        selectedColor || (availableColors.length > 0 ? availableColors[0] : ""),
      quantity,
      uniqueKey: uuidv4(), // Generate a unique key for this cart entry
      stockLeft: stock,
    };

    if (!newItem.id || !newItem.name) {
      console.error("Invalid item data:", newItem);
      return;
    }

    // Dispatch the addItem action to update Redux state.
    dispatch(addItem(newItem));

    // Show popup notification
    setSnackbarMessage(`${quantity}x ${item.name} added to cart`);
    setSnackbarOpen(true);
    // For debugging, you might log a success message.
    console.log("Item added to cart:", newItem);
  };

  const handleBuyNow = () => {
    if (quantity > stock) {
      alert(`Only ${stock} items left`); // Prevent navigation if stock exceeded
      return;
    }

    handleAddToCart();
    navigate("/cart");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginX: "10%",
      }}
    >
      {/* Back Button */}
      <Button
        variant="outlined"
        sx={{ marginBottom: 4, marginTop: 4, padding: 2 }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      {/* Main Item Layout */}
      <Paper
        elevation={3}
        sx={{ display: "flex", flexWrap: "wrap", padding: 5, gap: 3 }}
      >
        {/* Left Section: Image */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "1 1 30%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "400px",
              height: "400px",
              backgroundColor: "#f5f5f5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <img
              src={imageUrl}
              alt={name}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
        </Box>

        {/* Right Section: Details */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "1 1 65%" },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Item Title */}
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "left", marginLeft: "1%" }}
          >
            {name}
          </Typography>

          {/* Price */}
          <Typography
            variant="h5"
            color="primary"
            sx={{ textAlign: "left", marginLeft: "1%" }}
          >
            {price}
          </Typography>

          {/* Category */}
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "left", marginLeft: "1%" }}
          >
            Category: {category}
          </Typography>

          {/* Options */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {/* Quantity Input */}
            <TextField
              label="Quantity"
              type="number"
              inputProps={{ min: 1, max: stock }}
              fullWidth
              value={quantity}
              onChange={handleQuantityChange}
              error={!!error}
              helperText={error}
            />

            {/* Color Selection Dropdown */}
            <TextField
              select
              label="Color"
              fullWidth
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              {availableColors.length > 0 ? (
                availableColors.map((clr, idx) => (
                  <MenuItem key={idx} value={clr}>
                    {clr}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  No colors available
                </MenuItem>
              )}
            </TextField>
          </Box>

          <Box
            sx={{
              marginTop: 2,
              textAlign: "left",
              width: "100%",
              paddingLeft: "1.5rem",
            }}
          >
            <Typography variant="body2">{`Size: ${width}x${length}x${height} (width * length * height cm)`}</Typography>
          </Box>

          {/* Traits */}
          <Box sx={{ marginTop: 2, textAlign: "left", width: "100%" }}>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {traits.map((trait, index) => (
                <li key={index}>
                  <Typography variant="body2">{trait}</Typography>
                </li>
              ))}
            </ul>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ marginY: 2 }} />

          <Typography
            variant="body1"
            sx={{
              marginLeft: "2%",
              marginRight: "2%",
              textAlign: "left",
              marginBottom: "3%",
            }}
          >
            {description}
          </Typography>
        </Box>
      </Paper>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Closes after 3 seconds
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ItemPage;
