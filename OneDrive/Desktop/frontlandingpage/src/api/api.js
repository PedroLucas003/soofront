import axios from "axios";

const api = axios.create({
  baseURL: "https://landingpage-5jo1.onrender.com/api", // URL do backend
});

// ✅ Interceptor para adicionar token e lidar com erro 401
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Sua sessão expirou ou é inválida. Faça login novamente.");
      localStorage.removeItem("token");
      window.location.href = "/"; // redireciona para o index.html
    }
    return Promise.reject(error);
  }
);

export default api;