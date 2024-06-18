<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "외부인회원관리",
    breadcrumbs: [
      { title: "시스템관리", disabled: false },
      { title: "외부인관리", disabled: true },
    ],
  }),
};
</script>
