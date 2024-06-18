<template>
  <v-list-group class="leftPadding" no-action append-icon="false">
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props" :class="`gnb_${depth}depth`">
        <template #prepend>
          <!-- <v-icon v-if="depth === 1" :icon="item.icon"></v-icon>
          <v-icon v-else-if="depth === 2" icon="mdi-square-medium-outline"></v-icon>
          <v-icon v-else-if="depth === 3" icon="mdi-circle-small"></v-icon> -->
        </template>
        <v-list-item-title class="mr-auto">{{ $t(item.text) }}</v-list-item-title>
        <template #append>
          <span class="gnb_chip"></span>
        </template>
      </v-list-item>
    </template>
    <template v-for="(subItem, idx) in item.children" :key="idx">
      <NavGroup v-if="subItem.children" :item="subItem" :depth="depth + 1"></NavGroup>
      <NavItem v-else :item="subItem" :depth="depth + 1"></NavItem>
    </template>
  </v-list-group>
</template>
<script setup>
import NavItem from "./NavItem.vue";

defineProps({ item: Object, depth: Number });
</script>
