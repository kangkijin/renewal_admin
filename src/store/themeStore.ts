import config from "@/types/config";
import { defineStore } from "pinia";

export const useThemeStore = defineStore({
  id: "theme",
  state: () => ({
    activeTheme: config.activeTheme,
    sidebarDrawer: config.sidebarDrawer,
    miniSidebar: config.miniSidebar,
  }),
  actions: {
    setActiveTheme(state: string) {
      this.activeTheme = state;
    },
    setMiniSidebar(state: boolean) {
      this.miniSidebar = state;
    },
    setSidebarDrawer(state: any) {
      this.sidebarDrawer = state;
    },
  },
});
