// axiosInstance.js
import axios from "axios";
import { authToken } from "./localStorageKeys";

const baseUrlExport = "http://localhost:5000/api/v1/web";
const ngrokurl = "https://fe7f-106-210-33-52.ngrok-free.app/api/v1/web";
const serverUrl = "https://backend.p2care.com/api/v1/web";

const instance = axios.create({
  baseURL: serverUrl,
  headers: {
    "Content-Type": "application/json",
    IDENTIFIER: "A2hG9tE4rB6kY1sN",
    "ngrok-skip-browser-warning": "123",
    // You can add more default headers here if needed
  },
  withCredentials: true,
});

// Add an interceptor to set the Authorization header before each request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("currentAdmin");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default instance;
