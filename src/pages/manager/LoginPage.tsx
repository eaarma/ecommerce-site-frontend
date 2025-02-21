import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../redux/authSlice";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get dispatch function from Redux

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      // Send login credentials to the backend
      const response = await axios.post(
        "http://localhost:8080/api/users/authenticate",
        {
          username,
          password,
        }
      );

      // Assuming the backend returns a JWT token and shopId on success
      const { token, shop_id: shopId } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Dispatch login success to Redux
      dispatch(loginSuccess({ token, shopId }));

      // Redirect to the manage page only if the login is successful
      navigate("/manage");
    } catch (err: any) {
      // Handle backend errors and display a user-friendly error message
      if (err.response) {
        setError(err.response.data.message || "Invalid credentials");
        dispatch(loginFailure("Invalid credentials")); // Dispatch failure
      } else if (err.request) {
        setError("Could not connect to the server. Please try again later.");
        dispatch(loginFailure("Could not connect to the server"));
      } else {
        setError("An unexpected error occurred. Please try again.");
        dispatch(loginFailure("Unexpected error"));
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
        paddingTop: 10,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Please Log In
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          Enter your credentials to access your account
        </Typography>
        {error && (
          <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            handleLogin();
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleLogin}
          >
            Log In
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Forgot password?
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
