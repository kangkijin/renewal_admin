<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-tabs v-model="tab" color="primary" align-tabs="start">
        <v-tab value="basicInfo">기본 정보</v-tab>
        <v-tab value="addInfo">역량·마일리지·추천설정</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="basicInfo">
          <OtsdrCurriRegBasicInfo />
        </v-window-item>
        <v-window-item value="addInfo">
          <OtsdrCurriRegAddInfo />
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import OtsdrCurriRegBasicInfo from "@/components/extraCurricularProgram/otsdrEcp/otsdrCurriMng/OtsdrCurriRegBasicInfo.vue";
import OtsdrCurriRegAddInfo from "@/components/extraCurricularProgram/otsdrEcp/otsdrCurriMng/OtsdrCurriRegAddInfo.vue";

export default {
  components: {
    OtsdrCurriRegBasicInfo,
    OtsdrCurriRegAddInfo,
  },
  data: () => ({
    /** theme breadcrumb */
    title: "과정 등록",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(외부인)", disabled: false },
      { title: "과정 관리", disabled: true },
    ],
    /** tab */
    tab: null,
  }),
};
</script>
