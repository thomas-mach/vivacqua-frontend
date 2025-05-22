import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/order`, orderData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getOrder = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/order/${orderId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
