import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8084/api",
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Content-type': 'application/json',
  },
});