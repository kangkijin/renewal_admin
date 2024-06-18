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
              <th>부서/학과</th>
              <td>
                <div class="d-flex">
                  <v-radio-group v-model="search.deptHakguaYn" inline>
                    <v-radio value="checkAll" class="flex-0-0 mr-4" label="전체" />
                    <v-radio value="checkDept" class="flex-0-0 mr-4" label="부서" />
                    <v-radio value="checkHakgua" class="flex-0-0" label="학과" />
                  </v-radio-group>
                </div>
              </td>
              <th>대학</th>
              <td>
                <v-autocomplete v-model="search.colg" placeholder="전체"></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th>부서</th>
              <td>
                <v-autocomplete v-model="search.dept" placeholder="전체"></v-autocomplete>
              </td>
              <th>학과</th>
              <td>
                <v-autocomplete v-model="search.hakgua" placeholder="전체"></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th>카테고리</th>
              <td>
                <v-autocomplete v-model="search.category" placeholder="전체"></v-autocomplete>
              </td>
              <th>과정명</th>
              <td>
                <v-text-field v-model="search.curri" placeholder=""></v-text-field>
              </td>
            </tr>
            <tr>
              <th>사용여부</th>
              <td colspan="3">
                <v-radio-group v-model="search.useYn" inline>
                  <v-radio value="useAll" class="flex-0-0 mr-4" label="전체" />
                  <v-radio value="useY" class="flex-0-0 mr-4" label="사용" />
                  <v-radio value="useN" class="flex-0-0" label="미사용" />
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <th>역량</th>
              <td>
                <div class="d-flex">
                  <v-checkbox
                    v-model="search.coreAll"
                    @change="onClickCoreAll(search.coreAll)"
                    class="flex-0-0 mr-4"
                    label="전체"
                  />
                  <v-checkbox v-model="search.core" value="core1" class="flex-0-0 mr-4" label="종합적사고력" />
                  <v-checkbox v-model="search.core" value="core2" class="flex-0-0 mr-4" label="자원정보기술활용능력" />
                  <v-checkbox v-model="search.core" value="core3" class="flex-0-0 mr-4" label="자기관리역량" />
                  <v-checkbox v-model="search.core" value="core4" class="flex-0-0 mr-4" label="의사소통역량" />
                  <v-checkbox v-model="search.core" value="core5" class="flex-0-0 mr-4" label="대인관계역량" />
                  <v-checkbox v-model="search.core" value="core6" class="flex-0-0 mr-4" label="공존공감역량" />
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="d-flex pt-4 justify-end">
          <v-btn class="mr-2" width="80" @click="onClickReset">초기화</v-btn>
          <v-btn variant="flat" color="primary" width="80">검색</v-btn>
        </div>
      </BaseCard>
    </v-col>
    <v-col>
      <BaseCard>
        <template v-slot:title>
          <div class="text-h4">
            과정 목록
            <v-avatar class="mr-1 bg-primary" size="18">
              <v-icon style="font-size: 12px">mdi-exclamation-thick</v-icon>
              <v-tooltip
                >과정 등록 후, 차수가 개설된 경우 삭제가 불가능합니다. 매핑 과정의 일괄 변경이 필요할 경우, SR 문의해
                주세요.
              </v-tooltip>
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
            <v-btn class="mr-2" to="/admin/extraCurricularProgram/otsdrEcp/otsdrCurriReg">과정 등록</v-btn>
            <v-btn class="mr-2">과정 복사</v-btn>
            <v-btn>엑셀 다운로드</v-btn>
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
          <template #item-operation>
            <v-btn size="small">수정</v-btn>
            <v-btn size="small">이수증</v-btn>
            <v-btn size="small">만족도조사</v-btn>
            <v-btn size="small">사전조사</v-btn>
            <v-btn size="small">사후조사</v-btn>
          </template>
        </v-easy-table>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "과정 관리",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(외부인)", disabled: true },
    ],
    search: {
      deptHakguaYn: "checkAll",
      colg: "",
      dept: "",
      hakgua: "",
      category: "",
      curri: "",
      useYn: "useAll",
      coreAll: false,
      core: [""],
    },
    header: [
      { text: "No", value: "no", sortable: false, width: 40 },
      { text: "카테고리", value: "ecmNm", sortable: true, width: 90 },
      { text: "과정명", value: "eciTitle", sortable: true, width: 300 },
      { text: "부서/학과", value: "eciDeptNm", sortable: true, width: 120 },
      { text: "개설년도", value: "eciOprtStrYear", sortable: true, width: 100 },
      { text: "사용여부", value: "eciYn", sortable: true, width: 90 },
      { text: "등록일", value: "regDate", sortable: true, width: 120 },
      { text: "역량", value: "ability", width: 400 },
      { text: "관리", value: "operation", width: 400 },
    ],
    list: [
      {
        no: "1",
        category: "취업",
        progName: "언어의 마술사가 알려주는 자소서 작법 대공개!",
        sustNm: "경영학과",
        year: "2024",
        useYn: "사용",
        regDate: "2024/01/29",
        competency: "핵심역량1",
      },
      {
        no: "2",
        category: "창업",
        progName: "굽느냐 튀기느냐 그것이 문제로다",
        sustNm: "철학과",
        year: "2024",
        useYn: "사용",
        regDate: "2024/01/29",
        competency: "핵심역량2",
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
    onClickCoreAll(flag: boolean) {
      const vm = this;
      if (flag) {
        vm.search.core = ["core1", "core2", "core3", "core4", "core5", "core6"];
      } else {
        vm.search.core = [null];
      }
    },
    onClickReset() {
      const vm = this;
      vm.search.deptHakguaYn = "checkAll";
      vm.search.colg = "";
      vm.search.dept = "";
      vm.search.hakgua = "";
      vm.search.category = "";
      vm.search.curri = "";
      vm.search.useYn = "useAll";
      vm.search.coreAll = true;
      vm.search.core = ["core1", "core2", "core3", "core4", "core5", "core6"];
    },
  },
};
</script>
