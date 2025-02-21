import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Create an Axios instance with a base URL for your backend API
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Base URL for your backend API
});

// Add a request interceptor to include the token automatically
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
      console.log("Request Headers:", config.headers); // Debugging
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

// Add a response interceptor to handle errors like token expiration
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      console.error("Unauthorized! Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error); // Pass the error to the calling function
  }
);

export default apiClient;
