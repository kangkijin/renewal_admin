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
                  <th>실시계획명/진단지명</th>
                  <td>
                    <v-text-field
                      v-model="searchList.planNm"
                      placeholder="실시계획명/진단지명을 입력해주세요."
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
                  <th>진행여부</th>
                  <td>
                    <v-radio-group v-model="searchList.selectRadio" inline>
                      <v-radio label="전체" class="mr-4" value="all"></v-radio>
                      <v-radio label="실시 전" class="mr-4" value="one"></v-radio>
                      <v-radio label="실시 중" class="mr-4" value="two"></v-radio>
                      <v-radio label="실시완료" value="three"></v-radio>
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
          <BaseCard title="교수역량진단 실시계획 목록">
            <BaseTableConfig :totalCnt="list.length">
              <template #left-btn-area>
                <div class="mr-2">{{ selected.length }}개 선택</div>
                <v-btn color="grey" class="mr-2">미사용</v-btn>
                <v-btn color="grey">사용</v-btn>
              </template>
            </BaseTableConfig>
            <v-easy-table
              ref="dataTable"
              :headers="header"
              :items="list"
              fixed-checkbox
              :checkbox-column-width="50"
              v-model:items-selected="selected"
            >
              <template #item-diagMng="list">
                <v-btn size="small" @click="onClickStatPage(list)">통계</v-btn>
              </template>
            </v-easy-table>
          </BaseCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script lang="ts">
export default {
  data: () => ({
    title: "결과ㆍ통계",
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "교수역량진단", disabled: true },
    ],
    header: [
      { text: "실시계획 명", value: "strPlanNm", sortable: true },
      { text: "진단지 명", value: "diagPaperNm", sortable: true },
      { text: "실시기간", value: "actDate", sortable: true },
      { text: "대상자 수", value: "targetCnt", sortable: true },
      { text: "등록부서/등록자", value: "regNm", sortable: true },
      { text: "진행여부", value: "progYn", sortable: true },
      { text: "사용여부", value: "useYn", sortable: true },
      { text: "등록일", value: "regDate", sortable: true, width: 70 },
      { text: "관리", value: "diagMng", width: 70 },
    ],
    searchList: {
      planNm: "",
      regStrDate: null,
      regEndDate: null,
      useYn: "",
      deptNm: "",
      selectRadio: "all",
    },
    list: [
      {
        no: "1",
        diagKey: "PROF001",
        strPlanNm: "교수역량진단 2024",
        diagPaperNm: "교수역량진단 new",
        actDate: "2024.01.01~2024.01.15",
        targetCnt: "3000",
        regNm: "진단평가팀/홍길동",
        progYn: "실시완료",
        useYn: "사용",
        regDate: "2024.04.01",
      },
      {
        no: "2",
        diagKey: "PROF002",
        strPlanNm: "교수역량진단 2023",
        diagPaperNm: "교수역량진단",
        actDate: "2023.01.01~2023.01.15",
        targetCnt: "3100",
        regNm: "진단평가팀/청길동",
        progYn: "실시중",
        useYn: "미사용",
        regDate: "2024.03.01",
      },
    ],
    selected: [],
  }),
  methods: {
    onClickReset() {
      const vm = this;

      vm.searchList.planNm = "";
      vm.searchList.regStrDate = "";
      vm.searchList.regEndDate = "";
      vm.searchList.useYn = "";
      vm.searchList.deptNm = "";
      vm.searchList.selectRadio = "all";
    },
    onClickStatPage(list: []) {
      const vm = this;
      vm.$router.push({
        path: "/admin/diagRschExam/profAbilityDiag/profDiagStat/profDiagStatMng",
        state: { list: list },
      });
    },
  },
};
</script>
