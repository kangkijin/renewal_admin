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
                          <v-text-field placeholder="실시계획명을 입력해주세요." v-model="actPlanMng.diagPlanNm" />
                          <span class="mx-1" :class="actPlanMng.diagPlanNm.length > maxLength ? 'text-error' : ''">
                            {{ actPlanMng.diagPlanNm.length }}
                          </span>
                          /<span class="text-deepgray ml-1">{{ maxLength }}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">실시기간</th>
                      <td>
                        <div class="d-flex mt-2 justify-start align-center">
                          <VDateInput v-model="actPlanMng.strDate" />
                          <VTimeInput v-model="actPlanMng.strTime" />
                          <span class="mx-1">~</span>
                          <VDateInput v-model="actPlanMng.endDate" />
                          <VTimeInput v-model="actPlanMng.endTime" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">실시대상</th>
                      <td>
                        <div class="d-flex">
                          <v-checkbox
                            class="flex-0-0 mr-4"
                            v-model="actPlanMng.actTargetAll"
                            @change="onClickCoreAll(actPlanMng.actTargetAll)"
                            label="재학생 전체"
                          ></v-checkbox>
                          <v-checkbox
                            class="flex-0-0 mr-4"
                            value="1"
                            v-model="actPlanMng.majorTarget"
                            label="1학년"
                          ></v-checkbox>
                          <v-checkbox
                            class="flex-0-0 mr-4"
                            value="2"
                            v-model="actPlanMng.majorTarget"
                            label="2학년"
                          ></v-checkbox>
                          <v-checkbox
                            class="flex-0-0 mr-4"
                            value="3"
                            v-model="actPlanMng.majorTarget"
                            label="3학년"
                          ></v-checkbox>
                          <v-checkbox
                            class="flex-0-0 mr-4"
                            value="4"
                            v-model="actPlanMng.majorTarget"
                            label="4학년"
                          ></v-checkbox>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">사용여부</th>
                      <td>
                        <v-radio-group v-model="actPlanMng.useYn" inline>
                          <v-radio label="사용" value="Y"></v-radio>
                          <v-radio label="미사용" value="N"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <!-- TODO SB 확인 필요 (기능개발 hidden처리)  -->
                    <tr hidden>
                      <th scope="row" class="required">외국인학생포함</th>
                      <td>
                        <v-radio-group v-model="actPlanMng.frgnYn" inline>
                          <v-radio label="미포함" value="N"></v-radio>
                          <v-radio label="포함" value="Y"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">진단지 선택</th>
                      <td>
                        <v-autocomplete
                          v-model="selected"
                          :items="actPlanMng.diagList.diagPaperNm"
                          placeholder="진단지를 선택해주세요."
                        >
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
      { title: "전공능력진단", disabled: true },
    ],
    actPlanMng: {
      diagPlanNm: "",
      strDate: "",
      strTime: null,
      endDate: "",
      endTime: null,
      actTargetAll: false,
      majorTarget: [""],
      diagList: {
        diagPaperNm: ["핵심역량진단 2024", "핵심역량진단 2023", "핵심역량진단 2022"],
      },
      useYn: "Y",
      frgnYn: "N",
    },

    selected: "",

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
          vm.$router.push("/admin/diagRschExam/majorAbilityDiag/majorDiagPlan");
        } else {
          this.$toast("실패되었습니다.", "error");
        }
      });
    },
    /** 저장 버튼 클릭 시 */
    onClickSave() {
      const vm = this;
      vm.$alert("저장되었습니다.", "", () => {
        vm.$router.push("/admin/diagRschExam/majorAbilityDiag/majorDiagPlan");
      });
    },
  },
};
</script>
