<template>
  <BaseBreadcrumb :title="$t(title)" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="6">
      <BaseCard title="권한 목록" min-height="600">
        <v-easy-table :headers="roleHeader" :items="roleList"></v-easy-table>
      </BaseCard>
    </v-col>
    <v-col cols="12" md="6">
      <BaseCard title="메뉴 목록" min-height="600">
        <v-check-tree-view v-model="list"></v-check-tree-view>
      </BaseCard>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import menuList from "@/components/system/_mockup/menuList.json";
import VCheckTreeView from "@/components/system/treeview/VCheckTreeView.vue";

export default {
  components: {
    VCheckTreeView,
  },
  data: () => ({
    list: menuList,
    title: "roleByMenu",
    breadcrumbs: [
      { title: "Guide", disabled: false },
      { title: "Tree", disabled: true },
    ],
    roleList: [
      {
        roleId: "ROLE00000001",
        roleCode: "AUTHENTIC",
        roleNm: "개발자 권한",
        menuCnt: 189,
      },
      {
        roleId: "ROLE00000002",
        roleCode: "READY",
        roleNm: "권한부여준비",
        menuCnt: 1,
      },
    ],
    roleHeader: [
      { text: "코드", value: "roleCode", sortable: true },
      { text: "권한 명", value: "roleNm", sortable: true },
      { text: "메뉴 수", value: "menuCnt", sortable: true },
      { text: "관리", value: "operation" },
    ],
  }),
  watch: {
    list: {
      deep: true,
      handler(value) {
        console.log(value);
      },
    },
  },
};
</script>
