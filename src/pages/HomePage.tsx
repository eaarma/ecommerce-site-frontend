import React from "react";
import { Box } from "@mui/material";
import NewItems from "../components/NewItems";
import PreviewImage from "../components/PreviewImage";
import FeaturedProduct from "../components/FeaturedProduct";

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        overflowX: "hidden",
        marginLeft: "10%",
        marginRight: "10%",
      }}
    >
      {/* Preview Section */}
      <PreviewImage />
      {/* New Items Section */}
      <NewItems />
      {/* Product Highlight Section */}
      <FeaturedProduct />
    </Box>
  );
};

export default HomePage;
