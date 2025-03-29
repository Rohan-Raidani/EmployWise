import axios from "axios";
// Fetch Users from API

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/users?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login Failed");
  }
};

// Edit user details
export const updateUser = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, updatedData);
    return { ...updatedData, id, avatar: updatedData.avatar };
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login Failed");
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`);
    return { success: true };
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login Failed");
  }
};
