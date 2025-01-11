import React from "react";
import { Box, Typography, Grid, Paper, Button, Divider } from "@mui/material";
import ManagedProductGrid from "../../components/ManagerProductGrid";
import { useNavigate } from "react-router-dom";

const ManagePage: React.FC = () => {
  // Dummy Data
  const stats = {
    currentlySoldItems: 125,
    totalSoldItems: 2300,
    itemsSoldToday: 34,
    itemsViewedToday: 450,
    totalRevenue: 12500.0,
    revenueToday: 100,
  };

  const itemsOnSale = [
    {
      id: 1,
      name: "Product 1",
      price: 25.0,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Product 2",
      price: 35.0,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Product 3",
      price: 45.0,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 4,
      name: "Product 4",
      price: 55.0,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 5,
      name: "Product 5",
      price: 65.0,
      image: "https://via.placeholder.com/100",
    },
    // Add more items as needed
  ];

  const salesHistory = [
    {
      id: 1,
      name: "Product A",
      price: 50.0,
      quantity: 2,
      date: "2025-01-01",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Product B",
      price: 30.0,
      quantity: 1,
      date: "2025-01-02",
      image: "https://via.placeholder.com/100",
    },
    // Add more sales as needed
  ];

  const navigate = useNavigate();

  const handleAddNewClick = () => {
    navigate("/add-item-page");
  };

  return (
    <Box
      sx={{
        padding: 4,
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "1%",
      }}
    >
      {/* Stats Section */}
      <Box>
        <Grid container spacing={3}>
          {Object.entries(stats).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                >
                  {key.replace(/([A-Z])/g, " $1")}:
                </Typography>
                <Typography variant="h5">{value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ marginY: 4 }} />

      {/* Items On Sale Section */}
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
        <Box sx={{ justifyContent: "center", marginTop: 3, width: "100%" }}>
          <ManagedProductGrid />
        </Box>
      </Box>

      <Divider sx={{ marginY: 4 }} />

      {/* Sales History Section */}
      <Box
        sx={{
          gap: 2,
          marginLeft: "5%",
          marginRight: "5%",
          paddingBottom: "5%",
        }}
      >
        {/* Sales history Title */}
        <Typography
          variant="h4"
          sx={{
            marginBottom: 4,
            color: "black",
            alignSelf: "flex-start", // Align to the start (left) of the Box
            textAlign: "left",
          }}
        >
          Sales History
        </Typography>
        {salesHistory.map((sale) => (
          <Paper
            key={sale.id}
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
            {/* Image */}
            <img
              src={sale.image}
              alt={sale.name}
              style={{
                width: 50,
                height: 50,
                borderRadius: 5,
                objectFit: "cover",
              }}
            />

            {/* Name */}
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

            {/* Price */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ flexBasis: "15%", textAlign: "left" }}
            >
              ${sale.price.toFixed(2)}
            </Typography>

            {/* Quantity */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ flexBasis: "15%", textAlign: "left" }}
            >
              Quantity: {sale.quantity}
            </Typography>

            {/* Date */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ flexBasis: "25%", textAlign: "left" }}
            >
              Sold on: {sale.date}
            </Typography>

            {/* View Details Button */}
            <Button
              variant="outlined"
              size="small"
              sx={{ flexBasis: "15%", textAlign: "center" }}
              onClick={() => console.log(`View details of sale ID: ${sale.id}`)}
            >
              View Details
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ManagePage;
