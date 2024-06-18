<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <BaseCard :title="'검색'">
        <v-table>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: 35%" />
            <col style="width: 15%" />
            <col style="width: 35%" />
          </colgroup>
          <tbody>
            <tr>
              <th>상담사명</th>
              <td>
                <v-text-field v-model="searchInfo.cnslrNm" @keyup.enter="fnGetList()"></v-text-field>
              </td>
              <th>활동여부</th>
              <td>
                <v-radio-group v-model="searchInfo.cnslrActYn" inline>
                  <v-radio label="전체" class="mr-4" value=""></v-radio>
                  <v-radio label="활동" class="mr-4" value="Y"></v-radio>
                  <v-radio label="활동정지" value="N"></v-radio>
                </v-radio-group>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="d-flex pt-4 justify-end">
          <v-btn class="mr-2" width="80" @click="onClickSearchReset()">초기화</v-btn>
          <v-btn variant="flat" color="primary" width="80" @click="fnGetList()">검색</v-btn>
        </div>
      </BaseCard>
    </v-col>
    <v-col>
      <BaseCard>
        <template v-slot:title>
          <div class="d-flex align-center">
            <div class="text-h4">상담사 목록</div>
            <v-avatar class="mx-2" size="20" color="primary">
              <v-icon style="font-size: 14px">mdi-exclamation-thick</v-icon>
              <v-tooltip>
                상담사가 활동 상태일 경우, 학생신청 목록에서 상담사가 검색되며, 상담사 대시보드가 제공됩니다.<br />
                상담사를 삭제할 경우, 모든 상담활동 히스토리가 삭제되니 유의하여 주십시오.
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
            <v-btn class="mr-1" @click="onClickSelectedUpdate('Delete')">삭제</v-btn>
            <v-btn class="mr-1" @click="onClickSelectedUpdate('ActN')">활동정지</v-btn>
            <v-btn class="mr-1" @click="onClickSelectedUpdate('ActY')">활동</v-btn>
          </template>
          <template #top-btn-area>
            <v-btn @click="onClickMoveDetail('INSERT')">상담사 등록</v-btn>
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
            <v-btn @click="onClickMoveDetail('MODIFY', item.cnslCnslrId)"> 수정</v-btn>
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
    /** theme breadcrumb */
    title: "상담사관리-글쓰기상담",
    breadcrumbs: [
      { title: "전문상담", disabled: false },
      { title: "상담사관리", disabled: true },
    ],

    itemsSelected: [],
    tableItem: { type: Map },
    header: [
      { text: "상담사명", value: "cnslrNm", sortable: true },
      { text: "연락처(핸드폰)", value: "cnslrPh", sortable: true },
      { text: "이메일주소", value: "cnslrEmail", sortable: true },
      /** 내외부구분 값은 관리자 테이블 Join 걸어서 값을 가져오는 것으로 설계 */
      /** CNSL_CNSLR 테이블에는 해당 컬럼 없음 */
      { text: "내외부구분", value: "cnslrInOut", sortable: true },
      { text: "소속부서", value: "cnslrDeptNm", sortable: true },
      { text: "활동여부", value: "cnslrActYn", sortable: true },
      { text: "등록일", value: "regDate", sortable: true },
      { text: "관리", value: "operation" },
    ],
    list: [],
    selectedItems: [],
    searchInfo: {
      cnslrNm: "",
      cnslrActYn: "",
      cnslrDiv: "CNSLR004" /** 글쓰기상담  */,
    },

    /** paging */
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: ["cnslrActYn", "regDate"],
      sortType: ["desc", "desc"],
      totalCount: 0,
    } as TableServerOption,
    loading: false,
  }),
  watch: {
    /** paging */
    serverOptions: {
      handler() {
        this.fnGetList();
      },
      deep: true,
    },
  },
  created: function () {
    this.fnGetList();
  },
  methods: {
    /** 상담사 리스트 불러오기 */
    fnGetList() {
      const vm = this;
      const param = {
        ...vm.searchInfo,
        ...vm.$serial(vm.serverOptions) /** paging */,
      };
      vm.loading = true;
      vm.$axios
        .get("/api/counsel/admin/counselorMng/getCounselorList", { params: param })
        .then((res: AxiosResponse) => {
          const success = res.status;
          if (success == 200) {
            const resData = res.data;
            vm.list = resData.data;

            /** paging */
            const dataTable = vm.$refs.dataTable;
            dataTable.updateRowsPerPageActiveOption(vm.serverOptions.rowsPerPage);
            vm.serverOptions.totalCount = res.data.data.length > 0 ? res.data.data[0].totalCount : 0;
            vm.loading = false;
          } else {
            console.error("오류발생");
          }
        });
    },

    /***/
    updateRowPerPage(selected: number) {
      const vm = this;
      const dataTable = vm.refs.dataTable;
      dataTable.updateRowsPerPageActiveOption(selected);
    },

    /** 등록 / 수정 페이지로 이동 */
    onClickMoveDetail(_viewType: string, _cnslCnslrId?: number) {
      const vm = this;
      vm.$router.push({
        path: "/admin/prfsnCnsl/cnslrMng/writeCnsl/writeCnslDetail",
        state: { viewType: _viewType, cnslCnslrId: _cnslCnslrId },
      });
    },

    /** 검색 초기화 */
    onClickSearchReset() {
      const vm = this;
      vm.searchInfo.cnslrNm = "";
      vm.searchInfo.cnslrActYn = "";
    },

    /** 삭제 / 활동정지 / 활동 상태값 변경 버튼 */
    onClickSelectedUpdate(_cnslrStsDiv: string) {
      const vm = this;
      const _cnslCnslrIds = vm.selectedItems.map((x: { cnslCnslrId: string }) => x.cnslCnslrId);
      let confirmMsg = "";
      let successMsg = "";

      /** 삭제 버튼 */
      if (_cnslrStsDiv == "Delete") {
        confirmMsg = "목록을 삭제할 경우, 상담사의 모든 상담활동 히스토리가 삭제됩니다. 삭제하시겠습니까?";
        successMsg = "삭제되었습니다.";

        /** 활동 버튼 */
      } else if (_cnslrStsDiv == "ActY") {
        confirmMsg =
          "활동상태로 전환하면, 학생신청페이지에 목록이 제공되며, 상담사 계정에서 전문상담 및 대시보드 기능이 제공됩니다. 활동 상태로 전환하시겠습니까?";
        successMsg = "활동상태로 전환되었습니다.";

        /** 활동정지 버튼 */
      } else if (_cnslrStsDiv == "ActN") {
        confirmMsg =
          "활동정지상태로 전환하면, 학생신청페이지 목록에서 제외되며, 상담사 계정에서 전문상담 및 대시보드 기능이 삭제됩니다. 활동정지 상태로 전환하시겠습니까?";
        successMsg = "활동정지 상태로 전환되었습니다.";
      }

      vm.$confirm(confirmMsg, "확인", (isConfirm: Boolean) => {
        if (isConfirm) {
          const param = {
            cnslCnslrIds: _cnslCnslrIds,
            cnslrStsDiv: _cnslrStsDiv,
          };
          vm.$axios
            .post("/api/counsel/admin/counselorMng/modifyCounselorSts", JSON.stringify(param))
            .then((res: AxiosResponse) => {
              let success = res.status;
              if (success == 200) {
                vm.$alert(successMsg, "알림", () => {
                  vm.selectedItems = [];
                  vm.fnGetList();
                });
              } else {
                console.error("오류발생");
              }
            });
        }
      });
    },
  },
};
</script>
