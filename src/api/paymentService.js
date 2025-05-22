import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const paymentIntent = async (orderData) => {
  console.log("paymentIntentIntetnt", orderData);
  try {
    const response = await axios.post(
      `${API_URL}/stripe/payment-intent`,
      orderData,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
