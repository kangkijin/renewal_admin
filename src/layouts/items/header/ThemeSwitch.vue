<template>
  <div class="d-flex align-center justify-center">
    <v-icon>mdi-weather-night</v-icon>
    <v-switch
      class="mx-4 flex-0-0"
      color="primary"
      true-value="BLUE_THEME"
      false-value="DARK_BLUE_THEME"
      :inset="false"
      v-model="theme.activeTheme"
      density="compact"
    ></v-switch>
    <v-icon size="large">mdi-weather-sunny</v-icon>
  </div>
</template>
<script setup lang="ts">
import { useThemeStore } from "@/store/themeStore";
const theme = useThemeStore();
</script>

<style lang="scss"></style>
