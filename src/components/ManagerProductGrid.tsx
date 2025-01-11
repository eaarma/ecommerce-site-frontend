import React from "react";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2"; // Grid2 from MUI lab
import ManagerProductCard from "./ManagerProductCard"; // Adjust the import path

const ManagerProductGrid: React.FC = () => {
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
      <Grid2
        container
        spacing={5}
        justifyContent="center" // Centers the entire grid horizontally
        alignItems="center" // Centers the items vertically
      >
        {[...Array(12).keys()].map((item) => (
          <Grid2 key={item} sx={{ display: "flex", justifyContent: "center" }}>
            <ManagerProductCard
              item={item}
              price={`$${((item + 1) * 12).toFixed(2)}`}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default ManagerProductGrid;
