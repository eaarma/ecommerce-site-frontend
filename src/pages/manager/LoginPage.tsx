import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/manage");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // Align items towards the top
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
        paddingTop: 10, // Add some top padding to adjust the height
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
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField label="Username" variant="outlined" fullWidth required />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
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
