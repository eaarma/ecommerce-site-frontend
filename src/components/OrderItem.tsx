import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SalesHistoryItemType } from "../config/Types";

interface SalesHistoryItemProps {
  sale: SalesHistoryItemType;
}

const SalesHistoryItem: React.FC<SalesHistoryItemProps> = ({ sale }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/sales-item-page", { state: { item: sale } });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        display: "flex",
        alignItems: "center",
        gap: 2,
        marginBottom: 2,
        marginTop: 3,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          flexBasis: "20%",
          textAlign: "left",
          marginLeft: "5%",
        }}
      >
        {sale.name}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ flexBasis: "15%", textAlign: "left" }}
      >
        ${sale.soldPrice.toFixed(2)}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ flexBasis: "15%", textAlign: "left" }}
      >
        Quantity: {sale.quantitySold}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ flexBasis: "25%", textAlign: "left" }}
      >
        Sold on: {new Date(sale.saleDate).toLocaleDateString()}
      </Typography>
      <Button
        variant="outlined"
        size="small"
        sx={{ flexBasis: "15%", textAlign: "center" }}
        onClick={handleClick}
      >
        View Details
      </Button>
    </Paper>
  );
};

export default SalesHistoryItem;
