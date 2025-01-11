import { Box, Typography, Button } from "@mui/material";
import React from "react";

const FeaturedProduct: React.FC = () => {
  return (
    <Box
      sx={{
        maxWidth: "80%",
        marginTop: 8,
        marginBottom: "5%",
        borderRadius: "2%", // Rounded corners
        boxShadow: 4, // Subtle shadow for depth
        backgroundColor: "#fff", // Card background color
        overflow: "hidden", // Clip overflow for rounded corners
        display: "flex", // Flex container for layout
        flexDirection: { xs: "column", md: "row" }, // Responsive layout
        mx: 2,
      }}
    >
      {/* Product Image */}
      <Box
        component="img"
        src="https://via.placeholder.com/400x300?text=Product"
        alt="Product"
        sx={{
          flex: 1,
          width: "100%",
          objectFit: "cover",
          borderRadius: { xs: "2% 2% 0 0", md: "2% 0 0 2%" }, // Rounded corners
        }}
      />

      {/* Product Details */}
      <Box
        sx={{
          flex: 1,
          padding: { xs: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: "black", mt: 3 }}
        >
          Featured Product
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mt: 3 }}>
          This is a description of the featured product. It includes its main
          benefits and why customers should consider purchasing it.
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#47b1de", mt: 3 }}
        >
          $49.99
        </Typography>
        <Button
          variant="contained"
          sx={{
            alignSelf: "center",
            mt: 3, // Aligns button to the left
            backgroundColor: "#47b1de",
            color: "#fff",
            borderRadius: "20px", // Rounded button
            paddingX: 3, // Horizontal padding
            "&:hover": {
              backgroundColor: "#3a9dbe", // Darker shade on hover
            },
          }}
        >
          Buy
        </Button>
      </Box>
    </Box>
  );
};

export default FeaturedProduct;
