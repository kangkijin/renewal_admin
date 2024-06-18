// Common
import { defineStore } from "pinia";
// import { useLocalStorage } from "@vueuse/core";

export const cmmnStore = defineStore("cmmn", {
  state: () => ({
    // loading: useLocalStorage("loading", false),
    loading: false,
  }),
  actions: {
    setLoadingState(loading: boolean) {
      this.loading = loading;
    },
  },
  getters: {
    getLoadingState(state) {
      return state.loading;
    },
  },
});
