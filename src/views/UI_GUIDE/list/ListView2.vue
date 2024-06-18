<!-- 
  checkbox 참고 사이트 주소 : 
  https://vuetifyjs.com/en/components/checkboxes/#usage
  
  radio 참고 사이트 주소 : 
  https://vuetifyjs.com/en/components/radio-buttons/#usage
-->
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
              <th>학년도</th>
              <td>
                <v-autocomplete v-model="selectOption1.value" :items="selectOption1.year"></v-autocomplete>
              </td>
              <th>체크박스 사용</th>
              <td>
                <div class="d-flex">
                  <v-checkbox v-model="checkbox" class="flex-0-0 mr-4" label="전체" />
                  <v-checkbox v-model="checkbox2" class="flex-0-0 mr-4" label="사용" />
                  <v-checkbox v-model="checkbox3" class="flex-0-0" label="미사용" />
                </div>
              </td>
            </tr>
            <tr>
              <th>라디오 사용</th>
              <td colspan="4">
                <v-radio-group inline>
                  <v-radio label="Radio One" class="mr-4" value="one"></v-radio>
                  <v-radio label="Radio Two" class="mr-4" value="two"></v-radio>
                  <v-radio label="Radio Three" value="three"></v-radio>
                </v-radio-group>
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
          <div class="text-h4">검색 결과</div>
        </template>

        <BaseTableConfig
          :totalCnt="list.length"
          checked
          :checkedCnt="selectedItems.length"
          @update:rowPerPage="updateRowPerPage"
        >
          <template #top-btn-area>
            <v-btn class="mr-2">전년도 목록 복사</v-btn>
            <v-btn class="mr-2">양식 다운로드</v-btn>
            <v-btn class="mr-2">파일 업로드</v-btn>
            <v-btn>엑셀 다운로드</v-btn>
          </template>
          <template #left-btn-area>
            <v-btn color="grey" class="mr-2">삭제</v-btn>
            <v-btn color="grey" class="mr-2">사용</v-btn>
            <v-btn color="grey">미사용</v-btn>
          </template>
          <template #right-btn-area>
            <!-- snackbar 사용 -->
            <v-snackbar color="error">
              <template v-slot:activator="{ props }">
                <v-btn variant="tonal" color="error" class="mr-2" v-bind="props">부정</v-btn>
              </template>
              <p class="text-center">부정 Alert</p>
            </v-snackbar>
            <v-snackbar color="warning">
              <template v-slot:activator="{ props }">
                <v-btn variant="tonal" class="mr-2" color="warning" v-bind="props">경고</v-btn>
              </template>
              <p class="text-center">경고 Alert</p>
            </v-snackbar>
            <v-snackbar>
              <template v-slot:activator="{ props }">
                <v-btn variant="tonal" class="mr-2" v-bind="props">중립</v-btn>
              </template>
              <p class="text-center">중립 Alert</p>
            </v-snackbar>
            <v-snackbar color="secondary">
              <template v-slot:activator="{ props }">
                <v-btn variant="tonal" color="secondary" v-bind="props">긍정</v-btn>
              </template>
              <p class="text-center">긍정 Alert</p>
            </v-snackbar>
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
          <template #item-operation>
            <v-btn size="small">퇴근</v-btn>
          </template>
        </v-easy-table>
      </BaseCard>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  data: () => ({
    /** theme breadcrumb */
    title: "Guide - Check, Radio",
    breadcrumbs: [
      { title: "Guide - 1depth", disabled: false },
      { title: "Guide - 2depth", disabled: true },
    ],
    selectOption1: {
      year: ["2024", "2023", "2022"],
      value: "2024",
    },
    checkbox: true,
    checkbox2: false,
    checkbox3: false,

    header: [
      { text: "학년도", value: "year", sortable: true },
      { text: "학기", value: "smstr", sortable: true },
      { text: "교과목", value: "sbjtKorNm", sortable: true },
      { text: "역량", value: "name", sortable: true },
      { text: "점수", value: "coreScore", sortable: true },
      { text: "관리", value: "operation" },
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
    selectedItems: [],
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
