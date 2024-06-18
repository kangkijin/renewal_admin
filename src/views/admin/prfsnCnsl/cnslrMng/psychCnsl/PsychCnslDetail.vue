<!-- VIEW TYPE 류 받아와서 진행 -->
<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

  <v-row>
    <v-col>
      <BaseCard :title="'심리상담'">
        <v-row>
          <v-col class="mt-5">
            <v-row>
              <v-col cols="12">
                <v-table>
                  <colgroup>
                    <col style="width: 25%" />
                    <col style="width: auto" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row" class="required">상담사 선택</th>
                      <td>
                        <v-dialog v-model="dialog" width="1024">
                          <!-- dialog button -->
                          <template v-slot:activator="{ props }">
                            <v-text-field
                              prepend-inner-icon="mdi-magnify"
                              v-model="selectedCnslr.cnslrNm"
                              v-bind="props"
                              placeholder="상담사를 검색해주세요."
                            ></v-text-field>
                          </template>
                          <!--상담사선택팝업 component-->
                          <CnslrOptionPopup v-model="selectedCnslr" />
                        </v-dialog>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">부서</th>
                      <td>
                        <v-text-field
                          placeholder="상담사 선택 후 자동입력됩니다."
                          v-model="selectedCnslr.cnslrDeptNm"
                          disabled=""
                        ></v-text-field>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">연락처(핸드폰)</th>
                      <td>
                        <v-text-field
                          placeholder="상담사 선택 후 자동입력됩니다."
                          v-model="selectedCnslr.cnslrPh"
                          disabled=""
                        ></v-text-field>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">이메일 주소</th>
                      <td>
                        <v-text-field
                          placeholder="상담사 선택 후 자동입력됩니다."
                          v-model="selectedCnslr.cnslrEmail"
                          disabled=""
                        ></v-text-field>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">활동여부</th>
                      <td>
                        <v-radio-group v-model="selectedCnslr.cnslrActYn" inline>
                          <v-radio label="활동정지" value="N"></v-radio>
                          <v-radio label="활동" value="Y"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">상담사 특이사항</th>
                      <td>
                        <v-textarea
                          counter
                          v-model="selectedCnslr.cnslrSgnfc"
                          persistent-counter
                          placeholder="사유 및 설명을 입력해 주세요."
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">파일첨부</th>
                      <td>
                        <v-file-input hide-details></v-file-input>
                        <p class="text-error mt-1">* 파일 갯수 최대5개, 개당 20MB 이하 모든 파일 등록 가능합니다.</p>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex">
            <v-spacer></v-spacer>
            <div class="d-flex justify-end pt-4">
              <v-btn variant="tonal" color="error" width="80" class="mr-2" @click="onClickCancel()">취소</v-btn>
              <v-btn variant="flat" color="success" width="80" @click="onClickSave()">저장</v-btn>
            </div>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
/** easy-data-table */
import tableConfig, { type TableServerOption } from "@/types/dataTable/EasyDataTableConfig";
import CnslrOptionPopup from "@/components/prfsnCnsl/CnslrOptionPopup.vue";
import type { AxiosResponse } from "axios";
import type { CnslrTypes } from "@/types/cnsTypes/CnslrTypes";

export default {
  components: {
    CnslrOptionPopup,
  },
  data: () => ({
    breadcrumbs: [
      { title: "전문상담", disabled: false },
      { title: "상담사관리", disabled: false },
      { title: "심리상담", disabled: true },
    ],
    viewType: history.state.viewType,
    cnslCnslrId: history.state.cnslCnslrId,
    dialog: false,
    config: tableConfig,
    cnslrList: [] as CnslrTypes[],
    /** 상담사 선택 팝업 통해 입력되는 부분 */
    selectedCnslr: {
      cnslrId: "",
      cnslrInOut: null,
      cnslrNm: "",
      cnslrPh: "",
      cnslrEmail: "",
      cnslrDeptNm: "",
      /** 데이터 직접 입력 부분 */
      cnslrActYn: "N",
      cnslrSgnfc: "",
    } as CnslrTypes,

    /** paging */
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: ["cnslrActYn", "regDate"],
      sortType: ["desc", "desc"],
      totalCount: 0,
    } as TableServerOption,
  }),
  computed: {
    title() {
      const vm = this;
      return `상담사 ${vm.viewType === "INSERT" ? "등록" : "수정"}`;
    },
  },
  created() {
    this.fnGetList();
  },
  methods: {
    /** 상담사 상세정보 가져오기 */
    fnGetList() {
      const vm = this;
      const param = {
        cnslCnslrId: vm.cnslCnslrId,
        ...vm.$serial(vm.serverOptions) /** paging */,
      };
      if (vm.viewType == "MODIFY") {
        vm.$axios
          .get("/api/counsel/admin/counselorMng/getCounselorInfo", { params: param })
          .then((res: AxiosResponse) => {
            const success = res.status;
            if (success == 200) {
              const resData = res.data;
              vm.selectedCnslr = resData.data;
            } else {
              console.error("오류발생");
            }
          });
      }
    },

    /** 상담사 정보 저장 및 수정 */
    onClickSave() {
      const vm = this;

      let status = false;
      let msg = "";

      if (vm.$StringUtil.isEmpty(vm.selectedCnslr.cnslrNm)) {
        msg = "상담사를 선택해주세요.";
      } else if (vm.$StringUtil.isEmpty(vm.selectedCnslr.cnslrDeptNm)) {
        msg = "상담사 부서명 값이 없습니다.";
      } else if (vm.$StringUtil.isEmpty(vm.selectedCnslr.cnslrPh)) {
        msg = "상담사 연락처 값이 없습니다.";
      } else if (vm.$StringUtil.isEmpty(vm.selectedCnslr.cnslrEmail)) {
        msg = "상담사 이메일 값이 없습니다.";
      } else {
        status = true;
      }

      if (!status) {
        vm.$toast(msg, "error");
      } else {
        vm.$confirm("저장하시겠습니까?", "확인", (isConfirm: Boolean) => {
          if (isConfirm) {
            const param = {
              /** 심리상담 */
              cnslrDiv: "CNSL003",
              /** 상담사 정보 */
              ...vm.selectedCnslr,
            };

            let _url = "/api/counsel/admin/counselorMng/createCounselorInfo";

            /** 수정일 경우 */
            if (vm.viewType == "MODIFY") {
              /** pK값 담기 */
              param.cnslCnslrId = vm.cnslCnslrId;
              /** URL 주소 재할당 */
              _url = "/api/counsel/admin/counselorMng/modifyCounselorInfo";
            }

            vm.$axios.post(_url, JSON.stringify(param)).then((res: AxiosResponse) => {
              let success = res.status;
              if (success == 200) {
                vm.$alert("저장되었습니다", "알림", () => {
                  vm.$router.push("/admin/prfsnCnsl/cnslrMng/psychCnsl/psychCnsl");
                });
              } else {
                console.error("오류발생");
              }
            });
          }
        });
      }
    },

    /** 취소 버튼 선택 시 */
    onClickCancel() {
      const vm = this;
      vm.$confirm(`취소하시겠습니까?`, "확인", (isConfirm: boolean) => {
        if (isConfirm) {
          vm.$alert("취소되었습니다.", "알림");
          vm.$router.push("/admin/prfsnCnsl/cnslrMng/psychCnsl/psychCnsl");
        }
      });
    },
  },
};
</script>
