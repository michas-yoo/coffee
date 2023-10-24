import { URL } from "../interfaces";
import { useUserStore } from "../stores/UserStore.ts";
import { IRequest, IResponse } from "./types";
import { isTokenInvalidOrExpired } from "../utils/isTokenInvalidOrExpired.ts";

const userStore = useUserStore();
const API_BASE_URL: string = "http://localhost:3000";

/**
 * @function
 * @description Функция-обёртка над fetch'ом, которая мапит опции и делает запросы
 * @param url - Адрес, на который нужно выполнить запрос
 * @param options - Опции запроса
 */
const fetchCall = async (url: URL, options: IRequest = {}): Promise<IResponse> => {
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

    if (userStore.accessToken) {
      options.headers["Authorization"] = `Bearer ${userStore.accessToken}`;
    }

    // @ts-ignore
    return await fetch(url, options).then(r => r.json());
  } catch (e: any) {
    console.log(e.message);
    return Promise.reject({ ok: false, message: e.message });
  }
};

/**
 * @function
 * @description Проверяет токен перед запросом, и если он протух, обновляет его
 * @param url - Адрес страницы, на которую делаем запрос. Если это login | register | refresh_token, пытаться обновить не будем
 */
const processToken = async (url: URL): Promise<IResponse> => {
  const shouldUpdateToken: boolean = isTokenInvalidOrExpired(url, userStore.accessToken);

  if (!shouldUpdateToken) {
    return { ok: true, data: null, message: null };
  }

  try {
    // Используем нативный fetch, чтобы не словить рекурсию
    const response = await fetch(`${API_BASE_URL}/refresh_token`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json());

    if (!response.ok) {
      return Promise.reject(response);
    }

    userStore.setUser(response.data);
    return Promise.resolve(response);
  } catch (e: any) {
    console.log(e.message);
    return Promise.reject({ ok: false, message: e.message });
  }
};

/**
 * @function
 * @description Фасад для выполнения запроса на бекенд
 * @param type - Тип запроса: GET, POST, DELETE
 * @param url - Ручка бека, на которую будем случаться
 * @param payload - Данные, которые нужно передать
 */
const request = async (type: string, url: URL, payload = {}): Promise<any> => {
  try {
    const options: IRequest = {
      method: type,
    };

    if (type === "post") {
      options.body = JSON.stringify(payload);
    }

    const result: IResponse = await fetchCall(`${API_BASE_URL}${url}`, options);

    if (!result.ok) {
      return Promise.reject(result.message);
    }

    return Promise.resolve(result.data);
  } catch (e: any) {
    console.log(e);
    return Promise.reject(e);
  }
};

/**
 * @function
 * @description Выполняет GET-запрос
 * @param url - На какую ручку бекенда нужно выполнить запрос
 */
export const get = async (url: URL): Promise<any> => request("get", url);

/**
 * @function
 * @description Выполняет POST-запрос
 * @param url - На какую ручку бекенда нужно выполнить запрос
 * @param payload - Данные, которые передадим на бекенд
 */
export const post = async (url: URL, payload: any): Promise<any> => request("post", url, payload);

/**
 * @function
 * @description Выполняет DELETE-запрос
 * @param url - На какую ручку бекенда нужно выполнить запрос
 */
export const remove = async (url: URL): Promise<any> => request("delete", url);
