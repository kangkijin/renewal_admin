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
              <th>카테고리 명</th>
              <td>
                <v-text-field v-model="searchTitle"></v-text-field>
              </td>
              <th>사용여부</th>
              <td>
                <v-radio-group v-model="searchUseYn" inline>
                  <v-radio value="" class="flex-0-0 mr-4" label="전체" />
                  <v-radio value="Y" class="flex-0-0 mr-4" label="사용" />
                  <v-radio value="N" class="flex-0-0" label="미사용" />
                </v-radio-group>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="d-flex pt-4 justify-end">
          <v-btn color="grey" width="80" @click="onClickReset">초기화</v-btn>
          <v-btn color="blue" width="80" @click="fnGetCategoryList">검색</v-btn>
        </div>
      </BaseCard>
    </v-col>
    <v-col col="12">
      <BaseCard>
        <template v-slot:title>
          <div class="text-h4">
            카테고리 목록
            <v-avatar class="mr-1 bg-primary" size="18">
              <v-icon style="font-size: 12px">mdi-exclamation-thick</v-icon>
              <v-tooltip>
                카테고리 등록 후, 과정이 매핑된 경우 삭제가 불가능합니다. 카테고리 일괄 변경이 필요할 경우, SR 문의
                해주세요
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
            <!-- 카테고리 등록버튼 -->
            <ProfCategoryRegPop @dataModified="fnGetCategoryList" />
          </template>
          <template #left-btn-area>
            <v-btn color="grey" class="mr-2" :disabled="selectedItems.length === 0" @click="fnDeleteEcpCategorys()">
              삭제
            </v-btn>
            <v-btn color="grey" class="mr-2" :disabled="selectedItems.length === 0" @click="fnUpdateCategory('Y')">
              사용
            </v-btn>
            <v-btn color="grey" :disabled="selectedItems.length === 0" @click="fnUpdateCategory('N')">미사용</v-btn>
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
            <!-- 카테고리 수정버튼 -->
            <ProfCategoryModifyPopup :tableItem="item" @dataModified="fnGetCategoryList" />
          </template>
        </v-easy-table>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import type { AxiosResponse } from "axios";
import ProfCategoryRegPop from "./popup/ProfCategoryRegPopup.vue";
import ProfCategoryModifyPopup from "./popup/ProfCategoryModifyPopup.vue";
import type { TableServerOption } from "@/types/dataTable/EasyDataTableConfig";

export default {
  components: {
    ProfCategoryRegPop,
    ProfCategoryModifyPopup,
  },

  data: () => ({
    title: "카테고리 관리",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(교수)", disabled: true },
    ],
    searchTitle: "",
    searchUseYn: "",
    //***paging***
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: ["ecmId"], // ["recrtTitle"] or []
      sortType: ["desc"], // ["asc"] or []
      totalCount: 0,
    } as TableServerOption,
    loading: false,
    dataModified: false,
    /** easydatatable */
    itemsSelected: [],
    tableItem: { type: Map },
    header: [
      { text: "No", value: "no", sortable: false, width: 40 },
      { text: "카테고리명", value: "ecmTitle", sortable: true, width: 300 },
      { text: "사용여부", value: "ecmYn", sortable: true, width: 90 },
      { text: "등록일", value: "regDate", sortable: true, width: 90 },
      { text: "관리", value: "operation", width: 50 },
    ],
    list: [],
    selectedItems: [],
  }),
  watch: {
    //***paging***
    serverOptions: {
      handler() {
        this.fnGetCategoryList();
      },
      deep: true,
    },
  },
  mounted() {
    this.fnGetCategoryList();
  },
  methods: {
    updateRowPerPage(selected: number) {
      const vm = this;
      const dataTable = vm.$refs.dataTable;
      dataTable.updateRowsPerPageActiveOption(selected);
    },
    //초기화 버튼
    onClickReset() {
      const vm = this;
      vm.searchTitle = "";
      vm.searchUseYn = "";
    },
    //callGrid()함수
    fnGetCategoryList() {
      const vm = this;
      const params = {
        searchTitle: vm.searchTitle,
        searchUseYn: vm.searchUseYn,
        ...vm.$serial(vm.serverOptions), //***paging***
      };
      vm.loading = true; //***paging***
      vm.$axios
        .get("/api/admin/ecpProf/ecpCategorys", { params: params })
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
    //사용/미사용 버튼
    async fnUpdateCategory(updUseYn: String) {
      const vm = this;
      var ecmIdsArr = this.selectedItems.map((x: { ecmId: string }) => x.ecmId);
      const updParams = {
        useYn: updUseYn,
        ecmIds: ecmIdsArr,
      };
      await vm.$axios.post("/api/admin/ecpProf/updateUseYnEcpCategorys", JSON.stringify(updParams));
      vm.fnGetCategoryList();
      vm.selectedItems = [];
    },
    //카테고리 삭제 버튼 <!--TODO 아직 사용 여부 확인 후 삭제 기능은 없음.-->
    async fnDeleteEcpCategorys() {
      if (confirm("선택된 카테고리를 삭제하시겠습니까?")) {
        const vm = this;
        var ecmIdsDel = this.selectedItems.map((x: { ecmId: string }) => x.ecmId);
        const delParams = {
          ecmIds: ecmIdsDel,
        };
        await vm.$axios.post("/api/admin/ecpProf/deleteEcpCategorys", JSON.stringify(delParams));
        vm.fnGetCategoryList();
        vm.selectedItems = [];
      }
    },
  },
};
</script>
