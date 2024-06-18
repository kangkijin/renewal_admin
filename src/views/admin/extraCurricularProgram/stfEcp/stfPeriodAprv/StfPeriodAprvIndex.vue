<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "차수 승인",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(직원)", disabled: true },
    ],
  }),
};
</script>
