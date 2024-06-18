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
                  <th>실시계획명/시험지명</th>
                  <td>
                    <v-text-field
                      v-model="searchList.planNm"
                      placeholder="실시계획명/시험지명을 입력해주세요."
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
                      <v-radio label="사용" class="mr-4" value="Y"></v-radio>
                      <v-radio label="미사용" class="mr-4" value="N"></v-radio>
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
          <BaseCard title="시험 실시계획 목록">
            <BaseTableConfig :totalCnt="list.length">
              <template #top-btn-area>
                <div class="mt-5">
                  <span style="color: red">
                    <span class="mr-2 required"></span>
                    주의 : 참여자 수 집계 기준은, 현재일 -1일입니다.
                  </span>
                </div>
              </template>
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
      { title: "시험", disabled: true },
    ],
    header: [
      { text: "실시계획 명", value: "strPlanNm", sortable: true },
      { text: "조사자 수(명)", value: "diagCnt", sortable: true, width: 80 },
      { text: "경로", value: "diagPath", sortable: true, width: 120 },
      { text: "누적 참여자 수", value: "cmlPrtCnt", sortable: true },
      { text: "등록부서/등록자", value: "regNm", sortable: true },
      { text: "사용여부", value: "useYnNm", sortable: true },
      { text: "등록일", value: "regDate", sortable: true },
      { text: "관리", value: "diagMng", width: 80 },
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
        strPlanNm: "차수프로그램 1회차 시험",
        diagPaperNm: "만족도조사 new",
        diagCnt: "1",
        upperPath: "비교과",
        lowerPath: "비교과 공통",
        cmlPrtCnt: 3100,
        regNm: "진단평가팀/홍길동",
        progYn: "실시완료",
        useYnNm: "사용",
        regDate: "2024.04.01",
      },
      {
        no: "2",
        diagKey: "PROF002",
        strPlanNm: "차수프로그램 2회차 시험",
        diagPaperNm: "만족도조사",
        diagCnt: "3",
        upperPath: "비교과",
        lowerPath: "비교과 공통",
        cmlPrtCnt: 3300,
        regNm: "진단평가팀/청길동",
        progYn: "실시중",
        useYnNm: "미사용",
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
        path: "",
        state: { list: list },
      });
    },
  },
};
</script>
