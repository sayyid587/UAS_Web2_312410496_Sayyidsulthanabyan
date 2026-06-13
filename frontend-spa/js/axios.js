const API = "http://localhost:8080/api";

axios.defaults.baseURL = API;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Sesi Login Habis");

      localStorage.clear();

      window.location.hash = "#/login";
    }

    return Promise.reject(error);
  },
);

export default axios;
