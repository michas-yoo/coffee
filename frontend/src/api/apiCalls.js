import { appStore } from "../store.js";
import { isTokenInvalidOrExpired } from "../utils/isTokenInvalidOrExpired.js";

// TODO: описать каждый метод

const API_BASE_URL = "http://localhost:3000";

// Private methods
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

const request = async (type, url, payload = {}) => {
  try {
    const options = {
      method: type,
    };

    if (type === "post") {
      options.body = JSON.stringify(payload);
    }

    const result = await fetchCall(`${API_BASE_URL}${url}`, options);

    if (!result.ok) {
      return Promise.reject(result.message);
    }

    return Promise.resolve(result.data);
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

// Request makers
const get = async (url) => request("get", url);

const post = async (url, payload) => request("post", url, payload);

const remove = async (url) => request("delete", url);

// Requests
const getCart = async () => get(`/cart`);

const getShop = async (id) => get(`/shops/${id}`);

const getShops = async () => get("/shops");

const getOrders = async () => get("/orders");

const getGallery = async (id) => get(`/gallery/${id}`);

const getOrderById = async (id) => get(`/orders/${id}`);

const getProductInfo = async ({ id, shopId }) => get(`/menu/${shopId}/${id}`);

const login = async (payload) => post("/login", payload);

const register = async (payload) => post("/register", payload);

const addToCart = async (payload) => post(`/cart`, payload);

const createOrder = async (payload) => post("/orders", payload);

const refreshToken = async () => post("/refresh_token");

const clearCart = async () => remove(`/cart`);

const removeFromCart = async ({ id }) => remove(`/cart/${id}`);

const methods = {
  addToCart,
  clearCart,
  createOrder,
  getCart,
  getGallery,
  getOrders,
  getOrderById,
  getProductInfo,
  getShop,
  getShops,
  login,
  refreshToken,
  register,
  removeFromCart,
};

export default methods;
