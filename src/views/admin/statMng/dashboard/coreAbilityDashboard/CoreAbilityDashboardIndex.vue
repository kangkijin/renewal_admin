<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "핵심역량 대시보드",
    breadcrumbs: [
      { title: "통계 관리", disabled: false },
      { title: "대시보드", disabled: true },
    ],
  }),
};
</script>
