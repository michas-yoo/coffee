import { reactive } from "vue";
import { IAppStore } from "./interfaces";
import { getGreeting } from "./utils/getGreeting.ts";
import { AVAILABLE_PAGES } from "./constants.ts";

const initialPageName = (): string => {
  const url: string = window.location.href.split("/")[3];
  return AVAILABLE_PAGES.includes(url) ? url : "main";
};

export const appStore: IAppStore = reactive({
  cart: [],
  greeting: getGreeting(),
  loading: false,
  username: "",
  productId: 0,
  accessToken: "",
  currentPage: initialPageName(),
});
