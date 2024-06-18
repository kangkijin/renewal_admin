<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "연도별 취업통계",
    breadcrumbs: [
      { title: "진로ㆍ취업", disabled: false },
      { title: "정보공시 취업통계", disabled: true },
    ],
  }),
};
</script>
