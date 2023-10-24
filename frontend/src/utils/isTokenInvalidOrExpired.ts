import { URL } from "../interfaces";
import jwtDecode from "jwt-decode";

/**
 * @function
 * @description Проверяет протух ли токен и возвращает ответ
 * @param url - На какую ручку идет запрос
 * @param accessToken - Текущий токен пользователя
 */
export const isTokenInvalidOrExpired = (url: URL, accessToken: string): boolean => {
  const ignoredUrls: RegExp = new RegExp(/login|register|refresh_token/gi);

  if (url.match(ignoredUrls)) {
    return false;
  }

  if (!accessToken) {
    return true;
  }

  try {
    // @ts-ignore
    const { exp } = jwtDecode(accessToken);
    return Date.now() >= exp * 1000;
  } catch (e) {
    console.log(e);
    return true;
  }
};
