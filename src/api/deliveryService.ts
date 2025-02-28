import apiClient from "./apiClient";

// Function to validate cart items by sending their IDs to the backend
export const validateCartItems = async (cartItems: { id: number }[]) => {
  // Extract only the IDs from the cart items
  const itemIds = cartItems.map((item) => item.id);
  try {
    const response = await apiClient.post("/delivery/validate", { itemIds });
    return response.data; // Expect backend to return validated info (e.g., locker size, delivery fee, etc.)
  } catch (error) {
    console.error("Error validating cart items:", error);
    throw error;
  }
};
