<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <BaseCard title="검색">
        <v-table>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: 35%" />
            <col style="width: 15%" />
            <col style="width: 35%" />
          </colgroup>
          <tbody>
            <tr>
              <th>카테고리 명</th>
              <td>
                <v-text-field v-model="search.categoryNm"></v-text-field>
              </td>
              <th>사용여부</th>
              <td>
                <v-radio-group v-model="search.useYn" inline>
                  <v-radio value="all" class="flex-0-0 mr-4" label="전체" />
                  <v-radio value="useY" class="flex-0-0 mr-4" label="사용" />
                  <v-radio value="useN" class="flex-0-0" label="미사용" />
                </v-radio-group>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="d-flex pt-4 justify-end">
          <v-btn color="grey" width="80" @click="onClickReset">초기화</v-btn>
          <v-btn color="blue" width="80">검색</v-btn>
        </div>
      </BaseCard>
    </v-col>
    <v-col col="12">
      <BaseCard>
        <template v-slot:title>
          <div class="text-h4">
            카테고리 목록
            <v-avatar class="mr-1 bg-primary" size="18">
              <v-icon style="font-size: 12px">mdi-exclamation-thick</v-icon>
              <v-tooltip
                >카테고리 등록 후, 과정이 매핑된 경우 삭제가 불가능합니다. 카테고리 일괄 변경이 필요할 경우, SR 문의
                해주세요</v-tooltip
              >
            </v-avatar>
          </div>
        </template>
        <BaseTableConfig
          :totalCnt="list.length"
          checked
          :checkedCnt="selectedItems.length"
          @update:rowPerPage="updateRowPerPage"
        >
          <template #top-btn-area>
            <!-- 카테고리 등록버튼 -->
            <StfCategoryRegPop />
          </template>
          <template #left-btn-area>
            <v-btn color="grey" class="mr-2" :disabled="selectedItems.length === 0">삭제</v-btn>
            <v-btn color="grey" class="mr-2">사용</v-btn>
            <v-btn color="grey">미사용</v-btn>
          </template>
        </BaseTableConfig>
        <v-easy-table
          ref="dataTable"
          :headers="header"
          :items="list"
          fixed-checkbox
          :checkbox-column-width="50"
          v-model:items-selected="selectedItems"
        >
          <template #item-operation="item">
            <!-- 카테고리 수정버튼 -->
            <StfCategoryModifyPop :tableItem="item" />
          </template>
        </v-easy-table>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import StfCategoryRegPop from "./popup/StfCategoryRegPopup.vue";
import StfCategoryModifyPop from "./popup/StfCategoryModifyPopup.vue";

export default {
  components: {
    StfCategoryRegPop,
    StfCategoryModifyPop,
  },
  data: () => ({
    title: "카테고리 관리",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(직원)", disabled: true },
    ],
    search: {
      categoryNm: "",
      useYn: null,
    },

    /** easydatatable */
    itemsSelected: [],
    tableItem: { type: Map },
    header: [
      { text: "No", value: "no", sortable: false, width: 40 },
      { text: "카테고리명", value: "ecmTitle", sortable: true, width: 300 },
      { text: "사용여부", value: "ecmYn", sortable: true, width: 90 },
      { text: "등록일", value: "regDate", sortable: true, width: 90 },
      { text: "관리", value: "operation", width: 50 },
    ],
    list: [
      {
        number: "1",
        cate: "취업",
        usage: "사용",
        regDate: "2023/03/02",
        code: "11111",
        context: "설명설명1",
        coreScore: "1",
      },
      {
        number: "2",
        cate: "창업",
        usage: "미사용",
        regDate: "2023/03/09",
        code: "22222",
        context: "설명설명2",
        coreScore: "2",
      },
    ],

    selectedItems: [],
  }),
  methods: {
    updateRowPerPage(selected: number) {
      const vm = this;
      const dataTable = vm.$refs.dataTable;
      dataTable.updateRowsPerPageActiveOption(selected);
    },
    onClickReset() {
      const vm = this;
      vm.search.categoryNm = "";
      vm.search.useYn = "all";
    },
  },
};
</script>
