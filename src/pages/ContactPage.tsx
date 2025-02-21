import { Box, Typography, TextField, Button, Grid2 } from "@mui/material";
import React, { useState } from "react";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Prepare the form data
    const formData = {
      name,
      email,
      subject,
      message,
    };

    try {
      // Send a POST request to the back-end to send the email
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <TextField
          label="Name"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Subject"
          fullWidth
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          label="Message"
          multiline
          rows={4}
          fullWidth
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ alignSelf: "center" }}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ContactPage;
