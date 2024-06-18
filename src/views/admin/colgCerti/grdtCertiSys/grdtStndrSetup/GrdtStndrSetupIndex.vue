<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <BaseCard>
        <div class="mb-4 text-h4">합산 기준</div>
        <v-table>
          <colgroup>
            <col style="width: 13%" />
            <col style="width: 87%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">합산 점수</th>
              <td>
                <v-text-field
                  placeholder="0"
                  v-model="stnrdInfo.abilityTotalScore"
                  v-on:input="formatNumber"
                  type="text"
                  outlined
                  hide-spin-buttons
                ></v-text-field>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="my-4 text-h4">개별 역량 기준</div>
        <v-table>
          <colgroup>
            <col style="width: auto" />
            <col style="width: 20%" />
            <col style="width: auto" />
            <col style="width: 20%" />
            <col style="width: auto" />
            <col style="width: 20%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                <v-text-field
                  placeholder="0"
                  v-model="stnrdInfo.abilityScore1"
                  type="number"
                  outlined
                  hide-spin-buttons
                ></v-text-field>
              </td>
              <th scope="row">2</th>
              <td>
                <v-text-field
                  placeholder="0"
                  v-model="stnrdInfo.abilityScore2"
                  type="number"
                  outlined
                  hide-spin-buttons
                ></v-text-field>
              </td>
              <th scope="row">3</th>
              <td>
                <v-text-field
                  placeholder="0"
                  v-model="stnrdInfo.abilityScore3"
                  type="number"
                  outlined
                  hide-spin-buttons
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>
                <v-text-field
                  placeholder="0"
                  v-model="stnrdInfo.abilityScore4"
                  type="number"
                  outlined
                  hide-spin-buttons
                ></v-text-field>
              </td>
              <th scope="row">5</th>
              <td>
                <v-text-field
                  placeholder="0"
                  v-model="stnrdInfo.abilityScore5"
                  type="number"
                  outlined
                  hide-spin-buttons
                ></v-text-field>
              </td>
              <th scope="row">6</th>
              <td>
                <v-text-field
                  placeholder="0"
                  v-model="stnrdInfo.abilityScore6"
                  type="number"
                  outlined
                  hide-spin-buttons
                ></v-text-field>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-row class="mt-4">
          <v-col class="d-flex align-center">
            <v-spacer></v-spacer>
            <p class="mr-4 text-error">{{ stnrdInfo.regDate }}</p>
            <v-btn variant="flat" color="success" width="80" v-on:click="fnSaveGrdtStndrSetupInfo">저장</v-btn>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  data() {
    return {
      title: "기준 설정",
      breadcrumbs: [
        { title: "대학인증", disabled: false },
        { title: "졸업 인증제", disabled: true },
      ],
      stnrdInfo: {
        abilityTotalScore: null,
        abilityScore1: null,
        abilityScore2: null,
        abilityScore3: null,
        abilityScore4: null,
        abilityScore5: null,
        abilityScore6: null,
      },
    };
  },
  created: function () {
    const vm = this;
    vm.fnGetGrdtStndrSetupInfo();
  },
  methods: {
    fnGetGrdtStndrSetupInfo(): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        const vm = this;
        vm.$axios
          .get("/api/certification/admin/graduate/getGrdtStnrdInfo")
          .then((res) => {
            const resData = res.data;
            if (!resData.data.data) {
              vm.stnrdInfo = resData.data;
            }
            vm.loaded = true;
            resolve(); // Promise 성공
          })
          .catch((e) => {
            console.error(e);
            reject(e); // Promise 실패
          });
      });
    },
    fnSaveGrdtStndrSetupInfo(): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        const vm = this;
        const param = {
          abilityTotalScore: vm.stnrdInfo.abilityTotalScore,
          abilityScore1: vm.stnrdInfo.abilityScore1,
          abilityScore2: vm.stnrdInfo.abilityScore2,
          abilityScore3: vm.stnrdInfo.abilityScore3,
          abilityScore4: vm.stnrdInfo.abilityScore4,
          abilityScore5: vm.stnrdInfo.abilityScore5,
          abilityScore6: vm.stnrdInfo.abilityScore6,
        };

        vm.$axios
          .post("/api/certification/admin/graduate/saveGrdtStnrdInfo", JSON.stringify(param))
          .then((res) => {
            const resData = res.data;
            if (resData.data.result > 0) {
              vm.$alert("저장되었습니다.");
              resolve(); // Promise 성공
            } else {
              reject("저장되지 않았습니다."); // Promise 실패
            }
          })
          .catch((e) => {
            console.error("저장 요청 중 오류 발생:", e);
            vm.$alert("저장 요청 중 오류가 발생하였습니다.<br /> 잠시 후 다시 시도해주세요");
            reject(e); // Promise 실패
          });
      });
    },
    formatNumber() {
      // 입력 값에서 숫자와 쉼표를 제외한 문자 제거
      let sanitizedValue = this.formattedNumber.replace(/[^\d,]/g, "");

      // 쉼표를 추가
      this.formattedNumber = sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
