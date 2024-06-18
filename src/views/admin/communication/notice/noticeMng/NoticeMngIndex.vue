<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "공지사항 관리",
    breadcrumbs: [
      { title: "커뮤니케이션", disabled: false },
      { title: "공지사항", disabled: true },
    ],
  }),
};
</script>
