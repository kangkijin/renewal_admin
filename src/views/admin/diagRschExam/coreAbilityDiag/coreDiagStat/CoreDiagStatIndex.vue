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
                    <div class="d-flex align-center justify-center"></div>
                    <v-text-field
                      v-model="searchList.damTitle"
                      placeholder="실시계획명/진단지명을 입력해주세요."
                      @keyup.enter="fnGetDiagStatList()"
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
                      <v-radio label="실시 전" class="mr-4" value="PREV"></v-radio>
                      <v-radio label="실시 중" class="mr-4" value="PROG"></v-radio>
                      <v-radio label="실시완료" value="COMPLT"></v-radio>
                    </v-radio-group>
                  </td>

                  <th>부서명/담당자명</th>
                  <td>
                    <v-text-field
                      v-model="searchList.deptNm"
                      placeholder="부서명/담당자명을 입력해주세요."
                      @keyup.enter="fnGetDiagStatList()"
                    ></v-text-field>
                  </td>
                </tr>
              </tbody>
            </v-table>
            <div class="d-flex pt-4 justify-end">
              <v-btn class="mr-2" width="80" @click="onClickReset">초기화</v-btn>
              <v-btn variant="flat" color="primary" width="80" @click="fnGetDiagStatList()">검색</v-btn>
            </div>
          </BaseCard>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <BaseCard title="핵심역량진단 실시계획 목록">
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
              <template #item-actDate="item"> {{ item.damStrDate }} ~ {{ item.damEndDate }}</template>
              <template #item-useYn="item"> {{ item.useYn == "Y" ? "사용" : "미사용" }} </template>
              <template #item-progState="item">
                <span v-if="item.progState == 'PREV'">실시 전</span>
                <span v-else-if="item.progState == 'DUR'">실시 중</span>
                <span v-else-if="item.progState == 'COMPLT'">실시완료</span>
              </template>
              <template #item-diagMng="item">
                <v-btn size="small" @click="onClickStatPage(item.damId)">통계</v-btn>
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
      { title: "핵심역량진단", disabled: true },
    ],
    header: [
      { text: "실시계획 명", value: "damTitle", sortable: true },
      { text: "진단지 명", value: "dapTitle", sortable: true, width: 120 },
      { text: "실시기간", value: "actDate", width: 130 },
      { text: "대상자 수", value: "targetCnt", sortable: true },
      { text: "등록부서/등록자", value: "userId", sortable: true },
      { text: "진행여부", value: "progState", sortable: true },
      { text: "사용여부", value: "useYn", sortable: true },
      { text: "등록일", value: "regDate", sortable: true, width: 70 },
      { text: "관리", value: "diagMng", width: 50 },
    ],
    searchList: {
      damTitle: "",
      damStrDate: null,
      damEndDate: null,
      useYn: "",
      deptNm: "",
      selectRadio: "all",
    },
    list: [],
    selectedItems: [],
    //***paging***
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: ["progState", "regDate"],
      sortType: ["asc", "desc"],
      totalCount: 0,
    } as TableServerOption,
    loading: false,
  }),
  watch: {
    //***paging***
    serverOptions: {
      handler() {
        const vm = this;
        vm.fnGetDiagStatList();
      },
      deep: true,
    },
  },
  created() {
    const vm = this;
    vm.fnGetDiagStatList();
  },

  methods: {
    onClickReset() {
      const vm = this;

      vm.searchList.damTitle = "";
      vm.searchList.regStrDate = "";
      vm.searchList.regEndDate = "";
      vm.searchList.progState = "";
      vm.searchList.deptNm = "";
      vm.searchList.selectRadio = "all";
    },
    onClickStatPage(keyId: String) {
      const vm = this;
      vm.$router.push({
        path: "/admin/diagRschExam/coreAbilityDiag/coreDiagStat/coreDiagStatMng",
        state: { damId: keyId },
      });
    },

    /** 진단지 목록 가져오기 */
    fnGetDiagStatList() {
      const vm = this;

      const param = {
        damAbilityCategory: "C",
        damTitle: vm.searchList.damTitle,
        progState: vm.searchList.selectRadio,
        userId: vm.searchList.deptNm,
        regStrDate: vm.searchList.regStrDate,
        regEndDate: vm.searchList.regEndDate,
        //***paging***
        ...vm.$serial(vm.serverOptions),
      };
      //***paging***
      vm.loading = true;
      vm.$axios
        .get("/api/admin/diag/coreAbility/getCoreDiagStat", { params: param })
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
