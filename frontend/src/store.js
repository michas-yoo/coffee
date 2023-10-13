import { reactive } from "vue";
import { getGreeting } from "./utils/getGreeting.js";

export const appStore = reactive({
  time: getGreeting(),
  loading: false,
  username: "",
  accessToken: "",
  currentPage: "main",
  selectedProductId: 0,
  cart: [],
});
