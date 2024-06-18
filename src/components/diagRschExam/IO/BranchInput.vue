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
        <v-col cols="12" md="10" class="d-flex align-center">
          <span class="d-flex align-center ml-3 text-h6">{{ idx + 1 }}</span>
          <v-text-field class="ml-3 px-2" v-model="answer.title" placeholder="보기내용을 입력해주세요."></v-text-field>
          <v-btn class="ml-2"> 파일 추가 </v-btn>
        </v-col>
        <v-col md="12" class="d-flex align-center">
          <v-spacer></v-spacer>
          <p>연계문항 페이지</p>
          <v-text-field
            type="number"
            hideSpinButtons
            readonly
            class="flex-0-0 mr-2 ml-2"
            placeholder="문항 추가 시 설정됩니다"
            style="width: 200px"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import type { QusOutputTypes } from "@/types/diagTypes/DiagIOTypes";

const model = defineModel<QusOutputTypes>({ required: true });
/** 분기형 문항은 보기를 사용하므로 기본 값을 넣어주고 시작한다. */
onMounted(() => {
  model.value.ansInfo.push({ title: "", order: 0, relationPage: null });
  model.value.ansInfo.push({ title: "", order: 1, relationPage: null });
});
</script>
