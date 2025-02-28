import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { RootState } from "../redux/store";
import { updateCart, resetCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { fetchItemById } from "../api/itemService";
import { postPaymentCall } from "../api/paymentService";
import { createOrder } from "../api/orderService";

const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showCardFields, setShowCardFields] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Card detail states
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const cart = useSelector((state: RootState) => state.cart);
  const deliveryDetails = useSelector((state: RootState) => state.delivery);
  const deliveryMethod = useSelector((state: RootState) => state.deliverMethod);
  const lockerState = useSelector((state: RootState) => state.locker);

  // Determine shipping price based on provider from deliveryMethod slice
  let shippingPrice = 0;
  let shippingProvider = "";
  let packageSize = "";

  if (deliveryMethod.provider) {
    if (deliveryMethod.provider.toLowerCase() === "dpd" && lockerState.DPD) {
      shippingPrice = lockerState.DPD.lockerPrice;
      shippingProvider = lockerState.DPD.provider;
      packageSize = lockerState.DPD.lockerSize;
    } else if (
      deliveryMethod.provider.toLowerCase() === "smartpost" &&
      lockerState.SmartPost
    ) {
      shippingPrice = lockerState.SmartPost.lockerPrice;
      shippingProvider = lockerState.SmartPost.provider;
      packageSize = lockerState.SmartPost.lockerSize;
    }
  }

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(event.target.value);
    setShowCardFields(event.target.value === "card");
  };

  const handlePayment = async () => {
    try {
      console.log("Step0, trying to fetch");

      // Step 1: Fetch latest item details
      const updatedItems = await Promise.all(
        cart.items.map(async (item) => await fetchItemById(item.id))
      );
      console.log("Step1, fetch latest details:", updatedItems);

      // Step 2: Check for changes
      let changesDetected = false;
      let changesMessage = "The following items have changed:\n";

      updatedItems.forEach((updatedItem, index) => {
        const cartItem = cart.items[index];
        if (cartItem.price !== updatedItem.price) {
          changesDetected = true;
          changesMessage += `- ${
            cartItem.name
          }: Price changed from $${cartItem.price.toFixed(
            2
          )} to $${updatedItem.price.toFixed(2)}\n`;
        }
        if (cartItem.quantity > updatedItem.stock) {
          changesDetected = true;
          changesMessage += `- ${cartItem.name}: Stock reduced. Available: ${updatedItem.stock}, but you requested ${cartItem.quantity}\n`;
        }
      });

      if (changesDetected) {
        alert(changesMessage);
        dispatch(updateCart(updatedItems));
        return;
      }

      // Step 3: Calculate total price
      const totalAmount =
        updatedItems.reduce(
          (acc, item, index) => acc + item.price * cart.items[index].quantity,
          0
        ) + shippingPrice;

      console.log("Step3, calculate price:", totalAmount);

      // Step 4: Process Payment
      let paymentSuccess = false;
      if (paymentMethod === "card") {
        console.log("Step4, process payment with method:", paymentMethod);

        const cardDetails = {
          cardholderName,
          cardNumber,
          expiryDate,
          cvv,
        };

        const paymentData = await postPaymentCall(totalAmount, cardDetails);
        paymentSuccess = paymentData.success;
      } else {
        window.location.href = "/external-payment-gateway";
        return;
      }

      if (!paymentSuccess) {
        alert("Payment failed. Please try again.");
        return;
      }

      // Step 5: Create Order with Buyer Info in One Call
      const orderPayload = {
        buyer: {
          name: deliveryDetails.name,
          email: deliveryDetails.email,
          address: deliveryDetails.address,
          city: deliveryDetails.city,
          country: deliveryDetails.country,
          postalCode: deliveryDetails.postalCode,
          phone: deliveryDetails.phoneNumber,
          lockerProvider: deliveryMethod.provider,
          lockerName: deliveryMethod.name,
          lockerAddress: deliveryMethod.address,
        },
        orderItems: cart.items.map((item) => ({
          itemId: item.id,
          name: item.name,
          saleDate: new Date().toISOString(),
          soldPrice: item.price,
          quantitySold: item.quantity,
          shopId: item.shopId,
          profit: item.price * item.quantity,
        })),
        totalAmount: totalAmount, // Add missing fields if required
        shopId: deliveryDetails.shopId,
        status: "paid",
        profit: totalAmount - shippingPrice,
        saleDate: new Date().toISOString(),
        packageSize: packageSize,
        postalServicePrice: shippingPrice,
        postalServiceProvider: shippingProvider,
        packageReference: "",
      };

      console.log(
        "Step 5: Sending Order Payload:",
        JSON.stringify(orderPayload, null, 2)
      );
      const order = await createOrder(orderPayload);

      if (order && order.id) {
        console.log("Step 6: Order created successfully, updating stock");

        alert("Order successful! Thank you for your purchase.");
        dispatch(resetCart()); // Clear cart after successful order
        navigate("/order-confirmation");
      } else {
        console.error("Order creation failed");
        alert("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred. Please try again.");
    }
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
              {cart.items.map((item) => (
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
                    src={item.imageUrl}
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
                      textAlign: "center",
                      width: "50px",
                    }}
                  >
                    x{item.quantity}
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

            {/* Delivery Details Section */}
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                textAlign: "left",
                marginLeft: "5%",
                paddingBottom: "2%",
              }}
            >
              Delivery Details
            </Typography>
            <Box
              sx={{ marginLeft: "5%", marginBottom: "5%", textAlign: "left" }}
            >
              <Typography variant="body1">
                <strong>Name:</strong> {deliveryDetails.name}
              </Typography>

              <Typography variant="body1">
                <strong>Email:</strong> {deliveryDetails.email}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {deliveryDetails.phoneNumber}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {deliveryDetails.address}
              </Typography>
              <Typography variant="body1">
                <strong>City:</strong> {deliveryDetails.city}
              </Typography>
              <Typography variant="body1">
                <strong>Country:</strong> {deliveryDetails.country}
              </Typography>
              <Typography variant="body1">
                <strong>Postal code:</strong> {deliveryDetails.postalCode}
              </Typography>
              <Typography variant="body1">
                <strong>Delivery company:</strong> {deliveryMethod.provider}
              </Typography>
              <Typography variant="body1">
                <strong>Locker name:</strong> {deliveryMethod.name}
              </Typography>
              <Typography variant="body1">
                <strong>Locker address:</strong> {deliveryMethod.address}
              </Typography>
            </Box>

            {/* Payment methods */}

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
                  <TextField
                    label="Cardholder Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                  />
                  <TextField
                    label="Card Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 16, inputMode: "numeric" }}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Expiry Date (MM/YY)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="CVV"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        inputProps={{ maxLength: 3, inputMode: "numeric" }}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
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
              <Typography variant="body1">
                €
                {cart.items
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 1,
              }}
            >
              <Typography variant="body1">Shipping</Typography>
              <Typography variant="body1">
                €{shippingPrice.toFixed(2)}
              </Typography>
            </Box>

            <Divider sx={{ marginY: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">
                $
                {(
                  cart.items.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  ) + shippingPrice
                ).toFixed(2)}
              </Typography>
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
