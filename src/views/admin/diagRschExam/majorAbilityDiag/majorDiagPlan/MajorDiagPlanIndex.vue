<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"> </BaseBreadcrumb>
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
                  <th>실시계획명/진단지명</th>
                  <td>
                    <v-text-field
                      v-model="searchParam.damTitle"
                      placeholder="실시계획명/진단지명을 입력해주세요."
                      @keyup.enter="fnGetDiagPlanList()"
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
                      <v-radio label="전체" class="mr-4" value=""></v-radio>
                      <v-radio label="사용" class="mr-4" value="Y"></v-radio>
                      <v-radio label="미사용" value="N"></v-radio>
                    </v-radio-group>
                  </td>

                  <th>부서명/담당자명</th>
                  <td>
                    <v-text-field
                      v-model="searchParam.deptNm"
                      placeholder="부서명/담당자명을 입력해주세요."
                      @keyup.enter="fnGetDiagPlanList()"
                    ></v-text-field>
                  </td>
                </tr>
              </tbody>
            </v-table>
            <div class="d-flex pt-4 justify-end">
              <v-btn class="mr-2" width="80" @click="onClickReset">초기화</v-btn>
              <v-btn variant="flat" color="primary" width="80" @click="fnGetDiagPlanList()">검색</v-btn>
            </div>
          </BaseCard>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <BaseCard>
            <template v-slot:title>
              <div class="d-flex align-center">
                <div class="text-h4">전공능력진단 실시계획 목록</div>
                <!-- tooltip -->
                <v-avatar class="mx-2" size="20" color="primary">
                  <v-icon style="font-size: 14px">mdi-exclamation-thick</v-icon>
                  <v-tooltip>
                    실시계획의 실시시간이 종료된 경우 수정이 불가합니다. <br />
                    종료된 실시계획의 수정이 필요할 경우 SR로 문의해주세요.
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
                <v-btn color="grey" @click="onClickPlanForm('REG', '')">실시계획등록</v-btn>
              </template>
              <template #left-btn-area>
                <v-btn color="grey" class="mr-2" :disabled="fnIsChecked()" @click="onClickChangeState('N')">
                  미사용
                </v-btn>
                <v-btn color="grey" :disabled="fnIsChecked()" @click="onClickChangeState('Y')">사용</v-btn>
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
              <template #item-actDate="item"> {{ item.damStrDate }} ~ {{ item.damEndDate }}</template>
              <template #item-useYn="item"> {{ item.useYn == "Y" ? "사용" : "미사용" }} </template>
              <template #item-diagMng="item">
                <v-btn
                  size="small"
                  :disabled="isEndDatePassed(item.damEndDate)"
                  @click="onClickPlanForm('MODIFY', item.damId)"
                >
                  수정
                </v-btn>
                <!-- 진단 미리보기 -->
                <v-dialog v-model="list[item.dialogIdx].dialog" persistent width="1300">
                  <!-- dialog button -->
                  <template v-slot:activator>
                    <v-btn @click="onClickShowPreview(item.damId, item.dapId, item.dialogIdx)" size="small">조회</v-btn>
                  </template>
                  <DiagPreview
                    v-model="list[item.dialogIdx].dialog"
                    :qusList="fnPreviewQusInfo()"
                    :paperInfo="fnPreviewPaperInfo()"
                  ></DiagPreview>
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
import moment from "moment";
import type { AxiosResponse } from "axios";
import type { TableServerOption } from "@/types/dataTable/EasyDataTableConfig";
import type { PreviewPaperTypes } from "@/types/diagTypes/PreviewTypes";
import type { AnsOuput, QusOutput } from "@/types/diagTypes/DiagIOTypes";
import type { AbilityDiagQusExcelForm, AbilityDiagAnsInfoTypes } from "@/types/diagTypes/AbilityDiagTypes";
import DiagPreview from "@/components/diagRschExam/preview/DiagPreview.vue";

export default {
  components: {
    DiagPreview,
  },
  data: () => ({
    title: "실시계획수립",
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "전공능력진단", disabled: true },
    ],
    // datatable header
    header: [
      { text: "실시계획 명", value: "damTitle", sortable: true, width: 150 },
      { text: "진단지 명", value: "dapTitle", sortable: true, width: 200 },
      { text: "실시기간", value: "actDate", width: 150 },
      { text: "대상자 수", value: "targetCnt", sortable: true },
      { text: "등록부서/등록자", value: "userId", sortable: true },
      { text: "사용여부", value: "useYn", sortable: true },
      { text: "등록일", value: "regDate", sortable: true },
      { text: "관리", value: "diagMng", width: 120 },
    ],
    // datatable paging
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: ["damTitle", "regDate"],
      sortType: ["desc", "desc"],
      totalCount: 0,
    } as TableServerOption,
    loading: false,

    // datatable 목록
    list: [],

    // 검색조건
    searchParam: {
      damTitle: "",
      regStrDate: null,
      regEndDate: null,
      deptNm: "",
      selectRadio: "",
    },

    //선택 된 data items
    selectedItems: [],

    // 조회 버튼 (설문조사 미리보기)
    dapInfo: {},
    daqList: [] as AbilityDiagQusExcelForm[],
  }),
  watch: {
    // datatable paging
    serverOptions: {
      handler() {
        const vm = this;
        vm.fnGetDiagPlanList();
      },
      deep: true,
    },
  },
  created() {
    this.fnGetDiagPlanList();
  },
  methods: {
    /** 실시계획 등록 버튼 */
    onClickPlanForm(type: String, diagCode: String) {
      const vm = this;

      vm.$router.push({
        path: "/admin/diagRschExam/majorAbilityDiag/majorDiagPlan/majorDiagPlanDetail",
        state: { viewType: type, diagCode: diagCode },
      });
    },

    /** 실시계획 목록 가져오기 */
    fnGetDiagPlanList() {
      const vm = this;

      const param = {
        damAbilityCategory: "M",
        damTitle: vm.searchParam.damTitle,
        useYn: vm.searchParam.selectRadio,
        userId: vm.searchParam.deptNm,
        regStrDate: vm.searchParam.regStrDate,
        regEndDate: vm.searchParam.regEndDate,
        // datatable paging
        ...vm.$serial(vm.serverOptions),
      };

      vm.loading = true;
      vm.$axios
        .get("/api/admin/diag/majorAbility/getMajorDiagPlan", { params: param })
        .then((res: AxiosResponse) => {
          vm.list = res.data.data;

          // 각 인덱스에 대해 dialog 추가
          vm.list.forEach((item: { dialog: boolean; dialogIdx: number }, idx: number) => {
            item.dialog = false;
            item.dialogIdx = idx;
          });

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

    /** 초기화 버튼 클릭 시 */
    onClickReset() {
      const vm = this;
      vm.searchParam.damTitle = "";
      vm.searchParam.regStrDate = null;
      vm.searchParam.regEndDate = null;
      vm.searchParam.deptNm = "";
      vm.searchParam.selectRadio = "";
      vm.selectedItems = [];
    },

    /** 실시기간 수정가능여부 설정 */
    isEndDatePassed(damEndDate: Date) {
      return moment().diff(damEndDate, "minutes") > 0;
    },

    /** 미체크 시 사용여부 버튼 disabled */
    fnIsChecked() {
      const vm = this;
      return vm.selectedItems.length === 0;
    },

    /** 진단 미리보기 진단지 정보 데이터 가공 */
    fnPreviewPaperInfo() {
      const vm = this;
      const paperInfo: PreviewPaperTypes = {
        title: vm.dapInfo.dapTitle,
        guide: vm.dapInfo.dapGuide,
      };

      return paperInfo;
    },

    /** 실시계획 목록 `조회` 버튼 클릭 시 */
    onClickShowPreview(damId: string, dapId: string, idx: number) {
      const vm = this;

      const param = {
        dapId: dapId,
        damId: damId,
      };
      vm.loading = true;
      vm.$axios
        .get("/api/admin/diag/majorAbility/getMajorDiagPaperDetail", { params: param })
        .then((res: AxiosResponse) => {
          const resData = res.data.data;

          vm.list[idx].dialog = true;
          vm.dapInfo = resData[0];
          vm.daqList = vm.dapInfo.diagQusList;
          vm.dialog = true;
          vm.loading = false;
        })
        .catch((e: Error) => {
          console.error(e);
        });
    },

    /** 1차원배열 > 2차원배열 변환 */
    fnConvertR2Arr<T>(arr: T[], n: number) {
      const res: T[][] = [];
      for (let i = 0; i < arr.length; i += n) {
        res.push(arr.slice(i, i + n));
      }
      return res;
    },
    /** 진단 미리보기 문항 정보 데이터 가공 */
    fnPreviewQusInfo() {
      const vm = this;
      let pagingCnt = vm.dapInfo.dapViewCnt;
      if (pagingCnt < 0) {
        pagingCnt = vm.daqList.length;
      }

      const scaleAns = vm.dapInfo.dapAnsInfo.map((dapAns: AbilityDiagAnsInfoTypes): AnsOuput => {
        return {
          title: dapAns.dapAnsTitle ?? "-",
          score: dapAns.dapAnsScore ?? 0,
        };
      });

      let qusOrder = 1;
      const qusInfo: QusOutput[] = vm.daqList.map((diagQus: AbilityDiagQusExcelForm): QusOutput => {
        return {
          title: diagQus.daqTitle,
          order: qusOrder++,
          type: "SCALE",
          ansInfo: scaleAns,
        };
      });
      return vm.fnConvertR2Arr(qusInfo, pagingCnt);
    },

    /** 실시계획 사용여부 버튼 클릭 시 */
    onClickChangeState(state: String) {
      const vm = this;
      const damIds = vm.selectedItems.map((x: { damId: string }) => x.damId);
      let msg = "";

      if (state === "N") {
        msg = "미사용";
      } else if (state === "Y") {
        msg = "사용";
      }

      vm.$confirm(`실시계획을 ${msg}하시겠습니까?`, "확인", (isConfirm: boolean) => {
        if (isConfirm) {
          const param = {
            useYn: state,
            damIds: damIds,
          };
          vm.$loading.show();
          vm.$axios
            .post("/api/admin/diag/majorAbility/modifyMajorPlanState", JSON.stringify(param))
            .then((res: AxiosResponse) => {
              const resData = res.data;

              if (resData.code === "200") {
                vm.$alert("완료되었습니다.", "알림", () => {
                  vm.selectedItems = [];
                  vm.fnGetDiagPlanList();
                });
              } else {
                vm.$alert("오류가 발생했습니다.<br />새로고침 후 증상이 반복되면 관리자에게 문의해주세요.", "알림");
              }
            })
            .catch((e: Error) => {
              console.error(e);
              vm.$alert("통신오류가 발생했습니다.<br />새로고침 후 증상이 반복되면 관리자에게 문의해주세요.", "알림");
            })
            .finally(() => {
              vm.$loading.hide();
            });
        }
      });
    },
  },
};
</script>
