import React from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ItemPage: React.FC = () => {
  const mockFeatures = [
    "Material: Clay",
    "Available Colors: Blue, Black, Red",
    "Handmade",
    "Sizes from 20cm-40cm",
  ];

  const mockOptions = [
    { label: "Amount", type: "number", defaultValue: 1 },
    { label: "Color", type: "select", options: ["Blue", "Black", "Red"] },
    { label: "Size", type: "select", options: ["20cm", "30cm", "40cm"] },
  ];

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: "10%",
        marginRight: "10%",
      }}
    >
      {/* Back Button */}
      <Button
        variant="outlined"
        sx={{
          marginBottom: 4,
          marginTop: 4,
          padding: 2,
          alignSelf: "flex-start",
        }}
        onClick={() => handleBackClick()}
      >
        Back
      </Button>

      {/* Main Item Layout */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexWrap: "wrap", // Allows responsiveness for smaller screens
          padding: 5,
          gap: 3,
        }}
      >
        {/* Left Section: Image */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "1 1 30%" }, // Adapts to screen size
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "400px",
              height: "400px", // Ensure a square layout
              backgroundColor: "#f5f5f5", // Background color for whitespace
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              overflow: "hidden", // Ensures image doesn't overflow
            }}
          >
            <img
              src="/src/assets/vases2.jpg"
              alt="Product"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain", // Ensures the image fits within the square
              }}
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
            Product Title
          </Typography>

          {/* Price */}
          <Typography
            variant="h5"
            color="primary"
            sx={{ textAlign: "left", marginLeft: "1%" }}
          >
            $99.99
          </Typography>

          {/* Options */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {mockOptions.map((option, index) => (
              <Box key={index} sx={{ minWidth: "150px" }}>
                {option.type === "select" ? (
                  <TextField
                    select
                    label={option.label}
                    fullWidth
                    defaultValue={option.options?.[0]}
                  >
                    {option.options?.map((opt, idx) => (
                      <MenuItem key={idx} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    label={option.label}
                    type={option.type}
                    fullWidth
                    defaultValue={option.defaultValue}
                  />
                )}
              </Box>
            ))}
          </Box>
          <Box sx={{ marginTop: 2, textAlign: "left", width: "100%" }}>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {mockFeatures.map((feature, index) => (
                <li key={index}>
                  <Typography variant="body2">{feature}</Typography>
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
              onClick={() => console.log("Buy Now")}
            >
              Buy Now
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => console.log("Add to Cart")}
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
            This is a detailed description of the product. It provides
            information about the item's usage, design, and any additional
            details that the customer might find helpful.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ItemPage;
