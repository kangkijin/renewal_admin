<template>
  <v-dialog v-model="dialog1" width="60%">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props"> 수정 </v-btn>
    </template>
    <!-- dialog inner -->
    <v-card>
      <!-- dialog title -->
      <v-card-title class="bg-primary">카테고리 수정</v-card-title>
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
                  <th>카테고리 코드</th>
                  <tb>
                    <v-text-field :disabled="true">{{ this.tableItem.ecmCode }}</v-text-field>
                  </tb>
                </tr>
                <tr>
                  <th>카테고리명</th>
                  <tb>
                    <v-text-field :disabled="true">{{ this.tableItem.ecmTitle }}</v-text-field>
                  </tb>
                </tr>
                <tr>
                  <th>카테고리명 수정</th>
                  <tb>
                    <v-textarea
                      rows="1"
                      :rule="rules1"
                      :counter="30"
                      v-model="regEcmTitle"
                      placeholder="카테고리명을 입력해 주세요."
                    ></v-textarea>
                  </tb>
                </tr>
                <tr>
                  <th>설명</th>
                  <tb>
                    <v-divider></v-divider>
                    <v-textarea :counter="200" :rules="rules2" class="mt-3" v-model="regEcmDesc"></v-textarea>
                  </tb>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-end">
        <v-btn variant="outlined" color="error" size="default" @click="dialog1 = false">취소</v-btn>
        <v-btn
          variant="flat"
          color="success"
          size="default"
          :disabled="regEcmTitle == null && regEcmDesc.length <= 200"
          @click="fnUpdateCategory()"
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
    tableItem: { type: Object, required: true },
  },
  data: (props) => ({
    regEcmTitle: props.tableItem.ecmTitle,
    regEcmDesc: props.tableItem.ecmDesc,
    modifyYn: true,
    rules1: [(v: any) => v.length <= 30 || "30자 이하로 입력하시오."],
    rules2: [(v: any) => v.length <= 200 || "200자 이하로 입력하시오."],
    dialog1: false,
  }),
  methods: {
    //수정 내용 저장
    fnUpdateCategory() {
      const vm = this;
      const param = {
        ecmTitle: vm.regEcmTitle,
        ecmDesc: vm.regEcmDesc,
        ecmId: vm.tableItem.ecmId,
      };
      vm.$axios.post("/api/admin/ecpUser/ecpUpdateCategorys", JSON.stringify(param)).then((res: AxiosResponse) => {
        if (res.data.code == "200") {
          alert("저장되었습니다.");
          this.$emit("dataModified", true);
          vm.dialog1 = false;
        }
      });
    },
  },
};
</script>
