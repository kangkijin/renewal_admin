<template>
  <LogoDark v-if="theme.activeTheme.includes('DARK')"></LogoDark>
  <LogoLight v-else></LogoLight>
</template>
<script lang="ts">
import LogoDark from "./LogoDark.vue";
import LogoLight from "./LogoLight.vue";
import { useThemeStore } from "@/store/themeStore";

export default {
  components: {
    LogoDark,
    LogoLight,
  },
  data: () => ({
    theme: useThemeStore(),
  }),
};
</script>
