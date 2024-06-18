<template>
  <v-menu :close-on-content-click="false" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props"><v-icon>mdi-cog-outline</v-icon></v-btn>
    </template>
    <v-sheet rounded="md" width="200" elevation="10">
      <v-list>
        <!-- <v-list-item>Language<LangOptions></LangOptions></v-list-item>
        <v-divider class="ma-2"></v-divider> -->
        <v-list-item>
          <ThemeSwitch></ThemeSwitch>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-menu>
</template>
<script setup lang="ts">
// import LangOptions from "./LangOptions.vue";
import ThemeSwitch from "./ThemeSwitch.vue";
</script>
