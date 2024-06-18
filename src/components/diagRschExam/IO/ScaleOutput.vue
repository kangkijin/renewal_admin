<template>
  <div class="qus_header">
    <strong class="qus_num">{{ order + 1 < 10 ? `0${order + 1}` : order + 1 }}.</strong>
    <p class="qus_tit">{{ qusInfo.title }}</p>
  </div>

  <div class="qus_cnt">
    <v-radio-group inline class="point_scale" v-model="model">
      <template v-for="(item, idx) in qusInfo.ansInfo" :key="idx">
        <v-radio :label="item.title" class="d-block" :value="idx + 1" density="compact">
          <span class="number">{{ idx + 1 }}</span>
        </v-radio>
      </template>
    </v-radio-group>
  </div>
</template>

<script setup lang="ts">
import type { QusOutputTypes } from "@/types/diagTypes/DiagIOTypes";

defineProps<{ qusInfo: QusOutputTypes; order: number }>();

const model = defineModel();
</script>
