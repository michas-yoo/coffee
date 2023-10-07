import { appStore } from "../store.js";
import { isTokenInvalidOrExpired } from "../utils/isTokenBad.js";

const API_BASE_URL = "http://localhost:3000";

const fetchCall = async (url, options = {}) => {
  if (!options.headers) {
    options.headers = {};
  }

  options.credentials = "include";
  options.headers["Content-Type"] = "application/json";

  try {
    await processToken(url);

    if (appStore.accessToken) {
      options.headers["Authorization"] = `Bearer ${appStore.accessToken}`;
    }

    return await fetch(url, options).then(r => r.json());
  } catch (e) {
    console.log(e);
    return Promise.reject({ ok: false, message: e.message });
  }
};

const processToken = async (url) => {
  const shouldUpdateToken = isTokenInvalidOrExpired(url, appStore.accessToken);

  if (!shouldUpdateToken) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/refresh_token`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json());
    appStore.username = response.data.username;
    appStore.accessToken = response.data.accessToken;
  } catch (e) {
    console.log(e);
    return Promise.reject({ ok: false, message: e.message });
  }
}

const get = async (url) => {
  try {
    const result = await fetchCall(`${API_BASE_URL}${url}`);

    if (!result.ok) {
      return Promise.reject(result.message);
    }

    return Promise.resolve(result.data);
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
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
    return Promise.reject(e);
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
