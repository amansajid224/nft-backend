import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";

let headers = {
  "Content-Type": "application/json",
};
const Api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL,
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // baseURL: process.env.NEXT_PUBLIC_NG_API_BASE_URL,
  headers,
});
Api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    const token_expiry = Cookies.get("token_expiry");
    if (token) {
      if (moment(token_expiry).unix() <= moment().unix()) {
        Cookies.remove("user");
        Cookies.remove("token");
        Cookies.remove("isAuthenticated");
        Cookies.remove("token_expiry");
        Cookies.remove("is2FaEnabled");
        window.location.href = "/";
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    let res = error.response;
    if (res?.status === 401) {
      Cookies.remove("user");
      Cookies.remove("token");
      Cookies.remove("isAuthenticated");
      Cookies.remove("token_expiry");
      Cookies.remove("is2FaEnabled");
      window.location.href = "/";
    } else {
      return Promise.reject(error);
    }
  }
);

export default Api;
