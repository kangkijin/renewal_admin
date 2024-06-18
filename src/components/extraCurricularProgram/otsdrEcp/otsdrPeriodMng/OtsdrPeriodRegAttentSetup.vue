<template>
  <BaseCard title="입과자 설정">
    <v-row>
      <v-col cols="12">
        <v-table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">신청대상자 1</th>
              <td>
                <div class="d-flex align-center">
                  <v-checkbox v-model="checkbox" value="value1" class="flex-0-0 mr-4" label="재학생 전체" />
                  <v-checkbox v-model="checkbox" value="value2" class="flex-0-0 mr-4" label="1학년" />
                  <v-checkbox v-model="checkbox" value="value3" class="flex-0-0 mr-4" label="2학년" />
                  <v-checkbox v-model="checkbox" value="value4" class="flex-0-0 mr-4" label="3학년" />
                  <v-checkbox v-model="checkbox" value="value5" class="flex-0-0 mr-4" label="4학년" />
                  <v-checkbox v-model="checkbox" value="value6" class="flex-0-0 mr-4" label="휴학생" />
                  <v-checkbox v-model="checkbox" value="value7" class="flex-0-0 mr-4" label="졸업생" />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">신청대상자 2</th>
              <td class="d-flex">
                <div class="d-flex align-center mr-4" style="width: 400px">
                  <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
                  <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
                  <v-btn class="ml-2" color="success" width="80">추가</v-btn>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">신청접수여부</th>
              <td class="d-flex">
                <div class="d-flex align-center mr-4" style="width: 400px">
                  <v-switch color="primary" :model-value="true"></v-switch>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col>
        <BaseCard>
          <template v-slot:title>
            <div class="text-h4">입과자 직접 등록 목록</div>
          </template>
          <BaseTableConfig
            :totalCnt="list.length"
            checked
            :checkedCnt="selectedItems.length"
            @update:rowPerPage="updateRowPerPage"
          >
            <template #top-btn-area>
              <v-btn class="mr-2">지도학생목록 불러오기</v-btn>
              <v-btn class="mr-2">양식 다운로드 양식</v-btn>
              <v-btn class="mr-2">파일 업로드</v-btn>
              <v-btn>엑셀 다운로드</v-btn>
            </template>
            <template #left-btn-area>
              <v-btn color="grey" class="mr-2" :disabled="selectedItems.length === 0">삭제</v-btn>
              <v-btn color="grey" class="mr-2">전체 삭제</v-btn>
              <v-text-field class="mr-2" placeholder="팀명을 입력해주세요" style="width: 160px"></v-text-field>
              <v-btn color="grey" class="mr-2" :disabled="selectedItems.length === 0">팀명 등록</v-btn>
              <v-autocomplete class="mr-2" :items="selectOption1.year" placeholder="선택"></v-autocomplete>
              <v-btn color="grey" :disabled="selectedItems.length === 0">팀장 여부 등록</v-btn>
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
        <v-divider />
        <div class="d-flex justify-end pt-4">
          <v-btn
            variant="tonal"
            color="error"
            width="80"
            class="mr-2"
            to="/admin/extraCurricularProgram/otsdrEcp/otsdrPeriodMng"
            >취소</v-btn
          >
          <v-btn variant="flat" color="success" width="80">저장</v-btn>
        </div>
      </v-col>
    </v-row>
  </BaseCard>
</template>
<script lang="ts">
export default {
  data: () => ({
    selectOption1: {
      year: ["2024", "2023", "2022"],
      value: "2024",
      category: ["선택1", "선택2", "선택3"],
    },

    checkbox: ["value1"],

    header: [
      { text: "No", value: "no", sortable: false },
      { text: "팀", value: "teamName", sortable: true },
      { text: "팀장여부", value: "captain", sortable: true },
      { text: "이름", value: "korName", sortable: true },
      { text: "연락처", value: "phoneNo", sortable: true },
      { text: "이메일", value: "email", sortable: true },
    ],
    list: [
      {
        no: "1",
        teamName: "집가고싶다",
        captain: "팀원",
        korName: "최연서",
        phoneNo: "010-0000-0000",
        email: "example@xhltk.com",
      },
      {
        no: "2",
        teamName: "대구명태",
        captain: "팀원",
        korName: "박은지",
        phoneNo: "010-0000-0000",
        email: "example@xhlrms.com",
      },
      {
        no: "3",
        teamName: "수박바",
        captain: "팀장",
        korName: "상명호",
        phoneNo: "010-0000-0000",
        email: "example@whxhl.com",
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
