import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Paper,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Collapse,
} from "@mui/material";

const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showCardFields, setShowCardFields] = useState(true);

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(event.target.value);
    setShowCardFields(event.target.value === "card");
  };

  const handlePayment = () => {
    console.log("Processing payment...");
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "1%",
      }}
    >
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Payment
      </Typography>
      <Typography variant="body1" gutterBottom>
        Review your order and complete the payment.
      </Typography>

      <Grid container spacing={3}>
        {/* Left Section */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {/* Order Review */}
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                textAlign: "left",
                marginLeft: "5%",
                paddingTop: "2%",
                paddingBottom: "2%",
              }}
            >
              Order Review
            </Typography>
            <Box
              sx={{
                marginBottom: 2,
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "2%",
                paddingBottom: "1%",
              }}
            >
              {[
                {
                  id: 1,
                  name: "Item 1",
                  price: 25.0,
                  image: "/src/assets/handcraft.jpg",
                },
              ].map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    marginBottom: 1,
                    marginRight: "2%",
                    marginLeft: "1%",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 5,
                      objectFit: "cover",
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      flex: 1,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textAlign: "left",
                      marginLeft: "5%",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      marginLeft: "auto",
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ marginY: "5%" }} />
            </Box>

            {/* Payment Method */}
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: "left", marginLeft: "5%" }}
            >
              Payment Method
            </Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              sx={{
                alignItems: "flex-start",
                marginLeft: "5%",
                marginBottom: "1%",
              }}
            >
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Credit/Debit Card"
              />
              <Collapse in={showCardFields}>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  sx={{ marginBottom: 2 }}
                >
                  {/* Cardholder Name */}
                  <TextField
                    label="Cardholder Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />

                  {/* Card Number */}
                  <TextField
                    label="Card Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    inputProps={{
                      maxLength: 16,
                      inputMode: "numeric",
                    }}
                  />

                  <Grid container spacing={2}>
                    {/* Expiry Date */}
                    <Grid item xs={6}>
                      <TextField
                        label="Expiry Date (MM/YY)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    </Grid>

                    {/* CVV */}
                    <Grid item xs={6}>
                      <TextField
                        label="CVV"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        inputProps={{
                          maxLength: 3,
                          inputMode: "numeric",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Collapse>

              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other Payment Method"
              />
            </RadioGroup>
          </Paper>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ padding: "5%", marginLeft: "5%" }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Typography variant="body1">Subtotal</Typography>
              <Typography variant="body1">$50.00</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 1,
              }}
            >
              <Typography variant="body1">Shipping</Typography>
              <Typography variant="body1">$5.00</Typography>
            </Box>

            <Divider sx={{ marginY: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">$55.00</Typography>
            </Box>

            {/* Pay Now Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ marginTop: 3 }}
              onClick={handlePayment}
            >
              Pay Now
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentPage;
