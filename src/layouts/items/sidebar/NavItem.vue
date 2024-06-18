<template>
  <v-list-item class="leftPadding mb-1" :to="item.path" rounded :value="item.key" :class="`gnb_${depth}depth`">
    <template #prepend>
      <!-- <v-icon v-if="depth === 1" :icon="item.icon"></v-icon>
      <v-icon v-else-if="depth === 2" icon="mdi-square-medium-outline"></v-icon>
      <v-icon v-else-if="depth === 3" icon="mdi-circle-small"></v-icon> -->
    </template>
    <v-list-item-title class="mr-auto">{{ $t(item.text) }}</v-list-item-title>

    <template v-if="item.chip" #append>
      <v-chip :color="item.chipColor" :class="`sidebarchip hide-menu bg-${item.chipBgColor}`">
        {{ item.chip }}
      </v-chip>
    </template>
  </v-list-item>
</template>

<script setup>
defineProps({ item: Object, depth: Number });
</script>
