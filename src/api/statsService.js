import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getStats = async (range) => {
  try {
    const response = await axios.get(`${API_URL}/stats/${range}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTopFiveProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats/top-five`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProductsStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats/orders-state`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
