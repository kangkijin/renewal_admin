<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

  <v-row>
    <v-col>
      <BaseCard :title="'실시계획수립'">
        <v-row>
          <v-col class="mt-5">
            <v-row>
              <v-col cols="12">
                <v-table>
                  <colgroup>
                    <col style="width: 25%" />
                    <col style="width: auto" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row" class="required">실시계획명</th>
                      <td>
                        <div class="d-flex align-center">
                          <v-text-field placeholder="실시계획명을 입력해주세요." v-model="diagPlanNm" />
                          <span class="mx-1" :class="diagPlanNm.length > maxLength ? 'text-error' : ''">
                            {{ diagPlanNm.length }}
                          </span>
                          /<span class="text-deepgray ml-1">{{ maxLength }}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">실시시간</th>
                      <td>
                        <div class="d-flex mt-2 justify-start align-center">
                          <VDateInput />
                          <VTimeInput v-model="selectTime.strTime"></VTimeInput>
                          <span class="mx-1">~</span>
                          <VDateInput />
                          <VTimeInput v-model="selectTime.endTime"></VTimeInput>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">실시대상</th>
                      <td>
                        <div class="d-flex">
                          <v-checkbox class="flex-0-0 mr-4" value="all" label="교수 전체"></v-checkbox>
                          <v-checkbox class="flex-0-0 mr-4" value="1" label="정교수"></v-checkbox>
                          <v-checkbox class="flex-0-0 mr-4" value="2" label="부교수"></v-checkbox>
                          <v-checkbox class="flex-0-0 mr-4" value="3" label="조교수"></v-checkbox>
                          <v-checkbox class="flex-0-0 mr-4" value="4" label="기타"></v-checkbox>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">사용여부</th>
                      <td>
                        <v-radio-group inline>
                          <v-radio label="사용" value="Y"></v-radio>
                          <v-radio label="미사용" value="N"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">진단지 선택</th>
                      <td>
                        <v-autocomplete :items="diagList.diagPaperNm" placeholder="진단지를 선택해주세요.">
                        </v-autocomplete>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex">
            <v-spacer></v-spacer>
            <v-btn class="mr-2" @click="onClickCancel()">취소</v-btn>
            <v-btn class="bg-info" @click="onClickSave()">저장</v-btn>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
export default {
  data: () => ({
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "교수역량진단", disabled: true },
    ],
    selectTime: {
      strTime: "00:00",
      endTime: "00:00",
    },
    selected: "",
    diagList: {
      diagPaperNm: ["교수역량진단 2024", "교수역량진단 2023", "교수역량진단 2022"],
    },

    diagPlanNm: "",
    maxLength: 30,

    diagCode: history.state.diagCode ?? "",
    viewType: history.state.viewType ?? "",
  }),
  computed: {
    title() {
      const vm = this;
      return `실시계획${vm.viewType === "REG" ? "등록" : "수정"}`;
    },
  },
  methods: {
    /** 취소 버튼 클릭 시 */
    onClickCancel() {
      const vm = this;
      vm.$confirm("취소하시겠습니까?", "", (isConfirm: boolean) => {
        if (isConfirm) {
          vm.$router.push("/admin/diagRschExam/profAbilityDiag/profDiagPlan");
        } else {
          this.$toast("실패되었습니다.", "error");
        }
      });
    },
    /** 저장 버튼 클릭 시 */
    onClickSave() {
      const vm = this;
      vm.$alert("저장되었습니다.", "", () => {
        vm.$router.push("/admin/diagRschExam/profAbilityDiag/profDiagPlan");
      });
    },
  },
};
</script>
