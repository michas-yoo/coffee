import { ref } from "vue";
import { defineStore } from "pinia";
import { AVAILABLE_PAGES } from "../constants.ts";

const initialPageName = (): string => {
  const url: string = window.location.href.split("/")[3];
  return AVAILABLE_PAGES.includes(url) ? url : "main";
};

export const useAppStore = defineStore("AppStore", () => {
  const loading = ref<boolean>(false);
  const productId = ref<number>(0);
  const currentPage = ref<string>(initialPageName());

  const setLoading = (state: boolean) => loading.value = state;

  const setProductId = (id: number) => productId.value = id;

  const setCurrentPage = (page: string) => currentPage.value = page;

  return {
    loading,
    productId,
    currentPage,
    setLoading,
    setProductId,
    setCurrentPage,
  };
});
