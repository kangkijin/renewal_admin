<template>
  <BaseTableConfig
    :totalCnt="list.length"
    checked
    :checkedCnt="selectedItems.length"
    @update:rowPerPage="updateRowPerPage"
  >
    <template #top-btn-area>
      <PromoProgRegPopup :tabValue="this.tabVal" :fnCallGrid="onClickGetData" />
    </template>
    <template #left-btn-area>
      <v-btn
        icon="mdi-arrow-up"
        :disabled="fnIsChecked"
        @click="onClickMove('up')"
        density="compact"
        class="mr-2"
      ></v-btn>
      <v-btn
        icon="mdi-arrow-down"
        :disabled="fnIsChecked"
        @click="onClickMove('down')"
        density="compact"
        class="mr-2"
      ></v-btn>
      <v-btn prepend-icon="mdi-arrow-up" :disabled="fnIsChecked" @click="onClickMove('top')" class="mr-2">최상위</v-btn>
      <v-btn
        prepend-icon="mdi-arrow-down"
        :disabled="fnIsChecked"
        @click="onClickMove('bottom')"
        class="mr-2"
        base-color="white"
        >최하위</v-btn
      >
      <v-btn color="grey-darken-1" :disabled="fnIsChecked" @click="onClickUpdateDisabled()" class="mr-2"> 미사용</v-btn>
      <v-btn color="grey-darken-1" :disabled="fnIsChecked" @click="onClickDelSelected()" class="mr-2">삭제</v-btn>
    </template>
    <template #right-btn-area>
      <span class="font-weight-medium text-error">*모집기간 종료시 자동으로 미사용 전환됩니다.</span>
    </template>
  </BaseTableConfig>

  <v-easy-table
    ref="dataTable"
    :headers="header"
    :items="list"
    fixed-checkbox
    :checkbox-column-wepmIdth="50"
    v-model:items-selected="selectedItems"
    :body-row-class-name="bodyRowClassNameFunction"
  >
  </v-easy-table>
</template>

<script lang="ts">
/** easy-data-table */
import PromoProgRegPopup from "@/views/admin/extraCurricularProgram/promoProgMng/promoProgSetup/popup/PromoProgRegPopup.vue";

export default {
  components: {
    PromoProgRegPopup,
  },
  data() {
    return {
      tabVal: "PROF",
      header: [
        { text: "순서", value: "epmOrder", sortable: true },
        { text: "유형", value: "epmType" },
        { text: "프로그램명", value: "eliTitle" },
        { text: "모집기간", value: "eliReqStrDate" },
        { text: "담당부서", value: "eliDeptNm" },
        { text: "담당자", value: "eliStfNm" },
        { text: "사용여부", value: "epmYn" },
      ],
      selectedItems: [],
      list: [],
    };
  },
  computed: {
    fnIsChecked() {
      return this.selectedItems.length === 0;
    },
  },
  watch: {
    list: {
      handler: function (newVal, oldVal) {
        if (oldVal == "") {
          this.fnCheckDate();
        }
      },
    },
  },
  mounted() {
    this.onClickGetData();
  },
  methods: {
    fnCheckDate() {
      var toDay = new Date();
      var defaultArr: { id: Number; eliReqEndDate: Date }[] = [];
      defaultArr = this.list.map(function (x: { epmId: Number; eliReqEndDate: Date }) {
        return {
          epmIds: x.epmId,
          epmType: "PROF",
          eliReqEndDate: x.eliReqEndDate,
        };
      });
      var filteredArr = defaultArr.filter(function (x) {
        var paramDate = new Date(x.eliReqEndDate);
        return paramDate <= toDay;
      });
      var ids = filteredArr.map(function (x: any) {
        return x.epmIds;
      });
      const postData = {
        epmIds: ids,
        epmType: "PROF",
      };
      console.log(ids);
      if (ids.length > 0) {
        this.$axios.post("http://localhost:3000/api/v1/ecpPromotionsUseYn", postData).then(function (res: any) {
          console.log(res);
          // this.onClickGetData();
        });
      }
    },
    onClickGetData() {
      let vm = this;
      vm.$axios.get("http://localhost:3000/api/v1/ecpPromotions", { params: { epmType: "PROF" } }).then((res: any) => {
        vm.list = res.data.data;
      });
    },
    onClickUpdateDisabled() {
      var changeIds = this.selectedItems.map((x: { epmId: string }) => x.epmId);
      const postData = {
        epmIds: changeIds,
        epmType: "PROF",
      };
      this.$axios.post("http://localhost:3000/api/v1/ecpPromotionsUseYn", postData).then(function (res: any) {
        console.log(res);
        //  this.onClickGetData();
      });
    },
    onClickDelSelected() {
      var deleteIds = this.selectedItems.map((x: { epmId: string }) => x.epmId);
      const postData = {
        epmIds: deleteIds,
        epmType: "PROF",
      };
      this.$axios.post("http://localhost:3000/api/v1/ecpPromotionsDelYn", postData).then(function (res: any) {
        console.log(res);
        this.onClickGetData();
      });
    },
    onClickMove(option: String) {
      let vm = this;
      var url = "/api/v1/ecpPromotionsMoveNo";
      //선택된 값
      var changeIds = this.selectedItems;
      //올바른 데이터 체크
      var flag = true;
      var numFlag = true;
      //마지막 번호 or  첫번호 확인
      var maxOrder = 0;
      //경고 문구 섹션(옵션따라서 1순위 혹은 마지막 번호 선택 불가)
      var announText = "1순위를 포함할 수 없습니다.";
      if (option == "down" || option == "bottom") {
        //down(한칸씩 내리기) or bottom(최하단으로 내리기)일시 문구 변경 및 마지막번호로 변경
        announText = "마지막 번호를 포함할 수 없습니다.";
        this.list.map(function (x: any) {
          if (x.epmOrder > maxOrder) {
            maxOrder = x.epmOrder;
          }
        });
      } else {
        maxOrder = 1;
      }
      //마지막 번호 or  첫번호 확인해서 flag 변경
      for (var i = 0; i < changeIds.length; i++) {
        if (changeIds[i].epmOrder == maxOrder) {
          numFlag = false;
          break;
        }
        //전송할 obj객체 빌드
        var rstObj: { epmId: String; epmYn: string } = {
          epmId: changeIds[i].epmId,
          epmYn: changeIds[i].epmYn,
        };
        //올바른 데이터 체크
        if (rstObj.epmYn === "N") {
          flag = false;
        }
      }
      if (!flag) {
        this.$alert("미사용된 항목은 변경할 수 없습니다.");
        return false;
      } else if (!numFlag) {
        this.$alert(announText);
      } else {
        //다 되었을경우 파라미터 바디에 빌드
        let param = this.selectedItems.map(function (x: any) {
          return {
            epmId: x.epmId,
            epmOrder: x.epmOrder,
            epmType: "PROF",
            moveType: option,
            maxOrder: maxOrder,
          };
        });
        //오름차 or 내림차순 정렬
        param.sort(function (a: any, b: any) {
          if (option == "down" || option == "top") {
            //내림차순 정렬
            return b.epmOrder - a.epmOrder;
          } else {
            //오름차순 정렬
            return a.epmOrder - b.epmOrder;
          }
        });
        //stringify로 jsonData로 변경 후 자동 파싱
        this.$axios.post(url, JSON.stringify(param)).then(function (res: any) {
          console.log(res);
          vm.onClickGetData();
        });
      }
    },
    updateRowPerPage(selected: number) {
      const vm = this;
      const dataTable = vm.$refs.dataTable;
      dataTable.updateRowsPerPageActiveOption(selected);
    },
    bodyRowClassNameFunction(list: any) {
      if (list.epmYn == "N") return "fail-row";
      return "pass-row";
    },
  },
};
</script>
<style>
.score-column {
  font-size: 20px;
}
.fail-row {
  --easy-table-body-row-background-color: lightgrey;
  --easy-table-body-row-font-color: black;
}
</style>
