import { ref } from "vue";
import { defineStore } from "pinia";
import { ILoginResponse } from "../interfaces";

export const useUserStore = defineStore("UserStore", () => {
  const username = ref<string>("");
  const accessToken = ref<string>("");

  const setUser = (data: ILoginResponse) => {
    username.value = data.username;
    accessToken.value = data.accessToken;
  };

  return {
    setUser,
    username,
    accessToken,
  };
});
