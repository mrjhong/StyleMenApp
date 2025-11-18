import axios from "axios";

const apiUrl = (process.env.EXPO_PUBLIC_API_URL ?? "http://10.0.2.2:3000").replace(/\/+$/, "");

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Métodos genéricos
const request = async (method, endpoint, data = {}, params = {}) => {
  try {
    const res = await apiClient({
      method,
      url: endpoint,
      data,
      params,
    });
    return res.data;
  } catch (error) {
    console.log(`${method.toUpperCase()} ${endpoint} failed:`, error?.message);
    throw error;
  }
};

export const get = (endpoint, params) => request("get", endpoint, {}, params);
export const post = (endpoint, data) => request("post", endpoint, data);
export const put = (endpoint, data) => request("put", endpoint, data);
export const del = (endpoint) => request("delete", endpoint);

export default apiClient;
