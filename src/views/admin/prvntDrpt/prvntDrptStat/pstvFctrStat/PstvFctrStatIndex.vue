<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "긍정요인 통계",
    breadcrumbs: [
      { title: "중도탈락방지", disabled: false },
      { title: "중도탈락 통계", disabled: true },
    ],
  }),
};
</script>
