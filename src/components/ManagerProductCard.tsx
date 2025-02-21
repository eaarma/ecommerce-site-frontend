import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Item } from "../config/Types";

interface ProductCardProps {
  item: Item;
}

const ManagerProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/manager-item-page", { state: { item } });
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
      <CardMedia
        component="img"
        image={
          item.imageUrl ||
          `https://via.placeholder.com/300x300?text=${item.name}`
        }
        alt={item.name}
        sx={{ aspectRatio: "1 / 1", backgroundColor: "#f5f5f5" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          {item.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ${item.price.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ManagerProductCard;
