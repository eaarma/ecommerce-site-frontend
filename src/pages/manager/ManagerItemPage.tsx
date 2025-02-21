import React from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Item } from "../../config/Types";

const ManagerItemPage: React.FC = () => {
  const location = useLocation();
  const item = location.state?.item;

  const navigate = useNavigate();

  const handleEditClick = (item: Item) => {
    navigate("/edit-item-page", { state: { item } }); // Pass item in state
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!item) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h5">No item selected</Typography>
      </Box>
    );
  }

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
              {item.name}
            </Typography>
            <Button
              sx={{ marginRight: "5%", padding: 2 }}
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleEditClick(item)}
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
            ${item.price.toFixed(2)}{" "}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ minWidth: "150px" }}>
              <TextField
                label="Amount left"
                type="number"
                fullWidth
                defaultValue={item.stock}
                disabled
              />
            </Box>
            <Box sx={{ minWidth: "150px" }}>
              <TextField
                label="Color"
                fullWidth
                defaultValue={item.color}
                disabled
              />
            </Box>
          </Box>

          {/* Features */}
          <Box sx={{ marginTop: 2, textAlign: "left", width: "100%" }}>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {[item.trait1, item.trait2, item.trait3, item.trait4, item.trait5]
                .filter(Boolean)
                .map((trait, index) => (
                  <li key={index}>
                    <Typography variant="body2">{trait}</Typography>
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
            {item.description}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ManagerItemPage;
