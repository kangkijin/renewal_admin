<template>
  <v-dialog v-model="dialog" width="60%">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">카테고리 등록</v-btn>
    </template>
    <!-- dialog inner -->
    <v-card>
      <!-- dialog title -->
      <v-card-title class="bg-primary">카테고리 등록</v-card-title>
      <v-divider></v-divider>
      <!-- dialog content -->
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-table>
              <colgroup>
                <col style="width: 20%" />
                <col style="width: 80%" />
              </colgroup>
              <tbody>
                <tr>
                  <th class="required">카테고리 코드</th>
                  <tb>
                    <v-text-field placeholder="등록 시 자동생성됩니다." disabled></v-text-field>
                  </tb>
                </tr>
                <tr>
                  <th class="required">카테고리명</th>
                  <tb>
                    <v-textarea
                      rows="1"
                      v-model="ecmTitle"
                      :counter="30"
                      :rules="rules1"
                      placeholder="카테고리명을 입력해 주세요."
                    ></v-textarea>
                  </tb>
                </tr>
                <tr>
                  <th>설명</th>
                  <tb>
                    <v-divider></v-divider>
                    <v-textarea
                      :counter="200"
                      v-model="ecmDesc"
                      :rules="rules2"
                      class="mt-3"
                      rows="2"
                      placeholder="설명을 입력해 주세요."
                    ></v-textarea>
                  </tb>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-end">
        <v-btn variant="outlined" color="error" size="default" @click="dialog = false">취소</v-btn>
        <v-btn
          variant="flat"
          color="success"
          size="default"
          :disabled="ecmTitle == null && ecmDesc.length <= 200"
          @click="fnSaveCategory()"
          >저장</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import type { AxiosResponse } from "axios";

export default {
  props: {
    dataModified: Function,
  },
  data: () => ({
    ecmTitle: null,
    ecmDesc: "",
    modifyYn: true,
    rules1: [(v: any) => v.length <= 30 || "30자 이하로 입력하시오."],
    rules2: [(v: any) => v.length <= 200 || "200자 이하로 입력하시오."],
    dialog: false,
  }),
  methods: {
    //저장
    fnSaveCategory() {
      const vm = this;
      const param = {
        ecmTitle: vm.ecmTitle,
        ecmDesc: vm.ecmDesc,
      };
      vm.$axios.post("/api/admin/ecpUser/ecpCategorys", JSON.stringify(param)).then((res: AxiosResponse) => {
        if (res.data.code == "200") {
          alert("저장되었습니다.");
          this.$emit("dataModified", true);
          vm.dialog = false;
        }
      });
    },
  },
};
</script>
