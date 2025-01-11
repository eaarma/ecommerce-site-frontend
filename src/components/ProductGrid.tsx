import React from "react";
import Grid2 from "@mui/material/Grid2"; // Import Grid2
import ProductCard from "./ProductCard"; // Assuming ProductCard is in the same directory
import { Box } from "@mui/material";

const ProductGrid: React.FC = () => {
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
      <Grid2
        container
        spacing={5}
        justifyContent="center" // Centers the entire grid horizontally
        alignItems="center" // Centers the items vertically
      >
        {[...Array(12).keys()].map((item) => (
          <Grid2 key={item} sx={{ display: "flex", justifyContent: "center" }}>
            <ProductCard
              item={item}
              price={`$${((item + 1) * 12).toFixed(2)}`}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default ProductGrid;
