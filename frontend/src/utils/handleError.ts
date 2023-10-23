import { Router } from "vue-router";
import { notification } from "ant-design-vue";
import {
  NETWORK_ERROR_TEXT,
  NO_TOKEN_ERROR_TEXT,
  BAD_USER_ERROR_TEXT,
} from "../constants";

type PossibleError = string[] | string | Record<string, string>;

export const handleError = (data: PossibleError, router: Router | null = null): void => {
  let message = "";

  if (Array.isArray(data)) {
    message = data[0];
    data.forEach((error) => notification.error({ message: error }));
  } else if (typeof data === "string") {
    notification.error({ message: data });
  } else {
    notification.error({ message: data.message });
  }

  if (!router) {
    return;
  }

  if (message === NETWORK_ERROR_TEXT) {
    router.push({ name: "bad-request" });
  } else if (message === BAD_USER_ERROR_TEXT || message === NO_TOKEN_ERROR_TEXT) {
    router.push({ name: "login" });
  }
};
