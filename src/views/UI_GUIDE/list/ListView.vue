<!-- 
  button 참고 사이트 주소 : 
  https://vuetifyjs.com/en/components/buttons/#usage
  
  combobox 참고 사이트 주소 : 
  https://vuetifyjs.com/en/components/combobox/#usage
-->
<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
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
              <th>학년도</th>
              <td>
                <v-autocomplete v-model="selectOption1.value" :items="selectOption1.year" />
              </td>
              <th>대학</th>
              <td>
                <v-autocomplete placeholder="선택" :items="selectOption2.university" />
              </td>
            </tr>
            <tr>
              <th>학과</th>
              <td>
                <v-autocomplete placeholder="선택" :items="selectOption3.depart" />
              </td>
              <th>input 예시</th>
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
        <template v-slot:title>
          <div class="d-flex align-center">
            <div class="text-h4">검색 결과 제목 (툴팁 필요시 우측 사용)</div>
            <v-avatar class="mx-2" size="20" color="primary">
              <v-icon style="font-size: 14px">mdi-exclamation-thick</v-icon>
              <v-tooltip>
                툴팁 내용이 보여집니다<br />
                화이팅
              </v-tooltip>
            </v-avatar>
          </div>
        </template>

        <BaseTableConfig :totalCnt="list.length" @update:rowPerPage="updateRowPerPage"> </BaseTableConfig>
        <v-easy-table ref="dataTable" :headers="header" :items="list"></v-easy-table>
      </BaseCard>
    </v-col>
  </v-row>
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
      year: ["2024", "2023", "2022"],
      value: "2024",
    },
    selectOption2: {
      university: ["서울대학교", "대학교1", "대학교2"],
    },
    selectOption3: {
      depart: ["학과1", "학과2", "학과3"],
    },
    comboboxOption1: {
      items: ["10개씩 보기", "50개씩 보기", "100개씩 보기"],
      value: "10개씩 보기",
    },

    header: [
      { text: "학년도", value: "year", sortable: true },
      { text: "학기", value: "smstr", sortable: true },
      { text: "교과목", value: "sbjtKorNm", sortable: true },
      { text: "역량", value: "name", sortable: true },
      { text: "점수", value: "coreScore", sortable: true },
    ],
    list: [
      {
        year: "2024",
        smstr: "1학기",
        sbjtKorNm: "정수론",
        name: "역량쓰",
        coreScore: "1",
      },
      {
        year: "2024",
        smstr: "1학기",
        sbjtKorNm: "정수론",
        name: "2역량쓰",
        coreScore: "2",
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
