<template>
  <v-locale-provider>
    <v-app :theme="theme.activeTheme" :class="theme.activeTheme">
      <admin-sidebar></admin-sidebar>
      <admin-header></admin-header>
      <v-main>
        <v-container fluid class="page-wrapper pb-sm-15 pb-10">
          <div class="ratioWidth">
            <router-view></router-view>
          </div>
        </v-container>
      </v-main>
      <admin-footer></admin-footer>
    </v-app>
  </v-locale-provider>
</template>

<script lang="ts">
import { useThemeStore } from "@/store/themeStore";
import { AdminSidebar, AdminHeader, AdminFooter } from "./items/TemplateImport";

export default {
  components: {
    AdminSidebar,
    AdminHeader,
    AdminFooter,
  },
  data: () => ({
    theme: useThemeStore(),
  }),
};
</script>
