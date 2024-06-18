<template>
  <v-combobox
    :items="timeArr"
    append-inner-icon="mdi-clock-time-eight-outline"
    placeholder="00:00"
    class="ml-2 flex-0-0"
    :disabled="disabled"
    v-model="model"
    style="width: 150px"
  ></v-combobox>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({
  disabled: { type: Boolean },
});
const model = defineModel({ type: String });

const timeArr = ref<string[]>([]);
for (let hours = 0; hours < 24; hours++) {
  for (let minutes = 0; minutes < 60; minutes += 30) {
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    timeArr.value.push(`${formattedHours}:${formattedMinutes}`);
  }
}
</script>
