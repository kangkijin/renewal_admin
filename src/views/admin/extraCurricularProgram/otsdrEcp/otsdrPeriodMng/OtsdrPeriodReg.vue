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
          <OtsdrPeriodRegBasicInfo />
        </v-window-item>
        <v-window-item value="addInfo">
          <OtsdrPeriodRegAddInfo />
        </v-window-item>
        <v-window-item value="attentSetup">
          <OtsdrPeriodRegAttentSetup />
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import OtsdrPeriodRegBasicInfo from "@/components/extraCurricularProgram/otsdrEcp/otsdrPeriodMng/OtsdrPeriodRegBasicInfo.vue";
import OtsdrPeriodRegAddInfo from "@/components/extraCurricularProgram/otsdrEcp/otsdrPeriodMng/OtsdrPeriodRegAddInfo.vue";
import OtsdrPeriodRegAttentSetup from "@/components/extraCurricularProgram/otsdrEcp/otsdrPeriodMng/OtsdrPeriodRegAttentSetup.vue";

export default {
  components: {
    OtsdrPeriodRegBasicInfo,
    OtsdrPeriodRegAddInfo,
    OtsdrPeriodRegAttentSetup,
  },
  data: () => ({
    /** theme breadcrumb */
    title: "차수 등록",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(외부인)", disabled: false },
      { title: "차수 관리", disabled: true },
    ],
    /** tab */
    tab: null,
  }),
};
</script>
