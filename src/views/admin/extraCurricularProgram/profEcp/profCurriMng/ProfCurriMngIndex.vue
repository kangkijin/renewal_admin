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
                <div class="d-flex">
                  <v-radio-group v-model="searchInfo.searchDeptHg" inline>
                    <v-radio value="checkAll" class="flex-0-0 mr-4" label="전체" />
                    <v-radio value="checkDept" class="flex-0-0 mr-4" label="부서" />
                    <v-radio value="checkHakgua" class="flex-0-0" label="학과" />
                  </v-radio-group>
                </div>
              </td>
              <th>대학</th>
              <td>
                <v-autocomplete v-model="searchInfo.searchColg" placeholder="전체"></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th>부서</th>
              <td>
                <v-autocomplete v-model="searchInfo.searchDept" placeholder="전체"></v-autocomplete>
              </td>
              <th>학과</th>
              <td>
                <v-autocomplete v-model="searchInfo.searchHakgua" placeholder="전체"></v-autocomplete>
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
                <v-text-field v-model="searchInfo.searchCurri" placeholder=""></v-text-field>
              </td>
            </tr>
            <tr>
              <th>사용여부</th>
              <td colspan="3">
                <v-radio-group v-model="searchInfo.searchUseYn" inline>
                  <v-radio value="" class="flex-0-0 mr-4" label="전체" />
                  <v-radio value="Y" class="flex-0-0 mr-4" label="사용" />
                  <v-radio value="N" class="flex-0-0" label="미사용" />
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <th>역량</th>
              <td>
                <div class="d-flex">
                  <v-checkbox
                    v-model="searchInfo.coreAll"
                    @change="onClickCoreAll(searchInfo.coreAll)"
                    class="flex-0-0 mr-4"
                    label="전체"
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
          <v-btn class="mr-2" width="80" @click="onClickReset">초기화</v-btn>
          <v-btn variant="flat" color="primary" width="80" @click="fnGetCurriList">검색</v-btn>
        </div>
      </BaseCard>
    </v-col>
    <v-col>
      <BaseCard>
        <template v-slot:title>
          <div class="text-h4">
            과정 목록
            <v-avatar class="mr-1 bg-primary" size="18">
              <v-icon style="font-size: 12px">mdi-exclamation-thick</v-icon>
              <v-tooltip
                >과정 등록 후, 차수가 개설된 경우 삭제가 불가능합니다. 매핑 과정의 일괄 변경이 필요할 경우, SR 문의해
                주세요.
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
            <v-btn class="mr-2" to="/admin/extraCurricularProgram/profEcp/profCurriReg">과정 등록</v-btn>
            <v-btn class="mr-2" :disabled="selectedItems.length === 0" @click="fnCopyEcpCurri()">과정 복사</v-btn>
            <v-btn>엑셀 다운로드</v-btn>
          </template>
          <template #left-btn-area>
            <v-btn color="grey" class="mr-2" :disabled="selectedItems.length === 0" @click="fnDeleteEcpCurri()"
              >삭제</v-btn
            >
            <v-btn color="grey" class="mr-2" :disabled="selectedItems.length === 0" @click="fnUpdateCurriBtn('Y')">
              사용
            </v-btn>
            <v-btn color="grey" :disabled="selectedItems.length === 0" @click="fnUpdateCurriBtn('N')">미사용</v-btn>
          </template>
        </BaseTableConfig>

        <v-easy-table
          ref="dataTable"
          :headers="header"
          :items="list"
          fixed-checkbox
          :checkbox-column-width="50"
          v-model:items-selected="selectedItems"
          @click-row="redirectToDetail"
          :loading="loading"
          :server-items-length="serverOptions.totalCount"
          v-model:server-options="serverOptions"
        >
          <template #item-operation="item">
            <v-btn
              @click.stop
              size="small"
              :to="{ path: '/admin/extraCurricularProgram/profEcp/profCurriModify', query: { eciId: item.eciId } }"
            >
              수정</v-btn
            >
            <v-btn size="small" @click="this.$alert('기능준비중입니다.')" @click.stop>이수증</v-btn>
            <v-btn
              :disabled="item.eciSatisYn === 'N'"
              size="small"
              @click="this.$alert('기능준비중입니다.')"
              @click.stop
              >만족도조사</v-btn
            >
            <v-btn :disabled="item.eciPreYn === 'N'" size="small" @click="this.$alert('기능준비중입니다.')" @click.stop
              >사전조사</v-btn
            >
            <v-btn
              :disabled="item.eciAfterYn === 'N'"
              size="small"
              @click="this.$alert('기능준비중입니다.')"
              @click.stop
              >사후조사</v-btn
            >
          </template>
        </v-easy-table>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import type { AxiosResponse } from "axios";
import type { TableServerOption } from "@/types/dataTable/EasyDataTableConfig";

export default {
  data: () => ({
    title: "과정 관리",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(교수)", disabled: true },
    ],
    searchInfo: {
      searchDeptHg: "checkAll",
      searchColg: "",
      searchDept: "",
      searchHakgua: "",
      searchCategory: "",
      searchCurri: "",
      searchUseYn: "",
      coreAll: true,
      searchCore: [""],
    },
    header: [
      { text: "No", value: "no", sortable: false, width: 40 },
      { text: "카테고리", value: "ecmNm", sortable: true, width: 90 },
      { text: "과정명", value: "eciTitle", sortable: true, width: 300 },
      { text: "부서/학과", value: "eciDeptNm", sortable: true, width: 120 },
      { text: "개설년도", value: "eciOprtStrYear", sortable: true, width: 100 },
      { text: "사용여부", value: "eciYn", sortable: true, width: 90 },
      { text: "등록일", value: "regDate", sortable: true, width: 120 },
      { text: "역량", value: "ability", width: 400 },
      { text: "관리", value: "operation", width: 400 },
    ],
    list: [],
    selectedItems: [],
    //***paging***
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: ["eciId"], // ["recrtTitle"] or []
      sortType: ["desc"], // ["asc"] or []
      totalCount: 0,
    } as TableServerOption,
    loading: false,
    categoryList: [],
  }),
  watch: {
    //***paging***
    serverOptions: {
      handler() {
        this.fnGetCurriList();
      },
      deep: true,
    },
  },
  mounted() {
    this.fnGetCategorySelect();
    this.fnGetCurriList();
  },
  methods: {
    redirectToDetail(item: any) {
      this.$router.push({
        path: "/admin/extraCurricularProgram/profEcp/ProfCurriDetail",
        query: { eciId: item.eciId },
      });
    },
    onClickCoreAll(flag: boolean) {
      const vm = this;
      if (flag) {
        vm.searchInfo.searchCore = ["A001", "A002", "A003", "A004", "A005", "A006"];
      } else {
        vm.searchInfo.searchCore = [null];
      }
    },
    onClickReset() {
      const vm = this;
      vm.searchInfo.searchDeptHg = "checkAll";
      vm.searchInfo.searchColg = "";
      vm.searchInfo.searchDept = "";
      vm.searchInfo.searchHakgua = "";
      vm.searchInfo.searchCategory = "";
      vm.searchInfo.searchCurri = "";
      vm.searchInfo.searchUseYn = "";
      vm.searchInfo.coreAll = true;
      vm.searchInfo.searchCore = ["A001", "A002", "A003", "A004", "A005", "A006"];
    },
    //사용여부 설정 버튼 <!--TODO 아직 사용 여부 확인 후 미사용 기능은 없음.-->
    async fnUpdateCurriBtn(updUseYn: String) {
      const vm = this;
      var eciIdsArr = this.selectedItems.map((x: { eciId: string }) => x.eciId);
      const updParams = {
        useYn: updUseYn,
        eciIds: eciIdsArr,
      };
      await vm.$axios.post("/api/admin/ecpProf/updateUseYnEcpCurri", JSON.stringify(updParams));
      vm.fnGetCurriList();
      vm.selectedItems = [];
    },
    //과정 삭제 버튼 <!--TODO 아직 사용 여부 확인 후 삭제 기능은 없음.-->
    async fnDeleteEcpCurri() {
      if (confirm("선택된 과정을 삭제하시겠습니까?")) {
        const vm = this;
        var eciIdsDel = this.selectedItems.map((x: { eciId: string }) => x.eciId);
        const delParams = {
          eciIds: eciIdsDel,
        };
        await vm.$axios.post("/api/admin/ecpProf/deleteEcpCurri", JSON.stringify(delParams));
        alert("삭제되었습니다.");
        vm.fnGetCurriList();
        vm.selectedItems = [];
      }
    },
    //과정 복사 버튼 <!--TODO 아직 사용 여부 확인 후 삭제 기능은 없음.-->
    async fnCopyEcpCurri() {
      if (confirm("선택된 과정을 복사하시겠습니까?")) {
        const vm = this;
        var eciIdsCopy = this.selectedItems.map((x: { eciId: string }) => x.eciId);
        const copyParams = {
          eciIds: eciIdsCopy,
        };
        await vm.$axios.post("/api/admin/ecpProf/copyEcpCurri", JSON.stringify(copyParams));
        vm.fnGetCurriList();
        vm.selectedItems = [];
      }
    },
    //callGrid()함수 <!--TODO 역량부분에 이상이 있음. 검색해보면 앎. 쿼리문제임.-->
    fnGetCurriList() {
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
      const searchParam = {
        searchDeptHg: vm.searchInfo.searchDeptHg,
        searchColg: vm.searchInfo.searchColg,
        searchDept: vm.searchInfo.searchDept,
        searchHakgua: vm.searchInfo.searchHakgua,
        searchCategory: vm.searchInfo.searchCategory,
        searchCurri: vm.searchInfo.searchCurri,
        searchUseYn: vm.searchInfo.searchUseYn,
        coreAll: vm.searchInfo.coreAll,
        searchCore: coreString,
        ...vm.$serial(vm.serverOptions), //***paging***
      };
      vm.loading = true; //***paging***
      vm.$axios
        .get("/api/admin/ecpProf/ecpCurriList", { params: searchParam })
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
  },
};
</script>
