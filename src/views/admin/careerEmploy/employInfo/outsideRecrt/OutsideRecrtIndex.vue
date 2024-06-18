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
              <th>회사명</th>
              <td>
                <v-text-field v-model="searchInfo.recrtCorpNm"></v-text-field>
              </td>
              <th>상태</th>
              <td>
                <v-radio-group inline v-model="searchInfo.recrtStatus">
                  <v-radio label="전체" class="mr-4" value=""></v-radio>
                  <v-radio label="모집중" class="mr-4" value="curr"></v-radio>
                  <v-radio label="마감" class="mr-4" value="after"></v-radio>
                  <v-radio label="대기중" value="prev"></v-radio>
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <th>채용공고명</th>
              <td>
                <v-text-field v-model="searchInfo.recrtTitle"></v-text-field>
              </td>
              <th>모집분야</th>
              <td>
                <v-text-field v-model="searchInfo.recrtField"></v-text-field>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="d-flex pt-4 justify-end">
          <v-btn class="mr-2" width="80" @click="onClickSearchReset()">초기화</v-btn>
          <v-btn variant="flat" color="primary" width="80" @click="fnGetRecrtList()">검색</v-btn>
        </div>
      </BaseCard>
    </v-col>
    <v-col>
      <BaseCard>
        <template v-slot:title>
          <div class="text-h4">채용공고 목록</div>
        </template>
        <!-- ***paging*** BaseTableConfig에추가 -->
        <!-- v-model:rowPerPage="serverOptions.rowsPerPage" - -->
        <BaseTableConfig
          :totalCnt="list.length"
          checked
          :checkedCnt="selectedItems.length"
          v-model:rowPerPage="serverOptions.rowsPerPage"
        >
          <template #left-btn-area>
            <v-btn class="mr-2" @click="onClickStateCtrl('END')">마감</v-btn>
            <v-btn class="mr-2" @click="onClickStateCtrl('DEL')">삭제</v-btn>
          </template>
          <template #top-btn-area>
            <v-btn class="mr-2" @click="onClickRecrtDetail('INSERT', '')">등록</v-btn>
            <v-btn @click="fnExcelDown">엑셀 다운로드</v-btn>
          </template>
        </BaseTableConfig>
        <!-- ***paging*** v-easy-table에추가 -->
        <!-- :loading="loading" -->
        <!-- :server-items-length="serverOptions.totalCount" -->
        <!-- v-model:server-options="serverOptions" -->
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
          <template #item-operation1="item">
            <v-btn color="success" size="small" @click="onClickRecrtApplyTarget(item.recrtId)"
              >{{ item.applyCnt }}명</v-btn
            >
          </template>
          <template #item-operation5="item">
            <v-btn size="small" @click="onClickRecrtDetail('MODIFY', item.recrtId)">수정</v-btn>
          </template>
        </v-easy-table>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import type { TableServerOption } from "@/types/dataTable/EasyDataTableConfig";
import type { AxiosResponse } from "axios";
import moment from "moment";
import { excelDown } from "@/plugins/xlsx";
import type { Header, Item } from "@/plugins/xlsx";

export default {
  data: () => ({
    title: "교외 채용",
    breadcrumbs: [
      { title: "진로ㆍ취업", disabled: false },
      { title: "취업정보", disabled: true },
    ],
    header: [
      { text: "No", value: "no", width: "50" },
      { text: "등록일", value: "regDate", sortable: true },
      { text: "회사명", value: "recrtCorpNm", sortable: true },
      { text: "근무지", value: "recrtCorpAddr", sortable: true },
      { text: "채용공고명", value: "recrtTitle", sortable: true },
      { text: "모집분야", value: "recrtField", sortable: true },
      { text: "모집기간", value: "recrtApplyDate", sortable: true },
      { text: "지원인원", value: "operation1", sortable: true },
      { text: "관리", value: "operation5" },
    ],
    dialog: false,
    selectedKey: "",
    list: [],
    selectedItems: [],
    searchInfo: {
      recrtCorpNm: "",
      recrtTitle: "",
      recrtField: "",
      recrtStatus: "",
      recrtTypeCd: "REC_TYPE02",
    },
    //***paging***
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: ["recrtCorpAddr", "regDate"], // ["recrtTitle"] or []
      sortType: ["desc", "desc"], // ["asc"] or []
      totalCount: 0,
    } as TableServerOption,
    loading: false,
  }),
  watch: {
    //***paging***
    serverOptions: {
      handler() {
        this.fnGetRecrtList();
      },
      deep: true,
    },
  },
  created() {
    const vm = this;
    vm.fnGetRecrtList();
  },
  methods: {
    fnGetRecrtList() {
      const vm = this;
      const searchParam = {
        recrtTypeCd: vm.searchInfo.recrtTypeCd,
        recrtCorpNm: vm.searchInfo.recrtCorpNm,
        recrtTitle: vm.searchInfo.recrtTitle,
        recrtField: vm.searchInfo.recrtField,
        recrtStatus: vm.searchInfo.recrtStatus,
        ...vm.$serial(vm.serverOptions), //***paging***
      };
      vm.selectedItems = [];
      vm.loading = true; //***paging***
      vm.$axios
        .get("/api/career/admin/recrtInfo/getRecrtInfoList", { params: searchParam })
        .then((res: AxiosResponse) => {
          vm.list = res.data.data;
          const dataTable = vm.$refs.dataTable; //***paging***
          dataTable.updateRowsPerPageActiveOption(vm.serverOptions.rowsPerPage); //***paging*** BaseTableConfig<->easyDataTable  rowsPerPage맞춰줘야함
          vm.serverOptions.totalCount = res.data.data.length > 0 ? res.data.data[0].totalCount : 0; //***paging***
        })
        .catch((e: Error) => {
          console.error(e);
        })
        .finally(() => {
          vm.loading = false; //***paging***
        });
    },

    onClickRecrtDetail(_viewType: string, _recrtId: string) {
      const vm = this;
      vm.$router.push({
        path: "/admin/careerEmploy/employInfo/outsideRecrtDetail",
        state: { viewType: _viewType, recrtId: _recrtId },
      });
    },
    onClickStateCtrl(_type: string) {
      const vm = this;
      let selTotalVal = vm.selectedItems;
      let selIdArr = [];
      let text = _type === "END" ? "마감" : _type === "DEL" ? "삭제" : "";
      let today = moment().format("YYYY-MM-DD");

      if (selTotalVal.length === 0) {
        vm.$alert("선택된 채용정보가 없습니다. <br>확인 후 다시 시도해주세요.");
        return false;
      }

      for (var i = 0; i < selTotalVal.length; i++) {
        if (_type === "END") {
          let selEndDate = selTotalVal[i].recrtApplyEndDate;
          if (selEndDate < today) {
            vm.$alert("이미 마감된 채용이 포함되어 있습니다. <br>확인 후 다시 시도해주세요.");
            return false;
          }
        }
        selIdArr.push(selTotalVal[i].recrtId);
      }
      const param = {
        selRecrtIdArr: selIdArr,
        controlType: _type,
      };
      vm.$confirm(text + "처리 하시겠습니까?", "확인", (isConfirm: Boolean) => {
        if (isConfirm) {
          vm.$loading.show();
          let _url = "/api/career/admin/recrtInfo/modifyRecrtState";
          vm.$axios
            .post(_url, JSON.stringify(param))
            .then((res: AxiosResponse) => {
              let code = res.data.code;
              if (code === "200") {
                vm.$alert(text + "처리 되었습니다", "알림", () => {
                  vm.selectedItems = [];
                  this.$router.go();
                });
              }
            })
            .catch((e: any) => {
              console.error(e);
              vm.$alert(
                text + "처리에 실패했습니다.<br />새로고침 후 증상이 반복되면 관리자에게 문의해주세요.",
                "알림",
              );
            })
            .finally(() => {
              vm.loading = false; //***paging***
            });
        }
        vm.$loading.hide();
      });
    },
    onClickSearchReset() {
      const vm = this;
      vm.searchInfo.recrtCorpNm = "";
      vm.searchInfo.recrtTitle = "";
      vm.searchInfo.recrtField = "";
      vm.searchInfo.recrtStatus = "";
      vm.searchInfo.recrtTypeCd = "REC_TYPE02";
    },
    onClickRecrtApplyTarget(_recrtId: string) {
      const vm = this;
      vm.$router.push({
        path: "/admin/careerEmploy/employInfo/outsideRecrtApply",
        state: { recrtId: _recrtId },
      });
    },
    fnExcelDown() {
      const vm = this;
      let idx = 1;

      const headers: Header[] = [
        { header: "No", key: "no", width: 5 },
        { header: "등록일", key: "regDate", width: 20 },
        { header: "회사명", key: "recrtCorpNm", width: 30 },
        { header: "근무지", key: "recrtCorpAddr", width: 30 },
        { header: "채용공고명", key: "recrtTitle", width: 50 },
        { header: "모집분야", key: "recrtField", width: 30 },
        { header: "모집기간", key: "recrtApplyDate", width: 30 },
        { header: "지원인원", key: "applyCnt", width: 10 },
      ];

      const items: Item[] = vm.list.map((item: any) => ({
        no: idx++,
        regDate: item.regDate,
        recrtCorpNm: item.recrtCorpNm,
        recrtCorpAddr: item.recrtCorpAddr,
        recrtTitle: item.recrtTitle,
        recrtField: item.recrtField,
        recrtApplyDate: item.recrtApplyDate,
        applyCnt: item.applyCnt,
      }));

      const fileNm = "채용공고 목록";
      excelDown(headers, items, fileNm);
    },
  },
};
</script>
