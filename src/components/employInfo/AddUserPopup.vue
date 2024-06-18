<template>
  <v-card>
    <!-- dialog title -->
    <v-card-title class="bg-primary d-flex align-center">
      학생 추가
      <v-spacer></v-spacer>
      <v-btn icon="mdi-window-close" variant="tonal" :size="'x-small'" @click="model = false"></v-btn>
    </v-card-title>

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
                  <v-btn variant="flat" color="primary" width="80" @click="fnGetUserList()">검색</v-btn>
                </th>
              </tr>
            </tbody>
          </v-table>
        </v-col>
        <v-col cols="12">
          <BaseCard>
            <template v-slot:title>
              <div class="d-flex align-center">
                <div class="text-h6">검색 결과</div>
              </div>
            </template>
            <BaseTableConfig
              :totalCnt="list.length"
              checked
              :checkedCnt="selectedItems.length"
              v-model:rowPerPage="serverOptions.rowsPerPage"
            >
              <template #left-btn-area>
                <v-btn color="grey-darken-1" class="mr-2" @click="onClickAddUser()">추가</v-btn>
              </template>
            </BaseTableConfig>
            <v-easy-table
              ref="dataTableRef"
              :headers="header"
              :items="list"
              fixed-checkbox
              :checkbox-column-width="50"
              v-model:items-selected="selectedItems"
              :loading="loading"
              :server-items-length="serverOptions.totalCount"
              v-model:server-options="serverOptions"
            >
            </v-easy-table>
          </BaseCard>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
  </v-card>
</template>
<script setup lang="ts">
import type { Header, Item } from "vue3-easy-data-table";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import type { AxiosResponse } from "axios";
import type { TableServerOption } from "@/types/dataTable/EasyDataTableConfig";

const instance = getCurrentInstance();
if (!instance) {
  throw new Error("getCurrentInstance returned null");
}
const vm = instance.appContext.config.globalProperties;
const dataTableRef = ref<any>(null);
onMounted(() => {
  fnGetUserList();
});

const header: Header[] = [
  { text: "No", value: "no" },
  { text: "학번", value: "userId", sortable: true },
  { text: "이름", value: "korNm", sortable: true },
  { text: "학년", value: "gradeCdNm", sortable: true },
  { text: "대학", value: "colgCdNm", sortable: true },
  { text: "학과", value: "hakguaCdNm", sortable: true },
];

const model = defineModel({ type: Boolean, required: true });
const emits = defineEmits(["update:completeAddUser"]);

const props = defineProps<{
  recrtId: string;
  recrtTypeCd: string;
}>();

const list = ref([] as Item[]);
const loading = ref(false);
const selectedItems = ref([]);

const searchInfo = ref({
  recrtId: props.recrtId,
  korNm: "",
  userId: "",
});

const serverOptions: TableServerOption = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: ["gradeCdNm"],
  sortType: ["desc"],
  totalCount: 0,
});

const onClickAddUser = () => {
  let selTotalVal = selectedItems.value;
  let selIdArr = [];
  for (var i = 0; i < selTotalVal.length; i++) {
    selIdArr.push(selTotalVal[i].userId);
  }
  if (selIdArr.length === 0) {
    vm.$alert("선택된 학생이 없습니다. <br>확인 후 다시 시도해주세요.");
    return false;
  }
  let param = {
    selUserIdArr: selIdArr,
    recrtId: props.recrtId,
    recrtTypeCd: props.recrtTypeCd,
    userStsCd: "REC_USER_STS01",
  };
  vm.$confirm("추가 하시겠습니까?", "확인", (isConfirm: Boolean) => {
    if (isConfirm) {
      vm.$loading.show();
      let _url = "/api/career/admin/recrtInfo/createRecrtApplyUser";
      vm.$axios
        .post(_url, JSON.stringify(param))
        .then((res: AxiosResponse) => {
          let code = res.data.code;
          if (code === "200") {
            vm.$alert("추가 되었습니다", "알림", () => {
              selectedItems.value = [];
              fnGetUserList();
              emits("update:completeAddUser");
            });
          }
        })
        .catch((e: any) => {
          console.error(e);
          vm.$alert("추가처리에 실패했습니다.<br />새로고침 후 증상이 반복되면 관리자에게 문의해주세요.", "알림");
        })
        .finally(() => {
          vm.$loading.hide();
        });
    }
  });
};
const onClickSearchReset = () => {
  searchInfo.value.korNm = "";
  searchInfo.value.userId = "";
};
const fnGetUserList = () => {
  loading.value = true;
  selectedItems.value = [];
  const searchParam = {
    ...searchInfo.value,
    ...vm.$serial(serverOptions.value),
  };
  vm.$axios
    .get("/api/career/admin/recrtInfo/getRecrtUserList", { params: searchParam })
    .then((res: AxiosResponse) => {
      list.value = res.data.data;
      const dataTable = dataTableRef.value;
      dataTable.updateRowsPerPageActiveOption(serverOptions.value.rowsPerPage);
      serverOptions.value.totalCount = res.data.data.length > 0 ? res.data.data[0].totalCount : 0;
    })
    .catch((e: Error) => {
      console.error(e);
    })
    .finally(() => {
      loading.value = false;
    });
};

watch(
  serverOptions,
  () => {
    fnGetUserList();
  },

  { deep: true },
);
</script>
