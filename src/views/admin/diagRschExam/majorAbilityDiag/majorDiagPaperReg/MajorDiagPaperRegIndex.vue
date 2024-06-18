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
                  <th>진단지명</th>
                  <td>
                    <v-text-field
                      v-model="searchParam.dapTitle"
                      placeholder="진단지명을 입력해주세요."
                      @keyup.enter="fnGetDiagPaperList()"
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
                      v-model="searchParam.userInfo"
                      placeholder="부서명/담당자명을 입력해주세요."
                      @keyup.enter="fnGetDiagPaperList()"
                    ></v-text-field>
                  </td>
                </tr>
              </tbody>
            </v-table>
            <div class="d-flex pt-4 justify-end">
              <v-btn class="mr-2" width="80" @click="onClickReset()">초기화</v-btn>
              <v-btn variant="flat" color="primary" width="80" @click="fnGetDiagPaperList()">검색</v-btn>
            </div>
          </BaseCard>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <BaseCard>
            <template v-slot:title>
              <div class="d-flex align-center">
                <div class="text-h4">전공능력 진단지 목록</div>
                <!-- tooltip -->
                <v-avatar class="mx-2" size="20" color="primary">
                  <v-icon style="font-size: 14px">mdi-exclamation-thick</v-icon>
                  <v-tooltip>
                    진단지 생성 후 실시계획에 매핑된 경우 수정이 불가합니다. <br />
                    수정이 필요할 경우, 매핑된 실시계획을 삭제한 후 수정하시고, <br />
                    이미 실시계획이 진행중인 경우는, SR로 문의해주세요
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
                <v-btn color="grey" class="mr-2" @click="onClickCopyDiagPaper()">진단지 복사</v-btn>
                <v-btn color="grey" @click="onClickPaperForm('REG', '')">진단지 생성</v-btn>
              </template>
              <template #left-btn-area>
                <v-btn color="grey" class="mr-2" :disabled="fnIsChecked()" @click="onClickChangeState('DEL')">
                  삭제
                </v-btn>
                <v-btn color="grey" class="mr-2" :disabled="fnIsChecked()" @click="onClickChangeState('N')">
                  미사용
                </v-btn>
                <v-btn color="grey" :disabled="fnIsChecked()" @click="onClickChangeState('Y')"> 사용 </v-btn>
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
              <template #item-diagMng="item">
                <v-btn
                  size="small"
                  :disabled="item.useYn == 'N' || item.damCnt > 0"
                  @click="onClickPaperForm('MODIFY', item.dapId)"
                >
                  수정
                </v-btn>
                <!-- 진단 미리보기 -->
                <v-dialog v-model="list[item.dialogIdx].dialog" persistent width="1300">
                  <!-- dialog button -->
                  <template v-slot:activator>
                    <v-btn @click="onClickShowPreview(item.dapId, item.dialogIdx)" size="small">조회</v-btn>
                  </template>
                  <DiagPreview
                    v-model="list[item.dialogIdx].dialog"
                    :qusList="fnPreviewQusInfo()"
                    :paperInfo="fnPreviewPaperInfo()"
                  ></DiagPreview>
                </v-dialog>
              </template>
              <template #item-useYn="item"> {{ item.useYn == "Y" ? "사용" : "미사용" }} </template>
              <template #item-userInfo="item">{{ item.deptNm }} / {{ item.userId }}</template>
            </v-easy-table>
          </BaseCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script lang="ts">
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
    title: "문항등록ㆍ진단지생성",
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "전공능력진단", disabled: true },
    ],
    // datatable header
    header: [
      { text: "진단지 명", value: "dapTitle", width: 150, sortable: true },
      { text: "문항수", value: "daqCnt", sortable: true },
      { text: "등록부서/등록자", value: "userInfo", sortable: true },
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
      dapTitle: "",
      regStrDate: null,
      regEndDate: null,
      userInfo: "",
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
        vm.fnGetDiagPaperList();
      },
      deep: true,
    },
  },
  created() {
    this.fnGetDiagPaperList();
  },
  methods: {
    /** 초기화 버튼 클릭 시 */
    onClickReset() {
      const vm = this;
      vm.searchParam.dapTitle = "";
      vm.searchParam.regStrDate = null;
      vm.searchParam.regEndDate = null;
      vm.searchParam.userInfo = "";
      vm.searchParam.selectRadio = "";
      vm.selectedItems = [];
    },

    /** 진단지 사용여부 버튼 클릭 시 */
    onClickChangeState(state: String) {
      const vm = this;
      const dapIds = vm.selectedItems.map((item: { dapId: number }) => item.dapId);

      // 실시계획 매핑여부 체크 ( state : DEL )
      if (state === "DEL") {
        const damCntChk = vm.selectedItems.some((item: { damCnt: number }) => {
          const damCnt = item.damCnt;
          return damCnt > 0;
        });

        if (damCntChk) {
          vm.$alert("실시계획에 매핑된 진단지는 삭제 불가능합니다.");
          return;
        }
      }

      let msg = "";
      if (state === "DEL") {
        msg = "진단지를 삭제하시겠습니까?";
      } else if (state === "N") {
        msg = "진단지를 미사용처리하시겠습니까?";
      } else if (state === "Y") {
        msg = "진단지를 사용처리하시겠습니까?";
      }

      vm.$confirm(msg, "확인", (isConfirm: Boolean) => {
        if (isConfirm) {
          const param = {
            useYn: state,
            dapIds: dapIds,
          };

          vm.$loading.show();
          vm.$axios
            .post("/api/admin/diag/majorAbility/modifyMajorDiagState", JSON.stringify(param))
            .then((res: AxiosResponse) => {
              const resData = res.data;

              if (resData.code === "200") {
                vm.$alert("완료되었습니다.", "알림", () => {
                  vm.selectedItems = [];
                  vm.fnGetDiagPaperList();
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

    /** 진단지 생성/수정 버튼 클릭 시 */
    onClickPaperForm(type: String, diagCode: String) {
      const vm = this;

      vm.$router.push({
        path: "/admin/diagRschExam/majorAbilityDiag/majorDiagPaperReg/majorDiagPaperRegDetail",
        state: { viewType: type, diagCode: diagCode },
      });
    },

    /** 진단지 목록 가져오기 */
    fnGetDiagPaperList() {
      const vm = this;

      const param = {
        dapAbilityCategory: "M",
        dapTitle: vm.searchParam.dapTitle,
        useYn: vm.searchParam.selectRadio,
        userInfo: vm.searchParam.userInfo,
        regStrDate: vm.searchParam.regStrDate,
        regEndDate: vm.searchParam.regEndDate,
        // datatable paging
        ...vm.$serial(vm.serverOptions),
      };
      vm.loading = true;
      vm.$axios
        .get("/api/admin/diag/majorAbility/getMajorDiagPaper", { params: param })
        .then((res: AxiosResponse) => {
          vm.list = res.data.data;

          // 각 인덱스에 대해 dialog 추가
          vm.list.forEach((item: { dialog: boolean; dialogIdx: number }, idx: number) => {
            console.log(typeof item);
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

    /** 체크된 값이 없을 경우 disabled */
    fnIsChecked() {
      const vm = this;
      return vm.selectedItems.length === 0;
    },

    /** 진단지 목록 `조회` 버튼 클릭 시 */
    onClickShowPreview(dapId: string, idx: number) {
      const vm = this;

      const param = {
        dapId: dapId,
      };

      vm.$loading.show();
      vm.$axios
        .get("/api/admin/diag/majorAbility/getMajorDiagPaperDetail", { params: param })
        .then((res: AxiosResponse) => {
          const resData = res.data.data;

          vm.list[idx].dialog = true;
          vm.dapInfo = resData[0];
          vm.daqList = vm.dapInfo.diagQusList;
        })
        .catch((e: Error) => {
          console.error(e);
        })
        .finally(() => {
          vm.$loading.hide();
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
      return vm.fnConvertR2Arr(qusInfo, parseInt(pagingCnt));
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

    /** 진단지 복사 버튼 클릭 시 */
    onClickCopyDiagPaper() {
      const vm = this;

      if (vm.selectedItems.length === 0) {
        vm.$alert("선택된 진단지가 없습니다.");
      } else if (vm.selectedItems.length > 1) {
        vm.$alert("진단지 복사는 1개만 가능합니다.");
      } else {
        vm.$confirm("진단지를 복사하시겠습니까?", "확인", (isConfirm: Boolean) => {
          if (isConfirm) {
            const param = {
              dapId: vm.selectedItems[0].dapId,
            };

            vm.$loading.show();
            vm.$axios
              .post("/api/admin/diag/majorAbility/createCopyMajorDiagPaper", JSON.stringify(param))
              .then((res: AxiosResponse) => {
                const resData = res.data;

                if (resData.code === "200") {
                  vm.$alert("진단지 복사가 완료되었습니다.", "알림", () => {
                    vm.selectedItems = [];
                    vm.fnGetDiagPaperList();
                  });
                } else {
                  vm.$alert("진단지 복사가 실패되었습니다.", "알림");
                }
              })
              .catch((e: Error) => {
                console.error(e);
              })
              .finally(() => {
                vm.$loading.hide();
              });
          }
        });
      }
    },
  },
};
</script>
