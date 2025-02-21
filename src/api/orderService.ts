import apiClient from "./apiClient";

// Create a new order
export const createOrder = async (orderData: any) => {
  try {
    const response = await apiClient.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Fetch sales history by shopId
export const fetchOrdersByShopId = async (shopId: number) => {
  try {
    const response = await apiClient.get("/orders", {
      params: { shopId }, // Pass shopId as query parameter
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching items for shopId ${shopId}:`, error);
    throw error;
  }
};
