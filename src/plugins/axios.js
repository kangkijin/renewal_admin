import axios from "axios";

const dainAxios = {
  install: (app) => {
    app.config.globalProperties.$axios = axios;

    axios.defaults.headers = {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios.defaults.withCredentials = true;

    // Request
    axios.interceptors.request.use(
      (config) => {
        config.headers["Access-Control-Allow-Origin"] = "*";
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response
    axios.interceptors.response.use(
      async (res) => {
        res.headers["Access-Control-Allow-Origin"] = "*";
        return await res;
      },
      async (error) => {
        return await Promise.reject(error);
      },
    );
  },
};

export default dainAxios;
