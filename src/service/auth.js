import axios from "axios";

const API_URL_LOGIN = import.meta.env.VITE_API_URL;

// gets response from the api and stores the token in localstorage

// Warning: Storing tokens in localStorage can be a security risk (XSS attacks).
// Consider using secure httpOnly cookies instead. as i ahve too store in client side only

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL_LOGIN}/login`, {
      email,
      password,
    });

    const token = response.data.token;

    console.log("Token received:", token);
    if (token) {
      document.cookie = `token=${token}; Secure; HttpOnly; SameSite=Strict`;
    }

    return token;
  } catch (error) {
    console.error(`Login failed: ${error.response?.status} - ${error.message}`);

    throw new Error(error.response?.data?.error || "Login Failed");
  }
};
