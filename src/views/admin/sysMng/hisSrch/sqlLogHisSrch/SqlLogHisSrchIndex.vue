<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "SQL 로그 기록조회",
    breadcrumbs: [
      { title: "시스템관리", disabled: false },
      { title: "이력조회", disabled: true },
    ],
  }),
};
</script>
