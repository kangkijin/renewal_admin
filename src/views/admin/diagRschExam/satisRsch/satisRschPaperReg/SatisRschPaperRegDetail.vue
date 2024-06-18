<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-tabs v-model="tab" color="primary" align-tabs="center">
        <v-tab value="0">기본 정보</v-tab>
        <v-tab value="1" :disabled="!satisPaperInfo.sdpTitle || !(satisPaperInfo.sdpTitle.length < 30)"
          >추가 정보</v-tab
        >
      </v-tabs>
      <v-card-text class="bg-grey100 mt-4 rounded-md">
        <v-window v-model="tab">
          <v-form ref="form">
            <v-window-item value="0">
              <BasicInfoCard
                v-model:sdpTitle="satisPaperInfo.sdpTitle"
                v-model:sdpGuide="satisPaperInfo.sdpGuide"
                v-model:useYn="satisPaperInfo.useYn"
              />

              <div class="d-flex justify-end pt-4">
                <v-btn variant="tonal" color="error" width="80" class="mr-2" @click="onClickCancel">취소</v-btn>
                <v-btn variant="tonal" color="success" width="80" @click="onClickNextTab">다음</v-btn>
              </div>
            </v-window-item>
            <v-window-item value="1">
              <v-row>
                <v-col>
                  <LabelCard :title="'STEP 1 문항유형 선택'">
                    <RschStep1Card v-model="satisPaperInfo.qusType" :qusTypeItem="qusTypeItem"></RschStep1Card>
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
                      <div class="required_txt">주관식과 척도형은 질문에만 첨부파일 등록이 가능합니다.</div>
                    </v-col>
                  </v-row>
                  <LabelCard :title="'STEP 2 문항정보 설정'">
                    <div v-if="satisPaperInfo.qusType == null">
                      <p class="mt-3 text-h6">문항유형을 선택해주세요.</p>
                      <p class="mt-3 h6">내용이 없습니다.</p>
                    </div>
                    <div v-else>
                      <RschStep2Card v-model="satisPaperInfo"></RschStep2Card>
                    </div>
                  </LabelCard>
                  <v-col class="d-flex align-center" cols="12">
                    <v-spacer></v-spacer>
                    <p class="mr-5 required">페이지 선택</p>
                    <v-select
                      class="mr-2"
                      placeholder="선택"
                      v-model="selectedPage"
                      :items="selectPageOption"
                      bg-color="surface"
                    ></v-select>
                    <v-btn class="mr-2" variant="flat" color="deepgray" width="100" @click="deleteQusRow(selectedPage)">
                      페이지 삭제
                    </v-btn>
                    <v-btn class="mr-2" variant="flat" color="primary" width="100" @click="onClickAddPage">
                      페이지 추가
                    </v-btn>
                    <v-btn variant="flat" color="primary" width="90" @click="onClickQusAdd">문항 추가</v-btn>
                  </v-col>
                </v-col>
              </v-row>
              <v-row class="mt-2">
                <v-col>
                  <LabelCard :title="'STEP 3 문항 편집 및 저장'">
                    <v-row>
                      <v-col>
                        <div class="text-h4">문항지</div>
                        <v-row>
                          <v-col class="d-flex align-center pt-4">
                            <div class="mr-2" style="font-weight: bold">{{ checkedList.length }}개 선택</div>
                            <v-btn icon="mdi-arrow-up" density="compact" class="mr-2"></v-btn>
                            <v-btn icon="mdi-arrow-down" density="compact" class="mr-2"></v-btn>
                            <v-btn prepend-icon="mdi-arrow-up" class="mr-2">최상위</v-btn>
                            <v-btn prepend-icon="mdi-arrow-down" class="mr-2" base-color="white">최하위</v-btn>
                            <v-btn class="mr-2" @click="onClickDelete">삭제</v-btn>
                            <v-btn
                              icon="mdi-chevron-left"
                              variant="text"
                              class="text-primary mr-2 text-h2"
                              :disabled="selectedQusPage == 0"
                              @click="onClickMovePage('prePage')"
                            ></v-btn>
                            <v-select class="flex-0-0" v-model="selectedQusPage" :items="selectPageOption2"> </v-select>
                            <span>페이지</span>
                            <v-btn
                              icon="mdi-chevron-right"
                              variant="text"
                              class="text-primary ml-2 text-h2"
                              :disabled="selectedQusPage + 1 == selectPageOption2.length"
                              @click="onClickMovePage('postPage')"
                            ></v-btn>

                            <!-- 진단 미리보기 -->
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" persistent width="1300">
                              <!-- dialog button -->
                              <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" class="mr-2" variant="outlined" width="80"> 미리보기 </v-btn>
                              </template>
                              <DiagPreview v-model="dialog"> </DiagPreview>
                            </v-dialog>
                            <v-btn variant="outlined" width="80" @click="onClickSave"> 임시저장 </v-btn>
                            <v-btn variant="flat" class="ml-2" color="primary" width="80" @click="onClickSave">
                              저장
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row v-for="(page, pageCnt) in satisPaper" :key="pageCnt">
                      <v-col v-if="pageCnt == selectedQusPage">
                        <v-row v-if="page.length == 0">
                          <v-col cols="12">
                            <div class="infomation_box text-center">
                              <div>
                                <v-icon icon="mdi-file-question" size="x-large"></v-icon>
                                검색결과가 없습니다
                                <span class="mt-4">문항을 추가해주세요.</span>
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <div class="diag_qus_wrap qus_option_check">
                              <template v-for="(item, subIdx) in page" :key="subIdx">
                                <div class="diag_qus">
                                  <v-checkbox class="d-inline-flex" :value="subIdx" v-model="checkedList" />
                                  <ChoiceOutput :idx="pageCnt" :subIdx="subIdx" :qus="item"></ChoiceOutput>
                                </div>
                              </template>
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </LabelCard>
                </v-col>
              </v-row>
            </v-window-item>
          </v-form>
        </v-window>
      </v-card-text>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import LabelCard from "@/components/common/LabelCard.vue";
import BasicInfoCard from "@/components/diagRschExam/surveyRschPaper/BasicInfoCard.vue";
import RschStep1Card from "@/components/diagRschExam/surveyRschPaper/RschStep1Card.vue";
import RschStep2Card from "@/components/diagRschExam/surveyRschPaper/RschStep2Card.vue";
import ChoiceOutput from "@/components/diagRschExam/IO/ChoiceOutput.vue";

export default {
  components: {
    LabelCard,
    BasicInfoCard,
    RschStep1Card,
    RschStep2Card,
    ChoiceOutput,
  },
  data: () => ({
    breadcrumbs: [
      { title: "조사ㆍ조사ㆍ시험", disabled: false },
      { title: "만족도조사", disabled: true },
    ],

    qusTypeItem: [
      { title: "객관식", value: "CHOICE" },
      { title: "주관식", value: "OPEN" },
      { title: "척도형", value: "SCALE" },
      { title: "분기문항", value: "BRANCH" },
    ],

    tab: 0,

    diagCode: history.state.diagCode ?? "",
    viewType: history.state.viewType ?? "",

    satisPaperInfo: {
      sdpId: null,
      sdpTitle: "",
      sdpGuide: "",
      useYn: "Y",
      sdpQusCont: null,
      sdpHintCont: null,
      sdpAnsInfo: [],
      regId: "",
      sdpMultResponses: "",
      qusType: null,
      sdpType: "SU",
      sdpQusNumSettingStr: null,
      sdpQusNumSettingEnd: null,
    },
    /** 만족도조사지 */
    satisPaper: [[]],

    selectedPage: 0,
    selectedQusPage: 0,
    dialog: false,
    checkedList: [],
  }),
  computed: {
    title() {
      const vm = this;
      return `문항등록ㆍ조사지${vm.viewType === "REG" ? "생성" : "수정"}`;
    },

    selectPageOption() {
      const vm = this;
      const satisPaperlength = vm.satisPaper.length;

      let options = [];

      for (var i = 0; i < satisPaperlength; i++) {
        options.push({ title: `${i + 1}페이지`, value: i });
      }
      return options;
    },

    selectPageOption2() {
      const vm = this;
      const satisPaperlength = vm.satisPaper.length;

      let options = [];
      for (var i = 0; i < satisPaperlength; i++) {
        options.push({ title: `${i + 1} `, value: i });
      }
      return options;
    },
  },
  watch: {
    selectPageOption: {
      handler(newPage) {
        // selectPageOption의 길이가 변경될 때 selectedPage의 value를 업데이트 한다.
        if (newPage.length > 0) {
          this.selectedPage = newPage[newPage.length - 1].value;
        }
      },
      immediate: true, // 컴포넌트가 마운트되면서 즉시 실행
    },
  },

  methods: {
    /** 다음 탭 버튼 */
    onClickNextTab() {
      const vm = this;
      if (vm.satisPaperInfo.sdpTitle == "") {
        vm.$toast("조사지명을 입력해주세요.", "error");
      } else if (vm.satisPaperInfo.sdpTitle.length > 30) {
        vm.$toast("조사지명은 최대 30자까지 입력 가능합니다.", "error");
      } else if (vm.satisPaperInfo.sdpGuide.length > 200) {
        vm.$toast("조사안내는 최대 200자까지 입력 가능합니다.", "error");
      } else {
        vm.tab++;
      }
    },
    /** 페이지 추가 버튼 클릭 시 */
    onClickAddPage() {
      const vm = this;

      vm.satisPaper.push([]);

      vm.$alert(vm.satisPaper.length + "페이지가 추가되었습니다.");
    },

    /** 취소 버튼 클릭 시 */
    onClickCancel() {
      const vm = this;
      vm.$confirm("취소하시겠습니까?", "", (isConfirm: boolean) => {
        if (isConfirm) {
          vm.$router.push("/admin/diagRschExam/satisRsch/satisRschPaperReg");
        } else {
          this.$toast("실패되었습니다.", "error");
        }
      });
    },

    /** 페이지 이동 버튼 */
    onClickMovePage(type: String) {
      const vm = this;
      if (type == "prePage") {
        vm.selectedQusPage -= 1;
      } else if (type == "postPage") {
        vm.selectedQusPage += 1;
      }
    },

    /** 저장 버튼 클릭 시*/
    onClickSave() {
      const vm = this;

      vm.$alert("저장되었습니다.");
      vm.$router.push("/admin/diagRschExam/satisRsch/satisRschPaperReg");
    },

    /** 문항 삭제 버튼 */
    onClickDelete() {
      const vm = this;

      if (vm.checkedList.length === 0) {
        vm.$toast("문항을 선택해주세요", "warning");
        return false;
      }

      vm.$confirm("선택한 문항을 삭제하시겠습니까?", "주의!", (isConfirm: Boolean) => {
        if (isConfirm) {
          // 체크 버튼을 누른 순서대로 배열에 입력되어 삭제 시 내림차순으로 정렬해서 삭제해야한다
          vm.checkedList.sort((a: number, b: number) => b - a);

          for (let i = 0; i < vm.checkedList.length; i++) {
            const index = vm.checkedList[i];
            vm.satisPaper[vm.selectedQusPage].splice(index, 1);
          }
          vm.checkedList = [];
          vm.$toast("삭제되었습니다.", "success");
        }
      });
    },

    /** 문항 추가 버튼 클릭 시*/
    onClickQusAdd() {
      const vm = this;
      let status = false;

      if (vm.selectedPage === undefined || vm.selectedPage === null) {
        vm.$toast("페이지를 선택해주세요.", "error");
      } else if (vm.satisPaperInfo.qusType === undefined || vm.satisPaperInfo.qusType === null) {
        vm.$toast("문항유형을 선택해주세요.", "error");
      } else {
        status = vm.fnValidationStep2();
        if (!status) return;
        vm.satisPaper[vm.selectedPage].push(vm.satisPaperInfo);

        vm.$toast(vm.selectedPage + 1 + "페이지에 추가되었습니다.", "success");

        vm.fnResetQusForm();
      }
    },

    /** Step2 Validation */
    fnValidationStep2() {
      const vm = this;
      const form = vm.satisPaperInfo;
      let status = true;

      if (!form.sdpQusCont) {
        vm.$toast("문항 내용을 입력해주세요", "error");
        status = false;
      } else if (!form.sdpMultResponses && form.qusType == "CHOICE") {
        vm.$toast("복수응답을 입력해주세요", "error");
        status = false;
      } else {
        form.sdpAnsInfo.forEach((item: any) => {
          if (!item.title && form.qusType != "OPEN") {
            vm.$toast("보기 내용을 입력해주세요", "error");
            status = false;
          }
        });
      }

      return status;
    },

    /** 페이지 삭제 버튼 클릭 시 */
    deleteQusRow(index: any) {
      const vm = this;

      if (vm.satisPaper.length > 1) {
        if (vm.satisPaper[index].length == 0) {
          vm.satisPaper.splice(index, 1);
          vm.$alert(index + "페이지가 삭제되었습니다.");
        } else if (vm.satisPaper[index].length > 0) {
          vm.$confirm(
            index + 1 + "페이지는 문항이 등록되었습니다.<br>삭제 시 등록된 문항도 함께 삭제됩니다.",
            "",
            (isConfirm: boolean) => {
              if (isConfirm) {
                vm.satisPaper.splice(index, 1);
                vm.$alert("페이지가 삭제되었습니다.");
              } else {
                vm.$alert("실패되었습니다.");
              }
            },
          );
        }
      } else {
        vm.$toast("첫 페이지는 삭제할 수 없습니다.", "error");
      }
    },

    /** 폼 초기화 */
    fnResetQusForm() {
      const vm = this;
      vm.satisPaperInfo = {
        sdpId: null,
        sdpTitle: "",
        sdpGuide: "",
        useYn: "Y",
        sdpQusCont: null,
        sdpHintCont: null,
        sdpAnsInfo: [],
        regId: "",
        sdpMultResponses: "",
        qusType: null,
        sdpType: "SU",
        sdpQusNumSettingStr: null,
        sdpQusNumSettingEnd: null,
      };
    },
  },
};
</script>
