<template>
  <v-list-group>
    <template v-slot:activator="{ props }">
      <div :class="`depth${depth}`">
        <v-radio :value="item.key"></v-radio>
        <v-list-item v-bind="props" prepend-icon="mdi-folder-multiple" :title="item.text"></v-list-item>
      </div>
    </template>
    <template v-for="(subItem, idx) in item.children" :key="idx">
      <TreeGroup v-if="subItem.children" :item="subItem" :depth="depth + 1"></TreeGroup>
      <TreeItem v-else :item="subItem" :depth="depth + 1"></TreeItem>
    </template>
  </v-list-group>
</template>
<script setup>
import TreeItem from "./TreeItem.vue";

defineProps({
  item: Object,
  depth: Number,
});
</script>
