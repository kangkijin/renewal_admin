<template>
  <v-card class="base_card" elevation="10">
    <v-card-item class="pt-6 pb-4 px-6">
      <div class="d-sm-flex align-center">
        <v-card-title class="text-h4">{{ title }}</v-card-title>
        <slot name="title"></slot>
      </div>
    </v-card-item>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  title: String,
});
</script>
