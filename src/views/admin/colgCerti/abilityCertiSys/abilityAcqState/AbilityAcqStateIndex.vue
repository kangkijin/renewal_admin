<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "취득 현황",
    breadcrumbs: [
      { title: "대학인증", disabled: false },
      { title: "역량 인증제", disabled: true },
    ],
  }),
};
</script>
