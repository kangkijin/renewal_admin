<template>
  <v-navigation-drawer
    left
    v-model="theme.sidebarDrawer"
    elevation="0"
    rail-width="95"
    :mobile-breakpoint="960"
    app
    class="leftSidebar"
    :rail="theme.miniSidebar"
    expand-on-hover
    width="270"
  >
    <v-locale-provider>
      <div class="pa-3 text-center">
        <logo-theme></logo-theme>
      </div>
    </v-locale-provider>

    <perfect-scrollbar class="scrollnavbar">
      <v-list open-strategy="single" class="pa-6">
        <template v-for="menu in menuList" :key="menu.key">
          <NavGroup v-if="menu.children" :item="menu" :depth="1"></NavGroup>
          <NavItem v-else :item="menu" :depth="1"></NavItem>
        </template>
      </v-list>
    </perfect-scrollbar>

    <sr-info :rail="theme.miniSidebar" />
  </v-navigation-drawer>
</template>
<script lang="ts">
import { useThemeStore } from "@/store/themeStore";
import SidebarItem from "./SidebarItem";
import NavItem from "./NavItem.vue";
import NavGroup from "./NavGroup.vue";
import SrInfo from "./SrInfo.vue";
import LogoTheme from "../logo/LogoTheme.vue";

export default {
  components: { NavItem, NavGroup, SrInfo, LogoTheme },
  data: () => ({
    theme: useThemeStore(),
    menuList: SidebarItem,
  }),
};
</script>
