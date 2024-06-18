<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col>
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
                  <th>조사지명</th>
                  <td>
                    <v-text-field
                      v-model="searchParam.diagPaperNm"
                      placeholder="조사지명을 입력해주세요."
                    ></v-text-field>
                  </td>
                  <th>등록일</th>
                  <td>
                    <div class="d-flex align-center">
                      <VDateInput v-model="searchParam.regStrDate" />
                      <span class="mx-1">~</span>
                      <VDateInput v-model="searchParam.regEndDate" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>사용여부</th>
                  <td>
                    <v-radio-group v-model="searchParam.selectRadio" inline>
                      <v-radio label="전체" class="mr-4" value="all"></v-radio>
                      <v-radio label="사용" class="mr-4" value="Y"></v-radio>
                      <v-radio label="미사용" value="N"></v-radio>
                    </v-radio-group>
                  </td>

                  <th>부서명/담당자명</th>
                  <td>
                    <v-text-field
                      v-model="searchParam.deptNm"
                      placeholder="부서명/담당자명을 입력해주세요."
                    ></v-text-field>
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
      </v-row>
      <v-row>
        <v-col>
          <BaseCard>
            <template v-slot:title>
              <div class="d-flex align-center">
                <div class="text-h4">설문 조사지 목록</div>
                <!-- tooltip -->
                <v-avatar class="mx-2" size="20" color="primary">
                  <v-icon style="font-size: 14px">mdi-exclamation-thick</v-icon>
                  <v-tooltip>
                    조사지 생성 후 실시계획에 매핑된 경우 수정이 불가합니다. <br />
                    수정이 필요할 경우, 매핑된 실시계획을 삭제한 후 수정하시고, <br />
                    이미 실시계획이 진행중인 경우는, SR로 문의해주세요.
                  </v-tooltip>
                </v-avatar>
              </div>
            </template>
            <BaseTableConfig
              :totalCnt="list.length"
              checked
              :checkedCnt="selectedItems.length"
              v-model:rowPerPage="serverOptions.rowsPerPage"
            >
              <template #top-btn-area>
                <v-btn color="grey" class="mr-2">조사지 복사</v-btn>
                <v-btn color="grey" @click="onClickMoveDetail('REG', '')">조사지 생성</v-btn>
              </template>
              <template #left-btn-area>
                <v-btn color="grey" class="mr-2" :disabled="fnIsChecked()">삭제</v-btn>
                <v-btn color="grey" class="mr-2" :disabled="fnIsChecked()">미사용</v-btn>
                <v-btn color="grey" :disabled="fnIsChecked()">사용</v-btn>
              </template>
            </BaseTableConfig>
            <v-easy-table
              ref="dataTable"
              :headers="header"
              :items="list"
              fixed-checkbox
              :checkbox-column-width="50"
              v-model:items-selected="selectedItems"
              :loading="loading"
              :server-items-length="serverOptions.totalCount"
              v-model:server-options="serverOptions"
            >
              <template #item-useYn="{ useYn }">
                {{ useYn === "Y" ? "사용" : "미사용" }}
              </template>

              <template #item-diagMng="item">
                <v-btn size="small" :disabled="item.useYn == 'N'" @click="onClickMoveDetail('MODIFY', item.diagKey)">
                  수정
                </v-btn>
                <!-- 진단 미리보기 -->
                <v-dialog v-model="dialog" persistent width="1300">
                  <!-- dialog button -->
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" size="small">조회</v-btn>
                  </template>
                  <DiagPreview v-model="dialog"></DiagPreview>
                </v-dialog>
              </template>
            </v-easy-table>
          </BaseCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import DiagPreview from "@/components/diagRschExam/preview/DiagPreview.vue";
import type { TableServerOption } from "@/types/dataTable/EasyDataTableConfig";
import type { AxiosResponse } from "axios";

export default {
  components: {
    DiagPreview,
  },
  data: () => ({
    title: "문항등록ㆍ조사지생성",
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "설문조사", disabled: true },
    ],
    // datatable header
    header: [
      { text: "조사지 명", value: "diagPaperNm", sortable: true },
      { text: "문항수", value: "qusCnt", sortable: true },
      { text: "등록부서/등록자", value: "regNm", sortable: true },
      { text: "사용여부", value: "useYn", sortable: true },
      { text: "등록일", value: "regDate", sortable: true },
      { text: "관리", value: "diagMng" },
    ],
    // datatable paging
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: ["dapTitle", "regDate"],
      sortType: ["desc", "desc"],
      totalCount: 0,
    } as TableServerOption,
    loading: false,

    // datatable 목록
    list: [],

    searchParam: {
      diagPaperNm: "",
      regStrDate: null,
      regEndDate: null,
      deptNm: "",
      selectRadio: "all",
    },

    //선택 된 data items
    selectedItems: [],

    dialog: false,
  }),
  watch: {
    // datatable paging
    serverOptions: {
      handler() {
        const vm = this;
        vm.fnGetSurveyPaperList();
      },
      deep: true,
    },
  },
  methods: {
    onClickMoveDetail(type: String, diagCode: String) {
      const vm = this;
      vm.$router.push({
        path: "/admin/diagRschExam/surveyRsch/surveyRschPaperReg/surveyRschPaperRegDetail",
        state: { viewType: type, diagCode: diagCode },
      });
    },
    onClickReset() {
      const vm = this;
      vm.searchParam.diagPaperNm = "";
      vm.searchParam.regStrDate = null;
      vm.searchParam.regEndDate = null;
      vm.searchParam.deptNm = "";
      vm.searchParam.selectRadio = "all";
    },

    /** 체크된 값이 없을 경우 disabled */
    fnIsChecked() {
      const vm = this;
      return vm.selectedItems.length === 0;
    },

    // TODO
    /** 설문지 목록 가져오기 */
    fnGetSurveyPaperList() {
      const vm = this;

      const param = {
        // datatable paging
        ...vm.$serial(vm.serverOptions),
      };
      vm.loading = true;
      vm.$axios
        .get("", { params: param })
        .then((res: AxiosResponse) => {
          vm.list = res.data.data;

          const dataTable = vm.$refs.dataTable;
          dataTable.updateRowsPerPageActiveOption(vm.serverOptions.rowsPerPage); // datatable paging
          vm.serverOptions.totalCount = res.data.data.length > 0 ? res.data.data[0].totalCount : 0; // datatable paging
          vm.selectedItems = [];
        })
        .catch((e: Error) => {
          console.error(e);
        })
        .finally(() => {
          vm.loading = false;
        });
    },
  },
};
</script>
