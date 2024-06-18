<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "요인 및 기준 등록",
    breadcrumbs: [
      { title: "중도탈락방지", disabled: false },
      { title: "중도탈락기준관리", disabled: true },
    ],
  }),
};
</script>
