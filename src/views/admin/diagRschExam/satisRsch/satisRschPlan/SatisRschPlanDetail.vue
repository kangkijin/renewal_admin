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
                          <v-text-field
                            placeholder="실시계획명을 입력해주세요."
                            :rules="[(v) => v.length <= 30]"
                            v-model="actPlanMng.diagPlanNm"
                          />
                          <span class="mx-1" :class="actPlanMng.diagPlanNm.length > maxLength ? 'text-error' : ''">
                            {{ actPlanMng.diagPlanNm.length }}
                          </span>
                          /<span class="text-deepgray ml-1">{{ maxLength }}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">경로설정{{ diagSelected }}</th>
                      <td>
                        <v-radio-group inline>
                          <div class="pr-2" v-for="diagPath in diagPathCase1Item" :key="diagPath.value">
                            <v-radio :label="diagPath.title" :value="diagPath.value" v-model="diagSelected"></v-radio>
                          </div>
                        </v-radio-group>
                        <div class="d-flex align-center">
                          <v-radio-group inline>
                            <div class="pr-2" v-for="(diagPath, idx) in diagPathCase2Item" :key="idx">
                              <v-radio :label="diagPath.title" :value="diagPath.value"></v-radio>
                            </div>
                            <v-text-field class="pl-2" placeholder="과정을 선택해주세요."></v-text-field>
                          </v-radio-group>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row" class="required">사용여부</th>
                      <td>
                        <v-radio-group v-model="actPlanMng.useYn" inline>
                          <v-radio label="미사용" value="N"></v-radio>
                          <v-radio label="사용" value="Y"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        조사지 선택
                        <span class="required"></span>
                        <div class="text-error" style="font-size: 10px">
                          *조사지를 복수 등록 시, 1개의 조사가 끝나고 추가조사지가 이어집니다. 등록한 순서에 따라
                          이어지므로, 등록순서에 유의하여주십시오.
                        </div>
                      </th>
                      <td>
                        <v-row>
                          <v-col class="d-flex align-center">
                            <v-autocomplete
                              :items="actPlanMng.diagList.diagPaperNm"
                              placeholder="조사지를 선택해주세요."
                            >
                            </v-autocomplete>
                            <v-btn icon="mdi-plus-box-outline" variant="flat" color="transparent"></v-btn>
                            <v-btn
                              icon="mdi-minus-box-outline"
                              variant="flat"
                              class="filter_red"
                              color="transparent"
                            ></v-btn>
                          </v-col>
                        </v-row>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">대상자설정</th>
                      <td>
                        <v-radio-group inline>
                          <div class="pr-2" v-for="(diagTarget, idx) in diagTargetItem" :key="idx">
                            <v-radio
                              v-model="actPlanMng.actTarget"
                              :label="diagTarget.title"
                              :value="diagTarget.value"
                            ></v-radio>
                          </div>
                        </v-radio-group>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="d-flex">
      <v-spacer></v-spacer>
      <v-btn class="mr-2" @click="onClickCancel()">취소</v-btn>
      <v-btn class="bg-info" @click="onClickSave()">{{ viewType === "REG" ? "저장" : "수정" }}</v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts">
export default {
  data: () => ({
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "만족도 조사", disabled: true },
    ],

    //실시계획
    actPlanMng: {
      diagPlanNm: "", //실시계획명
      strDate: "", //실시기간(시작날짜)
      strTime: null, //실시시작시간
      endDate: "", //실시기간(종료날짜)
      endTime: null, //실시종료시간
      diagList: {
        diagPaperNm: ["핵심역량진단 2024", "핵심역량진단 2023", "핵심역량진단 2022"],
      },
      actTarget: {}, //실시대상
      useYn: "N",
    },

    selected: [] as string[],

    //경로 설정 item step1, step2
    diagPathCase1Item: [
      { title: "비교과", value: "path001", type: "step1" },
      { title: "비교과 사전사후진단", value: "path002", type: "step1" },
      { title: "상담", value: "path003", type: "step1" },
    ],
    diagPathCase2Item: [
      { title: "비교과공통", value: "path004", type: "step2" },
      { title: "과정 개별", value: "path005", type: "step2" },
      { title: "상담공통", value: "path006", type: "step3" },
      { title: "상담 개별", value: "path007", type: "step3" },
    ],
    //대상자 item
    diagTargetItem: [
      { title: "학생", value: "std" },
      { title: "교원", value: "prof" },
      { title: "직원", value: "staf" },
      { title: "외부인", value: "out" },
    ],

    diagSelected: "",

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
          vm.$router.push("/admin/diagRschExam/satisRsch/satisRschPlan");
        } else {
          this.$toast("실패되었습니다.", "error");
        }
      });
    },
    /** 저장 버튼 클릭 시 */
    onClickSave() {
      const vm = this;

      vm.$confirm("실시계획을 등록하시겠습니까?", "", (isConfirm: boolean) => {
        if (isConfirm) {
          vm.$alert("저장되었습니다.");
          vm.$router.push("/admin/diagRschExam/satisRsch/satisRschPlan");
        } else {
          vm.$alert("실패되었습니다.");
        }
      });
    },
  },
};
</script>
