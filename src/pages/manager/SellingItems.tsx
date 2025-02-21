import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ManagerProductGrid from "../../components/ManagerProductGrid";
import { useNavigate } from "react-router-dom";
import { Item } from "../../config/Types";

interface SoldItemsProps {
  items: Item[]; // Adjust the type to match your data structure
}

const SellingItems: React.FC<SoldItemsProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleAddNewClick = () => {
    navigate("/add-item-page");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        marginLeft: "5%",
        marginRight: "5%",
      }}
    >
      {/* On Sale Title */}
      <Typography
        variant="h4"
        sx={{
          color: "black",
          alignSelf: "flex-start", // Align to the start (left) of the Box
          textAlign: "left",
        }}
      >
        On Sale
      </Typography>
      {/* Add new Button */}
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "#007BFF", // Primary color for noticeability
          color: "white", // White text for contrast
          fontWeight: "bold", // Emphasize the button text
          borderRadius: "8px", // Rounded corners for a professional look
          padding: "10px 20px", // Add padding for better appearance
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          ":hover": {
            backgroundColor: "#0056b3", // Darker shade on hover
            boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.15)", // Enhanced shadow on hover
          },
        }}
        onClick={() => handleAddNewClick()}
      >
        Add New Item
      </Button>
      {/* Sold items */}

      <Box sx={{ justifyContent: "center", marginTop: 3, width: "100%" }}>
        <ManagerProductGrid items={items} />
      </Box>
    </Box>
  );
};

export default SellingItems;
