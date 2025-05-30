import axios from "axios";

const API_URL_AUTH = import.meta.env.VITE_API_URL_AUTH;
const API_URL_USER = import.meta.env.VITE_API_URL_USER;

export const getUsers = async (queryParams) => {
  try {
    const response = await axios.get(`${API_URL_AUTH}/allUsers`, {
      params: queryParams,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserByAdmin = async (userData) => {
  console.log("services", userData);
  try {
    const response = await axios.patch(
      `${API_URL_AUTH}/updateUserByAdmin/${userData._id}`,
      userData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
