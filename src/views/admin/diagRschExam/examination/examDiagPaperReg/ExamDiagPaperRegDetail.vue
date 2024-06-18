<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-tabs v-model="tab" color="primary" align-tabs="center">
        <v-tab value="0">기본 정보</v-tab>
        <v-tab value="1" :disabled="!diagPaperInfo.dapTitle || !(diagPaperInfo.dapTitle.length < 30)">추가 정보</v-tab>
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
            <v-row>
              <v-col>
                <LabelCard :title="'STEP 1 기본 설정'">
                  <Step2Card v-model:diagPaper="diagPaperInfo" v-model:diagQus="diagQusList"></Step2Card>
                </LabelCard>
              </v-col>
            </v-row>
            <v-row class="mt-2">
              <v-col>
                <LabelCard :title="'STEP 2 문항유형 선택'">
                  <RschStep1Card v-model="diagPaperInfo" :qusTypeItem="qusTypeItem"></RschStep1Card>
                </LabelCard>
              </v-col>
            </v-row>
            <v-row class="mt-2">
              <v-col>
                <LabelCard :title="'STEP 3 문항정보 설정'">
                  <RschStep1Card v-model="diagPaperInfo" :qusTypeItem="qusTypeItem"></RschStep1Card>
                </LabelCard>
              </v-col>
            </v-row>
            <v-row class="mt-2">
              <v-col>
                <v-row class="float-right">
                  <v-col cols="12">
                    <div class="required_txt">
                      질문 및 보기에 각 1개씩의 첨부파일이 등록가능하며, MP4, AVI, JPG, PNG 파일만 등록가능합니다.
                    </div>
                    <div class="required_txt">단답형은, 질문에만 파일첨부가 가능합니다.</div>
                  </v-col>
                </v-row>
                <LabelCard :title="'STEP 4 문항 편집 및 저장'">
                  <v-row>
                    <v-col cols="12">
                      <div class="text-h4">문항지</div>
                      <div class="d-flex align-center pt-4">
                        <v-btn icon="mdi-arrow-up" density="compact" class="mr-2"></v-btn>
                        <v-btn icon="mdi-arrow-down" density="compact" class="mr-2"></v-btn>
                        <v-btn prepend-icon="mdi-arrow-up" class="mr-2">최상위</v-btn>
                        <v-btn prepend-icon="mdi-arrow-down" class="mr-2" base-color="white">최하위</v-btn>
                        <v-btn color="grey-darken-1" class="mr-2">삭제</v-btn>
                        <!-- 진단 미리보기 -->
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" persistent width="1300">
                          <!-- dialog button -->
                          <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" class="mr-2" variant="outlined" color="text-background">
                              시험지 미리보기
                            </v-btn>
                            <v-btn v-bind="props" class="mr-2" variant="outlined" color="text-background">
                              답안지 미리보기
                            </v-btn>
                          </template>
                          <DiagPreview v-model="dialog"></DiagPreview>
                        </v-dialog>
                        <v-btn variant="outlined" class="mr-2" color="text-background" width="80" @click="onClickSave"
                          >임시저장</v-btn
                        >
                        <v-btn variant="flat" color="primary" width="80" @click="onClickSave">저장</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <div class="diag_qus_wrap qus_option_check">
                        <div class="diag_qus">
                          <v-checkbox class="d-inline-flex" />

                          <div class="qus_header">
                            <strong class="qus_num">01.</strong>
                            <p class="qus_tit">
                              Which one of the five is least like the other four? 객관식 문항입니다.
                            </p>
                          </div>
                          <!-- [pp] 힌트 -->
                          <!-- [pp] 문항-->
                          <div class="qus_cnt">
                            <v-radio-group inline class="point_scale">
                              <v-radio label="매우 그렇지않다" class="d-block" value="one" density="compact">
                                <span class="number">1</span>
                              </v-radio>
                              <v-radio label="그렇지않다" class="d-block" value="two" density="compact">
                                <span class="number">2</span>
                              </v-radio>
                              <v-radio label="보통" class="d-block" value="three" density="compact">
                                <span class="number">3</span>
                              </v-radio>
                              <v-radio label="그렇다" class="d-block" value="four" density="compact">
                                <span class="number">4</span>
                              </v-radio>
                              <v-radio label="매우 그렇다" class="d-block" value="five" density="compact">
                                <span class="number">5</span>
                              </v-radio>
                            </v-radio-group>
                          </div>
                        </div>
                        <div class="diag_qus">
                          <v-checkbox class="d-inline-flex" />
                          <div class="qus_header">
                            <strong class="qus_num">02.</strong>
                            <p class="qus_tit">
                              Which one of the five is least like the other four? 객관식 문항입니다.
                            </p>
                          </div>
                          <!-- [pp] 힌트 -->
                          <!-- [pp] 문항-->
                          <div class="qus_cnt">
                            <v-radio-group inline class="point_scale">
                              <v-radio label="그렇지않다" class="d-block" value="two" density="compact">
                                <span class="number">2</span>
                              </v-radio>
                              <v-radio label="보통" class="d-block" value="three" density="compact">
                                <span class="number">3</span>
                              </v-radio>
                              <v-radio label="그렇다" class="d-block" value="four" density="compact">
                                <span class="number">4</span>
                              </v-radio>
                            </v-radio-group>
                          </div>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
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
import LabelCard from "@/components/common/LabelCard.vue";
import Step2Card from "@/components/diagRschExam/examDiagPaper/Step2Card.vue";
import DiagPreview from "@/components/diagRschExam/DiagPreview.vue";
import type { AbilityDiagPaperTypes, AbilityDiagQusExcelForm } from "@/types/diagTypes/AbilityDiagTypes";
import BasicInfoCard from "@/components/diagRschExam/examDiagPaper/BasicInfoCard.vue";
import RschStep1Card from "@/components/diagRschExam/surveyRschPaper/RschStep1Card.vue";
export default {
  components: {
    BasicInfoCard,
    LabelCard,
    DiagPreview,
    Step2Card,
    RschStep1Card,
  },
  data: () => ({
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "시험", disabled: true },
    ],

    tab: 0, //상단 탭
    showButton: false, //스크롤 버튼

    diagCode: history.state.diagCode ?? "",
    viewType: history.state.viewType ?? "",

    diagPaperInfo: {
      dapId: null,
      dapTitle: "",
      dapViewCnt: 0,
      dapCalcDiv: null,
      dapScore: null,
      dapAnsCnt: 0,
      dapAbilityCategory: "C",
      dapGuide: "",
      regId: "",
      useYn: "Y",
    } as AbilityDiagPaperTypes,

    diagQusList: [] as AbilityDiagQusExcelForm[],

    diagQusInfo: {
      daqId: null,
      dapId: null,
      daqTitle: "",
      daqScore: "",
      daqOrder: 0,
      upAbilityCd: "",
      abilityCd: "",
      rvrsYn: null,
    },

    diagInfo: {
      dapAnsCnt: 0,
      dapScore: "",
      dapCalcDiv: "",
      ansInfo: [],
      qusCnt: "0",
      diagCnt: "0",
      perPageCnt: 0,
      qusPerPage: null,
    },

    dialog: false,

    qusTypeItem: [
      { title: "객관식", value: "choice" },
      { title: "단답형", value: "shrtAns" },
    ],
  }),
  computed: {
    title() {
      const vm = this;
      return `문항등록ㆍ시험지${vm.viewType === "REG" ? "생성" : "수정"}`;
    },
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

    /** 다음 스텝 버튼 */
    onClickNextStep(idx: number) {
      const vm = this;
      let status = false;

      if (idx === 0) {
        status = this.fnValidationStep1();
        if (!status) return;
      } else if (idx === 1) {
        status = this.fnValidationStep2();
        if (!status) return;
      }

      vm.activeRow[idx] = true;
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
      let msg = "를 입력해주세요.";

      if (!status) vm.$toast(msg, "error");
      return status;
    },

    /** 취소 버튼 클릭 시 */
    onClickCancel() {
      const vm = this;
      vm.$confirm("취소하시겠습니까?", "", (isConfirm: boolean) => {
        if (isConfirm) {
          vm.$router.push("/admin/diagRschExam/examination/examDiagPaperReg");
        } else {
          vm.$toast("실패되었습니다.", "error");
        }
      });
    },
    /** 저장 버튼 클릭 시*/
    onClickSave() {
      const vm = this;

      vm.$alert("저장되었습니다.");
      vm.$router.push("/admin/diagRschExam/examination/examDiagPaperReg");
    },
    // 스크롤 버튼 클릭
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.showButton = false; // 버튼 숨기기
    },
    handleScroll() {
      // 스크롤 이벤트 처리
      if (window.scrollY > 100) {
        this.showButton = true;
      } else {
        this.showButton = false;
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
