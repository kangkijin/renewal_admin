<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
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
              <th>부서/학과</th>
              <td>
                <v-radio-group v-model="searchInfo.searchDeptHg" inline>
                  <v-radio value="" class="flex-0-0 mr-4" label="전체" />
                  <v-radio value="dept" class="flex-0-0 mr-4" label="부서" />
                  <v-radio value="hakgua" class="flex-0-0" label="학과" />
                </v-radio-group>
              </td>
              <th>대학</th>
              <td>
                <v-autocomplete placeholder="전체" v-model="searchInfo.searchColg"> </v-autocomplete>
              </td>
            </tr>
            <tr>
              <th>부서</th>
              <td>
                <v-autocomplete placeholder="전체" v-model="searchInfo.searchDept"> </v-autocomplete>
              </td>
              <th>학과</th>
              <td>
                <v-autocomplete placeholder="전체" v-model="searchInfo.searchHakgua"> </v-autocomplete>
              </td>
            </tr>
            <tr>
              <th>학년도</th>
              <td>
                <v-autocomplete placeholder="전체" v-model="searchInfo.searchYear"> </v-autocomplete>
              </td>
              <th>학기</th>
              <td>
                <v-autocomplete placeholder="전체" v-model="searchInfo.searchTerm"> </v-autocomplete>
              </td>
            </tr>
            <tr>
              <th>카테고리</th>
              <td>
                <v-autocomplete
                  v-model="searchInfo.searchCategory"
                  item-title="ecmTitle"
                  item-value="ecmId"
                  :items="categoryList"
                  placeholder="전체"
                ></v-autocomplete>
              </td>
              <th>과정명</th>
              <td>
                <v-text-field v-model.trim="searchInfo.searchCurri" placeholder="과정명"></v-text-field>
              </td>
            </tr>
            <tr>
              <th>차수명</th>
              <td>
                <v-autocomplete placeholder="전체" v-model="searchInfo.searchPeriod"> </v-autocomplete>
              </td>
              <th>운영상태</th>
              <td>
                <div class="d-flex">
                  <v-checkbox v-model="searchInfo.searchAprvSts" value="" class="flex-0-0 mr-4" label="전체" />
                  <v-checkbox
                    v-model="searchInfo.searchAprvSts"
                    value="APRV001"
                    class="flex-0-0 mr-4"
                    label="승인대기"
                  />
                  <v-checkbox v-model="searchInfo.searchAprvSts" value="APRV002" class="flex-0-0 mr-4" label="승인" />
                  <v-checkbox v-model="searchInfo.searchAprvSts" value="APRV003" class="flex-0-0" label="반려" />
                </div>
              </td>
            </tr>
            <tr>
              <th>신청기간</th>
              <td>
                <div class="d-flex align-center">
                  <VDateInput v-model="searchInfo.searchReqStrDate" :placeholder="'시작일'" />
                  <span class="mx-2">~</span>
                  <VDateInput v-model="searchInfo.searchReqEndDate" :placeholder="'종료일'" />
                </div>
              </td>
              <th>운영기간</th>
              <td>
                <div class="d-flex align-center">
                  <VDateInput v-model="searchInfo.searchOprtStrDate" :placeholder="'시작일'" />
                  <span class="mx-2">~</span>
                  <VDateInput v-model="searchInfo.searchOprtEndDate" :placeholder="'종료일'" />
                </div>
              </td>
            </tr>
            <tr>
              <th>역량</th>
              <td colspan="3">
                <div class="d-flex">
                  <v-checkbox
                    v-model="searchInfo.coreAll"
                    class="flex-0-0 mr-4"
                    label="전체"
                    @change="onClickCoreAll(searchInfo.coreAll)"
                  />
                  <v-checkbox v-model="searchInfo.searchCore" value="P001" class="flex-0-0 mr-4" label="기본역량" />
                  <v-checkbox v-model="searchInfo.searchCore" value="P002" class="flex-0-0 mr-4" label="준비역량" />
                  <v-checkbox v-model="searchInfo.searchCore" value="P003" class="flex-0-0 mr-4" label="실행역량" />
                  <v-checkbox v-model="searchInfo.searchCore" value="P004" class="flex-0-0 mr-4" label="평가역량" />
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="d-flex pt-4 justify-end">
          <v-btn class="mr-2" width="80" @click="onClickReset()">초기화</v-btn>
          <v-btn variant="flat" color="primary" width="80" @click="fnGetPeriodList()">검색</v-btn>
        </div>
      </BaseCard>
    </v-col>
    <v-col>
      <BaseCard>
        <template v-slot:title>
          <div class="d-flex align-center">
            <div class="text-h4">차수 운영 목록</div>
            <v-avatar class="mx-2" size="20" color="primary">
              <v-icon style="font-size: 14px">mdi-exclamation-thick</v-icon>
              <v-tooltip>
                툴팁 내용이 보여집니다<br />
                화이팅
              </v-tooltip>
            </v-avatar>
          </div>
        </template>
        <BaseTableConfig :totalCnt="list.length" @update:rowPerPage="updateRowPerPage"></BaseTableConfig>
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
          <template #item-operation>
            <v-btn size="small" @click="this.$alert('기능준비중입니다.')">바로가기</v-btn>
          </template>
        </v-easy-table>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import BaseBreadcrumb from "@/components/base/BaseBreadcrumb.vue";
import type { AxiosResponse } from "axios";
import type { TableServerOption } from "@/types/dataTable/EasyDataTableConfig";

export default {
  components: { BaseBreadcrumb },
  data: () => ({
    /** 브레드크럼프 관련  */
    title: "차수 운영",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(교수)", disabled: true },
    ],
    searchInfo: {
      searchDeptHg: "",
      searchColg: null,
      searchDept: null,
      searchHakgua: null,
      searchCategory: null,
      searchCurri: "",
      searchPeriod: "",
      searchAprvSts: [""],
      searchReqStrDate: "",
      searchReqEndDate: "",
      searchOprtStrDate: "",
      searchOprtEndDate: "",
      searchCore: [""],
      searchTerm: null,
      searchYear: null,
      coreAll: false,
    },
    //***paging***
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: ["oprtSts", "regDate"], // ["recrtTitle"] or []
      sortType: ["desc", "desc"], // ["asc"] or []
      totalCount: 0,
    } as TableServerOption,

    /** 데이터테이블 관련  */
    header: [
      { text: "No", value: "no", sortable: true, width: 40 },
      { text: "운영상태", value: "oprtSts", sortable: true, width: 90 },
      { text: "Class", value: "operation", width: 100 },
      { text: "신청인원", value: "", sortable: true, width: 90 },
      { text: "입과인원", value: "", sortable: true, width: 90 },
      { text: "이수인원", value: "", sortable: true, width: 90 },
      { text: "카테고리", value: "ecmNm", sortable: true, width: 90 },
      { text: "과정명", value: "eciTitle", sortable: true, width: 300 },
      { text: "차수명", value: "eliTitle", sortable: true, width: 300 },
      { text: "부서/학과", value: "eciDeptNm", sortable: true, width: 120 },
      { text: "담당자", value: "eliStfNm", sortable: true, width: 100 },
      { text: "학년도", value: "eliOprtYear", sortable: true, width: 100 },
      { text: "학기", value: "eliOprtTerm", sortable: true, width: 100 },
      { text: "신청기간", value: "reqDate", sortable: true, width: 200 },
      { text: "운영기간", value: "oprtDate", sortable: true, width: 200 },
      { text: "역량", value: "ability", sortable: true, width: 400 },
    ],
    loaded: false,
    list: [],
    selectedItems: [],
    categoryList: [],
    loading: false,
  }),
  watch: {
    //***paging***
    serverOptions: {
      handler() {
        this.fnGetPeriodList();
      },
      deep: true,
    },
  },
  mounted() {
    this.fnGetCategorySelect();
    this.fnGetPeriodList();
  },
  methods: {
    updateRowPerPage(selected: number) {
      const vm = this;
      const dataTable = vm.$refs.dataTable;
      dataTable.updateRowsPerPageActiveOption(selected);
    },
    //callGrid()함수
    fnGetPeriodList() {
      const vm = this;
      let coreString = "";
      for (let i = 0; i < vm.searchInfo.searchCore.length; i++) {
        if (vm.searchInfo.searchCore[i] != "") {
          coreString += vm.searchInfo.searchCore[i];
          if (i < vm.searchInfo.searchCore.length - 1) {
            coreString += ",";
          }
        }
      }
      let aprvString = "";
      for (let i = 0; i < vm.searchInfo.searchAprvSts.length; i++) {
        if (vm.searchInfo.searchAprvSts[i] != "") {
          aprvString += vm.searchInfo.searchAprvSts[i];
          if (i < vm.searchInfo.searchAprvSts.length - 1) {
            aprvString += ",";
          }
        }
      }
      const searchParam = {
        searchDeptHg: vm.searchInfo.searchDeptHg,
        searchColg: vm.searchInfo.searchColg,
        searchDept: vm.searchInfo.searchDept,
        searchHakgua: vm.searchInfo.searchHakgua,
        searchCategory: vm.searchInfo.searchCategory,
        searchCurri: vm.searchInfo.searchCurri,
        searchPeriod: vm.searchInfo.searchPeriod,
        searchAprvSts: aprvString,
        searchUseYn: vm.searchInfo.searchUseYn,
        searchReqStrDate: vm.searchInfo.searchReqStrDate,
        searchReqEndDate: vm.searchInfo.searchReqEndDate,
        searchOprtStrDate: vm.searchInfo.searchOprtStrDate,
        searchOprtEndDate: vm.searchInfo.searchOprtEndDate,
        searchTerm: vm.searchInfo.searchTerm,
        searchYear: vm.searchInfo.searchYear,
        searchCore: coreString,
        ...vm.$serial(vm.serverOptions), //***paging***
      };
      vm.loading = true; //***paging***
      vm.$axios
        .get("/api/admin/ecpProf/ecpOprtPeriodList", { params: searchParam })
        .then((res: AxiosResponse) => {
          vm.list = res.data.data;
          const dataTable = vm.$refs.dataTable; //***paging***
          dataTable.updateRowsPerPageActiveOption(vm.serverOptions.rowsPerPage); //***paging*** BaseTableConfig<->easyDataTable  rowsPerPage맞춰줘야함
          vm.serverOptions.totalCount = res.data.data.length > 0 ? res.data.data[0].totalCount : 0; //***paging***
          vm.loading = false; //***paging***
        })
        .catch((e: any) => {
          console.error(e);
        });
    },
    fnGetCategorySelect() {
      const vm = this;
      vm.$axios.get("/api/admin/ecpProf/ecpCategorySelect").then((res: AxiosResponse) => {
        const resData = res.data;
        vm.categoryList = resData.data;
      });
    },
    onClickCoreAll(flag: boolean) {
      const vm = this;
      if (flag) {
        vm.search.core = ["A001", "A002", "A003", "A004", "A005", "A006"];
      } else {
        vm.search.core = [];
      }
    },
    onClickReset() {
      const vm = this;
      vm.searchInfo.searchDeptHg = "";
      vm.searchInfo.searchColg = null;
      vm.searchInfo.searchDept = null;
      vm.searchInfo.searchHakgua = null;
      vm.searchInfo.searchCategory = null;
      vm.searchInfo.searchCurri = "";
      vm.searchInfo.searchPeriod = "";
      vm.searchInfo.searchAprvSts = [""];
      vm.searchInfo.searchReqStrDate = "";
      vm.searchInfo.searchReqEndDate = "";
      vm.searchInfo.searchOprtStrDate = "";
      vm.searchInfo.searchOprtEndDate = "";
      vm.searchInfo.searchCore = [""];
      vm.searchInfo.searchTerm = null;
      vm.searchInfo.searchYear = null;
      vm.searchInfo.coreAll = false;
    },
  },
};
</script>
