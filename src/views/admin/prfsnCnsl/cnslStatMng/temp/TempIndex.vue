<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <BaseCard>
        <template v-slot:title>
          <div class="d-flex align-center">
            <div class="text-h6">추후 개발 예정 메뉴</div>
          </div>
        </template>
      </BaseCard>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  data: () => ({
    title: "상담구분별 상담사별 통계",
    breadcrumbs: [
      { title: "전문상담", disabled: false },
      { title: "상담통계관리", disabled: true },
    ],
  }),
};
</script>
