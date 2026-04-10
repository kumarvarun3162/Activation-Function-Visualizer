import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const generateVisualization = async (params) => {
  const res = await API.post("/visualize", params);
  return res.data;
};