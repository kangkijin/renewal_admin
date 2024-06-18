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
              <th>학번</th>
              <td>
                <v-text-field v-model="searchInfo.userId" placeholder=""></v-text-field>
              </td>
              <th>이름</th>
              <td>
                <v-text-field v-model="searchInfo.korNm" placeholder=""></v-text-field>
              </td>
            </tr>
            <tr>
              <th colspan="4" class="text-end">
                <v-btn class="mr-2" width="80" @click="onClickSearchReset()">초기화</v-btn>
                <v-btn variant="flat" color="primary" width="80" @click="fnGetApplyUserList()">검색</v-btn>
              </th>
            </tr>
          </tbody>
        </v-table>
      </BaseCard>
    </v-col>
    <v-col>
      <BaseCard>
        <template v-slot:title>
          <div class="text-h4">지원자 목록</div>
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
          <template #item-operation="item">
            <v-dialog v-model="dialog" persistent width="1024">
              <template v-slot:activator="{ props }">
                <v-btn size="small" v-bind="props" @click="onClickShowApplyReasonPopup(item.recrtId, item.userId)"
                  >지원사유/이력서</v-btn
                >
              </template>
              <ApplyReasonPopup
                v-model="dialog"
                :recrtId="selectedKey"
                :userId="selectedUserId"
                :recrtTypeCd="searchInfo.userId"
              />
            </v-dialog>
          </template>
        </v-easy-table>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import type { TableServerOption } from "@/types/dataTable/EasyDataTableConfig";
import type { AxiosResponse } from "axios";
import ApplyReasonPopup from "@/components/employInfo/ApplyReasonPopup.vue";
import { excelDown } from "@/plugins/xlsx";
import type { Header, Item } from "@/plugins/xlsx";

export default {
  components: {
    ApplyReasonPopup,
  },
  data: () => ({
    title: "지원 현황 ",
    breadcrumbs: [
      { title: "진로ㆍ취업", disabled: false },
      { title: "취업정보", disabled: true },
      { title: "교외 채용", disabled: true },
    ],
    header: [
      { text: "No", value: "no", width: "50" },
      { text: "대학", value: "colgCdNm", sortable: true },
      { text: "학과", value: "hakguaCdNm", sortable: true },
      { text: "학적", value: "shregStNm", sortable: true },
      { text: "학점", value: "credit", sortable: true },
      { text: "학번", value: "userId", sortable: true },
      { text: "이름", value: "korNm", sortable: true },
      { text: "학년", value: "gradeCdNm", sortable: true },
      { text: "성별", value: "sexCdNm", sortable: true },
      { text: "연락처", value: "ph", sortable: true, width: "150" },
      { text: "진행상태", value: "userStsCdNm", sortable: true },
      { text: "관리", value: "operation" },
    ],
    dialog: false,
    selectedKey: "",
    selectedUserId: "",
    list: [],
    selectedItems: [],
    searchInfo: {
      recrtId: history.state.recrtId,
      userId: "",
      korNm: "",
      userStsCd: "",
      recrtTypeCd: "REC_TYPE03",
    },
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: [""],
      sortType: [""],
      totalCount: 0,
    } as TableServerOption,
    loading: false,
  }),
  watch: {
    serverOptions: {
      handler() {
        this.fnGetApplyUserList();
      },
      deep: true,
    },
  },
  created() {
    const vm = this;
    vm.fnGetApplyUserList();
  },
  methods: {
    fnGetApplyUserList() {
      const vm = this;
      const searchParam = {
        ...vm.searchInfo,
        ...vm.$serial(vm.serverOptions),
      };
      vm.selectedItems = [];
      vm.loading = true;
      vm.$axios
        .get("/api/career/admin/recrtInfo/getRecrtApplyUserList", { params: searchParam })
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
    onClickRecrtDetail(_viewType: string, _recrtId: string) {
      const vm = this;
      vm.$router.push({
        path: "/admin/careerEmploy/employInfo/outsideRecrtDetail",
        state: { viewType: _viewType, recrtId: _recrtId },
      });
    },
    onClickStateCtrl(_afterStsCd: string) {
      const vm = this;
      let selTotalVal = vm.selectedItems;
      let selIdArr = [];
      let status = false;
      let text =
        _afterStsCd === "REC_USER_STS01"
          ? "지원"
          : _afterStsCd === "REC_USER_STS02"
            ? "추천"
            : _afterStsCd === "REC_USER_STS03"
              ? "입사"
              : _afterStsCd === "DEL"
                ? "삭제"
                : "";
      status = vm.fnValidation(_afterStsCd);
      if (!status) return;

      for (var i = 0; i < selTotalVal.length; i++) {
        selIdArr.push(selTotalVal[i].userId);
      }

      let param = {
        recrtId: vm.searchInfo.recrtId,
        recrtTypeCd: vm.searchInfo.recrtTypeCd,
        selUserIdArr: selIdArr,
        userStsCd: _afterStsCd,
      };
      vm.$confirm(text + "처리 하시겠습니까?", "확인", (isConfirm: Boolean) => {
        if (isConfirm) {
          vm.$loading.show();
          let _url = "/api/career/admin/recrtInfo/modifyRecrtApplyUserState";
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
              vm.$loading.hide();
            });
        }
      });
    },
    onClickShowApplyReasonPopup(_keyId: string, _userId: string) {
      const vm = this;
      vm.selectedKey = _keyId;
      vm.selectedUserId = _userId;
      vm.dialog = true;
    },
    onClickSearchReset() {
      const vm = this;
      vm.searchInfo.userId = "";
      vm.searchInfo.korNm = "";
      vm.searchInfo.userStsCd = "";
    },
    fnValidation(_afterStsCd: string) {
      const vm = this;
      let selTotalVal = vm.selectedItems;
      let status = false;

      if (selTotalVal.length === 0) {
        vm.$alert("선택된 학생이 없습니다. <br>확인 후 다시 시도해주세요.");
        status = false;
      }

      for (var i = 0; i < selTotalVal.length; i++) {
        let _beforeSts = selTotalVal[i].userStsCd;

        if (_afterStsCd === "REC_USER_STS01" || _afterStsCd === "DEL") {
          status = true;
        }
        if (_afterStsCd === "REC_USER_STS02") {
          if (_beforeSts === "REC_USER_STS01" || _beforeSts === "REC_USER_STS03") {
            status = true;
          } else {
            status = false;
            vm.$toast("입사완료 or 추천완료인 학생만 <br>추천처리가 가능합니다.", "error");
          }
        }
        if (_afterStsCd === "REC_USER_STS03") {
          if (_beforeSts === "REC_USER_STS02") {
            status = true;
          } else {
            status = false;
            vm.$toast("추천완료인 학생만 <br>입사처리가 가능합니다.", "error");
          }
        }
      }
      return status;
    },
    fnExcelDown() {
      const vm = this;
      let idx = 1;

      const headers: Header[] = [
        { header: "No", key: "no" },
        { header: "대학", key: "colgCdNm", width: 10 },
        { header: "학과", key: "hakguaCdNm", width: 15 },
        { header: "학적", key: "shregStNm", width: 10 },
        { header: "학점", key: "credit", width: 10 },
        { header: "학번", key: "userId", width: 15 },
        { header: "이름", key: "korNm", width: 10 },
        { header: "학년", key: "gradeCdNm", width: 10 },
        { header: "성별", key: "sexCdNm", width: 10 },
        { header: "연락처", key: "ph", width: 20 },
        { header: "진행상태", key: "userStsCdNm", width: 10 },
      ];

      const items: Item[] = vm.list.map((item: any) => ({
        no: idx++,
        colgCdNm: item.colgCdNm,
        hakguaCdNm: item.hakguaCdNm,
        shregStNm: item.shregStNm,
        credit: item.credit,
        userId: item.userId,
        korNm: item.korNm,
        gradeCdNm: item.gradeCdNm,
        sexCdNm: item.sexCdNm,
        ph: item.ph,
        userStsCdNm: item.userStsCdNm,
      }));

      const fileNm = "지원자 목록";
      excelDown(headers, items, fileNm);
    },
  },
};
</script>
