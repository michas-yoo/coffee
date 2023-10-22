import { appStore } from "../store.ts";
import { isTokenInvalidOrExpired } from "../utils/isTokenInvalidOrExpired.ts";
import { URL } from "../interfaces";

type Request = {
  method: string,
  body?: string,
  headers?: Record<string, string>,
  credentials?: string,
};

const API_BASE_URL = "http://localhost:3000";

// Private methods
const fetchCall = async (url: URL, options: Request = {}) => {
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

const processToken = async (url: URL) => {
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

const request = async (type: string, url: URL, payload = {}) => {
  try {
    const options: Request = {
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
const get = async (url: URL) => request("get", url);

const post = async (url: URL, payload: any) => request("post", url, payload);

const remove = async (url: URL) => request("delete", url);

// Requests
const getCart = async () => get(`/cart`);

const getShop = async (id: number) => get(`/shops/${id}`);

const getShops = async () => get("/shops");

const getOrders = async () => get("/orders");

const getGallery = async (id: number) => get(`/gallery/${id}`);

const getOrderById = async (id: number) => get(`/orders/${id}`);

const getProductInfo = async ({ id, shopId }) => get(`/menu/${shopId}/${id}`);

const login = async (payload) => post("/login", payload);

const register = async (payload) => post("/register", payload);

const addToCart = async (payload) => post(`/cart`, payload);

const createOrder = async (payload) => post("/orders", payload);

const refreshToken = async () => post("/refresh_token", {});

const clearCart = async () => remove(`/cart`);

const removeFromCart = async (id: number) => remove(`/cart/${id}`);

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

export type MethodName = "addToCart"
  | "clearCart"
  | "createOrder"
  | "getCart"
  | "getGallery"
  | "getOrders"
  | "getOrderById"
  | "getProductInfo"
  | "getShop"
  | "getShops"
  | "login"
  | "refreshToken"
  | "register"
  | "removeFromCart";

export default methods;
