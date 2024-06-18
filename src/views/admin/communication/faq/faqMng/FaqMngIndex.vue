<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "FAQ 관리",
    breadcrumbs: [
      { title: "커뮤니케이션", disabled: false },
      { title: "FAQ", disabled: true },
    ],
  }),
};
</script>
