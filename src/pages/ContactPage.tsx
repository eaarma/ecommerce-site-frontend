import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid2,
} from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import React from "react";

const ContactPage: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      {/* Company Overview */}
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="body1" color="textSecondary">
          We’d love to hear from you! Whether you have a question about our
          products, feedback, or just want to say hi, feel free to reach out.
        </Typography>
      </Box>

      {/* Contact Information */}
      <Grid2 sx={{ xs: 12, md: 4, marginBottom: "2rem" }}>
        <Typography variant="h6">Email</Typography>
        <Typography variant="body2" color="textSecondary">
          contact@shop.com
        </Typography>
      </Grid2>

      {/* Contact Form */}
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <TextField label="Name" fullWidth required />
        <TextField label="Email" type="email" fullWidth required />
        <TextField label="Subject" fullWidth />
        <TextField label="Message" multiline rows={4} fullWidth required />
        <Button
          variant="contained"
          color="primary"
          sx={{ alignSelf: "center" }}
        >
          Submit
        </Button>
      </Box>

      {/* Social Media Links */}
      <Box sx={{ marginTop: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          Follow Us
        </Typography>
        <Box>
          <IconButton
            href="https://facebook.com"
            target="_blank"
            color="primary"
          >
            <Facebook />
          </IconButton>
          <IconButton
            href="https://twitter.com"
            target="_blank"
            color="primary"
          >
            <Twitter />
          </IconButton>
          <IconButton
            href="https://instagram.com"
            target="_blank"
            color="primary"
          >
            <Instagram />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactPage;
