<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "알림 관리",
    breadcrumbs: [
      { title: "커뮤니케이션", disabled: false },
      { title: "알림", disabled: true },
    ],
  }),
};
</script>
