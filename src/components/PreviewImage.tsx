import { Box, Button } from "@mui/material";
import React from "react";
import backGroundImage from "/src/assets/vases2.jpg";
import { Link } from "react-router-dom";

const PreviewImage: React.FC = () => {
  return (
    <div>
      <Box
        sx={{
          position: "relative",
          height: "40vh",
          backgroundImage: `url(${backGroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/items"
          sx={{
            px: 4,
            py: 2,
            fontSize: "1.5rem",
            textTransform: "uppercase",
            borderRadius: 2,
          }}
        >
          Shop
        </Button>
      </Box>
    </div>
  );
};

export default PreviewImage;
