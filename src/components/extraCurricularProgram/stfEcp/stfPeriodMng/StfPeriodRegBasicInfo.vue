<template>
  <BaseCard title="기본정보">
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
                <v-autocomplete :items="selectOption1.year" placeholder="선택" disabled></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">과정</th>
              <td>
                <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">차수명</th>
              <td>
                <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">담당부서/학과</th>
              <td>
                <v-autocomplete
                  prepend-inner-icon="mdi-magnify"
                  :items="selectOption1.category"
                  placeholder="담당부서/학과를 입력해 주세요."
                  :disabled="true"
                ></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">담당자</th>
              <td>
                <v-text-field placeholder="담당자를 선택해주세요" readonly></v-text-field>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">담당자 연락처</th>
              <td>
                <div class="d-flex align-center" style="width: 300px">
                  <v-text-field placeholder="000" disabled></v-text-field>
                  <span class="mx-1">-</span>
                  <v-text-field placeholder="0000" disabled></v-text-field>
                  <span class="mx-1">-</span>
                  <v-text-field placeholder="0000" disabled></v-text-field>
                </div>
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
              <th scope="row" class="required">운영학년도</th>
              <td>
                <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">운영학기</th>
              <td>
                <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">신청기간</th>
              <td>
                <div class="d-flex mt-2 justify-start align-center">
                  <VDateInput />
                  <VTimeInput v-model="selectTime.applyStrTime"></VTimeInput>
                  <span class="mx-1">~</span>
                  <VDateInput />
                  <VTimeInput v-model="selectTime.applyEndTime"></VTimeInput>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">운영기간</th>
              <td>
                <div class="d-flex mt-2 justify-start align-center">
                  <VDateInput />
                  <VTimeInput v-model="selectTime.oprtStrTime"></VTimeInput>
                  <span class="mx-1">~</span>
                  <VDateInput />
                  <VTimeInput v-model="selectTime.oprtEndTime"></VTimeInput>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">신청/대기 인원</th>
              <td>
                <div class="d-flex">
                  <div class="d-flex align-center mr-4" style="width: 150px">
                    <v-text-field class="mr-2"></v-text-field> 명
                  </div>
                  <v-checkbox v-model="checkWait" class="flex-0-0 mr-4" label="대기 선택" />
                  <div class="d-flex align-center mr-4" style="width: 100px">
                    <v-text-field class="mr-2" :disabled="checkWait != true"></v-text-field> 명
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">프로그램 소개 및 유의사항</th>
              <td>
                <ckeditor
                  :editor="editor"
                  v-model="editorData"
                  :config="editorConfig"
                  style="min-height: 200px"
                ></ckeditor>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">썸네일 이미지</th>
              <td>
                <v-file-input chips counter :show-size="1000"></v-file-input>
                <p class="text-error mt-1">* 사이즈 140*140pixel / 파일갯수 1 개/JPG,PNG 파일만 등록가능합니다.</p>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">신청서양식 첨부파일</th>
              <td>
                <v-file-input chips counter :show-size="1000"></v-file-input>
                <p class="text-error mt-1">
                  * 파일갯수 최대1개,개당 20MB이하 문서파일 hwp,doc,ppt,pdf만 등록 가능합니다.
                </p>
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
                <template v-if="satisYn === 'Y'">
                  <div class="d-flex mt-2 justify-start align-center">
                    <v-checkbox v-model="satisDayYn" class="flex-0-0 mr-4" label="기간설정" />
                    <VDateInput :disabled="satisDayYn != true" />
                    <VTimeInput v-model="selectTime.satisRschStrTime" :disabled="satisDayYn != true"></VTimeInput>
                    <span class="mx-1">~</span>
                    <VDateInput :disabled="satisDayYn != true" />
                    <VTimeInput v-model="selectTime.satisRschEndTime" :disabled="satisDayYn != true"></VTimeInput>
                  </div>
                  <p class="mt-1 text-error">* 기간 설정 미사용 시 운영 종료 후 진행됩니다.</p>
                </template>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">사전조사</th>
              <td>
                <v-radio-group inline v-model="satisYn">
                  <v-radio label="사용" class="mr-4" color="primary" value="Y"></v-radio>
                  <v-radio label="미사용" class="mr-4" color="primary" value="N"></v-radio>
                </v-radio-group>
                <template v-if="satisYn === 'Y'">
                  <div class="d-flex mt-2 justify-start align-center">
                    <v-checkbox v-model="satisDayYn" class="flex-0-0 mr-4" label="기간설정" />
                    <VDateInput :disabled="satisDayYn != true" />
                    <VTimeInput v-model="selectTime.preRschStrTime" :disabled="satisDayYn != true"></VTimeInput>
                    <span class="mx-1">~</span>
                    <VDateInput :disabled="satisDayYn != true" />
                    <VTimeInput v-model="selectTime.preRschEndTime" :disabled="satisDayYn != true"></VTimeInput>
                  </div>
                  <p class="mt-1 text-error">* 기간 설정 미사용 시 운영 종료 후 진행됩니다.</p>
                </template>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">사후조사</th>
              <td>
                <v-radio-group inline v-model="satisYn">
                  <v-radio label="사용" class="mr-4" color="primary" value="Y"></v-radio>
                  <v-radio label="미사용" class="mr-4" color="primary" value="N"></v-radio>
                </v-radio-group>
                <template v-if="satisYn === 'Y'">
                  <div class="d-flex mt-2 justify-start align-center">
                    <v-checkbox v-model="satisDayYn" class="flex-0-0 mr-4" label="기간설정" />
                    <VDateInput :disabled="satisDayYn != true" />
                    <VTimeInput v-model="selectTime.afterRschStrTime" :disabled="satisDayYn != true"></VTimeInput>
                    <span class="mx-1">~</span>
                    <VDateInput :disabled="satisDayYn != true" />
                    <VTimeInput v-model="selectTime.afterRschEndTime" :disabled="satisDayYn != true"></VTimeInput>
                  </div>
                  <p class="mt-1 text-error">* 기간 설정 미사용 시 운영 종료 후 진행됩니다.</p>
                </template>
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
            to="/admin/extraCurricularProgram/stfEcp/stfPeriodMng"
            >취소</v-btn
          >
          <v-btn variant="flat" color="success" width="80">저장</v-btn>
        </div>
      </v-col>
    </v-row>
  </BaseCard>
</template>

<script lang="ts">
/** ck에디터 */
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  data: () => ({
    /** select */
    selectOption1: {
      year: ["2024", "2023", "2022"],
      value: "2024",
      category: ["선택1", "선택2", "선택3"],
    },

    checkWait: false,
    /** ck에디터 */
    editor: ClassicEditor,
    editorData: "",
    editorConfig: {
      placeholder: "프로그램 소개 및 유의사항을 입력해주세요",
    },
    /** 기간 설정 */
    satisYn: "N",
    satisDayYn: false,
    selectTime: {
      satisRschStrTime: "00:00",
      satisRschEndTime: "00:00",
      applyStrTime: "00:00",
      applyEndTime: "00:00",
      oprtStrTime: "00:00",
      oprtEndTime: "00:00",
      preRschStrTime: "00:00",
      preRschEndTime: "00:00",
      afterRschStrTime: "00:00",
      afterRschEndTime: "00:00",
    },
  }),
};
</script>
