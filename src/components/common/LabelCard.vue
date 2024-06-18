<template>
  <div class="label_card_title">
    {{ title }}
  </div>

  <v-card elevation="10" class="rounded-b-sm" rounded="0">
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
