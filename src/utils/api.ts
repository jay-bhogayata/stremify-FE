import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/v1",
  headers: {
    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_API_URL,
  },
  withCredentials: true,
});

export default api;
