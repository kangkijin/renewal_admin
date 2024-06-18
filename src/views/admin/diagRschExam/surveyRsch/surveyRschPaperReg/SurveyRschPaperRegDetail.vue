<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-tabs v-model="tab" color="primary" align-tabs="center">
        <v-tab value="0">기본 정보</v-tab>
        <v-tab value="1" :disabled="!surveyPaperInfo.dspTitle || !(surveyPaperInfo.dspTitle.length < 30)"
          >추가 정보</v-tab
        >
      </v-tabs>
      <div class="mt-4 rounded-md">
        <v-window v-model="tab">
          <v-window-item value="0">
            <v-card-text>
              <BasicInfoCard
                v-model:dspTitle="surveyPaperInfo.dspTitle"
                v-model:dspGuide="surveyPaperInfo.dspGuide"
                v-model:useYn="surveyPaperInfo.useYn"
              />

              <div class="d-flex justify-end pt-4">
                <v-btn variant="tonal" color="error" width="80" class="mr-2" @click="onClickCancel">취소</v-btn>
                <v-btn variant="tonal" color="success" width="80" @click="onClickNextTab">다음</v-btn>
              </div>
            </v-card-text>
          </v-window-item>
          <v-window-item value="1">
            <v-row>
              <v-col>
                <!-- STEP 1 문항유형 선택  -->
                <v-card-text>
                  <LabelCard :title="'STEP 1 문항유형 선택'">
                    <RschStep1Card v-model="surveyQusInfo"></RschStep1Card>
                  </LabelCard>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row class="mt-8">
              <v-col>
                <!-- STEP 2 문항정보 설정 -->
                <v-card-text>
                  <v-row class="float-right">
                    <v-col cols="12">
                      <div class="required_txt">
                        질문 및 보기에 각 1개씩의 첨부파일이 등록가능하며, MP4, AVI, JPG, PNG 파일만 등록가능합니다.
                      </div>
                      <div class="required_txt">주관식과 척도형은 질문에만 첨부파일 등록이 가능합니다.</div>
                    </v-col>
                  </v-row>
                  <LabelCard :title="'STEP 2 문항정보 설정'">
                    <RschStep2Card v-model="surveyQusInfo"></RschStep2Card>
                  </LabelCard>
                  <v-col class="d-flex align-center" cols="12">
                    <v-spacer></v-spacer>

                    <p class="mr-5 required">페이지 선택</p>
                    <v-select
                      class="flex-0-0"
                      v-model="selectedPage"
                      :items="selectPageOption"
                      bg-color="surface"
                    ></v-select>
                    <p class="ml-2 mr-4">페이지</p>
                    <v-btn
                      class="mr-2"
                      variant="flat"
                      color="deepgray"
                      width="100"
                      @click="onClickDeletePage(selectedPage)"
                      :disabled="surveyPaper.length === 1"
                    >
                      페이지 삭제
                    </v-btn>
                    <v-btn class="mr-2" variant="flat" color="primary" width="100" @click="onClickAddPage">
                      페이지 추가
                    </v-btn>
                    <v-btn variant="flat" color="primary" width="90" @click="onClickQusAdd">문항 추가</v-btn>
                  </v-col>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row class="mt-2">
              <v-col>
                <!-- STEP 3 문항 편집 및 저장 -->
                <v-card-text>
                  <LabelCard :title="'STEP 3 문항 편집 및 저장'">
                    <RschStep3Card v-model="surveyPaper" :paperInfo="fnPreviewPaperInfo()" :viewType="viewType">
                      <v-btn variant="outlined" width="80" @click="onClickSave('Y')"> 임시저장 </v-btn>
                      <v-btn variant="flat" class="ml-2" color="primary" width="80" @click="onClickSave('N')">
                        저장
                      </v-btn>
                    </RschStep3Card>
                  </LabelCard>
                </v-card-text>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </div>
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
import BasicInfoCard from "@/components/diagRschExam/surveyRschPaper/BasicInfoCard.vue";
import RschStep1Card from "@/components/diagRschExam/surveyRschPaper/RschStep1Card.vue";
import RschStep2Card from "@/components/diagRschExam/surveyRschPaper/RschStep2Card.vue";
import RschStep3Card from "@/components/diagRschExam/surveyRschPaper/RschStep3Card.vue";

import type { QusOutputTypes, PaperOutputTypes } from "@/types/diagTypes/DiagIOTypes";
import type { SurveyRschPaperTypes } from "@/types/diagTypes/SurveyTypes";
import type { PreviewPaperTypes } from "@/types/diagTypes/PreviewTypes";
import type { AxiosResponse } from "axios";
// import type { AxiosResponse } from "axios";

export default {
  components: {
    LabelCard,
    BasicInfoCard,
    RschStep1Card,
    RschStep2Card,
    RschStep3Card,
  },
  data: () => ({
    breadcrumbs: [
      { title: "조사ㆍ조사ㆍ시험", disabled: false },
      { title: "설문조사", disabled: true },
    ],

    showButton: false, //스크롤 버튼

    tab: 0,

    diagCode: history.state.diagCode ?? "",
    viewType: history.state.viewType ?? "",

    /** 문항지 관련 정보 */
    surveyPaperInfo: {
      dspId: null,
      dspTitle: "",
      dspGuide: "",
      useYn: "Y",
    } as SurveyRschPaperTypes,

    /** 현재 작성중인 문항 정보 */
    surveyQusInfo: {
      type: null,
      title: "",
      hint: "",
      order: 0,
      multiYn: "N",
      pageNo: 0,
      ansInfo: [],
    } as QusOutputTypes,

    /** 설문조사지 */
    surveyPaper: [{ relatedDiv: "N", qusInfo: [] as QusOutputTypes[] }] as PaperOutputTypes[],

    /** STEP2 선택된 페이지 */
    selectedPage: 0,
    /** STEP3 선택된 문항 리스트 */
    checkedList: [],

    /** 미리보기 dialog 여부 */
    dialog: false,
  }),

  computed: {
    title() {
      const vm = this;
      return `문항등록ㆍ조사지${vm.viewType === "REG" ? "생성" : "수정"}`;
    },

    selectPageOption() {
      const vm = this;
      const options = [];

      for (var i = 0; i < vm.surveyPaper.length; i++) {
        options.push({ title: `${i + 1}`, value: i });
      }
      return options;
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  methods: {
    /** 다음 탭 버튼 */
    onClickNextTab() {
      const vm = this;
      if (vm.surveyPaperInfo.dspTitle == "") {
        vm.$toast("조사지명을 입력해주세요.", "error");
      } else if (vm.surveyPaperInfo.dspTitle.length > 30) {
        vm.$toast("조사지명은 최대 30자까지 입력 가능합니다.", "error");
      } else if (vm.surveyPaperInfo.dspGuide.length > 200) {
        vm.$toast("조사안내는 최대 200자까지 입력 가능합니다.", "error");
      } else {
        vm.tab++;
      }
    },

    /** 취소 버튼 클릭 시 */
    onClickCancel() {
      const vm = this;
      vm.$confirm("취소하시겠습니까?", "", (isConfirm: boolean) => {
        if (isConfirm) {
          vm.$router.push("/admin/diagRschExam/surveyRsch/surveyRschPaperReg");
        }
      });
    },

    /** 저장 버튼 클릭 시*/
    onClickSave(_div: ynTypes) {
      const vm = this;

      if (!vm.fnValidation()) return;

      const formattedPaper: QusOutputTypes[][] = vm.surveyPaper.map((item: PaperOutputTypes) => {
        return item.qusInfo;
      });

      const param = {
        ...vm.surveyPaperInfo,
        tempYn: _div,
        qusInfo: formattedPaper,
      };

      console.log(param);

      vm.$loading.show();
      vm.$axios
        .post("/api/admin/diag/surveyResearch/createSurveyRschPaper", JSON.stringify(param))
        .then((res: AxiosResponse) => {
          const resData = res.data;
          console.log(resData);
          // vm.$alert("저장되었습니다.", "", () => {
          //   vm.$router.push("/admin/diagRschExam/surveyRsch/surveyRschPaperReg");
          // });
        })
        .catch((e: Error) => {
          console.error(e);
        })
        .finally(() => {
          vm.$loading.hide();
        });
    },

    /** 저장 전 validation */
    fnValidation() {
      const vm = this;
      let status = true;

      for (let i = 0; i < vm.surveyPaper.length; i++) {
        if (vm.surveyPaper[i].qusInfo.length === 0) {
          vm.$alert(`${i + 1}페이지에 문항을 입력해주세요.`);
          status = false;
          break;
        }
      }

      return status;
    },

    /** 문항 추가 버튼 클릭 시*/
    onClickQusAdd() {
      const vm = this;
      const activePage: PaperOutputTypes = vm.surveyPaper[vm.selectedPage];

      // Validation
      if (!vm.fnValidationQus()) return;

      // 분기 문항 처리
      if (vm.surveyQusInfo.type === "BRANCH") {
        if (!vm.fnChkBranchQus()) return;
      }

      // 연계 시작 페이지라면 마지막 전 번호로 문항 추가 (마지막 문항 = 연계문항)
      let targetIdx = activePage.qusInfo.length;
      if (vm.surveyQusInfo.type != "BRANCH" && activePage.relatedDiv === "S") {
        targetIdx = targetIdx - 1;
      }

      vm.surveyPaper[vm.selectedPage].qusInfo.splice(targetIdx, 0, vm.surveyQusInfo);
      vm.$toast(`${vm.selectedPage + 1} 페이지에 추가되었습니다.`, "success");

      //폼 초기화
      vm.fnResetQusInfo();
    },

    /** 분기형 문항용 처리 */
    fnChkBranchQus() {
      const vm = this;

      // 이미 분기문항이 존재하는 경우
      if (vm.surveyPaper[vm.selectedPage].relatedDiv === "S") {
        vm.$alert(`${vm.selectedPage + 1}페이지에 이미 분기문항이 존재합니다.`);
        return;
      }

      const nextPage1 = vm.selectedPage + 1; // 다음 페이지
      const nextPage2 = vm.selectedPage + 2; // 다다음 페이지

      // 마지막 페이지에 넣는 경우 >> 뒤에 페이지 2개 추가
      if (vm.selectedPage === vm.surveyPaper.length - 1) {
        vm.surveyPaper.push({ relatedDiv: "T", qusInfo: [] as QusOutputTypes[] });
        vm.surveyPaper.push({ relatedDiv: "T", qusInfo: [] as QusOutputTypes[] });
      }

      // 뒤에 페이지 1개가 더 있는 경우 >> 뒤에 페이지 1개 추가
      else if (nextPage1 === vm.surveyPaper.length - 1) {
        if (vm.surveyPaper[nextPage1].relatedDiv === "T") {
          vm.$alert(`${nextPage1 + 1}페이지가 이미 연계 페이지로 설정되어있습니다.`);
          return false;
        } else {
          vm.surveyPaper[nextPage1].relatedDiv = "T";
        }
        vm.surveyPaper.push({ relatedDiv: "T", qusInfo: [] as QusOutputTypes[] });
      }

      // 뒤에 페이지 2개 이상 더 있는 경우 >> 뒤에 페이지 추가 X
      else if (nextPage2 <= vm.surveyPaper.length - 1) {
        if (vm.surveyPaper[nextPage1].relatedDiv === "T") {
          vm.$alert(`${nextPage1 + 1}페이지가 이미 연계 페이지로 설정되어있습니다.`);
          return false;
        } else if (vm.surveyPaper[nextPage2].relatedDiv === "T") {
          vm.$alert(`${nextPage2 + 1}페이지가 이미 연계 페이지로 설정되어있습니다.`);
          return false;
        } else {
          vm.surveyPaper[nextPage1].relatedDiv = "T";
          vm.surveyPaper[nextPage2].relatedDiv = "T";
        }
      }

      vm.surveyPaper[vm.selectedPage].relatedDiv = "S";
      vm.surveyQusInfo.ansInfo[0].relationPage = nextPage1;
      vm.surveyQusInfo.ansInfo[1].relationPage = nextPage2;

      return true;
    },

    /** 폼 초기화 */
    fnResetQusInfo() {
      const vm = this;
      vm.surveyQusInfo = {
        type: null,
        title: "",
        hint: "",
        order: 0,
        multiYn: "N",
        pageNo: 0,
        ansCnt: 0,
        ansInfo: [],
      };
    },

    /** Validation */
    fnValidationQus() {
      const vm = this;
      let status = true;

      const form: QusOutputTypes = vm.surveyQusInfo;

      if (vm.selectedPage === undefined || vm.selectedPage === null) {
        vm.$toast("페이지를 선택해주세요.", "error");
        status = false;
      } else if (vm.surveyQusInfo.type === undefined || vm.surveyQusInfo.type === null) {
        vm.$toast("문항유형을 선택해주세요.", "error");
        status = false;
      } else if (vm.$StringUtil.isEmpty(form.title)) {
        vm.$toast("문항 내용을 입력해주세요", "error");
        status = false;
      } else if (form.type === "CHOICE" && !form.multiYn) {
        vm.$toast("복수응답을 입력해주세요", "error");
        status = false;
      } else if (form.type !== "OPEN") {
        for (let i = 0; i < form.ansInfo.length; i++) {
          if (vm.$StringUtil.isEmpty(form.ansInfo[i].title)) {
            vm.$toast(`${i + 1}번 보기 내용을 입력해주세요`, "error");
            status = false;
            return;
          }
        }
      }

      return status;
    },

    /** 페이지 추가 버튼 클릭 시 */
    onClickAddPage() {
      const vm = this;
      const emptyPaper: PaperOutputTypes = { relatedDiv: "N", qusInfo: [] as QusOutputTypes[] };
      vm.surveyPaper.push(emptyPaper);
      vm.$toast(vm.surveyPaper.length + "페이지가 추가되었습니다.", "success");
      vm.selectedPage = vm.surveyPaper.length - 1;
    },

    /** 페이지 삭제 버튼 클릭 시 */
    onClickDeletePage(index: number) {
      const vm = this;
      const surveyPaper: PaperOutputTypes[] = vm.surveyPaper;

      // 유일한 페이지의 경우 >> button disabled

      // 연계 페이지의 경우
      if (surveyPaper[index].relatedDiv !== "N") {
        vm.$alert("연계 페이지는 삭제할 수 없습니다.<br />연계 문항을 삭제해주세요.", "확인");
        return false;
      }

      // 작성된 문항이 있는지 확인
      if (surveyPaper[index].qusInfo.length > 0) {
        vm.$confirm(
          `${index + 1}페이지 삭제 시 등록된 문항도 함께 삭제됩니다.<br />진행하시겠습니까?`,
          "확인",
          (isConfirm: boolean) => {
            if (isConfirm) {
              // 선택된 페이지 변경
              if (vm.selectedPage !== 0) {
                vm.selectedPage = vm.selectedPage - 1;
              }

              vm.surveyPaper.splice(index, 1);
              vm.$toast(`${index + 1}페이지가 삭제되었습니다.`, "success");
            }
          },
        );
      } else {
        // 선택된 페이지 변경
        if (vm.selectedPage !== 0) {
          vm.selectedPage = vm.selectedPage - 1;
        }

        vm.surveyPaper.splice(index, 1);
        vm.$toast(`${index + 1}페이지가 삭제되었습니다.`, "success");
      }
    },

    /** 미리보기 - 진단지 */
    fnPreviewPaperInfo() {
      const vm = this;
      return { title: vm.surveyPaperInfo.dspTitle, guide: vm.surveyPaperInfo.dspGuide } as PreviewPaperTypes;
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
