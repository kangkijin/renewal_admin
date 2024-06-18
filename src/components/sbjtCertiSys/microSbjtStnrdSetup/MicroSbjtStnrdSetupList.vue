<template>
  <v-col cols="12">
    <BaseCard :title="'검색'">
      <v-table>
        <colgroup>
          <col style="width: 15%" />
          <col style="width: 35%" />
          <col style="width: 15%" />
          <col style="width: 35%" />
        </colgroup>
        <tbody>
          <tr>
            <th>검색 구분</th>
            <td>
              <v-autocomplete v-model="selectedItem" :items="items" item-title="title" item-value="value" />
            </td>
            <th>검색어</th>
            <td>
              <v-text-field v-model="searchInfo.searchKeyword"></v-text-field>
            </td>
          </tr>
        </tbody>
      </v-table>
      <div class="d-flex pt-4 justify-end">
        <v-btn class="mr-2" width="80">초기화</v-btn>
        <v-btn variant="flat" color="primary" width="80" v-on:click="fnGetSbjtList">검색</v-btn>
      </div>
    </BaseCard>
  </v-col>
  <v-col>
    <BaseCard>
      <div class="mb-4 text-h4">검색 결과</div>
      <BaseTableConfig
        :totalCnt="list.length"
        @update:rowPerPage="updateRowPerPage"
        checked
        :checkedCnt="selectedItems.length"
      >
        <template #right-btn-area>
          <v-btn class="mr-2">선택 추가</v-btn>
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
      </v-easy-table>
    </BaseCard>
    <BaseCard>
      <div class="mb-4 text-h4">Tab 제목 들어가야합니다.</div>
      <BaseTableConfig
        :totalCnt="list2.length"
        @update:rowPerPage="updateRowPerPage"
        checked
        :checkedCnt="selectedItems2.length"
      >
        <template #top-btn-area>
          <v-btn variant="flat" color="success">저장</v-btn>
          <v-btn>엑셀 다운로드</v-btn>
        </template>
      </BaseTableConfig>
      <v-easy-table
        ref="dataTable"
        :headers="header2"
        :items="list2"
        fixed-checkbox
        :checkbox-column-width="50"
        v-model:items-selected="selectedItems2"
      >
        <template #item-operation>
          <v-radio-group inline>
            <v-radio label="사용" class="mr-4" value="Y" v-on:change="stop(this.values)"></v-radio>
            <v-radio label="미사용" class="mr-4" value="N" v-on:change="stop(this.values)"></v-radio>
          </v-radio-group>
        </template>
      </v-easy-table>
    </BaseCard>
  </v-col>
</template>
<script lang="ts">
export default {
  data() {
    return {
      /** theme breadcrumb */
      title: "Guide - 페이지 제목",
      breadcrumbs: [
        { title: "Guide - 1depth", disabled: false },
        { title: "Guide - 2depth", disabled: true },
      ],
      items: [
        { title: "교과목 코드 / 교과목 명", value: "" },
        { title: "교과목 코드", value: "sbjtCd" },
        { title: "교과목 명", value: "sbjtNm" },
      ],
      selectedItem: "",
      comboboxOption1: {
        items: ["10개씩 보기", "50개씩 보기", "100개씩 보기"],
        value: "10개씩 보기",
      },
      header: [
        { text: "No", value: "no", sortable: true },
        { text: "교과목명", value: "sbjtNm", sortable: true },
        { text: "구분", value: "div", sortable: true },
        { text: "학점", value: "credit", sortable: true },
        { text: "교과목코드", value: "sbjtCd", sortable: true },
      ],
      header2: [
        { text: "No", value: "no", sortable: true },
        { text: "교과목명", value: "sbjtNm", sortable: true },
        { text: "구분", value: "div", sortable: true },
        { text: "학점", value: "credit", sortable: true },
        { text: "교과목코드", value: "sbjtCd", sortable: true },
        { text: "사용여부", value: "operation", sortable: false },
      ],
      list: [
        {
          no: "1",
          sbjtNm: "정수론",
          div: "융합전공",
          credit: "3",
          sbjtCd: "ABC0001",
        },
        {
          no: "2",
          sbjtNm: "블록체인개론",
          div: "전공",
          credit: "3",
          sbjtCd: "ABC0002",
        },
      ],
      list2: [
        {
          no: "1",
          sbjtNm: "정수론",
          div: "융합전공",
          credit: "3",
          sbjtCd: "ABC0001",
        },
        {
          no: "2",
          sbjtNm: "블록체인개론",
          div: "전공",
          credit: "3",
          sbjtCd: "ABC0002",
        },
      ],
      selectedItems: [],
      selectedItems2: [],
      searchInfo: {
        searchType: null,
        searchKeyword: null,
      },
    };
  },
  created: function () {
    const vm = this;
    vm.fnGetSbjtList();
    vm.fnGetGrdtSbjtList();
  },
  methods: {
    updateRowPerPage(selected: number) {
      const vm = this;
      const dataTable = vm.$refs.dataTable;
      dataTable.updateRowsPerPageActiveOption(selected);
    },
    fnGetSbjtList() {
      const vm = this;
      const param = {
        searchType: vm.selectedItem,
        searchKeyword: vm.searchInfo.searchKeyword,
      };
      vm.$axios
        .get("/api/certification/admin/subject/getSbjtList", { params: param })
        .then((res) => {
          const resData = res.data.data;
          vm.sbjtList = resData;
          vm.list = resData;
          vm.loaded = true;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    fnGetGrdtSbjtList() {
      const vm = this;
      const param = {};
      vm.$axios
        .get("/api/certification/admin/subject/getGrdtSbjtList", { params: param })
        .then((res) => {
          const resData = res.data.data;
          vm.sbjtList = resData;
          vm.list2 = resData;
          vm.loaded = true;
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
</script>
