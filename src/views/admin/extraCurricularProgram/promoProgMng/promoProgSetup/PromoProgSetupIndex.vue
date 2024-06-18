<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <BaseCard :title="'홍보 프로그램 등록'">
        <v-window v-model="tab">
          <div class="text-h4"></div>
          <div class="d-flex align-center" style="margin: 10px">
            <v-tabs v-model="tab" color="primary" align-tabs="center">
              <v-tab value="user">학생</v-tab>
              <v-tab value="prof">교수</v-tab>
              <v-tab value="staf">직원</v-tab>
              <v-tab value="otsdr">외부인</v-tab>
            </v-tabs>
          </div>
          <v-window-item value="user">
            <PromoProgRegUser />
          </v-window-item>
          <v-window-item value="prof">
            <PromoProgRegProf />
          </v-window-item>
          <v-window-item value="staf">
            <PromoProgRegStaf />
          </v-window-item>
          <v-window-item value="otsdr">
            <PromoProgRegOtsdr />
          </v-window-item>
        </v-window>
      </BaseCard>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import PromoProgRegUser from "@/components/extraCurricularProgram/promoProgMng/promoProgSetup/PromoProgRegUser.vue";
import PromoProgRegStaf from "@/components/extraCurricularProgram/promoProgMng/promoProgSetup/PromoProgRegStaf.vue";
import PromoProgRegProf from "@/components/extraCurricularProgram/promoProgMng/promoProgSetup/PromoProgRegProf.vue";
import PromoProgRegOtsdr from "@/components/extraCurricularProgram/promoProgMng/promoProgSetup/PromoProgRegOtsdr.vue";
export default {
  components: {
    PromoProgRegUser,
    PromoProgRegStaf,
    PromoProgRegProf,
    PromoProgRegOtsdr,
  },
  data() {
    return {
      title: "홍보프로그램 설정",
      breadcrumbs: [
        { title: "비교과프로그램", disabled: false },
        { title: "홍보프로그램 관리", disabled: true },
      ],
      /**  tab */
      tab: null,
    };
  },
};
</script>
