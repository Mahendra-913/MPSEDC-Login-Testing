import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.100.185:8080",

  headers: {
    "Content-Type": "application/json",
  },
});


export const loginUser = async (loginData) => {

  const response = await API.post(
    "/api/auth/login",
    loginData
  );

  return response.data;
};


export default API;