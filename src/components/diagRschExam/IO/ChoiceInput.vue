<template>
  <v-row>
    <v-col cols="12" md="2" class="d-flex align-center text-h6">
      <span class="required">문항 내용 입력</span>
    </v-col>
    <v-col cols="12" md="10" class="d-flex">
      <span class="d-flex align-center mr-1 text-h6">질문</span>
      <v-text-field v-model="model.title" class="mx-2" placeholder="질문내용을 입력해주세요."></v-text-field>
      <v-btn class="ml-2">파일 추가</v-btn>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="2" class="d-flex align-center text-h6"> 힌트 내용 입력 </v-col>
    <v-col cols="12" md="10" class="d-flex align-center">
      <span class="d-flex align-center text-h6">Hint</span>
      <v-text-field v-model="model.hint" class="mx-2" placeholder="Hint내용을 입력해주세요."></v-text-field>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-row v-for="(answer, idx) in model.ansInfo" :key="idx">
        <v-col cols="12" md="2" class="d-flex align-center text-h6">
          <span class="required" v-if="idx === 0">보기 내용 입력</span>
        </v-col>
        <v-col cols="12" md="10" class="d-flex align-center py-1">
          <span class="d-flex align-center ml-3 text-h6">{{ answer.order + 1 }}</span>
          <v-text-field class="ml-3 px-2" placeholder="보기내용을 입력해주세요." v-model="answer.title"></v-text-field>
          <PlusButton v-if="idx === 0" @click="insertRow()"></PlusButton>
          <MinusButton v-else-if="idx !== 0" @click="deleteRow(idx)"></MinusButton>
          <v-btn class="ml-2">파일 추가</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="2" class="d-flex align-center text-h6">
      <span class="required">복수응답</span>
    </v-col>
    <v-col cols="12" md="10">
      <v-radio-group v-model="model.multiYn" inline>
        <v-radio label="미사용" class="mr-4" value="N" density="compact"></v-radio>
        <v-radio label="사용" class="mr-4" value="Y" density="compact"></v-radio>
      </v-radio-group>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import type { QusOutputTypes, AnsOuputTypes } from "@/types/diagTypes/DiagIOTypes";

import { PlusButton, MinusButton } from "./buttons/ButtonsImport";

onMounted(() => {
  /** 객관식 문항은 보기를 사용하므로 기본 값을 하나 넣어주고 시작한다. */
  model.value.ansInfo.push({
    title: "",
    order: 0,
  });
});

const model = defineModel<QusOutputTypes>({ required: true });

/** 보기 내용 추가 */
const insertRow = () => {
  const defaultSurveyQus: AnsOuputTypes = { title: "", order: model.value.ansInfo.length };
  model.value.ansInfo.push(defaultSurveyQus);
};

/** 보기 내용 삭제 */
const deleteRow = (idx: any) => {
  const tempArr1 = model.value.ansInfo.slice(0, idx);
  const tempArr2 = model.value.ansInfo.slice(idx + 1, model.value.ansInfo.length);
  model.value.ansInfo = [...tempArr1, ...tempArr2];
};
</script>
