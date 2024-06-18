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
          <div class="d-flex align-center">
            <div class="text-h4">차수 승인 목록</div>
            <v-avatar class="mx-2" size="20" color="primary">
              <v-icon style="font-size: 14px">mdi-exclamation-thick</v-icon>
              <v-tooltip>
                툴팁 내용이 보여집니다<br />
                화이팅
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
          <template #left-btn-area>
            <v-btn color="grey" class="mr-2" :disabled="delBtnSts" @click="rowListDel(this.selectedItems)">반려</v-btn>
            <v-btn color="grey" class="mr-2" :disabled="useBtnSts" @click="rowListUse(this.selectedItems)">승인</v-btn>
            <v-btn color="grey" :disabled="unUseBtnSts" @click="rowListUnUse(this.selectedItems)">승인취소</v-btn>
            <!-- 미사용 단어가 없어 임의추가 추후 수정필요 -->
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
          <template #item-operation="item">
            <div class="d-flex align-center">
              <v-btn size="small" @click="redirectToDetail(item)">조회</v-btn>
              <v-btn v-if="item.ecrId != null && item.eliStsNm != '승인'" size="small" @click="rejectApply(item.eliId)">
                반려</v-btn
              >
            </div>
          </template>
        </v-easy-table>
      </BaseCard>
    </v-col>
  </v-row>
  <v-dialog v-model="check" persistent width="1024">
    <!-- dialog inner -->
    <v-card>
      <!-- dialog title -->
      <v-card-title class="bg-primary">반려사유등록</v-card-title>
      <!-- dialog content -->
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-textarea counter v-model.trim="rejectCont"></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <!-- dialog button -->
      <v-card-actions class="justify-end">
        <v-btn variant="outlined" color="error" @click="cancelBtn()">취소</v-btn>
        <v-btn variant="flat" color="success" @click="saveCont()">저장</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
import { rules } from "eslint-plugin-prettier";
import BaseBreadcrumb from "@/components/base/BaseBreadcrumb.vue";
import type { AxiosResponse } from "axios";
import type { TableServerOption } from "@/types/dataTable/EasyDataTableConfig";

export default {
  components: { BaseBreadcrumb },
  data: () => ({
    /** 브레드크럼프 관련 */
    title: "차수 승인",
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
    loading: false,

    /** 데이터테이블 관련 */
    tblLoading: false,
    delBtnSts: true,
    useBtnSts: true,
    unUseBtnSts: true,
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
    rejectList: [],
    selectedItems: [],
    categoryList: [],
    /** 팝업 관련 */
    check: false,
    rejectCont: "",
    rejectListPop: false,
    deptList: [],
    hgList: [],
  }),
  computed: {
    rules() {
      return rules;
    },
  },

  watch: {
    selectedItems: {
      handler(newValue) {
        /** 승인상태값 추후 구별 필요 */
        newValue.map((obj: any) => {
          obj.eliStsNm == "승인" ? (this.unUseBtnSts = false) : undefined;
          obj.eliStsNm == "승인대기" ? (this.useBtnSts = false) && (this.delBtnSts = false) : undefined;
          obj.eliStsNm == "반려" ? (this.delBtnSts = false) : undefined;
        });
        this.srchItem(this.selectedItems);
      },
      deep: true,
    },
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
    /** 목록 데이터 가져오는 이벤트 */
    redirectToDetail(item: any) {
      this.$router.push({
        path: "/admin/extraCurricularProgram/userEcp/userPeriodDetail",
        query: { eliId: item.eliId, aprvYn: "Y" },
      });
    },
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

    /** 내부 요소 검사 */
    srchItem(objList: object[]) {
      let delCnt: number = 0;
      let useCnt: number = 0;
      let unUseCnt: number = 0;
      objList.forEach(function (obj: any) {
        // 승인상태값 추후 구별 필요
        if (obj.eliStsNm == "승인") {
          unUseCnt++;
        } else if (obj.eliStsNm == "승인대기") {
          useCnt++;
          delCnt++;
        } else if (obj.eliStsNm == "반려") {
          delCnt++;
        }
      });
      this.delBtnSts = delCnt == 0; // 반려나 승인 대기가 존재할 때 false
      this.useBtnSts = useCnt == 0; // 승인 대기가 존재할 때 false
      this.unUseBtnSts = unUseCnt == 0; // 승인이 존재할 때 false
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
        })
        .catch((e: any) => {
          console.error(e);
        });
      this.rejectListPop = true;
    },
    /** 반려팝업의 취소 클릭 이벤트 (현재 단어가 없어서 임의로 했습니다 추후 수정하겠습니다) */
    cancelBtn() {
      if (this.rejectCont.length > 0) {
        this.rejectCont = "";
      }
      this.check = false;
    },
    /** 반려팝업의 저장 클릭 이벤트 (현재 단어가 없어서 임의로 했습니다 추후 수정하겠습니다) */
    saveCont() {
      const vm = this;
      vm.onClickConfirm("해당 내용으로 저장하시겠습니까?", "APRV003");
    },
    /**최상단 반려버튼 클릭이벤트. */
    rowListDel() {
      const vm = this;
      if (this.unUseBtnSts != true) {
        vm.$alert("승인상태인 항목이 선택되었습니다");
        return;
      }
      vm.$confirm("선택한 항목을 반려 하시겠습니까?", "", (isConfirm: boolean) => {
        if (isConfirm) {
          //반려 팝업을 띄운다.
          this.check = true;
        }
      });
    },
    /**최상단 승인버튼 */
    rowListUse() {
      this.onClickConfirm("선택한 항목을 승인 하시겠습니까?", "APRV002");
    },
    /**최상단 승인 취소 버튼
     * <!-- TODO 승인 취소 불가능한 조건 확인하고 막아둬야함. -->
     */
    rowListUnUse() {
      this.onClickConfirm("선택한 항목을 승인취소 하시겠습니까?", "APRV001");
    },
    updateRowPerPage(selected: number) {
      const vm = this;
      const dataTable = vm.$refs.dataTable as any;
      dataTable.updateRowsPerPageActiveOption(selected);
    },
    onClickConfirm(_text: String, aprvSts: String) {
      const vm = this;
      vm.$confirm(_text, "", (isConfirm: boolean) => {
        if (isConfirm) {
          var eliIdsArr = this.selectedItems.map((x: { eliId: string }) => x.eliId);
          const updParams = {
            aprvSts: aprvSts,
            eliIds: eliIdsArr,
            rejectCont: vm.rejectCont,
          };
          vm.$axios
            .post("/api/admin/ecpUser/updateAprvStsEcpPeriod", JSON.stringify(updParams))
            .then((res: AxiosResponse) => {
              if (res.data.code == "200") {
                alert("저장되었습니다.");
              }
              vm.fnGetPeriodList();
              vm.selectedItems = [];
              vm.check = false;
            });
        }
      });
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
    onClickCoreAll(flag: boolean) {
      const vm = this;
      if (flag) {
        vm.search.core = ["A001", "A002", "A003", "A004", "A005", "A006"];
      } else {
        vm.search.core = [null];
      }
    },
    fnGetCategorySelect() {
      const vm = this;
      vm.$axios.get("/api/admin/ecpUser/ecpCategorySelect").then((res: AxiosResponse) => {
        const resData = res.data;
        vm.categoryList = resData.data;
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
