<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "학과명 이력 관리",
    breadcrumbs: [
      { title: "진로ㆍ취업", disabled: false },
      { title: "대학취업률 관리", disabled: true },
    ],
  }),
};
</script>
