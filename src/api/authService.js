import axios from "axios";

const API_URL_AUTH = import.meta.env.VITE_API_URL;
const API_URL_USER = import.meta.env.VITE_API_URL_USER;

export const signup = async (userData) => {
  console.log("userData", userData);
  try {
    const response = await axios.post(`${API_URL_AUTH}/signup`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL_AUTH}/login`, userData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${API_URL_AUTH}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/forgotPassword`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (userData) => {
  try {
    const response = await axios.patch(
      `${API_URL_AUTH}/resetPassword/${userData.token}`,
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

export const resendEmail = async (userData) => {
  try {
    const response = await axios.post(`${API_URL_AUTH}/resendEmail`, userData, {
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (userData) => {
  try {
    const response = await axios.patch(
      `${API_URL_AUTH}/updateMyPassword`,
      userData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axios.patch(
      `${API_URL_AUTH}/deleteMe`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getJWT = async () => {
  try {
    const response = await axios.get(`${API_URL_AUTH}/jwt`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAvatar = async (userData) => {
  try {
    const response = await axios.patch(`${API_URL_USER}/updateMe`, userData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMe = async () => {
  try {
    const response = await axios.get(`${API_URL_AUTH}/getMe`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const reactivateUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL_AUTH}/reactivate`, userData, {
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMe = async (userData) => {
  try {
    const response = await axios.patch(`${API_URL_AUTH}/updateMe`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
