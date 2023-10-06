import { reactive } from "vue";
import { getGreeting } from "./utils/getGreeting.js";

export const appStore = reactive({
  time: getGreeting(),
  loading: true,
  username: "",
  accessToken: "",
});
