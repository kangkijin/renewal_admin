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
              <v-autocomplete v-model="selectOption1.value" :items="selectOption1.year" />
            </td>
            <th>검색어</th>
            <td>
              <v-text-field></v-text-field>
            </td>
          </tr>
        </tbody>
      </v-table>
      <div class="d-flex pt-4 justify-end">
        <v-btn class="mr-2" width="80">초기화</v-btn>
        <v-btn variant="flat" color="primary" width="80">검색</v-btn>
      </div>
    </BaseCard>
  </v-col>
  <v-col>
    <BaseCard>
      <BaseTableConfig :totalCnt="list.length" @update:rowPerPage="updateRowPerPage"> </BaseTableConfig>
      <v-easy-table ref="dataTable" :headers="header" :items="list">
        <template #item-operation>
          <v-btn size="small">상세보기</v-btn>
        </template>
      </v-easy-table>
    </BaseCard>
  </v-col>
</template>
<script lang="ts">
export default {
  data: () => ({
    /** theme breadcrumb */
    title: "Guide - 페이지 제목",
    breadcrumbs: [
      { title: "Guide - 1depth", disabled: false },
      { title: "Guide - 2depth", disabled: true },
    ],
    selectOption1: {
      year: ["전체", "대학", "학과", "학생명"],
      value: "전체",
    },
    comboboxOption1: {
      items: ["10개씩 보기", "50개씩 보기", "100개씩 보기"],
      value: "10개씩 보기",
    },

    header: [
      { text: "No", value: "no", sortable: true },
      { text: "학번", value: "userId", sortable: true },
      { text: "학생명", value: "name", sortable: true },
      { text: "단과대학", value: "dangua", sortable: true },
      { text: "학부(과)", value: "hakbu", sortable: true },
      { text: "완료일", value: "cmpltDate", sortable: true },
      { text: "관리", value: "operation", sortable: false },
    ],
    list: [
      {
        no: "1",
        userId: "2020123456",
        name: "김철수",
        dangua: "공과대학",
        hakbu: "컴퓨터공학과",
        cmpltDate: "20230930",
      },
      {
        no: "2",
        userId: "2016123456",
        name: "이철수",
        dangua: "간호대학",
        hakbu: "간호학과",
        cmpltDate: "20200302",
      },
      {
        no: "3",
        userId: "2018123456",
        name: "박철수",
        dangua: "인문대학",
        hakbu: "1",
        cmpltDate: "20210403",
      },
    ],
  }),
  methods: {
    updateRowPerPage(selected: number) {
      const vm = this;
      const dataTable = vm.$refs.dataTable;
      dataTable.updateRowsPerPageActiveOption(selected);
    },
  },
};
</script>
