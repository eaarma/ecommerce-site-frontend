import React from "react";
import Grid2 from "@mui/material/Grid2"; // Import Grid2
import ProductCard from "./ProductCard"; // Assuming ProductCard is in the same directory
import { Box } from "@mui/material";
import { Item } from "../config/Types";

interface ProductGridProps {
  items: Item[]; // Accept filtered items
}

const ProductGrid: React.FC<ProductGridProps> = ({ items }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingTop: 4,
      }}
    >
      <Grid2 container spacing={5} justifyContent="center" alignItems="center">
        {items.map((item) => (
          <Grid2
            key={item.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ProductCard item={item} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default ProductGrid;
