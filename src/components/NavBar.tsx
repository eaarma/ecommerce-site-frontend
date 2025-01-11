import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Language, ShoppingCart, AccountCircle } from "@mui/icons-material";

const NavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState("English");

  const handleLanguageMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Centers content horizontally
            alignItems: "center", // Centers content vertically
            mx: 3, // Horizontal margin (left & right)
            ml: "10%",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="logo"
            component={Link}
            to="/"
          >
            <img
              src="/src/assets/clover.svg"
              alt="Logo"
              style={{ width: 30, height: 30 }}
            />
          </IconButton>

          {/* Center: Title and Navigation Buttons */}
          <Typography variant="h6" sx={{ mr: 2, ml: 2 }}>
            My Ecommerce
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Centers content horizontally
            alignItems: "center", // Centers content vertically
            gap: 4, // Space between buttons
            mx: 3, // Horizontal margin (left & right)
          }}
        >
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/items">
            Shop
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Centers content horizontally
            alignItems: "center", // Centers content vertically
            gap: 3, // Space between buttons
            mx: 3, // Horizontal margin (left & right)
            mr: "10%",
          }}
        >
          {/* Right Side: Language, Login (Avatar), Cart */}
          <IconButton color="inherit" onClick={handleLanguageMenuClick}>
            <Language />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleLanguageMenuClose("English")}>
              English
            </MenuItem>
            <MenuItem onClick={() => handleLanguageMenuClose("Spanish")}>
              Spanish
            </MenuItem>
          </Menu>

          <IconButton color="inherit" component={Link} to="/login">
            <AccountCircle />
            {/* <Avatar alt="User Avatar" src="/path/to/avatar.jpg" /> */}
          </IconButton>

          <IconButton color="inherit" component={Link} to="/cart">
            <ShoppingCart />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
