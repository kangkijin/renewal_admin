<template>
  <div v-if="model.type == null">
    <p class="mt-3 text-h6">문항유형을 선택해주세요.</p>
    <p class="mt-3 h6">내용이 없습니다.</p>
  </div>

  <v-container v-else>
    <ChoiceInput v-if="model.type === 'CHOICE'" v-model="model"></ChoiceInput>
    <OpenInput v-else-if="model.type === 'OPEN'" v-model="model"></OpenInput>
    <ScaleInput v-else-if="model.type === 'SCALE'" v-model="model"></ScaleInput>
    <BranchInput v-else-if="model.type === 'BRANCH'" v-model="model"></BranchInput>
  </v-container>
</template>

<script setup lang="ts">
import { watch } from "vue";
import type { QusOutputTypes } from "@/types/diagTypes/DiagIOTypes";

import ChoiceInput from "../IO/ChoiceInput.vue";
import OpenInput from "../IO/OpenInput.vue";
import ScaleInput from "../IO/ScaleInput.vue";
import BranchInput from "../IO/BranchInput.vue";

const model = defineModel<QusOutputTypes>({ required: true });

/** 문항 종류 변경 감지 */
watch(
  () => model.value.type,
  () => {
    fnResetQusInfo();
  },
);

/** 문항 값 초기화 */
const fnResetQusInfo = () => {
  model.value.title = "";
  model.value.hint = "";
  model.value.order = 0;
  model.value.multiYn = "N";
  model.value.pageNo = 0;
  model.value.ansCnt = 0;
  model.value.ansInfo = [];
};
</script>
