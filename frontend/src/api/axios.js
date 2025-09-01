import axios from "axios";

const api = axios.create({
  baseURL: "https://assignment-todo-ys5k.onrender.com/api",
});

export default api;