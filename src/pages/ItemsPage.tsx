import React, { useEffect, useState } from "react";
import { Box, Typography, Select, MenuItem, Button } from "@mui/material";
import ProductGrid from "../components/ProductGrid";
import apiClient from "../api/apiClient";
import { Item } from "../config/Types";

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  // State for filters
  const [color, setColor] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("All");

  useEffect(() => {
    apiClient
      .get<Item[]>("/items")
      .then((response: { data: Item[] }) => {
        setItems(response.data);
        setFilteredItems(response.data); // Initialize filteredItems
      })
      .catch((err: Error) => setError(err.message));
  }, []);

  // Filter items whenever filters change
  useEffect(() => {
    let filtered = [...items];

    if (color) {
      filtered = filtered.filter(
        (item) => item.color?.toLowerCase() === color.toLowerCase()
      );
    }

    if (category !== "All") {
      filtered = filtered.filter(
        (item) => item.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (price === "low") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (price === "high") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredItems(filtered);
  }, [color, price, category, items]);

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
          width: { xs: "100%", sm: "25%", marginTop: "5%" },
          pr: 2,
          borderRight: "1px solid #ddd",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Sort By
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Color</Typography>
          <Select
            fullWidth
            value={color || ""} // Make sure to handle undefined or empty values correctly
            onChange={(e) => setColor(e.target.value)}
            displayEmpty
            sx={{
              color: "black", // This ensures that the selected option's text is black
              backgroundColor: "white", // Background color
              "& .MuiSelect-icon": {
                color: "black", // Icon color for visibility
              },
              "& .MuiMenuItem-root": {
                color: "black", // Menu item text color
              },

              "& .MuiInputBase-input": {
                color: "black", // Ensures that the selected option's text is black
              },

              // Ensure that the placeholder is styled correctly
              "& .MuiSelect-placeholder": {
                color: "black", // Placeholder text color
              },
              "& .MuiInputLabel-root": {
                color: "black", // Label text color (if needed)
              },
            }}
          >
            <MenuItem value="">All Colors</MenuItem>
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="green">Green</MenuItem>
          </Select>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Price</Typography>
          <Select
            fullWidth
            value={price || ""} // Ensure that price is handled the same way
            onChange={(e) => setPrice(e.target.value)}
            displayEmpty
            sx={{
              color: "black", // This ensures that the selected option's text is black
              backgroundColor: "white", // Background color
              "& .MuiSelect-icon": {
                color: "black", // Icon color for visibility
              },
              "& .MuiMenuItem-root": {
                color: "black", // Menu item text color
              },

              "& .MuiInputBase-input": {
                color: "black", // Ensures that the selected option's text is black
              },

              // Ensure that the placeholder is styled correctly
              "& .MuiSelect-placeholder": {
                color: "black", // Placeholder text color
              },
              "& .MuiInputLabel-root": {
                color: "black", // Label text color (if needed)
              },
            }}
          >
            <MenuItem value="">All Prices</MenuItem>
            <MenuItem value="low">Low to High</MenuItem>
            <MenuItem value="high">High to Low</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Main Content - Product Area */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Horizontal Menu */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            mb: 4,
            mr: "10%",
            borderBottom: "1px solid #ddd",
            ml: "2%",
            pb: 2,
          }}
        >
          {["All", "Art", "Handcrafts"].map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "contained" : "text"}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </Box>

        {/* Product Grid */}
        <ProductGrid items={filteredItems} />
      </Box>
    </Box>
  );
};

export default ItemsPage;
