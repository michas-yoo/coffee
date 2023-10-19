import { reactive } from "vue";
import { getGreeting } from "./utils/getGreeting.js";
import { AVAILABLE_PAGES } from "./constants.js";

const initialPageName = () => {
  const url = window.location.href.split("/")[3];
  return AVAILABLE_PAGES.includes(url) ? url : "main";
};

export const appStore = reactive({
  cart: [],
  time: getGreeting(),
  loading: false,
  username: "",
  productId: 0,
  accessToken: "",
  currentPage: initialPageName(),
});
