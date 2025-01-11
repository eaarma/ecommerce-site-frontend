import React from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ManagerItemPage: React.FC = () => {
  const mockFeatures = [
    "Material: Clay",
    "Available Colors: Blue, Black, Red",
    "Handmade",
    "Sizes from 20cm-40cm",
  ];

  const mockOptions = [
    { label: "Amount", type: "number", defaultValue: 1 },
    { label: "Color", type: "select", options: ["Blue", "Black", "Red"] },
    { label: "Size", type: "select", options: ["20cm", "30cm", "40cm"] },
  ];
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/edit-item-page");
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: "10%",
        marginRight: "10%",
      }}
    >
      {/* Back Button */}
      <Button
        variant="outlined"
        sx={{
          marginBottom: 4,
          marginTop: 4,
          padding: 2,
          alignSelf: "flex-start",
        }}
        onClick={() => handleBackClick()}
      >
        Back
      </Button>

      {/* Main Item Layout */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          padding: 5,
          gap: 3,
        }}
      >
        {/* Left Section: Image */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "1 1 30%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "400px",
              height: "400px",
              backgroundColor: "#f5f5f5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <img
              src="/src/assets/vases2.jpg"
              alt="Product"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>

        {/* Right Section: Details */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "1 1 65%" },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Title with Edit Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: "1%",
              marginRight: "1%",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", textAlign: "left" }}
            >
              Product Title
            </Typography>
            <Button
              sx={{ marginRight: "5%", padding: 2 }}
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleEditClick()}
              startIcon={<span className="material-icons">edit</span>} // Replace with an icon if available
            >
              Edit
            </Button>
          </Box>

          {/* Price */}
          <Typography
            variant="h5"
            color="primary"
            sx={{ textAlign: "left", marginLeft: "1%" }}
          >
            $99.99
          </Typography>

          {/* Options (Disabled) */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {mockOptions.map((option, index) => (
              <Box key={index} sx={{ minWidth: "150px" }}>
                {option.type === "select" ? (
                  <TextField
                    select
                    label={option.label}
                    fullWidth
                    defaultValue={option.options?.[0]}
                    disabled
                  >
                    {option.options?.map((opt, idx) => (
                      <MenuItem key={idx} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    label={option.label}
                    type={option.type}
                    fullWidth
                    defaultValue={option.defaultValue}
                    disabled
                  />
                )}
              </Box>
            ))}
          </Box>

          {/* Features */}
          <Box sx={{ marginTop: 2, textAlign: "left", width: "100%" }}>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {mockFeatures.map((feature, index) => (
                <li key={index}>
                  <Typography variant="body2">{feature}</Typography>
                </li>
              ))}
            </ul>
          </Box>

          {/* Divider */}
          <Divider sx={{ marginY: 2 }} />

          <Typography
            variant="body1"
            sx={{
              marginLeft: "2%",
              marginRight: "2%",
              textAlign: "left",
              marginBottom: "3%",
            }}
          >
            This is a detailed description of the product. It provides
            information about the item's usage, design, and any additional
            details that the manager might need to review.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ManagerItemPage;
