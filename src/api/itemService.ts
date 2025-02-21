import apiClient from "./apiClient";

// Fetch all items
export const fetchAllItems = async () => {
  try {
    const response = await apiClient.get("/items");
    return response.data; // Assuming the backend returns the data as a list
  } catch (error) {
    console.error("Error fetching all items:", error);
    throw error;
  }
};

// API function to fetch an item by id
export const fetchItemById = async (id: number) => {
  try {
    const response = await apiClient.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching item with id ${id}:`, error);
    throw error;
  }
};

// Fetch items by shopId
export const fetchItemsByShopId = async (shopId: number) => {
  try {
    const response = await apiClient.get("/items", {
      params: { shopId }, // Pass shopId as query parameter
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching items for shopId ${shopId}:`, error);
    throw error;
  }
};

// Update item by ID
export const updateItemById = async (itemId: number, updatedItem: any) => {
  try {
    const response = await apiClient.put(`/items/${itemId}`, updatedItem);
    return response.data; // Assuming the backend returns the updated item
  } catch (error) {
    console.error(`Error updating item with ID ${itemId}:`, error);
    throw error;
  }
};

// Create a new item
export const createItem = async (newItem: any) => {
  try {
    const response = await apiClient.post("/items", newItem);
    return response.data; // Assuming the backend returns the created item
  } catch (error) {
    console.error("Error creating new item:", error);
    throw error;
  }
};
