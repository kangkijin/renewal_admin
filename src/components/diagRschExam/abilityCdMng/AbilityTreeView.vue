<template>
  <v-list class="menu_tree code_tree" v-model:opened="opened">
    <v-list-group v-for="(item, idx) in list" :key="idx" :value="idx" expand-icon="false" collapse-icon="false">
      <template v-slot:activator="{ props, isOpen }">
        <div class="d-flex align-center">
          <v-btn
            v-bind="props"
            class="mx-2"
            variant="flat"
            density="compact"
            :icon="isOpen ? 'mdi-menu-up' : 'mdi-menu-down'"
          ></v-btn>
          <v-list-item
            @click="updateModel(item, 0)"
            :class="selected.cdId === item.cdId ? 'active' : ''"
            :title="item.cdNm"
            :value="idx"
          ></v-list-item>
        </div>
      </template>
      <v-list-item
        v-for="(subItem, subIdx) in item.children"
        :key="subIdx"
        :title="subItem.cdNm"
        @click="updateModel(subItem, 1)"
        class="ml-10"
        :class="selected.cdId === subItem.cdId ? 'active' : ''"
        style="min-height: 40px"
      ></v-list-item>
    </v-list-group>
    <div class="ml-4 mt-2" v-if="list.length === 0">내용이 없습니다.</div>
  </v-list>
</template>

<script setup lang="ts">
import type { AbilityTypes } from "@/types/diagTypes/AbilityTypes";

const selected = defineModel("selected", { type: Object });
const opened = defineModel("opened", { type: Array });

const props = defineProps<{
  list: AbilityTypes[];
  type: string;
}>();

const updateModel = (item: AbilityTypes, level: number) => {
  if (props.type !== "MAJOR" || level === 1) {
    selected.value = item;
  }
};
</script>
