import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Item } from "../config/Types";

interface ProductCardProps {
  item: Item;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const {
    id,
    name,
    price,
    imageUrl,
    trait1,
    trait2,
    trait3,
    trait4,
    trait5,
    category,
  } = item;
  const navigate = useNavigate();

  // Combine all traits into an array
  const traits = [trait1, trait2, trait3, trait4, trait5].filter(
    (trait) => trait // Exclude undefined/null traits
  );

  const handleCardClick = () => {
    navigate("/item-page", { state: { item: item } });
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 1,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 3,
        },
      }}
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        image={
          imageUrl || `https://via.placeholder.com/300x300?text=Item+${id}`
        }
        alt={`Item ${id}`}
        sx={{ aspectRatio: "1 / 1", backgroundColor: "#f5f5f5" }}
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
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {price}
        </Typography>

        {/* Optional Traits Display */}
        {traits.length > 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, textAlign: "center" }}
          >
            Traits: {traits.join(", ")}
          </Typography>
        )}

        {/* Optional Category Display */}
        {category && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Category: {category}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
