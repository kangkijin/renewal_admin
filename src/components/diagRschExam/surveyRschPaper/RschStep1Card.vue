<template>
  <v-row>
    <v-col cols="12" md="2" class="d-flex align-center text-h6">
      <span class="required">문항유형 선택</span>
    </v-col>
    <v-col cols="12" md="4">
      <v-select :items="typeItem" v-model="selected" placeholder="선택" @update:model-value="onUpdateSelected()">
      </v-select>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, watch, getCurrentInstance } from "vue";
import type { QusOutputTypes, qusTypes } from "@/types/diagTypes/DiagIOTypes";

const instance = getCurrentInstance();
if (!instance) {
  throw new Error("getCurrentInstance returned null");
}
const vm = instance.appContext.config.globalProperties;

/** 외부 통신할 문항 정보  */
const model = defineModel<QusOutputTypes>({ required: true });

/** 선택된 문항종류 (작성한 값 있는지 확인 후 되돌리기 로직을 위해 추가) */
const selected = ref(null as qusTypes | null);

/** 외부에서 선택된 값 초기화 시 연동 */
watch(model, () => {
  if (model.value.type === null) selected.value = null;
});

/** 설문조사 문항 종류 */
const typeItem = [
  { title: "객관식", value: "CHOICE" },
  { title: "주관식", value: "OPEN" },
  { title: "척도형", value: "SCALE" },
  { title: "분기문항", value: "BRANCH" },
];

/** 작성한 값이 있는지 확인  */
const fnChkInsertedData = () => {
  let insertCnt = ref(0);
  const qusInfo: QusOutputTypes = model.value;

  if (!vm.$StringUtil.isEmpty(qusInfo.title)) insertCnt.value++;
  if (!vm.$StringUtil.isEmpty(qusInfo.hint)) insertCnt.value++;
  if (qusInfo.ansInfo.length > 1) insertCnt.value++;

  qusInfo.ansInfo.forEach((ansInfo) => {
    if (!vm.$StringUtil.isEmpty(ansInfo.title)) insertCnt.value++;
  });

  return insertCnt.value > 0 ? true : false;
};

/** 문항유형 선택 값 변경 시 확인 */
const onUpdateSelected = () => {
  if (model.value.type === null || !fnChkInsertedData()) {
    model.value.type = selected.value;
  } else {
    vm.$confirm(
      "문항 유형 변경 시 작성한 값이 있다면 초기화됩니다.<br />진행하시겠습니까?",
      "확인",
      (isConfirm: boolean) => {
        if (isConfirm) {
          model.value.type = selected.value;
        } else {
          selected.value = model.value.type;
        }
      },
    );
  }
};
</script>
