<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-tabs v-model="tab" color="primary" align-tabs="center">
        <v-tab value="one">가운데 탭1</v-tab>
        <v-tab value="two">가운데 탭2 color="primary" align-tabs="center" disabled 추가</v-tab>
      </v-tabs>
      <v-card-text class="bg-grey100 mt-4 rounded-md">
        <v-window v-model="tab">
          <v-window-item value="one">
            <BaseCard title="결과1">
              <v-row>
                <v-col cols="12">
                  <v-table>
                    <colgroup>
                      <col style="width: 25%" />
                      <col style="width: auto" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row" class="required">Select</th>
                        <td>
                          <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="required">Add, Delete</th>
                        <td>
                          <div v-for="(program, idx) in programList" :key="idx" class="d-flex align-center">
                            <v-text-field
                              placeholder="과정명을 입력해 주세요."
                              class="mr-2"
                              v-model="program.text"
                            ></v-text-field>
                            <v-btn
                              v-if="idx === 0"
                              icon="mdi-plus-box-outline"
                              variant="flat"
                              color="transparent"
                              @click="onClickAddRow()"
                            ></v-btn>
                            <v-btn
                              v-else
                              icon="mdi-minus-box-outline"
                              variant="flat"
                              class="filter_red"
                              color="transparent"
                              @click="onClickDelRow(idx)"
                            ></v-btn>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="required">연락처</th>
                        <td>
                          <div class="d-flex align-center" style="width: 300px">
                            <!-- 숫자 4개 이상시 error -->
                            <v-text-field type="number" hideSpinButtons :rules="counterRule"></v-text-field>
                            <span class="mx-1">-</span>
                            <v-text-field type="number" hideSpinButtons :rules="counterRule"></v-text-field>
                            <span class="mx-1">-</span>
                            <v-text-field type="number" hideSpinButtons :rules="counterRule"></v-text-field>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="required">Y / N</th>
                        <td>
                          <v-radio-group inline>
                            <v-radio label="사용" class="mr-4" value="Y"></v-radio>
                            <v-radio label="미사용" class="mr-4" value="N"></v-radio>
                          </v-radio-group>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="required">Auto complete</th>
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
                          tooltip &amp; disabled
                          <v-avatar class="mr-1 bg-primary" size="18">
                            <v-icon style="font-size: 12px">mdi-exclamation-thick</v-icon>
                            <v-tooltip>Tooltip</v-tooltip>
                          </v-avatar>
                        </th>
                        <td>
                          <v-text-field value="과정등록 이후 제공됩니다." disabled></v-text-field>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="required">첨부파일, 썸네일</th>
                        <!-- 파일업로드 관련 작업은 박민규 부장님께서 추후 작업 예정 -->
                        <td>
                          <v-file-input hide-details></v-file-input>
                          <p class="text-error mt-1">
                            * 파일갯수최대1개,개당20MB이하문서파일hwp,doc,ppt,pdf등록가능합니다.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">첨부파일 용량</th>
                        <td>
                          <v-file-input chips counter :show-size="1000"></v-file-input>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="">textarea, editor</th>
                        <td>
                          <!-- :rules="textRules" -->
                          <v-textarea
                            counter
                            :rules="rules"
                            :model-value="textValue"
                            persistent-counter
                            placeholder="예시"
                          />

                          <ckeditor
                            :editor="editor"
                            v-model="editorData"
                            :config="editorConfig"
                            style="min-height: 200px"
                          ></ckeditor>
                          <!-- ★ 표출되는 곳에 ck-content 클래스로 감싸기 -->
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="required">기간선택 Datepick</th>
                        <td>
                          <v-radio-group inline v-model="satisYn">
                            <v-radio label="사용" class="mr-4" color="primary" value="Y"></v-radio>
                            <v-radio label="미사용" class="mr-4" color="primary" value="N"></v-radio>
                          </v-radio-group>

                          <template v-if="satisYn === 'Y'">
                            <div class="d-flex mt-2 justify-start align-center">
                              <v-checkbox v-model="satisDayYn" class="flex-0-0 mr-4" label="기간설정" />
                              <VDateInput :disabled="satisDayYn != true" />
                              <v-combobox
                                append-inner-icon="mdi-clock-time-eight-outline"
                                :items="selectDate.date"
                                v-model="selectDate.value"
                                class="ml-2 flex-0-0"
                                style="width: 150px"
                                :disabled="satisDayYn != true"
                              ></v-combobox>
                              <span class="mx-1">~</span>
                              <VDateInput :disabled="satisDayYn != true" />
                              <v-combobox
                                append-inner-icon="mdi-clock-time-eight-outline"
                                :items="selectDate2.date"
                                v-model="selectDate2.value"
                                class="ml-2 flex-0-0"
                                style="width: 150px"
                                :disabled="satisDayYn != true"
                              ></v-combobox>
                            </div>
                            <p class="mt-1 text-error">* 기간 설정 미사용 시 운영 종료 후 진행됩니다.</p>
                          </template>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="required">input &amp; Check</th>
                        <td>
                          <div class="d-flex align-center" style="width: 350px">
                            <v-text-field class="mr-2"></v-text-field>
                            <span>명</span>
                            <div class="d-flex align-center ml-5">
                              <v-checkbox v-model="waitYn" class="flex-0-0 mr-2" label="대기선택" />
                              <v-text-field class="mr-2" style="width: 80px" :disabled="waitYn != true"></v-text-field>
                              <span>명</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                  <v-divider />
                  <div class="d-flex justify-end pt-4">
                    <v-btn variant="tonal" color="error" width="80" class="mr-2">취소</v-btn>
                    <v-btn variant="flat" color="success" width="80">저장</v-btn>
                  </div>
                </v-col>
              </v-row>
            </BaseCard>
          </v-window-item>
          <v-window-item value="two">
            <BaseCard title="결과2">
              <v-row>
                <v-col cols="12">
                  <v-table>
                    <colgroup>
                      <col style="width: 20%" />
                      <col style="width: auto" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row" class="required">select &amp; input</th>
                        <td>
                          <div class="d-flex align-center" style="width: 400px">
                            <v-combobox :items="['선택1', '선택2']" placeholder="선택" class="mr-5" />
                            <span class="mr-2">난이도 배점</span>
                            <v-text-field disabled></v-text-field>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="required">check &amp; input 여러개</th>
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
                        <th scope="row">Check만 여러개</th>
                        <td>
                          <v-checkbox class="d-inline-flex mr-2" label="직전학기 성적 하락 -0.5" />
                          <v-checkbox class="d-inline-flex mr-2" label="직전학기" />
                          <v-checkbox class="d-inline-flex mr-2" label="직전학기 성적 하락 -0.5" />
                          <v-checkbox class="d-inline-flex mr-2" label="직전학기 -0.5" />
                          <v-checkbox class="d-inline-flex mr-2" label="직전학기 성적 하락 -0.5" />
                          <v-checkbox class="d-inline-flex mr-2" label="-0.5" />
                          <v-checkbox class="d-inline-flex mr-2" label="직전학기" />
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                  <v-divider />
                  <div class="d-flex justify-end pt-4">
                    <v-btn variant="tonal" color="error" width="80" class="mr-2">취소</v-btn>
                    <v-btn variant="flat" color="success" width="80">저장</v-btn>
                  </div>
                </v-col>
              </v-row>
            </BaseCard>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script lang="ts">
/** ck에디터 */
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  data: () => ({
    /** theme breadcrumb */
    title: "Guide - Detail",
    breadcrumbs: [
      { title: "Guide - 1depth", disabled: false },
      { title: "Guide - 2depth", disabled: true },
    ],
    /** select */
    selectOption1: {
      year: ["2024", "2023", "2022"],
      value: "2024",
      category: ["선택1", "선택2", "선택3"],
    },
    /** tab */
    tab: null,
    /** AddRow deleteRow input */
    programList: [
      {
        text: "Add",
      },
      {
        text: "Delete",
      },
      {
        text: "Delete",
      },
    ],
    /** input = number */
    counterRule: [(v: any) => v && v.length <= 4],
    /** textarea */
    rules: [(v: any) => v.length <= 2000 || "2000자 이상 제한합니다."],
    textValue: "textarea value 값",
    /** ck에디터 */
    editor: ClassicEditor,
    editorData: "",
    editorConfig: {
      placeholder: "ckeditor placeholder 입니다",
    },

    /** 기간 설정 */
    satisYn: "N",
    satisDayYn: false,
    selectDate: {
      date: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
      ],
      value: "00:00",
    },
    selectDate2: {
      date: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
      ],
      value: "00:00",
    },
    /** input & check */
    waitYn: false,
    /** 역량 설정 */
    abilityInfo: [
      { code: "a001", text: "역량1", useYn: false, percent: 0, mileage: 0 },
      { code: "a002", text: "역량2", useYn: false, percent: 0, mileage: 0 },
      { code: "a003", text: "역량3", useYn: false, percent: 0, mileage: 0 },
      { code: "a004", text: "역량4", useYn: false, percent: 0, mileage: 0 },
      { code: "a005", text: "역량5", useYn: false, percent: 0, mileage: 0 },
      { code: "a006", text: "역량6", useYn: false, percent: 0, mileage: 0 },
    ],
  }),
  methods: {
    /** 행 추가 */
    onClickAddRow() {
      const vm = this;
      vm.programList.push({ text: "" });
    },
    /** 행 삭제 */
    onClickDelRow(idx: number) {
      const vm = this;
      const tempArr1 = vm.programList.slice(0, idx);
      const tempArr2 = vm.programList.slice(idx + 1, vm.programList.length);
      vm.programList = [...tempArr1, ...tempArr2];
    },
  },
};
</script>
