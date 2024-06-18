<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-tabs v-model="tab" color="primary" align-tabs="center">
        <v-tab value="one">인증 완료 조회</v-tab>
        <v-tab value="two">인증 현황 조회</v-tab>
      </v-tabs>
      <v-card-text class="bg-grey100 mt-4 rounded-md">
        <v-window v-model="tab">
          <v-window-item value="one">
            <CmpltCert />
          </v-window-item>
          <v-window-item value="two">
            <CertiState />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import CertiState from "../../../../../components/sbjtCertiSys/microCertiState/MicroCertiState.vue";
import CmpltCert from "../../../../../components/sbjtCertiSys/microCertiState/MicroCmpltCerti.vue";

export default {
  components: { CmpltCert, CertiState },
  data: () => ({
    title: "인증 현황(마이크로디그리)",
    breadcrumbs: [
      { title: "대학인증", disabled: false },
      { title: "교과 인증제", disabled: true },
    ],
    tab: "one",
  }),
};
</script>
