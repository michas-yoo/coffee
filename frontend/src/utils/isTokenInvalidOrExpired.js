import jwtDecode from "jwt-decode";

export const isTokenInvalidOrExpired = (url, accessToken) => {
  const ignoredUrls = new RegExp(/login|register|refresh_token/gi);

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
