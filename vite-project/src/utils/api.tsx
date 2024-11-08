import axios from "axios";

const backendUrl = `${import.meta.env.VITE_BACKEND_HOST}:${
  import.meta.env.VITE_BACKEND_PORT
}`;

const api = axios.create({
  baseURL: backendUrl || "http://localhost",
});

export default api;
