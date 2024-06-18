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
                            :rules="[(v) => v.length <= 30]"
                            v-model="actPlanMng.diagPlanNm"
                          />
                          <span class="mx-1" :class="actPlanMng.diagPlanNm.length > maxLength ? 'text-error' : ''">
                            {{ actPlanMng.diagPlanNm.length }}
                          </span>
                          /<span class="text-deepgray ml-1">{{ maxLength }}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">실시기간</th>
                      <td>
                        <div class="d-flex mt-2 justify-start align-center">
                          <VDateInput v-model="actPlanMng.strDate" />
                          <VTimeInput v-model="actPlanMng.strTime" />
                          <span class="mx-1">~</span>
                          <VDateInput v-model="actPlanMng.endDate" />
                          <VTimeInput v-model="actPlanMng.endTime" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">사용여부</th>
                      <td>
                        <v-radio-group v-model="actPlanMng.useYn" inline>
                          <v-radio label="미사용" value="N"></v-radio>
                          <v-radio label="사용" value="Y"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        조사지 선택
                        <span class="required"></span>
                        <div style="font-size: 10px; color: red">
                          *조사지를 복수 등록 시, 1개의 조사가 끝나고 추가조사지가 이어집니다. 등록한 순서에 따라
                          이어지므로, 등록순서에 유의하여주십시오.
                        </div>
                      </th>
                      <td>
                        <v-row>
                          <v-col class="d-flex align-center">
                            <v-autocomplete
                              v-model="actPlanMng.selectedExamPaper"
                              :items="diagPaperItem"
                              placeholder="조사지를 선택해주세요."
                            >
                            </v-autocomplete>
                            <v-btn
                              icon="mdi-plus-box-outline"
                              v-if="actPlanMng.selectedExamPaper == null"
                              @click="onClickInsertRow()"
                              variant="flat"
                              color="transparent"
                            ></v-btn>
                            <v-btn
                              icon="mdi-minus-box-outline"
                              v-else
                              variant="flat"
                              class="filter_red"
                              color="transparent"
                            ></v-btn>
                            <span v-if="viewType === 'MODIFY'">
                              {{ actPlanMng.selectedExamPaper == null ? "(조사 대상자 수 : 0명)" : "" }}</span
                            >
                          </v-col>
                        </v-row>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">목표응답자 수</th>
                      <td class="d-flex align-center mt-2">
                        <div class="mr-4 mb-2">
                          <v-radio-group v-model="actPlanMng.regDiv" inline>
                            <v-radio label="미사용" value="N"></v-radio>
                            <v-radio label="사용" value="Y"></v-radio>
                          </v-radio-group>
                        </div>
                        <div class="d-flex align-center mr-4" style="width: 100px">
                          <v-text-field
                            class="mb-2 pr-2"
                            type="number"
                            :disabled="actPlanMng.regDiv === 'N'"
                            hide-spin-buttons
                          >
                          </v-text-field>
                          <span class="mb-2">명</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">대상자 직접등록</th>
                      <td>
                        <v-radio-group v-model="actPlanMng.directTargetReg" inline>
                          <v-radio label="미사용" value="N"></v-radio>
                          <v-radio label="사용" value="Y"></v-radio>
                        </v-radio-group>
                        <div v-if="actPlanMng.directTargetReg === 'Y'">
                          <v-btn class="ml-2 mr-2 mb-2" size="small" @click="onClickDownloadExcelForm">
                            대상자등록 양식 다운로드
                          </v-btn>
                          <v-btn size="small" class="mr-2 mb-2">대상자파일 업로드</v-btn>
                          <v-btn size="small" class="mb-2">등록 대상자 엑셀 다운로드</v-btn>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="actPlanMng.directTargetReg == 'N'">
                      <th scope="row" class="required">특정 대학/학과 적용</th>
                      <td>
                        <v-radio-group v-model="actPlanMng.selectedColgDeptYn" inline>
                          <v-radio label="미사용" value="N"></v-radio>
                          <v-radio label="사용" value="Y"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr v-if="actPlanMng.selectedColgDeptYn == 'Y' && actPlanMng.directTargetReg == 'N'">
                      <th scope="row" class="required">실시대상 대학/학과</th>
                      <td>
                        <div class="d-flex align-center">
                          <v-checkbox class="flex-0-0 mr-2" label="대학/학과"></v-checkbox>
                          <v-autocomplete
                            class="mr-2"
                            v-model="actPlanMng.selectedColg"
                            :items="selectOption.colgList"
                            item-title="deptKorNm"
                            item-value="deptCd"
                            placeholder="대학 선택"
                            @update:modelValue="fnGetHakguaList"
                          ></v-autocomplete>
                          <v-autocomplete
                            class="mr-2"
                            v-model="actPlanMng.selectedDept"
                            :items="selectOption.hakguaList"
                            item-title="deptKorNm"
                            item-value="deptCd"
                            placeholder="학과 선택"
                          ></v-autocomplete>
                          <v-btn @click="fnGetColgDeptList">추가</v-btn>
                        </div>
                      </td>
                    </tr>
                    <tr
                      v-if="
                        (actPlanMng.directTargetReg == 'N' && actPlanMng.selectedColgDeptYn == 'Y') ||
                        actPlanMng.selectedColgDeptYn == 'N'
                      "
                    >
                      <th scope="row" class="required">실시대상</th>
                      <td>
                        <div class="d-flex align-center">
                          <v-checkbox
                            v-model="actStdTargetAll"
                            value="value1"
                            class="flex-0-0 mr-4"
                            @change="onClickCoreAll(actStdTargetAll, 'STD')"
                            label="재학생 전체"
                          />
                          <v-checkbox
                            v-model="actPlanMng.diagActStdTargetList"
                            value="1"
                            class="flex-0-0 mr-4"
                            label="1학년"
                          />
                          <v-checkbox
                            v-model="actPlanMng.diagActStdTargetList"
                            value="3"
                            class="flex-0-0 mr-4"
                            label="3학년"
                          />
                          <v-checkbox
                            v-model="actPlanMng.diagActStdTargetList"
                            value="2"
                            class="flex-0-0 mr-4"
                            label="2학년"
                          />
                          <v-checkbox
                            v-model="actPlanMng.diagActStdTargetList"
                            value="4"
                            class="flex-0-0 mr-4"
                            label="4학년"
                          />
                          <v-checkbox
                            v-model="actPlanMng.diagActStdTargetList"
                            value="5"
                            class="flex-0-0 mr-4"
                            label="휴학생"
                          />
                          <v-checkbox
                            v-model="actPlanMng.diagActStdTargetList"
                            value="6"
                            class="flex-0-0 mr-4"
                            label="졸업생"
                          />
                        </div>
                        <div class="d-flex align-center">
                          <v-checkbox
                            v-model="actProfTargetAll"
                            @change="onClickCoreAll(actProfTargetAll, 'PROF')"
                            value="7"
                            class="flex-0-0 mr-4"
                            label="교수 전체"
                          />
                          <v-checkbox
                            v-model="actPlanMng.diagActProfTargetList"
                            value="8"
                            class="flex-0-0 mr-4"
                            label="정교수"
                          />
                          <v-checkbox
                            v-model="actPlanMng.diagActProfTargetList"
                            value="9"
                            class="flex-0-0 mr-4"
                            label="부교수"
                          />
                          <v-checkbox
                            v-model="actPlanMng.diagActProfTargetList"
                            value="10"
                            class="flex-0-0 mr-4"
                            label="조교수"
                          />
                          <v-checkbox
                            v-model="actPlanMng.diagActProfTargetList"
                            value="11"
                            class="flex-0-0 mr-4"
                            label="기타"
                          />
                        </div>
                        <div v-if="actPlanMng.selectedColgDeptYn == 'N'">
                          <v-checkbox value="12" class="flex-0-0 mr-4" label="직원" />
                          <v-checkbox value="13" class="flex-0-0 mr-4" label="외부인" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="d-flex">
      <v-spacer></v-spacer>
      <v-btn class="mr-2" @click="onClickCancel()">취소</v-btn>
      <v-btn class="bg-info" @click="onClickSave()">{{ viewType === "REG" ? "저장" : "수정" }}</v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { excelDown } from "@/plugins/xlsx";
import type { Header, Item } from "@/plugins/xlsx";
import { ref } from "vue";
import type { deptTypes } from "@/types/cmmnTypes";

export default {
  data: () => ({
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "설문조사", disabled: true },
    ],

    /** 실시계획 */
    actPlanMng: {
      diagPlanNm: "",
      strDate: "",
      strTime: null,
      endDate: "",
      endTime: null,
      actTarget: {},
      useYn: "N",
      regDiv: "N",
      directTargetReg: "",
      selectedColg: null,
      selectedDept: null,
      selectedColgDeptYn: "",
      selectedExamPaper: null,
      diagActStdTargetList: [],
      diagActProfTargetList: [],
    },
    actStdTargetAll: "",
    actProfTargetAll: "",

    selectOption: {
      colgList: [] as deptTypes[],
      hakguaList: [] as deptTypes[],
    },

    diagPaperItem: [
      { title: "시험1", value: "1" },
      { title: "시험2", value: "2" },
      { title: "시험3", value: "3" },
      { title: "시험4", value: "4" },
      { title: "시험5", value: "5" },
      { title: "시험6", value: "6" },
    ],

    maxLength: 30,

    isPopup: false,
    headers: ref<Header[]>([
      {
        header: "대상자코드",
        key: "targetCd",
        width: 20,
        required: true,
      },
      {
        header: "학번/교번/사번/핸드폰",
        key: "targetInfo",
        width: 20,
        required: true,
      },
    ]),
    items: ref<Item[]>([
      {
        targetCd: "K001",
        targetInfo: "01012341234",
      },
    ]),

    viewType: history.state.viewType ?? "",
  }),
  computed: {
    title() {
      const vm = this;
      return `실시계획${vm.viewType === "REG" ? "등록" : "수정"}`;
    },
  },
  created() {
    this.fnOnInit(); //초기 대학/학과 세팅
  },
  methods: {
    async fnOnInit() {
      const vm = this;
      vm.selectOption.colgList = await vm.$fnGetDeptList("C", ""); //대학리스트 불러오기
    },
    async fnGetHakguaList(selectedItem: String) {
      const vm = this;
      vm.actPlanMng.selectedDept = null;
      const selectedDeptCd = selectedItem;
      vm.selectOption.hakguaList = await vm.$fnGetDeptList("H", selectedDeptCd); //대학 셀렉트시 학과 불러오기
    },

    /** 재학생 전체 버튼 클릭 시 */
    onClickCoreAll(flag: boolean, type: String) {
      const vm = this;

      if (type == "STD") {
        if (flag) {
          vm.actPlanMng.diagActStdTargetList = ["1", "2", "3", "4", "5", "6"];
        } else {
          vm.actPlanMng.diagActStdTargetList = [];
        }
      } else if (type == "PROF") {
        if (flag) {
          vm.actPlanMng.diagActProfTargetList = ["7", "8", "9", "10", "11"];
        } else {
          vm.actPlanMng.diagActProfTargetList = [];
        }
      }
    },
    /** 취소 버튼 클릭 시 */
    onClickCancel() {
      const vm = this;
      vm.$confirm("취소하시겠습니까?", "", (isConfirm: boolean) => {
        if (isConfirm) {
          vm.$router.push("/admin/diagRschExam/surveyRsch/surveyRschPlan");
        } else {
          this.$toast("실패되었습니다.", "error");
        }
      });
    },
    /** 저장 버튼 클릭 시 */
    onClickSave() {
      const vm = this;

      vm.$confirm("실시계획을 등록하시겠습니까?", "", (isConfirm: boolean) => {
        if (isConfirm) {
          vm.$alert("저장되었습니다.");
          vm.$router.push("/admin/diagRschExam/surveyRsch/surveyRschPlan");
        } else {
          vm.$alert("실패되었습니다.");
        }
      });
    },
    /** 학과 추가 선택 시 */
    fnGetColgDeptList() {
      const vm = this;
      vm.$alert("추가되었습니다.");
    },

    /** 엑셀 양식다운로드 버튼 */
    onClickDownloadExcelForm() {
      const vm = this;
      excelDown(vm.headers, vm.items, "시험_대상자등록_양식");
    },
    /** 보기 내용 추가 */
    onClickInsertRow() {
      const vm = this;
      vm.actPlanMng.selectedExamPaper.push();
    },
  },
};
</script>
