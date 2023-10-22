import jwtDecode from "jwt-decode";
import { URL } from "../interfaces";

export const isTokenInvalidOrExpired = (url: URL, accessToken: string): boolean => {
  const ignoredUrls: RegExp = new RegExp(/login|register|refresh_token/gi);

  if (url.match(ignoredUrls)) {
    return false;
  }

  if (!accessToken) {
    return true;
  }

  try {
    const { exp } = jwtDecode(accessToken);
    return Date.now() >= exp * 1000;
  } catch (e) {
    console.log(e);
    return true;
  }
};
