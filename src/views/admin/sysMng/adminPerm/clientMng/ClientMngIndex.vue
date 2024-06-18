<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "사용자관리",
    breadcrumbs: [
      { title: "시스템관리", disabled: false },
      { title: "관리자권한", disabled: true },
    ],
  }),
};
</script>
