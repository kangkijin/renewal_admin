<template>
  <v-card>
    <!-- dialog title -->
    <v-card-title class="bg-primary">상담사 검색</v-card-title>
    <v-divider></v-divider>

    <!-- dialog content -->
    <v-card-text>
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <p class="text-h6 mx-2">상담사명 검색</p>
          <v-text-field
            class="mx-2"
            placeholder="상담사 명"
            v-model="cnslrNm"
            @keyup.enter="fnGetCnslrData()"
          ></v-text-field>

          <v-btn class="mx-1" width="80" @click="onClickSearchReset()">초기화</v-btn>
          <v-btn class="mx-1" variant="flat" color="primary" width="80" @click="fnGetCnslrData()">검색</v-btn>
        </v-col>
        <v-col cols="12">
          <BaseCard>
            <template v-slot:title>
              <div class="d-flex align-center">
                <div class="text-h6">상담사 검색 목록</div>
              </div>
            </template>
            <BaseTableConfig hideRowPerPage :totalCnt="cnslrList?.length"> </BaseTableConfig>
            <v-easy-table ref="dataTable" :headers="header" :items="cnslrList" :rowsPerPage="5">
              <template #item-operation="item">
                <v-btn size="small" @click="onClickSelectedCnslr(item)">선택</v-btn>
              </template>
            </v-easy-table>
          </BaseCard>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>

    <!-- dialog button -->
    <v-card-actions class="justify-end"> </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import type { Header, Item } from "vue3-easy-data-table";
import type { CnslrTypes } from "@/types/cnsTypes/CnslrTypes";
import { getCurrentInstance, onMounted, ref } from "vue";
import type { AxiosResponse } from "axios";

const instance = getCurrentInstance();
if (!instance) {
  throw new Error("getCurrentInstance returned null");
}

onMounted(() => {
  fnGetCnslrData();
});

const vm = instance.appContext.config.globalProperties;

const model = defineModel<CnslrTypes>();

const cnslrNm = ref();

const cnslrList = ref([]);

const onClickSelectedCnslr = (item: Item) => {
  const selectedCnslr = {
    cnslrId: item.cnslrId,
    cnslrInOut: item.cnslrInOut,
    cnslrNm: item.cnslrNm,
    cnslrPh: item.cnslrPh,
    cnslrEmail: item.cnslrEmail,
    cnslrDeptNm: item.cnslrDeptNm,
    cnslrActYn: "N",
    cnslrSgnfc: "",
  };

  vm.$confirm(`${item.cnslrNm}님을 상담사로 등록하시겠습니까?`, "확인", (isConfirm: boolean) => {
    if (isConfirm) {
      model.value = selectedCnslr;
      vm.$alert("상담사로 등록되었습니다.", "알림");
    }
  });
};

/** 검색 초기화 */
const onClickSearchReset = () => {
  cnslrNm.value = "";
};

/** 상담사 검색 */
const fnGetCnslrData = () => {
  const param = {
    cnslrNm: cnslrNm.value,
  };
  vm.$axios.get("/api/counsel/admin/counselorMng/getCounselorStfList", { params: param }).then((res: AxiosResponse) => {
    const success = res.status;
    if (success == 200) {
      const resData = res.data;
      cnslrList.value = resData.data;
    } else {
      console.error("오류발생");
    }
  });
};

/** 데이터테이블 관련 */
defineProps({
  list: Array<Item>,
});

const header: Header[] = [
  { text: "내외부구분", value: "cnslrInOut", sortable: true },
  { text: "이름", value: "cnslrNm", sortable: true },
  { text: "핸드폰", value: "cnslrPh", sortable: true },
  { text: "이메일", value: "cnslrEmail", sortable: true },
  { text: "선택", value: "operation" },
];
</script>
