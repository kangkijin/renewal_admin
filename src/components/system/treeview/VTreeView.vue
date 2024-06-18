<template>
  <v-radio-group v-model="model">
    <v-list class="menu_tree" open-strategy="multiple">
      <template v-for="menu in list" :key="menu.key">
        <TreeGroup v-if="menu.children" :item="menu" :depth="1"></TreeGroup>
        <TreeItem v-else :item="menu" :depth="1"></TreeItem>
      </template>
    </v-list>
  </v-radio-group>
</template>

<script setup>
import "@/scss/components/_VTreeView.scss";
import TreeGroup from "@/components/system/treeview/TreeGroup.vue";
import TreeItem from "@/components/system/treeview/TreeItem.vue";

const model = defineModel();

defineProps({
  list: { type: Array, required: true },
});
</script>
