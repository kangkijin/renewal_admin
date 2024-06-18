<template>
  <BaseBreadcrumb :title="$t(title)" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="6">
      <BaseCard title="메뉴 목록" min-height="600">
        <VTreeView :list="list" v-model="selected"></VTreeView>
      </BaseCard>
    </v-col>
    <v-col cols="12" md="6">
      <BaseCard title="메뉴 상세" min-height="600">
        {{ selected === "" ? "메뉴를 선택해주세요" : selected }}
      </BaseCard>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import VTreeView from "@/components/system/treeview/VTreeView.vue";
import menuList from "@/components/system/_mockup/menuList.json";
export default {
  components: {
    VTreeView,
  },
  data: () => ({
    title: "roleByMenu",
    breadcrumbs: [
      { title: "Guide", disabled: false },
      { title: "Tree", disabled: true },
    ],
    selected: "",
    list: menuList,
  }),
};
</script>
