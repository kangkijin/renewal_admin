<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-tabs v-model="tab" color="primary" align-tabs="center">
        <v-tab value="one">PO 1</v-tab>
        <v-tab value="two">PO 2</v-tab>
        <v-tab value="three">PO 3</v-tab>
        <v-tab value="four">PO 4</v-tab>
        <v-tab value="five">PO 5</v-tab>
        <v-tab value="six">PO 6</v-tab>
        <v-tab value="seven">PO 7</v-tab>
        <v-tab value="eight">PO 8</v-tab>
        <v-tab value="nine">PO 9</v-tab>
      </v-tabs>
      <v-card-text class="bg-grey100 mt-4 rounded-md">
        <v-window v-model="tab">
          <v-window-item v-for="item in tabItems" :key="item.value" :value="item.value">
            <MicroSbjtStnrdSetupList v-if="tab === item.value" />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-col>
  </v-row>
  <v-row class="mt-1">
    <v-col class="d-flex align-center">
      <v-spacer></v-spacer>
      <p class="mr-4 text-error">최종수정일</p>
      <v-btn variant="flat" color="success" width="80">저장</v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import MicroSbjtStnrdSetupList from "@/components/sbjtCertiSys/microSbjtStnrdSetup/MicroSbjtStnrdSetupList.vue";

export default {
  components: { MicroSbjtStnrdSetupList },
  data: () => ({
    title: "교과 및 기준 설정(간호PO)",
    breadcrumbs: [
      { title: "대학인증", disabled: false },
      { title: "교과 인증제", disabled: true },
    ],
    selectOption1: {
      year: ["2024", "2023", "2022"],
      value: "2024",
    },
    tab: "one",
    tabItems: [
      { value: "one" },
      { value: "two" },
      { value: "three" },
      { value: "four" },
      { value: "five" },
      { value: "six" },
      { value: "seven" },
      { value: "eight" },
      { value: "nine" },
    ],
  }),
};
</script>
