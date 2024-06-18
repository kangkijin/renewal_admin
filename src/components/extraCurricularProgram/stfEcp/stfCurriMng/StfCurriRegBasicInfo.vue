<template>
  <BaseCard title="과정 등록">
    <v-row>
      <v-col cols="12">
        <v-table>
          <colgroup>
            <col style="width: 25%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">카테고리</th>
              <td>
                <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">과정명</th>
              <td>
                <v-text-field placeholder="과정명을 입력해주세요."></v-text-field>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">사용여부</th>
              <td>
                <v-radio-group inline>
                  <v-radio label="사용" class="mr-4" value="Y"></v-radio>
                  <v-radio label="미사용" class="mr-4" value="N"></v-radio>
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">담당부서/학과</th>
              <td>
                <v-autocomplete
                  prepend-inner-icon="mdi-magnify"
                  :items="selectOption1.category"
                  placeholder="담당부서/학과를 입력해 주세요."
                ></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">
                부서/학과변경이력
                <v-avatar class="mr-1 bg-primary" size="18">
                  <v-icon style="font-size: 12px">mdi-exclamation-thick</v-icon>
                  <v-tooltip>부서/학과변경이력 툴팁입니다</v-tooltip>
                </v-avatar>
              </th>
              <td>
                <v-text-field value="과정등록 이후 제공됩니다." disabled></v-text-field>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">참여유형</th>
              <td>
                <v-radio-group inline>
                  <v-radio label="개인" class="mr-4" value="Y"></v-radio>
                  <v-radio label="팀" class="mr-4" value="N"></v-radio>
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">이수증 명의</th>
              <td>
                <v-text-field placeholder="이수증 발급 명의를 입력해주세요."></v-text-field>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">이수증 직인 파일</th>
              <td>
                <v-file-input chips counter :show-size="1000">></v-file-input>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">운영시작년도</th>
              <td>
                <v-autocomplete
                  prepend-inner-icon="mdi-magnify"
                  :items="selectOption1.category"
                  placeholder="선택"
                ></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th scope="row" class="">과정 개설 사유 및 설명</th>
              <td>
                <!-- :rules="textRules" -->
                <v-textarea
                  counter
                  :rules="rules"
                  :model-value="textValue"
                  persistent-counter
                  placeholder="사유 및 설명을 입력해주세요."
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">신청서 제출</th>
              <td>
                <v-radio-group inline>
                  <v-radio label="사용" class="mr-4" value="Y"></v-radio>
                  <v-radio label="미사용" class="mr-4" value="N"></v-radio>
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">이수증</th>
              <td>
                <v-radio-group inline>
                  <v-radio label="사용" class="mr-4" value="Y"></v-radio>
                  <v-radio label="미사용" class="mr-4" value="N"></v-radio>
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">만족도조사</th>
              <td>
                <v-radio-group inline v-model="satisYn">
                  <v-radio label="사용" class="mr-4" color="primary" value="Y"></v-radio>
                  <v-radio label="미사용" class="mr-4" color="primary" value="N"></v-radio>
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">사전조사</th>
              <td>
                <v-radio-group inline v-model="satisYn">
                  <v-radio label="사용" class="mr-4" color="primary" value="Y"></v-radio>
                  <v-radio label="미사용" class="mr-4" color="primary" value="N"></v-radio>
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">사후조사</th>
              <td>
                <v-radio-group inline v-model="satisYn">
                  <v-radio label="사용" class="mr-4" color="primary" value="Y"></v-radio>
                  <v-radio label="미사용" class="mr-4" color="primary" value="N"></v-radio>
                </v-radio-group>
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
            to="/admin/extraCurricularProgram/stfEcp/stfCurriMng"
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
    rules: [(v: any) => v.length <= 2000 || "2000자 이상 제한합니다."],
    programList: "",
    textValue: null,
    selectOption1: {
      year: ["2024", "2023", "2022"],
      value: "2024",
      category: ["선택1", "선택2", "선택3"],
    },
    /** 기간 설정 */
    satisYn: "N",
    satisDayYn: false,
  }),
};
</script>
