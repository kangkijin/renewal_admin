<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-card elevation="10">
        <v-card-text>
          <v-tabs v-model="tab" bg-color="primary">
            <v-tab value="user">학생</v-tab>
            <v-tab value="prof">교수</v-tab>
            <v-tab value="staf">직원</v-tab>
            <v-tab value="otsdr">외부인</v-tab>
          </v-tabs>
          <v-card-text class="bg-grey100 mt-4 rounded-md">
            <v-window v-model="tab">
              <v-window-item value="user"><PromoProgImgUser /></v-window-item>
              <v-window-item value="prof"><PromoProgImgProf /></v-window-item>
              <v-window-item value="staf"><PromoProgImgStaf /></v-window-item>
              <v-window-item value="otsdr"><PromoProgImgOtsdr /></v-window-item>
            </v-window>
          </v-card-text>
          <div class="d-flex justify-center pt-6">
            <thumbPop :indexToPrev="this.tab" />
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import PromoProgImgOtsdr from "@/components/extraCurricularProgram/promoProgMng/promoProgImgReg/promoProgImgRegOtsdr.vue";
import PromoProgImgProf from "@/components/extraCurricularProgram/promoProgMng/promoProgImgReg/promoProgImgRegProf.vue";
import PromoProgImgStaf from "@/components/extraCurricularProgram/promoProgMng/promoProgImgReg/promoProgImgRegStaf.vue";
import PromoProgImgUser from "@/components/extraCurricularProgram/promoProgMng/promoProgImgReg/promoProgImgRegUser.vue";
import thumbPop from "@/views/admin/extraCurricularProgram/promoProgMng/promoImgReg/popup/PromoImgPrevPopup.vue";
export default {
  components: {
    thumbPop,
    PromoProgImgUser,
    PromoProgImgProf,
    PromoProgImgStaf,
    PromoProgImgOtsdr,
  },
  data() {
    return {
      tabValue: "user",
      title: "홍보이미지 등록",
      breadcrumbs: [
        { title: "비교과 프로그램", disabled: false },
        { title: "홍보이미지 등록", disabled: true },
      ],
      tab: null,
    };
  },
};
</script>
