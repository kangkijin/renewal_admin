<template>
  <v-row>
    <v-col cols="12" md="2" class="d-flex align-center text-h6">
      <span class="required">척도 수</span>
    </v-col>
    <v-col cols="12" md="10" class="d-flex align-center">
      <v-text-field
        :disabled="disabled"
        type="number"
        class="flex-0-0"
        hideSpinButtons
        :rules="[(v: any) => !!v && parseInt(v) >= 2 && parseInt(v) <= 10]"
        @input="restrictInt"
        v-model="dapAnsCnt"
      ></v-text-field>
      <span class="ml-2">개</span>
      <span class="ml-2">(최소 2개 ~ 최대 10개까지 입력가능합니다.)</span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
defineProps({
  disabled: { type: Boolean, default: false },
});

const dapAnsCnt = defineModel();

/** 정수형으로 제한 */
const restrictInt = () => {
  const formatted = parseInt(String(dapAnsCnt.value).replace(/\D/g, ""));
  dapAnsCnt.value = formatted;
};
</script>
