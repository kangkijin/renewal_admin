<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-tabs v-model="tab" color="primary" align-tabs="center">
        <v-tab value="0">기본 정보</v-tab>
        <v-tab value="1" :disabled="!diagPaperInfo.dapTitle || !(diagPaperInfo.dapTitle.length <= 30)">추가 정보</v-tab>
      </v-tabs>
      <v-card-text class="bg-grey100 mt-4 rounded-md">
        <v-window v-model="tab">
          <v-window-item value="0">
            <!-- 기본 정보 -->
            <BasicInfoCard
              v-model:dapTitle="diagPaperInfo.dapTitle"
              v-model:dapGuide="diagPaperInfo.dapGuide"
              v-model:useYn="diagPaperInfo.useYn"
            />

            <div class="d-flex justify-end pt-4">
              <v-btn variant="tonal" color="error" width="80" class="mr-2" @click="onClickCancel">취소</v-btn>
              <v-btn variant="tonal" color="success" width="80" @click="onClickNextTab">다음</v-btn>
            </div>
          </v-window-item>

          <v-window-item value="1">
            <!-- STEP 1 척도 수 입력 -->
            <v-row>
              <v-col>
                <LabelCard :title="'STEP 1 척도 수 입력'">
                  <Step1Card
                    v-model="diagPaperInfo.dapAnsCnt"
                    :disabled="activeRow[0] || viewType == 'MODIFY'"
                  ></Step1Card>
                </LabelCard>
                <v-row>
                  <v-col cols="12">
                    <div class="d-flex justify-end pt-4">
                      <v-btn
                        variant="flat"
                        color="success"
                        width="80"
                        v-if="!activeRow[0] && viewType != 'MODIFY'"
                        @click="onClickNextStep(0)"
                      >
                        다음
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <!-- STEP 2 진단정보 설정 -->
            <v-row class="mt-2" v-if="activeRow[0] || viewType == 'MODIFY'">
              <v-col>
                <LabelCard :title="'STEP 2 진단정보 설정'">
                  <Step2Card v-model:diagPaper="diagPaperInfo" v-model:diagQus="diagQusList"></Step2Card>
                </LabelCard>
                <v-row>
                  <v-col cols="12">
                    <div class="d-flex justify-end pt-4">
                      <v-btn
                        variant="flat"
                        color="success"
                        width="80"
                        v-if="!activeRow[1] && viewType != 'MODIFY'"
                        @click="onClickNextStep(1)"
                      >
                        다음
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <!-- STEP 3 문항 편집 및 저장 -->
            <v-row class="mt-2" v-if="activeRow[1] || viewType == 'MODIFY'">
              <v-col>
                <LabelCard :title="'STEP 3 문항 편집 및 저장'">
                  <Step3Card v-model="diagQusList" :diagPaperInfo="diagPaperInfo">
                    <v-btn variant="flat" color="primary" width="80" @click="onClickSave()">
                      {{ viewType == "MODIFY" ? "수정" : "저장" }}
                    </v-btn>
                  </Step3Card>
                </LabelCard>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="auto">
      <v-btn v-show="showButton" @click="scrollToTop" icon="mdi-chevron-up" class="scroll" size="large"></v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import BasicInfoCard from "@/components/diagRschExam/abilityDiagPaper/BasicInfoCard.vue";
import LabelCard from "@/components/common/LabelCard.vue";
import Step1Card from "@/components/diagRschExam/abilityDiagPaper/Step1Card.vue";
import Step2Card from "@/components/diagRschExam/abilityDiagPaper/Step2Card.vue";
import Step3Card from "@/components/diagRschExam/abilityDiagPaper/Step3Card.vue";

import type {
  AbilityDiagPaperTypes,
  AbilityDiagQusExcelForm,
  AbilityDiagAnsInfoTypes,
} from "@/types/diagTypes/AbilityDiagTypes";
import type { AxiosResponse } from "axios";
export default {
  components: {
    BasicInfoCard,
    LabelCard,
    Step1Card,
    Step2Card,
    Step3Card,
  },
  data: () => ({
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "교수역량진단", disabled: true },
    ],

    tab: 0, //상단 탭
    showButton: false, //스크롤 버튼
    activeRow: [false, false], //Step 다음 버튼

    diagCode: history.state.diagCode ?? "",
    viewType: history.state.viewType ?? "",

    diagPaperInfo: {
      dapId: null,
      dapTitle: "",
      dapViewCnt: null,
      perPageCnt: 0,
      dapCalcDiv: null,
      dapScore: 0,
      dapAnsCnt: 0,
      dapAnsInfo: [],
      dapAbilityCategory: "P",
      dapGuide: "",
      useYn: "Y",
    } as AbilityDiagPaperTypes,

    diagQusList: [] as AbilityDiagQusExcelForm[],
  }),
  computed: {
    title() {
      const vm = this;
      return `문항등록ㆍ진단지${vm.viewType === "REG" ? "생성" : "수정"}`;
    },
  },
  created: function () {
    const vm = this;
    vm.fnGetDiagInfo();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    /** 다음 탭 버튼 */
    onClickNextTab() {
      const vm = this;
      if (vm.diagPaperInfo.dapTitle == "") {
        vm.$toast("진단지명을 입력해주세요.", "error");
      } else if (vm.diagPaperInfo.dapTitle.length > 30) {
        vm.$toast("진단지명은 최대 30자까지 입력 가능합니다.", "error");
      } else if (vm.diagPaperInfo.dapGuide.length > 200) {
        vm.$toast("진단안내는 최대 200자까지 입력 가능합니다.", "error");
      } else {
        vm.tab++;
      }
    },

    /** 취소 버튼 클릭 시 */
    onClickCancel() {
      const vm = this;
      vm.$confirm("취소하시겠습니까?", "", (isConfirm: boolean) => {
        if (isConfirm) {
          vm.$router.push("/admin/diagRschExam/profAbilityDiag/profDiagPaperReg");
        }
      });
    },

    /** 다음 스텝 버튼 */
    onClickNextStep(idx: number) {
      const vm = this;
      let status = false;

      // STEP 1 → STEP 2
      if (idx === 0) {
        status = vm.fnValidationStep1();
        if (!status) return;

        vm.$confirm("척도 수는 변경이 불가합니다.<br />진행하시겠습니까?", "확인", (isConfirm: Boolean) => {
          if (isConfirm) {
            for (let i = 0; i < vm.diagPaperInfo.dapAnsCnt; i++) {
              vm.diagPaperInfo.dapAnsInfo.push({
                dapAnsTitle: null,
                dapAnsScore: null,
              });
            }

            vm.activeRow[idx] = true;
          }
        });
      }

      // STEP 2 → STEP 3
      else if (idx === 1) {
        status = vm.fnValidationStep2();
        if (status) vm.activeRow[idx] = true;
      }
    },

    /** Step1 Validation */
    fnValidationStep1() {
      const vm = this;

      const input = vm.diagPaperInfo.dapAnsCnt;
      let status = true;

      if (input < 2 || input > 10) {
        vm.$toast("척도 수를 2 ~ 10 사이의 수로<br />입력해주세요.", "error");
        status = false;
      }

      return status;
    },

    /** Step2 Validation */
    fnValidationStep2() {
      const vm = this;

      let status = false;
      let msg = "";

      // 보기별 내용 제외 validation
      const paperInfo = vm.diagPaperInfo;
      if (vm.diagQusList.length === 0) {
        msg = "문항을 등록해주세요";
      } else if (paperInfo.dapViewCnt === null) {
        msg = "페이지 출력 방식을 선택해주세요";
      } else if (paperInfo.dapViewCnt === "n" && (paperInfo.perPageCnt <= 0 || paperInfo.perPageCnt === "")) {
        msg = "출력단위를 0 이상 입력해주세요";
      } else if (paperInfo.dapCalcDiv === null) {
        msg = "점수 산정 방식을 선택해주세요";
      } else if (paperInfo.dapScore <= 0 || paperInfo.dapScore === "") {
        msg = "문항 배점은 0점 이상 입력해주세요";
      } else {
        status = true;
      }

      /*
        소수점을 허용하기 때문에 vuetify 컴포넌트를 사용한 number 데이터를
        그대로 비교하면 정상적으로 되지않아서 한번 파싱해준다.
      */
      const numberParsing = (_val: number) => {
        return parseFloat(parseFloat(String(_val)).toFixed(1));
      };

      // 보기별 내용 validation
      if (status) {
        for (let i = 0; i < vm.diagPaperInfo.dapAnsInfo.length; i++) {
          const dapAnsInfo: AbilityDiagAnsInfoTypes = vm.diagPaperInfo.dapAnsInfo[i];
          const paperInfo: AbilityDiagPaperTypes = vm.diagPaperInfo;
          status = false;

          if (dapAnsInfo.dapAnsTitle === null || dapAnsInfo.dapAnsTitle === "") {
            msg = `${i + 1}번 보기 내용을 입력해주세요`;
            break;
          } else if (dapAnsInfo.dapAnsScore === null) {
            msg = `${i + 1}번 보기 배점을 입력해주세요`;
            break;
          } else if (numberParsing(dapAnsInfo.dapAnsScore) > numberParsing(paperInfo.dapScore ?? 0)) {
            msg = `${i + 1}번 보기 배점이 문항 배점보다 큽니다`;
            break;
          } else {
            status = true;
          }
        }
      }

      if (!status) vm.$toast(msg, "error");
      return status;
    },

    /**
     * 저장 / 수정 버튼 클릭 시
     */
    onClickSave() {
      const vm = this;

      if (!vm.fnValidationStep1()) return;
      if (!vm.fnValidationStep2()) return;

      let alertMsg = "";
      let url = "";

      if (vm.viewType === "REG") {
        alertMsg = "저장";
        url = "/api/admin/diag/profAbility/createProfDiagPaper";
      } else if (vm.viewType === "MODIFY") {
        alertMsg = "수정";
        url = "/api/admin/diag/profAbility/modifyProfDiagPaper";
      }

      vm.$confirm(`${alertMsg}하시겠습니까?`, "확인", (isConfirm: Boolean) => {
        if (isConfirm) {
          let param = vm.diagPaperInfo;
          param["diagQusList"] = vm.diagQusList;

          vm.$loading.show();
          vm.$axios
            .post(url, JSON.stringify(param))
            .then((res: AxiosResponse) => {
              const resData = res.data;

              if (resData.code === "200") {
                vm.$alert(`${alertMsg}되었습니다.`, "알림", () => {
                  vm.$router.push("/admin/diagRschExam/profAbilityDiag/profDiagPaperReg");
                });
              } else {
                vm.$alert(`${alertMsg}에 실패하였습니다.`, "알림");
              }
            })
            .finally(() => {
              vm.$loading.hide();
            });
        }
      });
    },

    // 스크롤 버튼 클릭
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.showButton = false; // 버튼 숨기기
    },

    // 스크롤 이벤트 처리
    handleScroll() {
      if (window.scrollY > 100) {
        this.showButton = true;
      } else {
        this.showButton = false;
      }
    },

    /** 진단지 데이터 가져오기 */
    fnGetDiagInfo() {
      const vm = this;
      if (vm.viewType === "MODIFY") {
        const param = {
          dapId: vm.diagCode,
        };

        vm.$loading.show();
        vm.$axios
          .get("/api/admin/diag/profAbility/getProfDiagPaperDetail", { params: param })
          .then((res: AxiosResponse) => {
            const resData = res.data.data;
            vm.diagPaperInfo = resData[0];
            if (vm.diagPaperInfo.dapViewCnt != "-1" || vm.diagPaperInfo.dapViewCnt != "1") {
              vm.diagPaperInfo.perPageCnt = vm.diagPaperInfo.dapViewCnt;
              vm.diagPaperInfo.dapViewCnt = "n";
            }
            vm.diagQusList = resData[0].diagQusList;
          })
          .catch((e: Error) => {
            console.error(e);
          })
          .finally(() => {
            vm.$loading.hide();
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// 스크롤 스타일 지정
.scroll {
  right: 20px;
  z-index: 1014;
  position: fixed;
  bottom: 30px;
  color: white;
  background-color: rgb(93, 135, 255);
  border: 0px;
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.08),
    0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.16),
    0 8px 8px rgba(0, 0, 0, 0.2);
}
</style>
