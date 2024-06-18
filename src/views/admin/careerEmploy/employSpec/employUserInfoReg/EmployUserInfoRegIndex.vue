<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "취업생 정보 등록",
    breadcrumbs: [
      { title: "진로ㆍ취업", disabled: false },
      { title: "취업스펙", disabled: true },
    ],
  }),
};
</script>
