<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "마일리지 획득 현황 (학생별)",
    breadcrumbs: [
      { title: "대학인증", disabled: false },
      { title: "마일리지", disabled: true },
    ],
  }),
};
</script>
