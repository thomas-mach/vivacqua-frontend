import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
