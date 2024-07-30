import axios from "axios";
//to send acces token to backend server
export const makeRequest = axios.create({
  baseURL: "https://universe-cse.onrender.com/api/",
  withCredentials: true,
});
