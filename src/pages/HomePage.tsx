import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import NewItems from "../components/NewItems";
import PreviewImage from "../components/PreviewImage";
import FeaturedProduct from "../components/FeaturedProduct";
import apiClient from "../api/apiClient";

interface Item {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

const HomePage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get<Item[]>("/items") // Fetch items from the API
      .then((response) => setItems(response.data))
      .catch((err) => setError(err.message));
  }, []);

  const newItems = items.slice(0, 6); // Take the 6 newest items
  const featuredProduct =
    items[Math.floor(Math.random() * items.length)] || null; // Random item for FeaturedProduct

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
      <NewItems items={newItems} />
      {/* Product Highlight Section */}
      {featuredProduct && <FeaturedProduct item={featuredProduct} />}
    </Box>
  );
};

export default HomePage;
