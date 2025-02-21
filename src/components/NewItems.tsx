import { Box, Typography } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";
import { Item } from "../config/Types";

interface NewItemsProps {
  items: Item[];
}

const NewItems: React.FC<NewItemsProps> = ({ items }) => {
  return (
    <Box sx={{ px: 2, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "left", mt: 4 }}>
        New Items
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          gap: 4,
          padding: 2,
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "4px",
          },
        }}
      >
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              minWidth: "20%",
            }}
          >
            <ProductCard item={item} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default NewItems;
