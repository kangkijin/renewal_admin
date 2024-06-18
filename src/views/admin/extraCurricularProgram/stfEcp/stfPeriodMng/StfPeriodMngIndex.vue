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
                <v-radio-group v-model="search.deptHak" inline>
                  <v-radio value="all" class="flex-0-0 mr-4" label="전체" />
                  <v-radio value="dept" class="flex-0-0 mr-4" label="부서" />
                  <v-radio value="hakgua" class="flex-0-0" label="학과" />
                </v-radio-group>
              </td>
              <th>대학</th>
              <td>
                <v-autocomplete
                  v-model="search.college"
                  :items="selectOption1.year"
                  placeholder="전체"
                ></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th>부서</th>
              <td>
                <v-autocomplete
                  v-model="search.department"
                  :items="selectOption1.year"
                  placeholder="전체"
                ></v-autocomplete>
              </td>
              <th>학과</th>
              <td>
                <v-autocomplete v-model="search.hakgua" :items="selectOption1.year" placeholder="전체"></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th>카테고리</th>
              <td>
                <v-autocomplete
                  v-model="search.category"
                  :items="selectOption1.year"
                  placeholder="전체"
                ></v-autocomplete>
              </td>
              <th>과정명</th>
              <td>
                <v-text-field v-model="search.curriNm" placeholder="과정명을 입력해 주세요."></v-text-field>
              </td>
            </tr>
            <tr>
              <th>차수명</th>
              <td>
                <v-text-field v-model="search.periodNm" placeholder="차수명을 입력해 주세요."></v-text-field>
              </td>
              <th>승인상태</th>
              <td>
                <div class="d-flex">
                  <v-checkbox v-model="search.aprvSts" value="all" class="flex-0-0 mr-4" label="전체" />
                  <v-checkbox v-model="search.aprvSts" value="status1" class="flex-0-0 mr-4" label="승인대기" />
                  <v-checkbox v-model="search.aprvSts" value="status2" class="flex-0-0 mr-4" label="승인" />
                  <v-checkbox v-model="search.aprvSts" value="status3" class="flex-0-0" label="반려" />
                </div>
              </td>
            </tr>
            <tr>
              <th>신청기간</th>
              <td>
                <div class="d-flex">
                  <VDateInput />
                  <span class="mx-1">~</span>
                  <VDateInput />
                </div>
              </td>
              <th>운영기간</th>
              <td>
                <div class="d-flex">
                  <VDateInput />
                  <span class="mx-1">~</span>
                  <VDateInput />
                </div>
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
                  <v-checkbox v-model="search.core" value="core1" class="flex-0-0 mr-4" label="기본역량" />
                  <v-checkbox v-model="search.core" value="core2" class="flex-0-0 mr-4" label="준비역량" />
                  <v-checkbox v-model="search.core" value="core3" class="flex-0-0 mr-4" label="실행역량" />
                  <v-checkbox v-model="search.core" value="core4" class="flex-0-0 mr-4" label="평가역량" />
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
            차수 목록
            <v-avatar class="mr-1 bg-primary" size="18">
              <v-icon style="font-size: 12px">mdi-exclamation-thick</v-icon>
              <v-tooltip
                >차수 등록 후, 승인된 프로그램은 삭제가 불가능합니다. 차수승인 메뉴에서, 승인취소 후 삭제해주세요.
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
            <v-btn class="mr-2" to="/admin/extraCurricularProgram/stfEcp/stfPeriodReg">차수 등록</v-btn>
            <v-btn class="mr-2">차수 복사</v-btn>
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
            <v-btn size="small">반려</v-btn>
          </template>
        </v-easy-table>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "차수 관리",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(직원)", disabled: true },
    ],
    selectOption1: {
      year: ["2024", "2023", "2022"],
      value: "2024",
    },
    // TODO 서치옵션
    search: {
      deptHak: null,
      college: null,
      department: null,
      hakgua: null,
      category: null,
      curriNm: "",
      periodNm: "",
      aprvSts: [""],
      core: [""],
      coreAll: false,
    },

    header: [
      { text: "No", value: "no", sortable: false, width: 40 },
      { text: "승인상태", value: "eliStsNm", sortable: true, width: 90 },
      { text: "카테고리", value: "ecmNm", sortable: true, width: 90 },
      { text: "과정명", value: "eciTitle", sortable: true, width: 300 },
      { text: "차수명", value: "eliTitle", sortable: true, width: 350 },
      { text: "부서/학과", value: "eciDeptNm", sortable: true, width: 120 },
      { text: "담당자", value: "eliStfNm", sortable: true, width: 100 },
      { text: "개설년도", value: "eliOprtYear", sortable: true, width: 100 },
      { text: "개설학기", value: "eliOprtTerm", sortable: true, width: 100 },
      { text: "사용여부", value: "eliYn", sortable: true, width: 90 },
      { text: "신청기간", value: "reqDate", sortable: true, width: 200 },
      { text: "운영기간", value: "oprtDate", sortable: true, width: 200 },
      { text: "역량", value: "ability", sortable: true, width: 400 },
      { text: "관리", value: "operation", width: 150 },
    ],
    list: [
      {
        no: "1",
        category: "취업",
        progName: "면접관을 사로잡는 자소서 작성법!",
        termName: "면접관을 사로잡는 자소서 작성법! 1차",
        sustNm: "경영학과",
        stfNm: "김만돌",
        year: "2024",
        useYn: "사용",
        aplDate: "2024/01/29~2024/02/01",
        oprtDate: "2024/01/29~2024/02/01",
        competency: "핵심역량1",
      },
      {
        no: "2",
        category: "취업",
        progName: "면접관을 사로잡는 자소서 작성법!",
        termName: "면접관을 사로잡는 자소서 작성법! 2차",
        sustNm: "경영학과",
        stfNm: "김만돌",
        year: "2024",
        useYn: "사용",
        aplDate: "2024/01/29~2024/02/01",
        oprtDate: "2024/01/29~2024/02/01",
        competency: "핵심역량1",
      },
      {
        no: "3",
        category: "창업",
        progName: "굽느냐 튀기느냐 그것이 문제로다",
        termName: "굽느냐 튀기느냐 그것이 문제로다 1차",
        sustNm: "철학과",
        stfNm: "김굽네",
        year: "2024",
        useYn: "사용",
        aplDate: "2024/01/29~2024/02/01",
        oprtDate: "2024/01/29~2024/02/01",
        competency: "핵심역량2",
      },
    ],
    selectedItems: [],
  }),
  methods: {
    updateRowPerPage(selected: number) {
      const vm = this;
      const dataTable = vm.$refs.dataTable as any;
      dataTable.updateRowsPerPageActiveOption(selected);
    },
    onClickCoreAll(flag: boolean) {
      const vm = this;
      if (flag) {
        vm.search.core = ["core1", "core2", "core3", "core4"];
      } else {
        vm.search.core = [null];
      }
    },
    onClickReset() {
      const vm = this;
      vm.search.deptHak = "all";
      vm.search.college = null;
      vm.search.department = null;
      vm.search.hakgua = null;
      vm.search.category = null;
      vm.search.curriNm = "";
      vm.search.periodNm = "";
      vm.search.aprvSts = "all";
      vm.search.coreAll = true;
      vm.search.core = ["core1", "core2", "core3", "core4"];
    },
  },
};
</script>
