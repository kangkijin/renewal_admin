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
                  <th>시험지명</th>
                  <td>
                    <v-text-field
                      v-model="searchList.diagPaperNm"
                      placeholder="시험지명을 입력해주세요."
                    ></v-text-field>
                  </td>
                  <th>등록일</th>
                  <td>
                    <div class="d-flex align-center">
                      <VDateInput v-model="searchList.regStrDate" />
                      <span class="mx-1">~</span>
                      <VDateInput v-model="searchList.regEndDate" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>사용여부</th>
                  <td>
                    <v-radio-group v-model="searchList.selectRadio" inline>
                      <v-radio label="전체" class="mr-4" value="all"></v-radio>
                      <v-radio label="사용" class="mr-4" value="Y"></v-radio>
                      <v-radio label="미사용" value="N"></v-radio>
                    </v-radio-group>
                  </td>

                  <th>부서명/담당자명</th>
                  <td>
                    <v-text-field
                      v-model="searchList.deptNm"
                      placeholder="부서명/담당자명을 입력해주세요."
                    ></v-text-field>
                  </td>
                </tr>
              </tbody>
            </v-table>
            <div class="d-flex pt-4 justify-end">
              <v-btn class="mr-2" width="80" @click="onClickReset">초기화</v-btn>
              <v-btn variant="flat" color="primary" width="80">검색</v-btn>
            </div>
          </BaseCard>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <BaseCard>
            <template v-slot:title>
              <div class="d-flex align-center">
                <div class="text-h4">시험지 목록</div>
                <!-- tooltip -->
                <v-avatar class="mx-2" size="20" color="primary">
                  <v-icon style="font-size: 14px">mdi-exclamation-thick</v-icon>
                  <v-tooltip>
                    시험지 생성 후 실시계획에 매핑된 경우 수정이 불가합니다. <br />
                    수정이 필요할 경우, 매핑된 실시계획을 삭제한 후 수정하시고, <br />
                    이미 실시계획이 진행중인 경우는, SR로 문의해주세요.
                  </v-tooltip>
                </v-avatar>
              </div>
            </template>
            <BaseTableConfig :totalCnt="list.length">
              <template #top-btn-area>
                <v-btn color="grey" class="mr-2">시험지 복사</v-btn>
                <v-btn color="grey" @click="onClickMoveDetail('REG', '')">시험지 생성</v-btn>
              </template>
              <template #left-btn-area>
                <div class="mr-2">{{ selectSurveyRsch.length }}개 선택</div>
                <v-btn color="grey" class="mr-2" :disabled="fnIsChecked()">삭제</v-btn>
                <v-btn color="grey" class="mr-2" :disabled="fnIsChecked()">미사용</v-btn>
                <v-btn color="grey" :disabled="fnIsChecked()">사용</v-btn>
              </template>
            </BaseTableConfig>
            <v-easy-table
              ref="dataTable"
              :headers="header"
              :items="list"
              fixed-checkbox
              :checkbox-column-width="50"
              v-model:items-selected="selectSurveyRsch"
            >
              <template #item-useYn="{ useYn }">
                {{ useYn === "Y" ? "사용" : "미사용" }}
              </template>

              <template #item-diagMng="item">
                <v-btn size="small" :disabled="item.useYn == 'N'" @click="onClickMoveDetail('MODIFY', item.diagKey)">
                  수정
                </v-btn>
                <!-- 진단 미리보기 -->
                <v-dialog v-model="dialog" persistent width="1300">
                  <!-- dialog button -->
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" size="small">조회</v-btn>
                  </template>
                  <DiagPreview v-model="dialog"></DiagPreview>
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
import DiagPreview from "@/components/diagRschExam/DiagPreview.vue";

export default {
  components: {
    DiagPreview,
  },
  data: () => ({
    title: "문항등록ㆍ시험지생성",
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "시험", disabled: true },
    ],
    header: [
      { text: "시험지 명", value: "diagPaperNm", sortable: true },
      { text: "문항수", value: "qusCnt", sortable: true },
      { text: "등록부서/등록자", value: "regNm", sortable: true },
      { text: "사용여부", value: "useYn", sortable: true },
      { text: "등록일", value: "regDate", sortable: true },
      { text: "관리", value: "diagMng" },
    ],
    searchList: {
      diagPaperNm: "",
      regStrDate: null,
      regEndDate: null,
      deptNm: "",
      selectRadio: "all",
    },
    list: [
      {
        no: "1",
        diagKey: "survey001",
        diagPaperNm: "기초역량진단 영어A",
        qusCnt: "76",
        regNm: "진단평가팀/홍길동",
        useYn: "Y",
        useYnNm: "사용",
        regDate: "2024.04.01",
      },
      {
        no: "2",
        diagKey: "survey002",
        diagPaperNm: "기초역량진단 영어B",
        qusCnt: "65",
        regNm: "진단평가팀/청길동",
        useYn: "N",
        useYnNm: "미사용",
        regDate: "2024.03.01",
      },
    ],

    selectSurveyRsch: [],
    dialog: false,
  }),
  methods: {
    onClickMoveDetail(type: String, diagCode: String) {
      const vm = this;
      vm.$router.push({
        path: "/admin/diagRschExam/examination/examDiagPaperReg/examDiagPaperRegDetail",
        state: { viewType: type, diagCode: diagCode },
      });
    },
    onClickReset() {
      const vm = this;

      vm.searchList.diagPaperNm = "";
      vm.searchList.regStrDate = null;
      vm.searchList.regEndDate = null;
      vm.searchList.deptNm = "";
      vm.searchList.selectRadio = "all";
    },

    /** 체크된 값이 없을 경우 disabled */
    fnIsChecked() {
      return this.selectSurveyRsch.length === 0;
    },
  },
};
</script>
