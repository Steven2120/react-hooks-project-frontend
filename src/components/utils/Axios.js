import axios from "axios";

const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/api"
      : "/api",
  timeout: 50000,
});

export default Axios;
