<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col class="d-flex align-center" cols="12">
          <v-row>
            <v-col cols="1">
              <v-checkbox @update:model-value="fnResetQusForm('select')" v-model="isExam" label="시험여부">
              </v-checkbox>
            </v-col>

            <v-col>
              <v-combobox
                @update:model-value="fnResetQusForm('select')"
                v-if="isExam"
                v-model="selected"
                :items="comboItem.filter((item) => item.value.includes('exam'))"
                placeholder="선택"
              />
              <v-combobox
                @update:model-value="fnResetQusForm('select')"
                v-if="!isExam"
                v-model="selected"
                :items="comboItem.filter((item) => item.value.includes('survey'))"
                placeholder="선택"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <BaseCard>
            <!-- 질문 selectBox -->
            <template v-slot:title>
              <div class="d-flex align-center">
                <div class="text-h6">
                  {{ selected ? selected.title : "질문유형을 선택해주세요" }}
                </div>
              </div>
            </template>
            <p v-if="selected === null" class="font-weight-medium mr-2" style="color: grey">내용이 없습니다.</p>
            <p v-else-if="selected.value.includes('survey')" class="font-weight-medium mr-2" style="color: grey">
              <v-container>
                <p v-if="selected.itemdiv === 'choice'">
                  <input-choice :itemdiv="selected.value" choice survey v-model="qusInfo"></input-choice>
                </p>
                <p v-else-if="selected.itemdiv === 'subjective'">
                  <input-choice :itemdiv="selected.value" survey v-model="qusInfo"></input-choice>
                </p>
              </v-container>
            </p>
            <p v-else-if="selected.value.includes('exam')" class="font-weight-medium mr-2" style="color: grey">
              <v-container>
                <p v-if="selected.itemdiv === 'choice'">
                  <input-choice :itemdiv="selected.value" choice v-model="qusInfo"></input-choice>
                </p>
                <p v-else-if="selected.itemdiv === 'subjective'">
                  <input-choice :itemdiv="selected.value" v-model="qusInfo"></input-choice>
                </p>
              </v-container>
            </p>
          </BaseCard>
        </v-col>
        <v-col class="d-flex align-center" cols="12">
          <v-spacer></v-spacer>
          <!-- 진단 미리보기 -->
          <v-dialog v-model="dialog" persistent width="1300">
            <!-- dialog button -->
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" class="mr-4"> 진단 미리보기 </v-btn>
            </template>

            <DiagPreview v-model="dialog"></DiagPreview>
          </v-dialog>
          <!-- //진단 미리보기 -->

          <p class="mr-2">페이지 :</p>
          <v-select
            class="flex-0-0 mr-2"
            placeholder="선택"
            v-model="selectedPage"
            :items="selectPageOption"
            style="width: 150px"
          ></v-select>
          <v-btn class="mr-2" @click="fnSaveQus()" variant="flat" color="primary" width="80" :disabled="!selected">
            추가
          </v-btn>
          <v-btn width="80" @click="fnResetQusForm('reset')" :disabled="!selected">초기화</v-btn>
        </v-col>
      </v-row>
      <v-divider class="my-6" />
      <v-row>
        <v-col cols="12">
          <BaseCard>
            <template v-slot:title>
              <div class="text-h6">
                {{ selected ? `[${selected.title}]` : "" }}
                질문지
              </div>
            </template>
            <v-row>
              <v-col cols="12" class="d-flex">
                <div class="mr-2">문항 번호는 저장 시 순서대로 부여됩니다.</div>
                <v-spacer></v-spacer>
                <v-btn class="mr-2" @click="onclickAddPage()">페이지 추가</v-btn>
                <v-btn @click="fnSampleExcelDown()">엑셀양식다운로드 </v-btn>
                <v-file-input label="file test" @change="handleFileChange" />
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
                        <strong class="qus_score">20점</strong>
                      </p>
                    </div>
                    <!-- [pp] 힌트 -->
                    <div class="hint_wrap"><strong>Hint</strong>시험 힌트 25자까지 제공</div>
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
                        <strong class="qus_score">20점</strong>
                      </p>
                    </div>
                    <!-- [pp] 힌트 -->
                    <div class="hint_wrap"><strong>Hint</strong>시험 힌트 25자까지 제공</div>
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
            <v-row>
              <v-col cols="12">
                <v-expansion-panels multiple>
                  <v-expansion-panel elevation="10" class="mt-3" v-for="(page, idx) in diagInfo" :key="idx">
                    <v-expansion-panel-title class="text-h6">{{ idx + 1 }}페이지</v-expansion-panel-title>
                    <v-expansion-panel-text class="mt-4">
                      <v-row>
                        <v-col cols="6" md="6" v-if="page.length == 0">내용을 추가해주세요.</v-col>
                        <v-col cols="10">
                          <div class="diag_qus">
                            <div v-for="(qus, subIdx) in page" :key="subIdx">
                              <output-choice
                                survey
                                v-if="qus.diagDiv.includes('survey')"
                                :idx="idx"
                                :subIdx="subIdx"
                                :qus="qus"
                                v-model="diagInfo"
                              ></output-choice>
                              <output-choice
                                v-if="qus.diagDiv.includes('exam')"
                                :idx="idx"
                                :subIdx="subIdx"
                                :qus="qus"
                                v-model="diagInfo"
                              ></output-choice>
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="2" class="d-flex"> </v-col>
                      </v-row>
                    </v-expansion-panel-text>
                    <v-row>
                      <v-col class="d-flex" cols="12">
                        <v-spacer></v-spacer>
                        <v-btn
                          icon="mdi-trash-can"
                          variant="flat"
                          class="filter_red mr-2"
                          color="transparent"
                          @click="deleteQusRow(idx)"
                        >
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" color="primary" flat>저장하기</v-btn>
                <v-btn color="error" @click="onclickDelPage('질문지를 초기화하시겠습니까?')">초기화</v-btn>
              </v-col>
            </v-row>
          </BaseCard>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="auto">
      <v-btn v-show="showButton" @click="scrollToTop" icon="mdi-chevron-up" class="scroll" size="large"></v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { reactive } from "vue";
import { diagStore } from "@/store/diagStore";
import InputChoice from "@/components/diag/InputChoice.vue";
import OutputChoice from "@/components/diag/OutputChoice.vue";
import DiagPreview from "@/components/diagRschExam/preview/DiagPreview.vue";
import * as XLSX from "xlsx";

export default {
  components: {
    InputChoice,
    OutputChoice,
    DiagPreview,
  },
  data: () => ({
    store: diagStore(),
    title: "질문 만들기",
    isExam: false,
    breadcrumbs: [
      { title: "실험 메뉴", disabled: false },
      { title: "진단TEST", disabled: false },
    ],
    comboItem: [
      { title: "시험-객관식", value: "examChoice", itemdiv: "choice" },
      { title: "시험-주관식", value: "examSbjct", itemdiv: "subjective" },
      { title: "설문-객관식", value: "surveyChoice", itemdiv: "choice" },
      { title: "설문-주관식", value: "surveySbjct", itemdiv: "subjective" },
    ],
    file: String,
    /** input = number */

    qusInfo: {} as any,
    checkboxes: {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
    },
    // 임시
    orderCnt: 1,
    showButton: false,
    rowDelYn: false,
    selected: null as any,

    diagInfo: [
      [
        {
          order: 0,
          diagDiv: "surveyChoice",
          title: "제목입니다",
          subTitle: "다음은 설문 문항입니다.",
          qusImg: "",
          qusScore: 0,
          ansScoreYn: true,
          blankYn: false,
          ansInfo: [
            { title: "보기1", ansImg: "", ansScore: 10 },
            { title: "보기2", ansImg: "", ansScore: 20 },
          ],
          ansAnswer: "",
          multiAnsYn: false,
        },
      ],
      [
        {
          order: 1,
          diagDiv: "examChoice",
          title: "제목입니다제목입니다제목입니다",
          subTitle: "다음은 시험 문항입니다.",
          qusImg: "",
          qusScore: 10,
          ansScoreYn: false,
          blankYn: false,
          ansInfo: [
            { title: "보기3", ansImg: "", ansScore: null },
            { title: "보기4", ansImg: "", ansScore: null },
          ],
          ansAnswer: "",
          multiAnsYn: false,
        },
      ],
    ],
    selectedPage: null,
    dialog: false,
  }),
  computed: {
    selectPageOption() {
      const vm = this;
      const diaglength = vm.diagInfo.length;

      let options = [];
      for (var i = 0; i < diaglength; i++) {
        options.push({ title: `${i + 1}페이지`, value: i });
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
  mounted: function () {
    this.fnResetQusForm();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    onclickAddPage() {
      const vm = this;
      vm.diagInfo.push([]);
    },

    fnSaveQus() {
      const vm = this;
      vm.qusInfo.order = ++vm.orderCnt;
      vm.qusInfo.diagDiv = vm.selected.value;
      if (vm.selectedPage === undefined || vm.selectedPage === null) {
        this.$toast("페이지를 선택해주세요.", "error");
      } else {
        if (vm.qusInfo.subTitle === "") {
          this.$toast("값을 입력해주세요.", "error");
        } else {
          vm.diagInfo[vm.selectedPage].push(vm.qusInfo);
          vm.selected = null;
          this.$toast(vm.selectedPage + 1 + "페이지에 추가되었습니다.", "success");
          vm.diagInfo[vm.selectedPage].focus();
        }
      }
    },
    onclickDelPage(_text: string) {
      const vm = this;
      vm.$confirm(_text, "경고", (isConfirm: boolean) => {
        if (isConfirm) {
          vm.diagInfo.splice(0);
          this.$toast("초기화되었습니다.", "success");
          vm.diagInfo.push([]);
        } else {
          this.$toast("실패되었습니다.", "error");
        }
      });
    },

    deleteQusRow(index: any) {
      if (this.diagInfo.length > 1) {
        this.diagInfo.splice(index, 1);
        this.$toast("페이지가 삭제되었습니다.", "success");
      } else {
        this.rowDelYn = true;
        this.$toast("첫 행은 삭제할 수 없습니다.", "error");
      }
    },
    fnResetQusForm(type: string) {
      const vm = this;
      vm.selected = null;
      vm.qusInfo = reactive({ ...vm.store.getQusformState });
      vm.qusInfo.ansInfo = reactive(vm.store.getQusformState.ansInfo.map((obj: any) => reactive({ ...obj })));

      if (type === "reset") {
        this.$toast("초기화되었습니다.", "success");
      }
    },
    // 스크롤 버튼 클릭
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.showButton = false; // 버튼 숨기기
    },
    handleFileChange(event: Event) {
      const vm = this;

      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(target.files[0]);

        reader.onload = () => {
          const fileData = reader.result;
          const wb = XLSX.read(fileData, { type: "binary" });
          wb.SheetNames.forEach(function (sheetName: any) {
            const rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]) as any;

            const ansInfo = [];

            // ansTitle1부터 ansTitle5까지의 값을 ansInfo 배열에 추가
            for (let i = 1; i <= 5; i++) {
              ansInfo.push({ title: rowObj[0][`ansTitle${i}`] });
            }

            // 수정된 info 객체 생성
            const modifiedInfo = {
              title: rowObj[0].title,
              subTitle: rowObj[0].subTitle,
              diagDiv: "examChoice",
              ansInfo,
            };
            vm.diagInfo[vm.selectedPage].push(modifiedInfo);
            vm.$toast(vm.selectedPage + 1 + "페이지에 업로드되었습니다.", "success");
          });
        };
      }
    },
    fnSampleExcelDown() {
      const templateUrl = "/doc/DiagFileSample.xlsx";
      const link = document.createElement("a");
      link.href = templateUrl;
      link.download = "DiagFileSample.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
