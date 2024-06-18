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
                <v-autocomplete v-model="searchInfo.searchColg" placeholder="전체"></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th>부서</th>
              <td>
                <v-autocomplete
                  v-model="searchInfo.searchDept"
                  item-title="deptKorNm"
                  item-value="deptKorNm"
                  :items="deptList"
                ></v-autocomplete>
              </td>
              <th>학과</th>
              <td>
                <v-autocomplete
                  v-model="searchInfo.searchHakgua"
                  placeholder="전체"
                  item-title="deptKorNm"
                  item-value="deptKorNm"
                  :items="hgList"
                ></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th>학년도</th>
              <td>
                <v-autocomplete v-model="searchInfo.searchYear" placeholder="전체"></v-autocomplete>
              </td>
              <th>학기</th>
              <td>
                <v-autocomplete
                  v-model="searchInfo.searchTerm"
                  placeholder="전체"
                  :items="['1학기', '여름학기', '2학기', '겨울학기']"
                ></v-autocomplete>
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
                <v-text-field v-model="searchInfo.searchCurri" placeholder="과정명을 입력해 주세요."></v-text-field>
              </td>
            </tr>
            <tr>
              <th>차수명</th>
              <td>
                <v-text-field v-model="searchInfo.searchPeriod" placeholder="차수명을 입력해 주세요."></v-text-field>
              </td>
              <th>승인상태</th>
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
                <div class="d-flex">
                  <VDateInput v-model="searchInfo.searchReqStrDate" />
                  <span class="mx-1">~</span>
                  <VDateInput v-model="searchInfo.searchReqEndDate" />
                </div>
              </td>
              <th>운영기간</th>
              <td>
                <div class="d-flex">
                  <VDateInput v-model="searchInfo.searchOprtStrDate" />
                  <span class="mx-1">~</span>
                  <VDateInput v-model="searchInfo.searchOprtEndDate" />
                </div>
              </td>
            </tr>
            <tr>
              <th>역량</th>
              <td>
                <div class="d-flex">
                  <v-checkbox
                    v-model="searchInfo.coreAll"
                    class="flex-0-0 mr-4"
                    label="전체"
                    @change="onClickCoreAll(searchInfo.coreAll)"
                  />
                  <v-checkbox v-model="searchInfo.searchCore" value="A001" class="flex-0-0 mr-4" label="종합적사고력" />
                  <v-checkbox
                    v-model="searchInfo.searchCore"
                    value="A002"
                    class="flex-0-0 mr-4"
                    label="자원정보기술활용능력"
                  />
                  <v-checkbox v-model="searchInfo.searchCore" value="A003" class="flex-0-0 mr-4" label="자기관리역량" />
                  <v-checkbox v-model="searchInfo.searchCore" value="A004" class="flex-0-0 mr-4" label="의사소통역량" />
                  <v-checkbox v-model="searchInfo.searchCore" value="A005" class="flex-0-0 mr-4" label="대인관계역량" />
                  <v-checkbox v-model="searchInfo.searchCore" value="A006" class="flex-0-0 mr-4" label="글로컬역량" />
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="d-flex pt-4 justify-end">
          <v-btn class="mr-2" width="80" @click="onClickReset">초기화</v-btn>
          <v-btn variant="flat" color="primary" width="80" @click="fnGetPeriodList">검색</v-btn>
        </div>
      </BaseCard>
    </v-col>
    <v-col>
      <BaseCard>
        <template v-slot:title>
          <div class="text-h4">
            차수 목록
            <v-avatar class="mr-1 bg-primary" size="18">
              <v-icon style="font-size: 12px">mdi-exclamation-thick</v-icon>
              <v-tooltip
                >차수 등록 후, 승인된 프로그램은 삭제가 불가능합니다. 차수승인 메뉴에서, 승인취소 후 삭제해주세요.
              </v-tooltip>
            </v-avatar>
          </div>
        </template>
        <BaseTableConfig
          :totalCnt="list.length"
          checked
          :checkedCnt="selectedItems.length"
          v-model:rowPerPage="serverOptions.rowsPerPage"
        >
          <template #top-btn-area>
            <v-btn class="mr-2" to="/admin/extraCurricularProgram/userEcp/userPeriodReg">차수 등록</v-btn>
            <v-btn class="mr-2" :disabled="selectedItems.length === 0" @click="fnCopyEcpPeriod()">차수 복사</v-btn>
            <v-btn @click="this.$alert('기능준비중입니다.')">엑셀 다운로드</v-btn>
          </template>
          <template #left-btn-area>
            <v-btn color="grey" class="mr-2" :disabled="selectedItems.length === 0" @click="fnDeleteEcpPeriod()"
              >삭제</v-btn
            >
            <v-btn color="grey" class="mr-2" :disabled="selectedItems.length === 0" @click="fnUpdatePeriodBtn('Y')">
              사용
            </v-btn>
            <v-btn color="grey" :disabled="selectedItems.length === 0" @click="fnUpdatePeriodBtn('N')">미사용</v-btn>
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
          @click-row="redirectToDetail"
          :server-items-length="serverOptions.totalCount"
          v-model:server-options="serverOptions"
        >
          <template #item-operation="item">
            <div id="btn-area">
              <v-btn
                size="small"
                :to="{ path: '/admin/extraCurricularProgram/userEcp/userPeriodModify', query: { eliId: item.eliId } }"
                @click.stop
                >수정</v-btn
              >
              <v-btn
                v-if="item.ecrId != null && item.eliStsNm != '승인'"
                size="small"
                @click.stop
                @click="rejectApply(item.eliId)"
              >
                반려</v-btn
              >
            </div>
          </template>
        </v-easy-table>
      </BaseCard>
    </v-col>
  </v-row>
  <v-dialog v-model="rejectListPop" persistent width="1024">
    <!-- dialog inner -->
    <v-card>
      <!-- dialog title -->
      <v-card-title class="bg-primary">반려사유</v-card-title>
      <!-- dialog content -->
      <v-card-text>
        <v-row v-for="(item, idx) in rejectList" :key="idx">
          <v-col cols="12"> {{ item.ecrRejectCont }} - ({{ item.regDate }}) </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <!-- dialog button -->
      <v-card-actions class="justify-end">
        <v-btn variant="outlined" color="info" @click="rejectListPop = false">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import type { AxiosResponse } from "axios";
import type { TableServerOption } from "@/types/dataTable/EasyDataTableConfig";

export default {
  data: () => ({
    title: "차수 관리",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(학생)", disabled: true },
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
      sortBy: ["eliId"], // ["recrtTitle"] or []
      sortType: ["desc"], // ["asc"] or []
      totalCount: 0,
    } as TableServerOption,

    header: [
      { text: "No", value: "no", sortable: false, width: 40 },
      { text: "승인상태", value: "eliStsNm", sortable: true, width: 90 },
      { text: "카테고리", value: "ecmNm", sortable: true, width: 90 },
      { text: "과정명", value: "eciTitle", sortable: true, width: 300 },
      { text: "차수명", value: "eliTitle", sortable: true, width: 350 },
      { text: "부서/학과", value: "eciDeptNm", sortable: true, width: 120 },
      { text: "담당자", value: "eliStfNm", sortable: true, width: 100 },
      { text: "개설년도", value: "eliOprtYear", sortable: true, width: 100 },
      { text: "개설학기", value: "eliOprtTerm", sortable: true, width: 100 },
      { text: "사용여부", value: "eliYn", sortable: true, width: 90 },
      { text: "신청기간", value: "reqDate", sortable: true, width: 200 },
      { text: "운영기간", value: "oprtDate", sortable: true, width: 200 },
      { text: "역량", value: "ability", sortable: true, width: 400 },
      { text: "관리", value: "operation", width: 150 },
    ],
    list: [],
    rejectList: [{ ecrRejectCont: String, regDate: String }],
    selectedItems: [],
    categoryList: [],
    rejectListPop: false,
    loading: false,
    deptList: [],
    hgList: [],
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
    this.fnGetDeptSelect("H");
    this.fnGetDeptSelect("N");
  },
  methods: {
    redirectToDetail(item: any) {
      this.$router.push({
        path: "/admin/extraCurricularProgram/userEcp/userPeriodDetail",
        query: { eliId: item.eliId },
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
      vm.searchInfo.searchAprvSts = "";
      vm.searchInfo.searchReqStrDate = "";
      vm.searchInfo.searchReqEndDate = "";
      vm.searchInfo.searchOprtStrDate = "";
      vm.searchInfo.searchOprtEndDate = "";
      vm.searchInfo.coreAll = false;
      vm.searchInfo.searchTerm = null;
      vm.searchInfo.searchYear = null;
      vm.searchInfo.searchCore = [""];
    },
    //사용여부 설정 버튼 <!--TODO 아직 사용 여부 확인 후 미사용 기능은 없음.-->
    async fnUpdatePeriodBtn(updUseYn: String) {
      const vm = this;
      var eliIdsArr = this.selectedItems.map((x: { eliId: string }) => x.eliId);
      const updParams = {
        useYn: updUseYn,
        eliIds: eliIdsArr,
      };
      await vm.$axios.post("/api/admin/ecpUser/updateUseYnEcpPeriod", JSON.stringify(updParams));
      vm.fnGetPeriodList();
      vm.selectedItems = [];
    },
    //과정 삭제 버튼 <!--TODO 아직 사용 여부 확인 후 삭제 기능은 없음.-->
    async fnDeleteEcpPeriod() {
      if (confirm("선택된 차수를 삭제하시겠습니까?")) {
        const vm = this;
        var eliIdsDel = this.selectedItems.map((x: { eliId: string }) => x.eliId);
        const delParams = {
          eliIds: eliIdsDel,
        };
        await vm.$axios.post("/api/admin/ecpUser/deleteEcpPeriod", JSON.stringify(delParams));
        alert("삭제되었습니다.");
        vm.fnGetPeriodList();
        vm.selectedItems = [];
      }
    },
    //과정 삭제 버튼 <!--TODO 아직 사용 여부 확인 후 삭제 기능은 없음.-->
    async fnCopyEcpPeriod() {
      if (confirm("선택된 차수를 복사하시겠습니까?")) {
        const vm = this;
        var eliIdsCopy = this.selectedItems.map((x: { eliId: string }) => x.eliId);
        const copyParams = {
          eliIds: eliIdsCopy,
        };
        await vm.$axios.post("/api/admin/ecpUser/CopyEcpPeriod", JSON.stringify(copyParams));
        vm.fnGetPeriodList();
        vm.selectedItems = [];
      }
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
        .get("/api/admin/ecpUser/ecpPeriodList", { params: searchParam })
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
      vm.$axios.get("/api/admin/ecpUser/ecpCategorySelect").then((res: AxiosResponse) => {
        const resData = res.data;
        vm.categoryList = resData.data;
      });
    },
    /** 각 행의 반려 버튼 클릭 이벤트 */
    rejectApply(eliId?: string) {
      const vm = this;
      const param = {
        eliId: eliId,
      };
      vm.$axios
        .get("/api/admin/ecpUser/getEcpRejectHis", { params: param })
        .then((res: AxiosResponse) => {
          vm.rejectList = res.data.data;
          this.rejectListPop = true;
        })
        .catch((e: any) => {
          console.error(e);
        });
    },
    fnGetDeptSelect(div: String) {
      const vm = this;
      const param = {
        searchDiv: div,
      };
      vm.$axios.get("/api/admin/ecpDeptList", { params: param }).then((res: AxiosResponse) => {
        const resData = res.data;
        if (div === "H") {
          vm.hgList = resData.data;
        } else if (div === "N") {
          vm.deptList = resData.data;
        }
      });
    },
  },
};
</script>
