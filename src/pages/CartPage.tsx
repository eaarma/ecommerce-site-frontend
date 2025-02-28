import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  IconButton,
  Divider,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { fetchItemById } from "../api/itemService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateCart } from "../redux/cartSlice";
import { validateCartItems } from "../api/deliveryService";
import { setLockerInfo, setPackageDetails } from "../redux/lockerSlice";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [validationMessages, setValidationMessages] = useState<string[]>([]);
  const [openValidationDialog, setOpenValidationDialog] = useState(false);

  // Handle Quantity Change
  const handleQuantityChange = (
    uniqueKey: string, //Using uniqueKey instead of id
    newQuantity: number,
    stock: number
  ) => {
    if (newQuantity > stock) {
      setError((prev) => ({
        ...prev,
        [uniqueKey]: `Only ${stock} items left`,
      }));
      return;
    } else {
      setError((prev) => ({ ...prev, [uniqueKey]: "" })); // Clear error if valid
    }

    const updatedCart = cartItems.map((item) =>
      item.uniqueKey === uniqueKey ? { ...item, quantity: newQuantity } : item
    );

    dispatch(updateCart(updatedCart));
  };

  const handleIncrement = (uniqueKey: string, stock: number) => {
    const item = cartItems.find((item) => item.uniqueKey === uniqueKey);
    if (item) {
      if (item.quantity >= stock) {
        setError((prev) => ({
          ...prev,
          [uniqueKey]: `Only ${stock} items left`,
        }));
      } else {
        setError((prev) => ({ ...prev, [uniqueKey]: "" })); // Clear error
        handleQuantityChange(uniqueKey, item.quantity + 1, stock);
      }
    }
  };
  const handleDecrement = (uniqueKey: string) => {
    const item = cartItems.find((item) => item.uniqueKey === uniqueKey);
    if (item && item.quantity > 1) {
      handleQuantityChange(uniqueKey, item.quantity - 1, item.stockLeft);
    }
  };

  const handleRemove = (uniqueKey: string) => {
    const updatedCart = cartItems.filter(
      (item) => item.uniqueKey !== uniqueKey
    );
    dispatch(updateCart(updatedCart));
  };
  // Calculate Total Price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Function to validate cart items and store locker info in Redux
  const handleCartItemSizeCheck = async (cartItems: any[]) => {
    try {
      const validationResult = await validateCartItems(cartItems);
      console.log("Validation result:", validationResult);

      // Dispatch the SmartPost locker info if available
      if (
        validationResult.SmartPost &&
        typeof validationResult.SmartPost === "object"
      ) {
        dispatch(
          setLockerInfo({
            provider: "SmartPost",
            info: validationResult.SmartPost,
          })
        );
      }

      // Dispatch the DPD locker info if available
      if (validationResult.DPD && typeof validationResult.DPD === "object") {
        dispatch(
          setLockerInfo({
            provider: "DPD",
            info: validationResult.DPD,
          })
        );
      }

      // Dispatch package details (dimensions and total volume)
      dispatch(
        setPackageDetails({
          packageDimensions: validationResult.packageDimensions,
          totalVolume: validationResult.totalVolume,
        })
      );

      // You can then proceed with further logic, for example calling handleCheckout
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  // When the user clicks "Proceed to Checkout", validate all cart items
  const handleCheckout = async () => {
    const messages: string[] = [];
    let updatedCart = [...cartItems]; // Copy cart items

    handleCartItemSizeCheck(updatedCart);

    await Promise.all(
      cartItems.map(async (cartItem) => {
        try {
          const fetchedItem = await fetchItemById(cartItem.id);
          if (!fetchedItem) {
            messages.push(`Item ${cartItem.name} is no longer available.`);
            return;
          }

          if (fetchedItem.stock === 0) {
            messages.push(
              `${cartItem.name} is out of stock and removed from your cart.`
            );
            updatedCart = updatedCart.filter(
              (item) => item.uniqueKey !== cartItem.uniqueKey
            ); // 🚀 Remove the item
            return;
          }

          const itemIndex = updatedCart.findIndex(
            (item) => item.uniqueKey === cartItem.uniqueKey
          );

          if (itemIndex !== -1) {
            if (cartItem.quantity > fetchedItem.stock) {
              messages.push(
                `Only ${fetchedItem.stock} of ${cartItem.name} left; quantity adjusted.`
              );
              updatedCart[itemIndex] = {
                ...updatedCart[itemIndex],
                quantity: fetchedItem.stock,
                stockLeft: fetchedItem.stock,
              };
            }

            if (cartItem.price !== fetchedItem.price) {
              messages.push(
                `The price for ${
                  cartItem.name
                } has changed from $${cartItem.price.toFixed(
                  2
                )} to $${fetchedItem.price.toFixed(2)}; updated in your cart.`
              );
              updatedCart[itemIndex] = {
                ...updatedCart[itemIndex],
                price: fetchedItem.price,
              };
            }
          }
        } catch (error) {
          console.error(`Error validating ${cartItem.name}:`, error);
          messages.push(`Error validating ${cartItem.name}.`);
        }
      })
    );

    // Ensure out-of-stock items are removed again before dispatch
    updatedCart = updatedCart.filter((item) => item.stockLeft !== 0);

    if (messages.length > 0) {
      dispatch(updateCart(updatedCart));
      await new Promise((resolve) => setTimeout(resolve, 100)); // Ensure Redux state updates
      setValidationMessages(messages);
      setOpenValidationDialog(true);
    } else {
      navigate("/checkout-details");
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
        Your Cart
      </Typography>
      <Typography variant="body1" gutterBottom>
        Review your selected items before checkout.
      </Typography>

      <Grid container spacing={4}>
        {/* Left Side: Cart Items */}
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 2,
                    marginBottom: 2,
                    borderRadius: 2,
                    backgroundColor: "#ffffff",
                  }}
                >
                  {/* Item Info */}
                  <Box display="flex" alignItems="center" gap={2}>
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
                    <Box>
                      <Typography variant="body1">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.price.toFixed(2)} each
                      </Typography>
                    </Box>
                  </Box>

                  {/* Quantity Controls */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleDecrement(item.uniqueKey)}
                      disabled={item.quantity <= 1}
                    >
                      <Remove />
                    </IconButton>

                    <Typography>{item.quantity}</Typography>

                    <IconButton
                      size="small"
                      onClick={() =>
                        handleIncrement(item.uniqueKey, item.stockLeft)
                      }
                      disabled={item.quantity >= item.stockLeft}
                    >
                      <Add />
                    </IconButton>
                  </Box>

                  {/* Display Error Message if present */}
                  {error[item.uniqueKey] && (
                    <Typography color="error" variant="caption">
                      {error[item.uniqueKey]}
                    </Typography>
                  )}

                  {/* Item Total */}
                  <Box>
                    <Typography>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>

                  {/* Remove Button */}
                  <IconButton
                    color="error"
                    onClick={() => handleRemove(item.uniqueKey)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))
            ) : (
              <Typography variant="h6" textAlign="center">
                Your cart is empty.
              </Typography>
            )}

            <Divider sx={{ marginY: 2 }} />

            {/* Subtotal Section */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 1,
              }}
            >
              <Typography variant="h6">Subtotal:</Typography>
              <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Right Side: Total and Checkout */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              position: "sticky",
              top: 16,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <Typography variant="body1">Subtotal:</Typography>
              <Typography variant="body1">${totalPrice.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ marginY: 2 }} />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCheckout}
              disabled={cartItems.length === 0} // Disable if cart is empty
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Validation Dialog */}
      <Dialog
        open={openValidationDialog}
        onClose={() => setOpenValidationDialog(false)}
      >
        <DialogTitle>Cart Updates</DialogTitle>
        <DialogContent>
          {validationMessages.map((msg, idx) => (
            <Typography key={idx}>{msg}</Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenValidationDialog(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CartPage;
