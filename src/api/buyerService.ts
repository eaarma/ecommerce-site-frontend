import apiClient from "./apiClient";

// Fetch all buyers
export const fetchAllBuyers = async () => {
  try {
    const response = await apiClient.get("/buyers");
    return response.data;
  } catch (error) {
    console.error("Error fetching all buyers:", error);
    throw error;
  }
};

// Fetch buyer by ID
export const fetchBuyerById = async (id: number) => {
  try {
    const response = await apiClient.get(`/buyers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching buyer with ID ${id}:`, error);
    throw error;
  }
};

// Create a new buyer
export const createBuyer = async (newBuyer: any) => {
  try {
    const response = await apiClient.post("/buyers", newBuyer);
    return response.data;
  } catch (error) {
    console.error("Error creating new buyer:", error);
    throw error;
  }
};
