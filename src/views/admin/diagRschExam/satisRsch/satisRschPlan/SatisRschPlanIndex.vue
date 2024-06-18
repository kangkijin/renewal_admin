<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"> </BaseBreadcrumb>
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
                  <th>실시계획명/조사지명</th>
                  <td>
                    <v-text-field
                      v-model="searchList.planNm"
                      placeholder="실시계획명/조사지명을 입력해주세요."
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
                <div class="text-h4">만족도조사 실시계획 목록</div>
                <!-- tooltip -->
                <v-avatar class="mx-2" size="20" color="primary">
                  <v-icon style="font-size: 14px">mdi-exclamation-thick</v-icon>
                  <v-tooltip>
                    실시계획의 실시시간이 종료된 경우 수정이 불가합니다. <br />
                    종료된 실시계획의 수정이 필요할 경우 SR로 문의해주세요.
                  </v-tooltip>
                </v-avatar>
              </div>
            </template>
            <BaseTableConfig :totalCnt="list.length">
              <template #top-btn-area>
                <v-btn color="grey" @click="onClickPlanForm('REG', '')">실시계획등록</v-btn>
              </template>
              <template #left-btn-area>
                <div class="mr-2">{{ selectCoreDiag.length }}개 선택</div>
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
              v-model:items-selected="selectCoreDiag"
            >
              <!-- 조사자 수 -->
              <template #item-diagCnt="item">
                <!-- tooltip -->
                {{ item.diagCnt }}
                <v-avatar class="mx-2" size="20" color="primary">
                  <v-icon style="font-size: 14px">mdi-exclamation-thick</v-icon>
                  <v-tooltip> 조사지명 </v-tooltip>
                </v-avatar>
              </template>

              <!-- 경로 -->
              <template #item-diagPath="item"> {{ item.upperPath }} > {{ item.lowerPath }}</template>

              <!-- 진단 관리 -->
              <template #item-diagMng="item">
                <v-btn size="small" @click="onClickPlanForm('MODIFY', item.diagKey)"> 수정 </v-btn>
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
import DiagPreview from "@/components/diagRschExam/preview/DiagPreview.vue";

export default {
  components: {
    DiagPreview,
  },
  data: () => ({
    title: "실시계획수립",
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "만족도조사", disabled: true },
    ],
    header: [
      { text: "실시계획 명", value: "strPlanNm", sortable: true },
      { text: "조사자 수(명)", value: "diagCnt", sortable: true },
      { text: "경로", value: "diagPath", sortable: true, width: 120 },
      { text: "등록부서/등록자", value: "regNm", sortable: true },
      { text: "사용여부", value: "useYnNm", sortable: true },
      { text: "등록일", value: "regDate", sortable: true },
      { text: "관리", value: "diagMng" },
    ],

    searchList: {
      planNm: "",
      regStrDate: null,
      regEndDate: null,
      deptNm: "",
      selectRadio: "all",
    },
    list: [
      {
        no: "1",
        diagKey: "core001",
        strPlanNm: "핵심역량진단 만족도조사",
        diagCnt: 1,
        actStrDate: "2024.01.01",
        upperPath: "비교과",
        lowerPath: "비교과 공통",
        targetCnt: "3000",
        regNm: "진단평가팀/홍길동",
        useYn: "Y",
        useYnNm: "사용",
        regDate: "2024.04.01",
      },
      {
        no: "2",
        diagKey: "core002",
        strPlanNm: "비교과만족도조사(공통)",
        diagCnt: 3,
        actStrDate: "2024.01.01",
        upperPath: "비교과",
        lowerPath: "비교과 공통",
        targetCnt: "3100",
        regNm: "진단평가팀/청길동",
        useYn: "N",
        useYnNm: "미사용",
        regDate: "2024.03.01",
      },
      {
        no: "3",
        diagKey: "core002",
        strPlanNm: "학사행정서비스 만족도조사",
        diagCnt: 4,
        actStrDate: "2024.01.01",
        upperPath: "비교과",
        lowerPath: "비교과 공통",
        targetCnt: "3100",
        regNm: "진단평가팀/청길동",
        useYn: "N",
        useYnNm: "미사용",
        regDate: "2024.03.01",
      },
    ],

    selectCoreDiag: [],
    dialog: false,
  }),

  methods: {
    onClickPlanForm(type: String, diagCode: String) {
      const vm = this;
      vm.$router.push({
        path: "/admin/diagRschExam/satisRsch/satisRschPlan/satisRschPlanDetail",
        state: { viewType: type, diagCode: diagCode },
      });
    },

    /** 초기화 버튼 클릭 시 */
    onClickReset() {
      const vm = this;
      vm.searchList.planNm = "";
      vm.searchList.regStrDate = null;
      vm.searchList.regEndDate = null;
      vm.searchList.deptNm = "";
      vm.searchList.selectRadio = "all";
    },

    /** 미체크 시 사용여부 버튼 disabled */
    fnIsChecked() {
      return this.selectCoreDiag.length === 0;
    },
  },
};
</script>
