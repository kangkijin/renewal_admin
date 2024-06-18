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
              <th>학생명</th>
              <td>
                <v-text-field v-model="searchInfo.korNm"></v-text-field>
              </td>
              <th>학번</th>
              <td>
                <v-text-field v-model="searchInfo.userId"></v-text-field>
              </td>
            </tr>
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
              <th>취업지수</th>
              <td>
                <div class="d-flex align-center">
                  <v-text-field type="number" v-model="searchInfo.startTotalJisu" hideSpinButtons></v-text-field>
                  <span class="mx-1">~</span>
                  <v-text-field type="number" v-model="searchInfo.endTotalJisu" hideSpinButtons></v-text-field>
                </div>
              </td>
              <th>최종등록일</th>
              <td>
                <div class="d-flex align-center">
                  <VDateInput v-model="searchInfo.startUpdDate" />
                  <span class="mx-1">~</span>
                  <VDateInput v-model="searchInfo.endUpdDate" />
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="d-flex pt-4 justify-end">
          <v-btn class="mr-2" width="80" @click="onClickSearchReset()">초기화</v-btn>
          <v-btn variant="flat" color="primary" width="80" @click="fnGetUserList()">검색</v-btn>
        </div>
      </BaseCard>
    </v-col>
    <v-col>
      <BaseCard>
        <template v-slot:title>
          <div class="text-h4">재학생 목록</div>
        </template>
        <BaseTableConfig
          :totalCnt="list.length"
          checked
          :checkedCnt="selectedItems.length"
          v-model:rowPerPage="serverOptions.rowsPerPage"
        >
          <template #left-btn-area>
            <v-btn class="mr-2" @click="onClickStateCtrl('DEL')">삭제</v-btn>
          </template>
          <template #top-btn-area>
            <v-btn @click="fnExcelDown">엑셀 다운로드</v-btn>
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
          <template #item-operation1="item">
            <v-btn size="small" @click="onClickDownloadZip(item.specId)">다운로드</v-btn>
          </template>
        </v-easy-table>
      </BaseCard>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import type { TableServerOption } from "@/types/dataTable/EasyDataTableConfig";
import type { AxiosResponse } from "axios";
import { excelDown } from "@/plugins/xlsx";
import type { Header, Item } from "@/plugins/xlsx";
import type { deptTypes } from "@/types/cmmnTypes";

export default {
  data: () => ({
    title: "재학생 등록정보 조회",
    breadcrumbs: [
      { title: "진로ㆍ취업", disabled: false },
      { title: "취업스펙", disabled: true },
    ],
    header: [
      { text: "No", value: "no", width: "50" },
      { text: "학생명", value: "korNm", sortable: true },
      { text: "학번", value: "userId", sortable: true },
      { text: "대학", value: "colgCdNm", sortable: true },
      { text: "학과", value: "hakguaCdNm", sortable: true },
      { text: "취업지수", value: "totalJisu", sortable: true },
      { text: "학점(점)", value: "credit", sortable: true },
      { text: "토익(점)", value: "toeic", sortable: true },
      { text: "토플(점)", value: "toefl", sortable: true },
      { text: "탭스(점)", value: "teps", sortable: true },
      { text: "OPIc(등급)", value: "opic", sortable: true },
      { text: "토익스피킹(등급)", value: "toeicSpk", sortable: true },
      { text: "자격증(개)", value: "certi", sortable: true },
      { text: "수상횟수(개)", value: "award", sortable: true },
      { text: "인턴경험(개월)", value: "intern", sortable: true },
      { text: "해외경험(개월)", value: "frgn", sortable: true },
      { text: "봉사활동(시간)", value: "serve", sortable: true },
      { text: "첨부자료", value: "operation1", sortable: true },
    ],
    selectedKey: "",
    list: [],
    selectedItems: [],
    searchInfo: {
      korNm: "",
      userId: "",
      colgCd: null,
      hakguaCd: null,
      startTotalJisu: "",
      endTotalJisu: "",
      startUpdDate: "",
      endUpdDate: "",
    },
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: ["totalJisu"],
      sortType: ["desc"],
      totalCount: 0,
    } as TableServerOption,
    selectOption: {
      colgList: [] as deptTypes[],
      hakguaList: [] as deptTypes[],
    },
    loading: false,
  }),
  watch: {
    serverOptions: {
      handler() {
        this.fnGetUserList();
      },
      deep: true,
    },
  },
  created() {
    const vm = this;
    vm.fnOnInit();
    vm.fnGetUserList();
  },
  methods: {
    async fnOnInit() {
      const vm = this;
      vm.selectOption.colgList = await vm.$fnGetDeptList("C", "");
      vm.selectOption.hakguaList = await vm.$fnGetDeptList("H", "");
    },
    async fnGetHakguaList(selectedItem: any) {
      const vm = this;
      const selectedDeptCd = selectedItem;
      vm.searchInfo.hakguaCd = null;
      vm.selectOption.hakguaList = await vm.$fnGetDeptList("H", selectedDeptCd);
    },
    fnGetUserList() {
      const vm = this;
      const searchParam = {
        korNm: vm.searchInfo.korNm,
        userId: vm.searchInfo.userId,
        colgCd: vm.searchInfo.colgCd,
        hakguaCd: vm.searchInfo.hakguaCd,
        startTotalJisu: vm.searchInfo.startTotalJisu,
        endTotalJisu: vm.searchInfo.endTotalJisu,
        startUpdDate: vm.searchInfo.startUpdDate,
        endUpdDate: vm.searchInfo.endUpdDate,
        ...vm.$serial(vm.serverOptions),
      };
      vm.selectedItems = [];
      vm.loading = true;
      vm.$axios
        .get("/api/career/admin/employSpec/getUserSpecList", { params: searchParam })
        .then((res: AxiosResponse) => {
          vm.list = res.data.data;
          const dataTable = vm.$refs.dataTable;
          dataTable.updateRowsPerPageActiveOption(vm.serverOptions.rowsPerPage);
          vm.serverOptions.totalCount = res.data.data.length > 0 ? res.data.data[0].totalCount : 0;
        })
        .catch((e: Error) => {
          console.error(e);
        })
        .finally(() => {
          vm.loading = false;
        });
    },

    onClickStateCtrl(_type: string) {
      const vm = this;
      let selTotalVal = vm.selectedItems;
      let selIdArr = [];
      let text = _type === "DEL" ? "삭제" : "";

      if (selTotalVal.length === 0) {
        vm.$alert("선택된 학생이 없습니다. <br>확인 후 다시 시도해주세요.");
        return false;
      }

      for (var i = 0; i < selTotalVal.length; i++) {
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
              vm.loading = false;
            });
        }
        vm.$loading.hide();
      });
    },
    onClickSearchReset() {
      const vm = this;
      vm.searchInfo.korNm = "";
      vm.searchInfo.userId = "";
      vm.searchInfo.colgCd = null;
      vm.searchInfo.hakguaCd = null;
      vm.searchInfo.startTotalJisu = "";
      vm.searchInfo.endTotalJisu = "";
      vm.searchInfo.startUpdDate = "";
      vm.searchInfo.endUpdDate = "";
    },
    fnExcelDown() {
      const vm = this;
      let idx = 1;

      const headers: Header[] = [
        { header: "No", key: "no", width: 20 },
        { header: "학생명", key: "korNm", width: 20 },
        { header: "학번", key: "userId", width: 20 },
        { header: "대학", key: "colgCdNm", width: 20 },
        { header: "학과", key: "hakguaCdNm", width: 20 },
        { header: "취업지수", key: "totalJisu", width: 20 },
        { header: "학점(점)", key: "credit", width: 20 },
        { header: "토익(점)", key: "toeic", width: 20 },
        { header: "토플(점)", key: "toefl", width: 20 },
        { header: "탭스(점)", key: "teps", width: 20 },
        { header: "OPIc(등급)", key: "opic", width: 20 },
        { header: "토익스피킹(등급)", key: "toeicSpk", width: 20 },
        { header: "자격증(개)", key: "certi", width: 20 },
        { header: "수상횟수(개)", key: "award", width: 20 },
        { header: "인턴경험(개월)", key: "intern", width: 20 },
        { header: "해외경험(개월)", key: "frgn", width: 20 },
        { header: "봉사활동(시간)", key: "serve", width: 20 },
      ];

      const items: Item[] = vm.list.map((item: any) => ({
        no: idx++,
        korNm: item.korNm,
        userId: item.userId,
        colgCdNm: item.colgCdNm,
        hakguaCdNm: item.hakguaCdNm,
        totalJisu: item.totalJisu,
        credit: item.credit,
        toeic: item.toeic,
        toefl: item.toefl,
        teps: item.teps,
        opic: item.opic,
        toeicSpk: item.toeicSpk,
        certi: item.certi,
        award: item.award,
        intern: item.intern,
        frgn: item.frgn,
        serve: item.serve,
      }));

      const fileNm = "재학생 스펙 목록";
      excelDown(headers, items, fileNm);
    },
    onClickDownloadZip(_specId: string) {
      const vm = this;
      vm.$alert("준비중입니다." + _specId, "알림");
    },
  },
};
</script>
