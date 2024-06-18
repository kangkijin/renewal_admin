<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-tabs v-model="tab" color="primary" align-tabs="start">
        <v-tab value="basicInfo">기본정보</v-tab>
        <v-tab value="addInfo">추가정보</v-tab>
        <v-tab value="attentSetup">입과자 설정</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="basicInfo">
          <!-- 기본정보 페이지 -->
          <StfPeriodRegBasicInfo />
        </v-window-item>
        <v-window-item value="addInfo">
          <StfPeriodRegAddInfo />
        </v-window-item>
        <v-window-item value="attentSetup">
          <StfPeriodRegAttentSetup />
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import StfPeriodRegBasicInfo from "@/components/extraCurricularProgram/stfEcp/stfPeriodMng/StfPeriodRegBasicInfo.vue";
import StfPeriodRegAddInfo from "@/components/extraCurricularProgram/stfEcp/stfPeriodMng/StfPeriodRegAddInfo.vue";
import StfPeriodRegAttentSetup from "@/components/extraCurricularProgram/stfEcp/stfPeriodMng/StfPeriodRegAttentSetup.vue";

export default {
  components: {
    StfPeriodRegBasicInfo,
    StfPeriodRegAddInfo,
    StfPeriodRegAttentSetup,
  },
  data: () => ({
    /** theme breadcrumb */
    title: "차수 등록",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(직원)", disabled: false },
      { title: "차수 관리", disabled: true },
    ],
    /** tab */
    tab: null,
  }),
};
</script>
