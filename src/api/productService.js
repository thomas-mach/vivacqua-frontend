import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data", // <-- questa è la chiave!
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/admin-products`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      withCredentials: false,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (productData) => {
  try {
    const response = await axios.patch(
      `${API_URL}/products/${productData._id}`,
      productData,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
