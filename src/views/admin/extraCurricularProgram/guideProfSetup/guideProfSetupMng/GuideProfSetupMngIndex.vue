<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <BaseCard title="">
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
                <v-autocomplete v-model="yearList.value" :items="yearList.year"></v-autocomplete>
              </td>
              <th>대학</th>
              <td>
                <v-autocomplete v-model="univList.value" :items="univList.year"></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th>학과</th>
              <td>
                <v-autocomplete v-model="deptList.value" :items="deptList.year"></v-autocomplete>
              </td>
              <th>지도교수/학생명</th>
              <td>
                <v-text-field v-model="name.value"></v-text-field>
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
          <div class="text-h4">지도교수 배정 학생 목록</div>
          <v-avatar class="mx-2" size="20" color="primary">
            <v-icon style="font-size: 14px">mdi-exclamation-thick</v-icon>
            <v-tooltip>년도 별 매칭된 지도교수 대시보드의 지도학생 목록으로 출력됩니다.</v-tooltip>
          </v-avatar>
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
            <v-dialog v-model="dialog" persistent width="1024">
              <template v-slot:activator="{ props }">
                <v-btn color="" v-bind="props" class="mr-2">파일업로드</v-btn>
              </template>
              <v-card>
                <v-card-title class="bg-primary">파일업로드</v-card-title>
                <v-card-text></v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn variant="outlined" class="v-btn bg-primary" @click="this.dialog = false"> 닫기 </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn>엑셀 다운로드</v-btn>
          </template>
          <template #left-btn-area>
            <v-btn color="grey" class="mr-2">삭제</v-btn>
            <v-btn color="grey" class="mr-2">전체삭제</v-btn>
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
    </v-col>
  </v-row>
</template>
<script lang="ts">
export default {
  data: () => ({
    name: {
      value: "",
    },
    dialog: false,
    title: "지도교수 설정관리",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "지도교수 설정", disabled: true },
    ],
    deptList: {
      year: ["사회복지과", "컴퓨터공학과", "국어국문과"],
      value: "전체",
    },
    univList: {
      year: ["인문사회과학대학", "공과대학", "교육대학"],
      value: "전체",
    },
    yearList: {
      year: ["2024", "2023", "2022"],
      value: "2024",
    },
    checkbox: true,
    checkbox2: false,
    checkbox3: false,

    header: [
      { text: "대학", value: "univ", sortable: true },
      { text: "학과", value: "dept", sortable: true },
      { text: "지도교수", value: "profNm", sortable: true },
      { text: "이름", value: "stdNm", sortable: true },
      { text: "학년", value: "grade", sortable: true },
      { text: "학번", value: "stdNo", sortable: true },
      { text: "연락처", value: "tellNo", sortable: true },
      { text: "이메일", value: "email", sortable: true },
      { text: "최근 업데이트 일", value: "uptDate", sortable: true },
    ],
    list: [
      {
        univ: "인문사회과학대학",
        dept: "국어국문학과",
        profNm: "정지수",
        stdNm: "김지민",
        grade: "1",
        stdNo: "23010230",
        tellNo: "010-1234-5678",
        email: "email@chodang.ac.kr",
        uptDate: "2023/03/27",
      },
      {
        univ: "공과대학",
        dept: "컴퓨터공학과",
        profNm: "정지수",
        stdNm: "채치수",
        grade: "2",
        stdNo: "23010330",
        tellNo: "010-1234-5678",
        email: "email@chodang.ac.kr",
        uptDate: "2023/03/27",
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
