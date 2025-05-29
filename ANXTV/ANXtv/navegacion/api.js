import axios from "axios";

const API_URL = "http://192.168.1.80:30000/accounts";

export const login = async (email, password) => {
  return axios.post(`${API_URL}/auth`, { email, password });
};

export const register = async (email, password) => {
  return axios.post(`${API_URL}`, { email, password });
};
