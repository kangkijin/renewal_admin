<template>
  <v-app-bar elevation="0" height="70">
    <!-- <v-btn
      class="hidden-md-and-down"
      icon
      color="transparent"
      variant="text"
      @click.stop="theme.setMiniSidebar(!theme.miniSidebar)"
      ><v-icon>mdi-menu</v-icon>
    </v-btn> -->
    <v-btn
      class="hidden-lg-and-up"
      icon
      color="transparent"
      variant="flat"
      @click.stop="theme.setSidebarDrawer"
      size="small"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <v-spacer />

    <div class="myinfo mr-2">
      <p class="font-weight-bold">김대학(교번or사번) {{ $t("welcome") }}.</p>
      <p class="mt-1">시스템관리 권한 외 13개</p>
    </div>

    <SettingMenu></SettingMenu>

    <v-divider class="my-auto mx-2 border-opacity-50" length="16" vertical></v-divider>

    <v-btn icon="mdi-help-circle-outline" size="default" color="transparent"></v-btn>
    <v-btn icon="mdi-exit-to-app" size="default" color="transparent"></v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { useThemeStore } from "@/store/themeStore";
import SettingMenu from "./SettingMenu.vue";
export default {
  components: { SettingMenu },
  data: () => ({
    theme: useThemeStore(),
  }),
};
</script>

<style lang="scss">
.myinfo {
  font-size: 12px;
}
</style>
