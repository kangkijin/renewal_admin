<template>
  <div :class="`depth${depth}`">
    <v-radio :value="item.key"></v-radio>

    <v-list-item class="d-flex" :key="item.key" prepend-icon="mdi-folder-multiple">
      <template #title>
        {{ item.text }}
      </template>
    </v-list-item>
  </div>
</template>
<script setup>
defineProps({
  item: Object,
  depth: Number,
});
</script>
