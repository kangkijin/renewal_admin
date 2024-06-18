<template>
  <v-dialog v-model="dialog" persistent width="1024">
    <!-- dialog button -->
    <template v-slot:activator="{ props }">
      <v-btn color="" v-bind="props" class="mr-2">등록</v-btn>
    </template>
    <!-- dialog inner -->
    <v-card>
      <!-- dialog title -->
      <v-card-title class="bg-primary">홍보 프로그램 등록</v-card-title>
      <v-divider></v-divider>

      <!-- dialog content -->
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-table>
              <colgroup>
                <col style="width: 15%" />
                <col style="width: 35%" />
                <col style="width: 15%" />
                <col style="width: 35%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>프로그램명</th>
                  <td>
                    <v-text-field v-model="pgNm"></v-text-field>
                  </td>
                  <th>담당 부서/담당자</th>
                  <td>
                    <v-text-field v-model="mainStf"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <th colspan="4" class="text-end">
                    <v-btn class="mr-2" @click="onClickResetInput(['pgNm', 'mainStf'])" width="80">초기화</v-btn>
                    <v-btn variant="flat" color="primary" width="80" @click="onClickGetData()">검색</v-btn>
                  </th>
                </tr>
              </tbody>
            </v-table>
            <hr style="color: gray" />
            <p style="color: red">-프로그램명 혹은 담당자/ 담당부서 검색 후 제공됩니다.</p>
          </v-col>
          <v-col cols="12">
            <BaseCard>
              <div class="text-h4 mb_2" style="margin: 5px">홍보 프로그램 등록</div>
              <BaseTableConfig :totalCnt="list.length" checked :checkedCnt="selectedItems.length">
                <template #left-btn-area>
                  <v-btn color="grey" v-on:click="onClickAddData()" class="mr-2">선택 추가</v-btn>
                </template>
              </BaseTableConfig>
              <v-easy-table
                ref="dataTable"
                :headers="header"
                :items="list"
                fixed-checkbox
                :checkbox-column-width="50"
                v-model:items-selected="selectedItems"
              >
              </v-easy-table>
            </BaseCard>
            <BaseCard>
              <div class="d-flex align-center">
                <div class="text-h6">선택 프로그램 목록</div>
              </div>
              <BaseTableConfig
                hideRowPerPage
                :totalCnt="selectedList.length"
                checked
                :checkedCnt="selectedItemSec.length"
              >
                <template #left-btn-area>
                  <v-btn color="grey" v-on:click="onClickRemoveData()" class="mr-2">삭제</v-btn>
                </template>
              </BaseTableConfig>
              <v-easy-table
                ref="dataTable"
                :headers="header"
                :items="selectedList"
                fixed-checkbox
                :checkbox-column-width="50"
                v-model:items-selected="selectedItemSec"
              >
              </v-easy-table>
            </BaseCard>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>

      <!-- dialog button -->
      <v-card-actions class="justify-end">
        <v-btn variant="outlined" color="error" @click="onClickCloseBtn()">취소</v-btn>
        <v-btn variant="flat" color="success" @click="onClickSaveBtn()">등록</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  components: {},
  props: {
    tabValue: {
      type: String,
    },
    fnCallGrid: {
      type: Function,
    },
  },
  data: () => ({
    cnt: 0,
    dialog: false,
    selectOption: {
      items: ["10개씩 보기", "50개씩 보기", "100개씩 보기"],
      value: "10개씩 보기",
    },
    /** easy-data-table */
    header: [
      { text: "유형", value: "epmType" },
      { text: "프로그램명", value: "eliTitle" },
      { text: "모집기간", value: "eliReqStrDate" },
      { text: "담당부서", value: "eliDeptNm" },
      { text: "담당자", value: "eliStfNm" },
    ],
    //변수명
    //담당부서/담당자 검색
    mainStf: "",
    //프로그램 이름 검색
    pgNm: "",
    //2테이블 총 리스트
    selectedList: [],
    //2테이블 선택된 리스트
    selectedItemSec: [],
    //1테이블 선택된 리스트
    selectedItems: [],
    //1테이블 총 리스트
    list: [],
  }),
  methods: {
    onClickGetData() {
      let vm = this;
      vm.$loading.show();
      this.$axios
        .get("http://localhost:3000/api/v1/ecpClasses", { params: { eliTitle: this.pgNm, eliStfNm: this.mainStf } })
        .then((res: any) => {
          vm.$loading.hide();
          vm.list = res.data.data;
        });
      vm.selectedList.length = 0;
    },
    onClickAddData() {
      if (this.selectedItems.length == 0) {
        this.$alert("하나 이상의 프로그램을 선택해주세요");
        return false;
      }
      this.selectedList.push(...this.selectedItems);
      this.selectedItems.forEach((item: any) => {
        const index = this.list.findIndex((listItem: any) => listItem.id === item.id);
        if (index !== -1) {
          this.list.splice(index, 1);
        }
      });
      this.selectedItems.length = 0;
    },
    onClickRemoveData() {
      if (this.selectedItemSec.length == 0) {
        this.$alert("하나 이상의 프로그램을 선택해주세요");
        return false;
      }
      this.list.push(...this.selectedItemSec);
      this.selectedItemSec.forEach((item: any) => {
        const index = this.selectedList.findIndex((listItem: any) => listItem.id === item.id);
        if (index !== -1) {
          this.selectedList.splice(index, 1);
        }
      });
      this.selectedItemSec.length = 0;
    },
    /* 저장 로직*/
    onClickSaveBtn() {
      if (this.selectedList.length == 0) {
        this.$alert("하나 이상의 프로그램을 선택해주세요");
        return false;
      }
      this.$loading.show();
      let saveProp = this.selectedList.map((item: { eliId: String }) => item.eliId);
      const postData = {
        epmIds: saveProp,
        epmType: this.tabValue,
      };
      this.$axios.post("http://localhost:3000/api/v1/ecpPromotions", postData).then(function (res: any) {
        console.log(res);
      });
      this.$loading.hide();
      this.dialog = false;
      this.selectedItems = [];
      this.selectedList = [];
      this.selectedItems = [];
      this.list = [];
      this.fnCallGridParent();
    },
    /*검색 인풋 초기화*/
    onClickResetInput(propertyName: any) {
      propertyName.forEach((propertyName: any) => {
        this[propertyName] = "";
      });
    },
    /*취소 버튼*/
    onClickCloseBtn() {
      this.dialog = false;
      this.selectedItems = [];
      this.selectedList = [];
      this.selectedItems = [];
      this.list = [];
    },
    fnCallGridParent() {
      this.fnCallGrid();
    },
  },
};
</script>
