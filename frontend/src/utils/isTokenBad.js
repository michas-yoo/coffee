import jwtDecode from "jwt-decode";

export const isTokenInvalidOrExpired = (url, accessToken) => {
  const ignoredUrls = ['/login', '/register', '/refresh_token'];

  if (ignoredUrls.includes(url)) {
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
