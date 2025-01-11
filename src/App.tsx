import React from "react";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import NavBar from "./components/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#47b1de", // Set your desired color here
    },
    secondary: {
      main: "#9c27b0", // Another color for secondary elements
    },
  },
  typography: {
    allVariants: {
      color: "black", // Applies to all text variants in Material-UI
    },
  },
});

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <NavBar />
        <AppRouter />
      </ThemeProvider>
    </Router>
  );
};

export default App;
