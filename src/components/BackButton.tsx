import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Button
        variant="outlined"
        sx={{
          marginBottom: 2,
          marginTop: 2,
          padding: 2,
          alignSelf: "flex-start",
        }}
        onClick={() => handleBackClick()}
      >
        Back
      </Button>
    </Box>
  );
};

export default BackButton;
