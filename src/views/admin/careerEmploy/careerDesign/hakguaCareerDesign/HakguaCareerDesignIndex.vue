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
              <th>대학</th>
              <td>
                <v-autocomplete
                  v-model="searchInfo.colgCd"
                  :items="selectOption.colgList"
                  item-title="deptKorNm"
                  item-value="deptCd"
                  placeholder="선택"
                  @update:modelValue="fnGetHakguaList"
                ></v-autocomplete>
              </td>
              <th>학과</th>
              <td>
                <v-autocomplete
                  v-model="searchInfo.hakguaCd"
                  :items="selectOption.hakguaList"
                  item-title="deptKorNm"
                  item-value="deptCd"
                  placeholder="선택"
                ></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th>진출분야명</th>
              <td>
                <v-text-field v-model="searchInfo.advTitle"></v-text-field>
              </td>
              <th>등록자</th>
              <td>
                <v-text-field v-model="searchInfo.regNm"></v-text-field>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="d-flex pt-4 justify-end">
          <v-btn class="mr-2" width="80" @click="onClickSearchReset()">초기화</v-btn>
          <v-btn variant="flat" color="primary" width="80" @click="fnGetCareerDesignList()">검색</v-btn>
        </div>
      </BaseCard>
    </v-col>
    <v-col>
      <BaseCard>
        <template v-slot:title>
          <div class="text-h4">진출분야 목록</div>
        </template>
        <BaseTableConfig
          :totalCnt="list.length"
          checked
          :checkedCnt="selectedItems.length"
          v-model:rowPerPage="serverOptions.rowsPerPage"
        >
          <template #left-btn-area>
            <v-btn class="mr-2" @click="onClickStateCtrl('USE_Y')">사용</v-btn>
            <v-btn class="mr-2" @click="onClickStateCtrl('USE_N')">미사용</v-btn>
            <v-btn class="mr-2" @click="onClickStateCtrl('DEL')">삭제</v-btn>
          </template>
          <template #top-btn-area>
            <v-btn class="mr-2" @click="onClickCareerDesignDetail('INSERT', '')">등록</v-btn>
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
            <v-btn size="small" @click="onClickCareerDesignDetail('MODIFY', item.careerDesignId)">수정</v-btn>
          </template>
        </v-easy-table>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import type { TableServerOption } from "@/types/dataTable/EasyDataTableConfig";
import type { AxiosResponse } from "axios";
import type { deptTypes } from "@/types/cmmnTypes";

export default {
  data: () => ({
    title: "학과별 진로설계",
    breadcrumbs: [
      { title: "진로ㆍ취업", disabled: false },
      { title: "진로설계", disabled: true },
    ],
    header: [
      { text: "No", value: "no" },
      { text: "진출분야명", value: "advTitle", sortable: true },
      { text: "대학", value: "colgCdNm", sortable: true },
      { text: "학과", value: "hakguaCdNm", sortable: true },
      { text: "담당교수", value: "korNm", sortable: true },
      { text: "사용여부", value: "useNm" },
      { text: "등록자", value: "regNm" },
      { text: "등록일", value: "regDate" },
      { text: "관리", value: "operation" },
    ],
    dialog: false,
    selectedKey: "",
    list: [],
    selectedItems: [],
    searchInfo: {
      colgCd: null,
      hakguaCd: null,
      regNm: "",
      advTitle: "",
    },
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: [""],
      sortType: [""],
      totalCount: 0,
    } as TableServerOption,
    selectOption: {
      gradeCd: [
        { name: "선택", value: "" },
        { name: "1학년", value: "1" },
        { name: "2학년", value: "2" },
        { name: "3학년", value: "3" },
        { name: "4학년", value: "4" },
      ],
      colgList: [] as deptTypes[],
      hakguaList: [] as deptTypes[],
    },
    loading: false,
  }),
  watch: {
    serverOptions: {
      handler() {
        this.fnGetCareerDesignList();
      },
      deep: true,
    },
  },
  created() {
    this.fnOnInit(); //초기데이터세팅
    this.fnGetCareerDesignList();
  },
  methods: {
    async fnOnInit() {
      const vm = this;
      vm.selectOption.colgList = await vm.$fnGetDeptList("C", ""); //대학리스트 불러오기
      vm.selectOption.hakguaList = await vm.$fnGetDeptList("H", ""); //학과리스트 불러오기
    },
    async fnGetHakguaList(selectedItem: any) {
      const vm = this;
      const selectedDeptCd = selectedItem;
      vm.searchInfo.hakguaCd = null;
      vm.selectOption.hakguaList = await vm.$fnGetDeptList("H", selectedDeptCd); //대학 셀렉트시 학과 불러오기
    },
    fnGetCareerDesignList() {
      const vm = this;
      const searchParam = {
        ...vm.searchInfo,
        ...vm.$serial(vm.serverOptions),
      };
      vm.selectedItems = [];
      vm.loading = true;
      vm.$axios
        .get("/api/career/admin/careerDesign/getCareerDesignList", { params: searchParam })
        .then((res: AxiosResponse) => {
          vm.list = res.data.data;
          const dataTable = vm.$refs.dataTable;
          dataTable.updateRowsPerPageActiveOption(vm.serverOptions.rowsPerPage);
          vm.serverOptions.totalCount = res.data.data.length > 0 ? res.data.data[0].totalCount : 0;
        })
        .catch((e: any) => {
          console.error(e);
        })
        .finally(() => {
          vm.loading = false;
        });
    },
    onClickCareerDesignDetail(_viewType: string, _careerDesignId: string) {
      const vm = this;
      vm.$router.push({
        path: "/admin/careerEmploy/careerDesign/hakguaCareerDesignDetail",
        state: { viewType: _viewType, careerDesignId: _careerDesignId },
      });
    },
    onClickStateCtrl(_type: string) {
      const vm = this;
      let selTotalVal = vm.selectedItems;
      let selIdArr = [];
      let text = _type === "USE_Y" ? "사용" : _type === "USE_N" ? "미사용" : _type === "DEL" ? "삭제" : "";
      for (var i = 0; i < selTotalVal.length; i++) {
        selIdArr.push(selTotalVal[i].careerDesignId);
      }

      if (selIdArr.length === 0) {
        vm.$alert("선택된 진출분야가 없습니다. <br>확인 후 다시 시도해주세요.");
        return false;
      }
      let param = {
        selCareerDesignIdArr: selIdArr,
        controlType: _type,
      };
      vm.$confirm(text + "처리 하시겠습니까?", "확인", (isConfirm: Boolean) => {
        if (isConfirm) {
          vm.$loading.show();
          let _url = "/api/career/admin/careerDesign/modifyCareerDesignState";
          vm.$axios
            .post(_url, JSON.stringify(param))
            .then((res: AxiosResponse) => {
              const code = res.data.code;
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
              vm.$loading.hide();
            });
        }
        vm.$loading.hide();
      });
    },
    onClickSearchReset() {
      const vm = this;
      vm.fnOnInit();
      vm.searchInfo.colgCd = null;
      vm.searchInfo.hakguaCd = null;
      vm.searchInfo.regNm = "";
      vm.searchInfo.advTitle = "";
    },
  },
};
</script>
