import React from "react";
import { Box, Typography, Select, MenuItem, Button } from "@mui/material";
import ProductGrid from "../components/ProductGrid";

const ItemsPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        px: 2,
        py: 4,
        margin: "0 10%",
        paddingBottom: "5%",
      }}
    >
      {/* Sorting Menu - Left Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", sm: "25%", marginTop: "5%" }, // Responsive: Full width on small screens
          pr: 2,
          borderRight: "1px solid #ddd", // Separator line
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Sort By
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Size</Typography>
          <Select fullWidth defaultValue="">
            <MenuItem value="">All Sizes</MenuItem>
            <MenuItem value="S">Small</MenuItem>
            <MenuItem value="M">Medium</MenuItem>
            <MenuItem value="L">Large</MenuItem>
          </Select>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Color</Typography>
          <Select fullWidth defaultValue="">
            <MenuItem value="">All Colors</MenuItem>
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="green">Green</MenuItem>
          </Select>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Price</Typography>
          <Select fullWidth defaultValue="">
            <MenuItem value="">All Prices</MenuItem>
            <MenuItem value="low">Low to High</MenuItem>
            <MenuItem value="high">High to Low</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Main Content - Product Area */}
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        {/* Horizontal Menu */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            mb: 4,
            mr: "10%",
            borderBottom: "1px solid #ddd", // Separator line
            ml: "2%",
            pb: 2,
          }}
        >
          {["New", "All", "Art", "Handcrafts"].map((category) => (
            <Button key={category} variant="text">
              {category}
            </Button>
          ))}
        </Box>

        {/* Product Grid */}
        <ProductGrid />
      </Box>
    </Box>
  );
};

export default ItemsPage;
