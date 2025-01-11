import { Box, Typography } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";

const NewItems: React.FC = () => {
  return (
    <div>
      <Box sx={{ px: 2, textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: "left", mt: 4 }}>
          New Items
        </Typography>
        {/* Scrollable container for items */}
        <Box
          sx={{
            display: "flex", // Flexbox layout
            flexDirection: "row", // Horizontal alignment
            overflowX: "auto", // Enable horizontal scrolling
            gap: 4, // Add space between items
            padding: 2, // Padding inside the scrollable container
            "&::-webkit-scrollbar": {
              height: "8px", // Custom scrollbar height
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888", // Scrollbar color
              color: "#999",
              borderRadius: "4px",
            },
          }}
        >
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Box
              key={index}
              sx={{
                minWidth: "20%", // Minimum width for each card
                //flex: "0 0 auto", // Prevent shrinking and ensure cards stay the same size
              }}
            >
              <ProductCard item={item} price={`$${(index + 1) * 10}`} />
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default NewItems;
