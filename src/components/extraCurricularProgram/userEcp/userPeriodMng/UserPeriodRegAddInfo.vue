<template>
  <BaseCard title="추가정보">
    <v-row>
      <v-col cols="12">
        <v-table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">
                난이도
                <v-avatar class="mr-1 bg-primary" size="18">
                  <v-icon style="font-size: 12px">mdi-exclamation-thick</v-icon>
                  <!-- TODO SB 툴팁 내용 누락 -->
                  <v-tooltip>난이도 툴팁입니다.</v-tooltip>
                </v-avatar>
              </th>
              <td>
                <div class="d-flex align-center" style="width: 400px">
                  <v-autocomplete :items="selectOption1.year" placeholder="선택" class="mr-2"></v-autocomplete>
                  <span class="mr-2">난이도 배점</span>
                  <v-text-field disabled></v-text-field>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">참여시간</th>
              <td class="d-flex">
                <div class="d-flex align-center mr-2" style="width: 160px">
                  <v-text-field disabled class="mr-2"></v-text-field> 시간
                </div>
                <v-checkbox
                  disabled
                  v-model="attendTime"
                  value="attendTime1"
                  class="flex-0-0 mx-2 pr-2"
                  label="4시간 이하"
                />
                <v-checkbox
                  disabled
                  v-model="attendTime"
                  value="attendTime2"
                  class="flex-0-0 mx-2 pr-2"
                  label="4시간 초과 ~ 8시간 이하"
                />
                <v-checkbox
                  disabled
                  v-model="attendTime"
                  value="attendTime3"
                  class="flex-0-0 mx-2 pr-2"
                  label="8시간 초과 ~ 16시간 이하"
                />
                <v-checkbox
                  disabled
                  v-model="attendTime"
                  value="attendTime4"
                  class="flex-0-0 mx-2 pr-2"
                  label="16시간 초과 ~ 24시간 이하"
                />
                <v-checkbox
                  disabled
                  v-model="attendTime"
                  value="attendTime5"
                  class="flex-0-0 mx-2 pr-2"
                  label="24시간 이상"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">역량</th>
              <td>
                <v-row class="ma-0">
                  <v-col v-for="(ability, idx) in abilityInfo" :key="idx" cols="4">
                    <div class="d-flex flex-column">
                      <v-checkbox v-model="ability.useYn" :label="ability.text" />
                      <div class="d-inline-flex align-center ml-3" style="width: 120px">
                        <v-text-field
                          append-inner-icon="mdi-percent"
                          v-model="ability.percent"
                          :disabled="ability.useYn != true"
                        ></v-text-field>
                      </div>
                      <div class="d-flex align-center mt-1 ml-3" style="width: 120px">
                        <v-text-field
                          append-inner-icon="mdi-alpha-m"
                          v-model="ability.mileage"
                          :disabled="ability.useYn != true"
                        ></v-text-field>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">AI 추천 설정</th>
              <td>
                <v-row class="mt-1">
                  <v-col cols="12" md="2" class="pb-0">
                    <v-checkbox class="d-inline-flex mr-2" label="성적등락" />
                  </v-col>
                  <v-col cols="12" md="5" class="pb-0">
                    <v-text-field placeholder=""></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" class="pb-0">
                    <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2" class="pb-0">
                    <p class="mt-2 ml-2 text-error">* 참고: 소수점 2자리 입력</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="2" class="pb-0">
                    <v-checkbox class="d-inline-flex mr-2" label="결석 횟수" />
                  </v-col>
                  <v-col cols="12" md="5" class="pb-0">
                    <v-text-field placeholder=""></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" class="pb-0">
                    <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2" class="pb-0">
                    <p class="mt-2 ml-2 text-error">* 참고: 정수 입력</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="2" class="pb-0">
                    <v-checkbox class="d-inline-flex mr-2" label="성적경고" />
                  </v-col>
                  <v-col cols="12" md="5" class="pb-0">
                    <v-text-field placeholder=""></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" class="pb-0">
                    <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2" class="pb-0">
                    <p class="mt-2 ml-2 text-error">* 참고: 정수 입력</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="2" class="pb-0">
                    <v-checkbox class="d-inline-flex mr-2" label="학점" />
                  </v-col>
                  <v-col cols="12" md="5" class="pb-0">
                    <v-text-field placeholder=""></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" class="pb-0">
                    <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2" class="pb-0">
                    <p class="mt-2 ml-2 text-error">* 참고: 소수점 2자리 입력</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="2" class="pb-0">
                    <v-checkbox class="d-inline-flex mr-2" label="지도교수 상담" />
                  </v-col>
                  <v-col cols="12" md="5" class="pb-0">
                    <v-text-field placeholder=""></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" class="pb-0">
                    <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2" class="pb-0">
                    <p class="mt-2 ml-2 text-error">* 참고: 정수 입력</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="2" class="pb-0">
                    <v-checkbox class="d-inline-flex mr-2" label="휴학 횟수" />
                  </v-col>
                  <v-col cols="12" md="5" class="pb-0">
                    <v-text-field placeholder=""></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" class="pb-0">
                    <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2" class="pb-0">
                    <p class="mt-2 ml-2 text-error">* 참고: 정수 입력</p>
                  </v-col>
                </v-row>
                <v-row class="mb-2">
                  <v-col cols="12" md="2" class="pb-0">
                    <v-checkbox class="d-inline-flex mr-2" label="원거리" />
                  </v-col>
                  <v-col cols="12" md="3" class="pb-0">
                    <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" class="pb-0">
                    <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="1" class="pb-0 aligne-center">
                    <v-btn color="success" width="80">추가</v-btn>
                  </v-col>
                  <v-col cols="12" md="3" class="pb-0">
                    <p class="mt-2 ml-2 text-error">* 참고: 원거리 제외 지역입력, 최대 5개</p>
                  </v-col>
                </v-row>
              </td>
            </tr>
            <tr>
              <th scope="row">보고양식 첨부파일</th>
              <td>양식 첨부 파일이 들어갈 예정</td>
            </tr>
            <tr>
              <th scope="row" class="required">프로그램 목적 및 필요성</th>
              <td>
                <v-textarea :counter="2000" class="mt-3" :rules="rules"></v-textarea>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">주요 교육 내용</th>
              <td>
                <v-textarea :counter="2000" class="mt-3" :rules="rules"></v-textarea>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">기대효과</th>
              <td>
                <v-textarea :counter="2000" class="mt-3" :rules="rules"></v-textarea>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-divider />
        <div class="d-flex justify-end pt-4">
          <v-btn
            variant="tonal"
            color="error"
            width="80"
            class="mr-2"
            to="/admin/extraCurricularProgram/userEcp/userPeriodMng"
            >취소</v-btn
          >
          <v-btn variant="flat" color="success" width="80">저장</v-btn>
        </div>
      </v-col>
    </v-row>
  </BaseCard>
</template>
<script lang="ts">
export default {
  data: () => ({
    selectOption1: {
      year: ["2024", "2023", "2022"],
      value: "2024",
    },
    attendTime: [],
    abilityInfo: [
      { code: "a001", text: "역량1", useYn: false, percent: 0, mileage: 0 },
      { code: "a002", text: "역량2", useYn: false, percent: 0, mileage: 0 },
      { code: "a003", text: "역량3", useYn: false, percent: 0, mileage: 0 },
      { code: "a004", text: "역량4", useYn: false, percent: 0, mileage: 0 },
      { code: "a005", text: "역량5", useYn: false, percent: 0, mileage: 0 },
      { code: "a006", text: "역량6", useYn: false, percent: 0, mileage: 0 },
    ],
    rules: [(v: any) => v.length <= 2000 || "2000자 이하로 입력하시오."],
  }),
};
</script>
