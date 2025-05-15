import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
