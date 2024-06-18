<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "진단ㆍ조사ㆍ시험 통계",
    breadcrumbs: [
      { title: "통계 관리", disabled: false },
      { title: "업무 통계", disabled: true },
    ],
  }),
};
</script>
