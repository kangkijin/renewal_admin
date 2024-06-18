<template>
  <div class="qus_header">
    <strong class="qus_num">{{ order + 1 < 10 ? `0${order + 1}` : order + 1 }}.</strong>
    <p class="qus_tit">{{ qusInfo.title }}</p>
  </div>
  <div class="hint_wrap mb-0" v-if="qusInfo.hint?.trim() !== ''">
    <strong>Hint</strong>
    {{ qusInfo.hint }}
  </div>
  <div class="qus_cnt">
    <div class="pb-3 h5">
      <v-radio-group v-model="model">
        <v-row v-for="(item, idx) in qusInfo.ansInfo" :key="idx" class="align-center px-4 mt-2">
          <v-radio multiple :label="`${idx + 1}. ${item.title}`" :value="idx"></v-radio>
        </v-row>
      </v-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import type { QusOutputTypes } from "@/types/diagTypes/DiagIOTypes";

const props = defineProps<{ qusInfo: QusOutputTypes; order: number }>();
const model = defineModel({ type: Array, default: [] });

watch(model, () => {
  let answerCnt = 1;
  if (props.qusInfo.multiYn === "Y") {
    answerCnt = 2;
  }

  if (model.value.length > answerCnt) model.value.shift();
});
</script>
