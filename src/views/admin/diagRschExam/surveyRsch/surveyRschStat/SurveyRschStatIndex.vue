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
                  <th>진행여부</th>
                  <td>
                    <v-radio-group v-model="searchList.selectRadio" inline>
                      <v-radio label="전체" class="mr-4" value="all"></v-radio>
                      <v-radio label="실시 전" class="mr-4" value="Y"></v-radio>
                      <v-radio label="실시 중" class="mr-4" value="N"></v-radio>
                      <v-radio label="실시완료" class="mr-4" value="N"></v-radio>
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
          <BaseCard title="설문조사 실시계획 목록">
            <BaseTableConfig
              :totalCnt="list.length"
              checked
              :checkedCnt="selectedItems.length"
              v-model:rowPerPage="serverOptions.rowsPerPage"
            >
              <template #left-btn-area>
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
              v-model:items-selected="selectedItems"
              :loading="loading"
              :server-items-length="serverOptions.totalCount"
              v-model:server-options="serverOptions"
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
              <template #item-actDate="item"> {{ item.dsmStrDate }} ~ {{ item.dsmEndDate }}</template>
              <template #item-progState="item">
                <span v-if="item.progState == 'PREV'">실시 전</span>
                <span v-else-if="item.progState == 'DUR'">실시 중</span>
                <span v-else-if="item.progState == 'COMPLT'">실시완료</span>
              </template>
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
import type { TableServerOption } from "@/types/dataTable/EasyDataTableConfig";

export default {
  data: () => ({
    title: "결과ㆍ통계",
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "설문조사", disabled: true },
    ],
    header: [
      { text: "실시계획 명", value: "strPlanNm", sortable: true },
      { text: "조사자 수(명)", value: "diagCnt", sortable: true },
      { text: "실시기간", value: "actDate", sortable: true, width: 120 },
      { text: "대상자 수", value: "targetCnt", sortable: true },
      { text: "등록부서/등록자", value: "userId", sortable: true },
      { text: "진행여부", value: "progState", sortable: true },
      { text: "등록일", value: "regDate", sortable: true },
      { text: "관리", value: "diagMng" },
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
        strPlanNm: "만족도조사 1",
        diagPaperNm: "만족도조사 new",
        diagCnt: "1",
        targetCnt: 3100,
        dsmStrDate: "2024.03.20",
        dsmEndDate: "2024.04.21",
        userId: "진단평가팀/홍길동",
        progState: "DUR",
        regDate: "2024.04.01",
      },
      {
        no: "2",
        diagKey: "PROF002",
        strPlanNm: "만족도조사 2",
        diagPaperNm: "만족도조사",
        dsmStrDate: "2023.06.20",
        dsmEndDate: "2023.07.21",
        diagCnt: "3",
        targetCnt: 3300,
        userId: "진단평가팀/청길동",
        progState: "COMPLT",
        regDate: "2024.03.01",
      },
    ],
    selectedItems: [],

    //***paging***
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: ["dsmTitle", "regDate"],
      sortType: ["desc", "desc"],
      totalCount: 0,
    } as TableServerOption,
    loading: false,
  }),
  watch: {
    //***paging***
    serverOptions: {
      handler() {
        const vm = this;
        vm.fnGetSurveyRschStatList();
      },
      deep: true,
    },
  },
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

    /** 진단지 목록 가져오기 */
    fnGetSurveyRschStatList() {
      const vm = this;

      const param = {
        //***paging***
        ...vm.$serial(vm.serverOptions),
      };
      //***paging***
      vm.loading = true;
      vm.$axios
        .get("", { params: param })
        .then((res: { data: any }) => {
          vm.list = res.data.data;
          const dataTable = vm.$refs.dataTable; //***paging***
          dataTable.updateRowsPerPageActiveOption(vm.serverOptions.rowsPerPage); //***paging*** BaseTableConfig<->easyDataTable  rowsPerPage맞춰줘야함
          vm.serverOptions.totalCount = res.data.data.length > 0 ? res.data.data[0].totalCount : 0; //***paging***
          vm.selectedItems = [];
        })
        .catch((e: any) => {
          console.error(e);
        })
        .finally(() => {
          vm.loading = false; //***paging***
        });
    },
  },
};
</script>
