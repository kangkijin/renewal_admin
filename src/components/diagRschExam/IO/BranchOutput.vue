<template>
  <div class="qus_header">
    <strong class="qus_num">{{ order + 1 < 10 ? `0${order + 1}` : order + 1 }}.</strong>
    <p class="qus_tit">{{ qusInfo.title }}</p>
    <p class="qus_tit text-error ml-2">(분기문항:선택한 대답에 따라 이후 문항이 달라집니다.)</p>
  </div>
  <div class="hint_wrap mb-0" v-if="qusInfo.hint != ''">
    <strong>Hint</strong>
    {{ qusInfo.hint }}
  </div>
  <div class="qus_cnt">
    <div class="pb-3 h5">
      <v-radio-group v-model="model">
        <v-row v-for="(item, idx) in qusInfo.ansInfo" :key="idx" class="align-center px-4 mt-2">
          <v-radio :value="idx">
            <template #label>
              {{ idx + 1 }}. {{ item.title }}
              <p v-if="!preview" class="qus_tit text-error ml-2">연계 페이지: {{ item.relationPage ?? 0 + 1 }}</p>
            </template>
          </v-radio>
        </v-row>
      </v-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QusOutputTypes } from "@/types/diagTypes/DiagIOTypes";

const model = defineModel();

interface Props {
  qusInfo: QusOutputTypes;
  order: number;
  preview?: boolean;
}

withDefaults(defineProps<Props>(), {
  preview: false,
});
</script>
