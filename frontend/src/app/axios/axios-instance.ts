import axios from "axios";
export const axiosInstance = axios.create({
  headers: { "Content-Type": "application/json" },
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  withCredentials: true,
});
