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
</template>

<script setup lang="ts">
import type { QusOutputTypes } from "@/types/diagTypes/DiagIOTypes";

const model = defineModel<QusOutputTypes>({ required: true });
</script>
