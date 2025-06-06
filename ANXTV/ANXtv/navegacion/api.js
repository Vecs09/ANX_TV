import axios from "axios";

const API_URL = "http://192.168.1.80:30000";

export const login = async (email, password) => {
  return axios.post(`${API_URL}/auth`, { email, password });
};

export const register = async (email, password, username) => {
  return axios.post(`${API_URL}/account`, { email, password, username });
};

export const getProfile = async () => {
  return axios.get(`${API_URL}/account`);
};

export const getAllVideos = async () => {
  return axios.get(`${API_URL}/video/get-all`);
};
