import React from "react";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2"; // Grid2 from MUI lab
import ManagerProductCard from "./ManagerProductCard"; // Adjust the import path
import { Item } from "../config/Types";

interface ItemsProps {
  items: Item[]; // Adjust the type to match your data structure
}

const ManagerProductGrid: React.FC<ItemsProps> = ({ items }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 2,
      }}
    >
      <Grid2 container spacing={5} justifyContent="center" alignItems="center">
        {items.map((item) => (
          <Grid2
            key={item.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ManagerProductCard item={item} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default ManagerProductGrid;
