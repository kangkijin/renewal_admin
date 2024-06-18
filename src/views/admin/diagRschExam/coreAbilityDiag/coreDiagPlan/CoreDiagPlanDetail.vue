<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

  <v-row>
    <v-col>
      <BaseCard :title="'실시계획수립'">
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
                      <th scope="row" class="required">실시계획명</th>
                      <td>
                        <div class="d-flex align-center">
                          <v-text-field
                            placeholder="실시계획명을 입력해주세요."
                            v-model="diagPlanMng.damTitle"
                            :disabled="diagPlanMng.progState == 'DUR'"
                          />
                          <span class="mx-1" :class="diagPlanMng.damTitle.length > maxLength ? 'text-error' : ''">
                            {{ diagPlanMng.damTitle.length }}
                          </span>
                          /<span class="text-deepgray ml-1">{{ maxLength }}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">실시기간</th>
                      <td>
                        <div class="d-flex mt-2 justify-start align-center">
                          <VDateInput v-model="diagPlanMng.strDate" :disabled="diagPlanMng.progState == 'DUR'" />
                          <VTimeInput v-model="diagPlanMng.strTime" :disabled="diagPlanMng.progState == 'DUR'" />
                          <span class="mx-1">~</span>
                          <VDateInput v-model="diagPlanMng.endDate" />
                          <VTimeInput v-model="diagPlanMng.endTime" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">실시대상</th>
                      <td>
                        <div class="d-flex">
                          <v-checkbox
                            class="flex-0-0 mr-4"
                            v-model="actTargetAll"
                            @change="onClickCoreAll(actTargetAll)"
                            label="재학생 전체"
                            :disabled="diagPlanMng.progState == 'DUR'"
                          >
                          </v-checkbox>
                          <v-checkbox
                            class="flex-0-0 mr-4"
                            value="1"
                            v-model="diagPlanMng.diagActTargetList"
                            label="1학년"
                            @change="onCheckGrade('1')"
                            :disabled="diagPlanMng.progState == 'DUR'"
                          >
                          </v-checkbox>
                          <v-checkbox
                            class="flex-0-0 mr-4"
                            value="2"
                            v-model="diagPlanMng.diagActTargetList"
                            label="2학년"
                            @change="onCheckGrade('2')"
                            :disabled="diagPlanMng.progState == 'DUR'"
                          >
                          </v-checkbox>
                          <v-checkbox
                            class="flex-0-0 mr-4"
                            value="3"
                            v-model="diagPlanMng.diagActTargetList"
                            label="3학년"
                            @change="onCheckGrade('3')"
                            :disabled="diagPlanMng.progState == 'DUR'"
                          >
                          </v-checkbox>
                          <v-checkbox
                            class="flex-0-0 mr-4"
                            value="4"
                            v-model="diagPlanMng.diagActTargetList"
                            label="4학년"
                            @change="onCheckGrade('4')"
                            :disabled="diagPlanMng.progState == 'DUR'"
                          >
                          </v-checkbox>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">사용여부</th>
                      <td>
                        <v-radio-group v-model="diagPlanMng.useYn" :disabled="diagPlanMng.progState == 'DUR'" inline>
                          <v-radio label="사용" value="Y"></v-radio>
                          <v-radio label="미사용" value="N"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <!-- TODO SB 확인 필요 (개발 임시 hidden처리)  -->
                    <tr hidden>
                      <th scope="row" class="required">외국인학생포함</th>
                      <td>
                        <v-radio-group v-model="diagPlanMng.frgnYn" inline>
                          <v-radio label="미포함" value="N"></v-radio>
                          <v-radio label="포함" value="Y"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        진단지 선택<span class="required"></span>
                        <h5 class="text-error" v-if="viewType === 'REG'">등록한 계획의 진단지는 수정할 수 없습니다.</h5>
                      </th>
                      <td>
                        <v-autocomplete
                          v-if="diagPlanMng.progState === ''"
                          v-model="diagPlanMng.dapId"
                          :items="diagList"
                          placeholder="진단지를 선택해주세요."
                        >
                        </v-autocomplete>
                        <v-text-field v-else v-model="diagPlanMng.dapTitle" disabled></v-text-field>
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
            <v-btn class="mr-2" @click="onClickCancel()">취소</v-btn>
            <v-btn class="bg-info" @click="onClickSave()">{{ viewType === "REG" ? "저장" : "수정" }}</v-btn>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import type { AxiosResponse } from "axios";
import moment from "moment";

export default {
  data: () => ({
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "핵심역량진단", disabled: true },
    ],

    diagPlanMng: {
      damTitle: "",
      dapTitle: "",
      damAbilityCategory: "C",
      strDate: "",
      strTime: null,
      endDate: "",
      endTime: null,
      diagActTargetList: [],
      useYn: "Y",
      frgnYn: "N",
      damStrDate: "",
      damEndDate: "",
      dapId: null,
      progState: "",
    },
    actTargetAll: false,

    diagList: [],

    maxLength: 30,

    diagCode: history.state.diagCode ?? "",
    viewType: history.state.viewType ?? "",
  }),
  computed: {
    title() {
      const vm = this;
      return `실시계획${vm.viewType === "REG" ? "등록" : "수정"}`;
    },
  },
  watch: {
    //종료일자 검사
    "diagPlanMng.endDate"(newVal) {
      const vm = this;
      if (moment(newVal) <= moment()) {
        vm.$alert("종료 날짜를 오늘 이후로 설정해주세요.");
        vm.diagPlanMng.endDate = "";
      }
    },
  },
  created() {
    const vm = this;
    vm.fnGetDiagInfo();
    vm.fnGetDiagPaperList();
  },
  methods: {
    /** 취소 버튼 클릭 시 */
    onClickCancel() {
      const vm = this;
      vm.$confirm("취소하시겠습니까?", "", (isConfirm: boolean) => {
        if (isConfirm) {
          vm.$router.push("/admin/diagRschExam/coreAbilityDiag/coreDiagPlan");
        }
      });
    },

    /** Step1 Validation */
    fnValidation() {
      const vm = this;

      const diagPlanMng = vm.diagPlanMng;
      let status = false;
      let msg = "";

      if (!diagPlanMng.damTitle) {
        msg = "실시계획명을 입력해주세요";
      } else if (diagPlanMng.damTitle.length >= 30) {
        msg = "실시계획명을 형식에 맞게 입력해주세요.";
      } else if (!diagPlanMng.strDate || !diagPlanMng.strTime || !diagPlanMng.endDate || !diagPlanMng.endTime) {
        msg = "실시기간을 입력해주세요";
      } else if (!diagPlanMng.useYn) {
        msg = "사용여부를 해주세요.";
      } else if (diagPlanMng.diagActTargetList.length == 0) {
        msg = "실시대상을 선택해주세요.";
      } else if (diagPlanMng.dapId === null) {
        msg = "진단지를 선택해주세요";
      } else {
        status = true;
      }

      if (!status) vm.$toast(msg, "error");
      return status;
    },

    /** 저장/수정 버튼 클릭 시 */
    onClickSave() {
      const vm = this;
      if (!vm.fnValidation()) return;

      // 실시기간 가공
      let damStrDate = vm.diagPlanMng.strDate + " " + vm.diagPlanMng.strTime;
      let damEndDate = vm.diagPlanMng.endDate + " " + vm.diagPlanMng.endTime;
      vm.diagPlanMng.damStrDate = moment(damStrDate);
      vm.diagPlanMng.damEndDate = moment(damEndDate);

      let alertMsg = "";
      let url = "";

      if (vm.viewType === "REG") {
        alertMsg = "저장";
        url = "/api/admin/diag/coreAbility/createCoreDiagPlan";
      } else if (vm.viewType === "MODIFY") {
        alertMsg = "수정";
        url = "/api/admin/diag/coreAbility/modifyCoreDiagPlan";
      }

      vm.$confirm(alertMsg + "하시겠습니까?", "확인", (isConfirm: Boolean) => {
        if (isConfirm) {
          let param = { damAbilityCategory: "C", ...vm.diagPlanMng };
          delete param.dapTitle;

          vm.$loading.show();
          vm.$axios
            .post(url, JSON.stringify(param))
            .then((res: AxiosResponse) => {
              const resData = res.data;

              if (resData.code === "200") {
                vm.$alert(alertMsg + "되었습니다.", "알림", () => {
                  vm.$router.push("/admin/diagRschExam/coreAbilityDiag/coreDiagPlan");
                  vm.loading = false;
                });
              } else {
                vm.$alert(alertMsg + "되었습니다.", "알림");
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
    },

    /** 역량 전체 버튼 클릭 시 */
    onClickCoreAll(flag: boolean) {
      const vm = this;
      if (flag) {
        vm.diagPlanMng.diagActTargetList = ["1", "2", "3", "4"];
      } else {
        vm.diagPlanMng.diagActTargetList = [];
      }
    },

    /** 학년 체크 시 */
    onCheckGrade(grade: string) {
      const vm = this;
      const allGrades = ["1", "2", "3", "4"];

      if (vm.diagPlanMng.diagActTargetList.includes(grade)) {
        if (vm.diagPlanMng.diagActTargetList.length === allGrades.length) {
          vm.actTargetAll = true; // 모든 학년이 선택된 경우 `재학생 전체` 체크
        }
      } else {
        vm.actTargetAll = false; // `재학생 전체` 체크 해제
      }
    },

    /** 진단지 데이터 가져오기 */
    fnGetDiagInfo() {
      const vm = this;
      if (vm.viewType === "MODIFY") {
        const param = {
          damId: vm.diagCode,
          damAbilityCategory: "C",
        };
        vm.$axios
          .get("/api/admin/diag/coreAbility/getCoreDiagPlanDetail", { params: param })
          .then((res: AxiosResponse) => {
            const resData = res.data.data;
            vm.diagPlanMng = resData[0];
            const strParts = vm.diagPlanMng.damStrDate.split(" ");
            const endParts = vm.diagPlanMng.damEndDate.split(" ");
            let targetParts = vm.diagPlanMng.diagActTarget.split("|");
            vm.diagPlanMng.strDate = strParts[0];
            vm.diagPlanMng.strTime = strParts[1];
            vm.diagPlanMng.endDate = endParts[0];
            vm.diagPlanMng.endTime = endParts[1];
            if (targetParts.length === 4) {
              vm.actTargetAll = true;
            }
            vm.diagPlanMng.diagActTargetList = targetParts;
          })
          .catch((e: Error) => {
            console.error(e);
          });
      }
    },

    /** 진단지 목록 가져오기 */
    fnGetDiagPaperList() {
      const vm = this;

      const param = {
        dapAbilityCategory: "C",
      };
      vm.$loading.show();
      vm.$axios
        .get("/api/admin/diag/coreAbility/getCoreDiagPlanPaper", { params: param })
        .then((res: AxiosResponse) => {
          const dataList = res.data.data.map((item: { dapTitle: String; dapId: number }) => ({
            title: item.dapTitle,
            value: item.dapId,
          }));
          vm.diagList.push(...dataList);
          vm.$loading.hide();
        })
        .catch((e: Error) => {
          console.error(e);
        });
    },
  },
};
</script>
