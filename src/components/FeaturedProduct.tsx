import { Box, Typography, Button } from "@mui/material";
import React from "react";

interface Item {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

interface FeaturedProductProps {
  item: Item;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({ item }) => {
  return (
    <Box
      sx={{
        maxWidth: "80%",
        marginTop: 8,
        marginBottom: "5%",
        borderRadius: "2%",
        boxShadow: 4,
        backgroundColor: "#fff",
        overflow: "hidden",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        mx: 2,
      }}
    >
      <Box
        component="img"
        src={
          item.imageUrl || "https://via.placeholder.com/400x300?text=Product"
        }
        alt={item.name}
        sx={{
          flex: 1,
          width: "100%",
          objectFit: "cover",
          borderRadius: { xs: "2% 2% 0 0", md: "2% 0 0 2%" },
        }}
      />

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
          {item.name}
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mt: 3 }}>
          {item.description || "No description available"}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#47b1de", mt: 3 }}
        >
          ${item.price.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          sx={{
            alignSelf: "center",
            mt: 3,
            backgroundColor: "#47b1de",
            color: "#fff",
            borderRadius: "20px",
            paddingX: 3,
            "&:hover": {
              backgroundColor: "#3a9dbe",
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
