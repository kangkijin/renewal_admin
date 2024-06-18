<template>
  <v-card>
    <!-- dialog title -->
    <v-card-title class="bg-primary d-flex align-center">
      지원사유/이력서 등록
      <v-spacer></v-spacer>
      <v-btn icon="mdi-window-close" variant="tonal" :size="'x-small'" @click="model = false"></v-btn>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-table>
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 85%" />
            </colgroup>
            <tbody>
              <tr>
                <th>이력서 첨부파일</th>
                <td>
                  <v-file-input hide-details></v-file-input>
                  <p class="text-error mt-1 mb-2">
                    * 파일갯수최대1개,개당20MB이하문서파일hwp,doc,ppt,pdf등록가능합니다.
                  </p>
                </td>
              </tr>
              <tr>
                <th>지원사유</th>
                <td>
                  <v-text-field
                    class="mt-2"
                    v-model="userParam.recrtMemo"
                    :rules="rule1"
                    :hide-details="false"
                    :counter="100"
                  ></v-text-field>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-end">
      <v-btn variant="outlined" color="error" size="default" @click="model = false">취소</v-btn>
      <v-btn variant="flat" color="success" size="default" @click="onClickSave()">저장</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import type { AxiosResponse } from "axios";

const instance = getCurrentInstance();
if (!instance) {
  throw new Error("getCurrentInstance returned null");
}
const vm = instance.appContext.config.globalProperties;
onMounted(() => {
  getRecrtApplyUserDetail();
});

const model = defineModel({ type: Boolean, required: true });

const props = defineProps<{
  recrtId: string;
  userId: string;
}>();

const rule1 = ref([(v: any) => v.length <= 100 || "100자 이상 제한합니다."]);

const userParam = ref({
  recrtId: props.recrtId,
  userId: props.userId,
  recrtMemo: "",
});

const getRecrtApplyUserDetail = () => {
  vm.$loading.show();
  const searchParam = {
    ...userParam.value,
  };
  vm.$axios
    .get("/api/career/admin/recrtInfo/getRecrtApplyUserDetail", { params: searchParam })
    .then((res: AxiosResponse) => {
      userParam.value.recrtMemo = res.data.data.recrtMemo;
    })
    .catch((e: Error) => {
      console.error(e);
    })
    .finally(() => {
      vm.$loading.hide();
    });
};
const onClickSave = () => {
  if (userParam.value.recrtMemo === "") {
    vm.$alert("지원사유를 입력해주세요.");
    return false;
  }
  let param = {
    ...userParam.value,
  };
  vm.$confirm("저장 하시겠습니까?", "확인", (isConfirm: Boolean) => {
    if (isConfirm) {
      vm.$loading.show();
      let _url = "/api/career/admin/recrtInfo/createRecrtApplyUserInfo";
      vm.$axios
        .post(_url, JSON.stringify(param))
        .then((res: AxiosResponse) => {
          let code = res.data.code;
          if (code === "200") {
            vm.$alert("추가 되었습니다", "알림", () => {
              model.value = false;
            });
          }
        })
        .catch((e: any) => {
          console.error(e);
          vm.$alert("저장처리에 실패했습니다.<br />새로고침 후 증상이 반복되면 관리자에게 문의해주세요.", "알림");
        })
        .finally(() => {
          vm.$loading.hide();
        });
    }
  });
};
</script>
