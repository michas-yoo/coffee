import { appStore } from "../store.js";
import { isTokenInvalidOrExpired } from "../utils/isTokenInvalidOrExpired.js";

const API_BASE_URL = "http://localhost:3000";

const fetchCall = async (url, options = {}) => {
  if (!options.headers) {
    options.headers = {};
  }

  options.credentials = "include";
  options.headers["Content-Type"] = "application/json";

  try {
    const refreshResult = await processToken(url);

    if (!refreshResult.ok) {
      return Promise.reject(refreshResult);
    }

    if (appStore.accessToken) {
      options.headers["Authorization"] = `Bearer ${appStore.accessToken}`;
    }

    return await fetch(url, options).then(r => r.json());
  } catch ({ message }) {
    console.log(message);
    return Promise.reject({ ok: false, message });
  }
};

const processToken = async (url) => {
  const shouldUpdateToken = isTokenInvalidOrExpired(url, appStore.accessToken);

  if (!shouldUpdateToken) {
    return { ok: true };
  }

  try {
    // We use basic fetch not to cause recursion
    const response = await fetch(`${API_BASE_URL}/refresh_token`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json());

    if (!response.ok) {
      return Promise.reject(response);
    }

    appStore.username = response.data.username;
    appStore.accessToken = response.data.accessToken;
    return Promise.resolve(response);
  } catch ({ message }) {
    console.log(message);
    return Promise.reject({ ok: false, message });
  }
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

const getProductInfo = async ({ id, shopId }) => get(`/get_menu/${shopId}/${id}`);

const methods = {
  login,
  getShop,
  getShops,
  register,
  getGallery,
  refreshToken,
  getProductInfo,
};

export default methods;
