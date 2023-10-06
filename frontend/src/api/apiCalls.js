import { appStore } from "../store.js";

const API_BASE_URL = "http://localhost:3000";

const fetchCall = async (url, options = {}) => {
  if (!options.headers) {
    options.headers = {};
  }

  options.credentials = "include";
  options.headers["Content-Type"] = "application/json";

  if (appStore.accessToken) {
    options.headers["Authorization"] = `Bearer ${appStore.accessToken}`;
  }

  return await fetch(url, options)
    .then(res => res.json())
    .catch((error) => ({ ok: false, message: error.messages }));
};

const get = async (url) => {
  try {
    const result = await fetchCall(`${API_BASE_URL}${url}`);

    if (!result.ok) {
      return Promise.reject(result.message);
    }

    return Promise.resolve(result.data);
  } catch (e) {
    console.log(e);
    return Promise.reject(e.message);
  }
};

const post = async (url, payload = {}) => {
  try {
    const result = await fetchCall(`${API_BASE_URL}${url}`, {
      method: "post",
      body: JSON.stringify(payload),
    });

    if (!result.ok) {
      return Promise.reject(result.message);
    }

    return Promise.resolve(result.data);
  } catch (e) {
    console.log(e);
    return Promise.reject(e.message);
  }
};

const login = async (payload) => post("/login", payload);

const register = async (payload) => post("/register", payload);

const refreshToken = async () => post("/refresh_token");

const getShops = async () => get("/get_shops");

const getShop = async (id) => get(`/get_shops/${id}`);

const getGallery = async (id) => get(`/get_gallery/${id}`);

const methods = {
  login,
  getShop,
  getShops,
  register,
  getGallery,
  refreshToken,
};

export default methods;
