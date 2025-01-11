import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  item: number;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, price }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/item-page");
  };

  return (
    <Card
      sx={{
        borderRadius: 2, // Subtle curvature for modern design
        boxShadow: 1, // Minimal shadow for depth
        overflow: "hidden", // Ensures the image stays within bounds
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s", // Smooth hover effect
        "&:hover": {
          transform: "scale(1.03)", // Slight zoom on hover
          boxShadow: 3,
        },
      }}
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        image={`https://via.placeholder.com/300x300?text=Item+${item}`}
        alt={`Item ${item}`}
        sx={{ aspectRatio: "1 / 1", backgroundColor: "#f5f5f5" }} // Ensures a square image
      />

      {/* Product Details */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Item {item}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
