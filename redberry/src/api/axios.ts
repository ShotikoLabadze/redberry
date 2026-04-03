import axios from "axios";

const API = axios.create({
  baseURL: "https://api.redclass.redberryinternship.ge/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
