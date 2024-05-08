import axios from "axios";
//to send acces token to backend server
export const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/",
  withCredentials: true,
});
