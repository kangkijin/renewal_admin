<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "단과대학별 취업률",
    breadcrumbs: [
      { title: "진로ㆍ취업", disabled: false },
      { title: "KEDI 취업통계 조회", disabled: true },
    ],
  }),
};
</script>
