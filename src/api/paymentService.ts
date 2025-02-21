import apiClient from "./apiClient";

// Process payment for a given amount using provided card details
export const postPaymentCall = async (amount: number, cardDetails: any) => {
  try {
    const response = await apiClient.post("/process-payment", {
      amount,
      cardDetails,
    });
    return response.data;
  } catch (error) {
    console.error(`Error processing payment for amount ${amount}:`, error);
    throw error;
  }
};
