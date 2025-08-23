import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

// Upload document
export const uploadDocument = (formData) =>
  API.post("/documents/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const listDocuments = () => {
  return axios.get(`${API_URL}/documents`);
};

export const downloadDocument = (filename) => {
  return axios.get(`${API_URL}/documents/${filename}/download`, {
    responseType: "blob", // important for file download
  });
};

export const getInsights = (filename) => {
  return axios.post(`${API_URL}/documents/insights`, { filename });
};