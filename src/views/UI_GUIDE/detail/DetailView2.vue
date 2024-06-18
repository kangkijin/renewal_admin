<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-tabs v-model="tab" color="primary" align-tabs="center">
        <v-tab value="one">Dialogs</v-tab>
        <v-tab value="two">UI 추가</v-tab>
        <v-tab value="three">TAB 3</v-tab>
      </v-tabs>
      <v-card-text class="bg-grey100 mt-4 rounded-md">
        <v-window v-model="tab">
          <v-window-item value="one">
            <BaseCard title="Dialogs">
              <v-row>
                <v-col cols="12">
                  <v-table>
                    <colgroup>
                      <col style="width: 20%" />
                      <col style="width: auto" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row" class="required">버튼 누르면 팝업</th>
                        <td>
                          <!-- dialog: persistent 삭제시 배경 누르면 닫힘 -->
                          <v-dialog v-model="dialog" persistent width="1024">
                            <!-- dialog button -->
                            <template v-slot:activator="{ props }">
                              <v-btn v-bind="props"> Open Dialog </v-btn>
                            </template>

                            <!-- dialog inner -->
                            <v-card>
                              <!-- dialog title -->
                              <v-card-title class="bg-primary">Dialog Title</v-card-title>
                              <v-divider></v-divider>

                              <!-- dialog content -->
                              <v-card-text>
                                <v-row>
                                  <v-col cols="12">
                                    <v-table>
                                      <colgroup>
                                        <col style="width: 15%" />
                                        <col style="width: 35%" />
                                        <col style="width: 15%" />
                                        <col style="width: 35%" />
                                      </colgroup>
                                      <tbody>
                                        <tr>
                                          <th>학년도</th>
                                          <td>
                                            <v-autocomplete
                                              v-model="selectOption2.value"
                                              :items="selectOption2.year"
                                            ></v-autocomplete>
                                          </td>
                                          <th>대학</th>
                                          <td>
                                            <v-autocomplete
                                              placeholder="선택"
                                              :items="selectOption3.university"
                                            ></v-autocomplete>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>학과</th>
                                          <td>
                                            <v-autocomplete
                                              placeholder="선택"
                                              :items="selectOption4.depart"
                                            ></v-autocomplete>
                                          </td>
                                          <th>input 예시</th>
                                          <td>
                                            <v-text-field></v-text-field>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th colspan="4" class="text-end">
                                            <v-btn class="mr-2" width="80">초기화</v-btn>
                                            <v-btn variant="flat" color="primary" width="80">검색</v-btn>
                                          </th>
                                        </tr>
                                      </tbody>
                                    </v-table>
                                  </v-col>
                                  <v-col cols="12">
                                    <BaseCard>
                                      <template v-slot:title>
                                        <div class="d-flex align-center">
                                          <div class="text-h6">검색 결과 제목 (툴팁 필요시 우측 사용)</div>
                                          <v-avatar class="mx-2" size="20" color="primary">
                                            <v-icon style="font-size: 14px">mdi-exclamation-thick</v-icon>
                                            <v-tooltip>
                                              툴팁 내용이 보여집니다<br />
                                              화이팅
                                            </v-tooltip>
                                          </v-avatar>
                                        </div>
                                        <p class="mt-3">- 부가 설명란 입니다.</p>
                                      </template>
                                      <BaseTableConfig
                                        :totalCnt="list.length"
                                        checked
                                        :checkedCnt="selectedItems.length"
                                      >
                                        <template #top-btn-area>
                                          <v-btn class="mr-2">전년도 목록 복사</v-btn>
                                          <v-btn class="mr-2">양식 다운로드</v-btn>
                                          <v-btn class="mr-2">파일 업로드</v-btn>
                                          <v-btn>엑셀 다운로드</v-btn>
                                        </template>
                                        <template #left-btn-area>
                                          <v-btn color="grey" class="mr-2">삭제</v-btn>
                                          <v-btn color="grey-darken-1" class="mr-2">사용</v-btn>
                                          <v-btn color="grey-darken-1">미사용</v-btn>
                                        </template>
                                        <template #right-btn-area>
                                          <!-- snackbar 사용 -->
                                          <v-snackbar color="error">
                                            <template v-slot:activator="{ props }">
                                              <v-btn color="error" class="mr-2" v-bind="props">부정</v-btn>
                                            </template>
                                            <p class="text-center">부정 Alert</p>
                                          </v-snackbar>
                                          <v-snackbar color="warning">
                                            <template v-slot:activator="{ props }">
                                              <v-btn class="mr-2" color="warning" v-bind="props">경고</v-btn>
                                            </template>
                                            <p class="text-center">경고 Alert</p>
                                          </v-snackbar>
                                          <v-snackbar>
                                            <template v-slot:activator="{ props }">
                                              <v-btn class="mr-2" v-bind="props">중립</v-btn>
                                            </template>
                                            <p class="text-center">중립 Alert</p>
                                          </v-snackbar>
                                          <v-snackbar color="secondary">
                                            <template v-slot:activator="{ props }">
                                              <v-btn color="secondary" v-bind="props">긍정</v-btn>
                                            </template>
                                            <p class="text-center">긍정 Alert</p>
                                          </v-snackbar>
                                        </template>
                                      </BaseTableConfig>
                                      <v-easy-table
                                        ref="dataTable"
                                        :headers="header"
                                        :items="list"
                                        fixed-checkbox
                                        :checkbox-column-width="50"
                                        v-model:items-selected="selectedItems"
                                      >
                                        <template #item-operation>
                                          <v-btn size="small">퇴근</v-btn>
                                        </template>
                                      </v-easy-table>
                                    </BaseCard>
                                  </v-col>
                                </v-row>
                              </v-card-text>
                              <v-divider></v-divider>

                              <!-- dialog button -->
                              <v-card-actions class="justify-end">
                                <v-btn variant="tonal" color="error" @click="dialog = false">취소</v-btn>
                                <v-btn variant="flat" color="success" @click="dialog = false">저장</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">글씨 누르면 팝업</th>
                        <td>
                          <!-- dialog: 배경 누르면 닫힘 -->
                          <v-dialog v-model="dialog2" width="1024">
                            <!-- dialog button -->
                            <template v-slot:activator="{ props }">
                              <router-link to="" v-bind="props" class="text-primary">팝업 등장</router-link>
                            </template>

                            <!-- dialog inner -->
                            <v-card>
                              <!-- dialog title -->
                              <v-card-title class="bg-primary">Dialog Title2</v-card-title>
                              <v-divider></v-divider>

                              <!-- dialog content -->
                              <v-card-text>
                                <v-row>
                                  <v-col cols="12">
                                    <BaseCard>
                                      <template v-slot:title>
                                        <div class="d-flex align-center justify-space-between">
                                          <div class="text-h6">검색 결과 제목 (툴팁 필요시 우측 사용)</div>
                                          <div class="d-flex align-center">
                                            <v-btn class="mr-2">전년도 목록 복사</v-btn>
                                            <v-btn class="mr-2">양식 다운로드</v-btn>
                                            <v-btn class="mr-2">파일 업로드</v-btn>
                                            <v-btn>엑셀 다운로드</v-btn>
                                          </div>
                                        </div>
                                        <p class="mt-3">- 부가 설명란 입니다.</p>
                                      </template>
                                      내용이 들어갑니다
                                    </BaseCard>
                                  </v-col>
                                  <v-col cols="12">
                                    <div class="text-h6 mb-4">문단 다음 밑줄 필요할때</div>
                                    내용입니다.
                                  </v-col>
                                  <v-divider />
                                  <v-col cols="12">
                                    <div class="text-h6 mb-4">문단 다음 밑줄 필요할때</div>
                                    내용입니다.
                                  </v-col>
                                </v-row>
                              </v-card-text>
                              <v-divider></v-divider>

                              <!-- dialog button -->
                              <v-card-actions class="justify-end">
                                <v-btn variant="tonal" color="error" @click="dialog2 = false">취소</v-btn>
                                <v-btn variant="flat" color="success" @click="dialog2 = false">저장</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="required">input 누르면 팝업</th>
                        <td>
                          <!-- dialog: 배경 누르면 닫힘 -->
                          <v-dialog v-model="dialog3" width="768">
                            <!-- dialog button -->
                            <template v-slot:activator="{ props }">
                              <v-text-field prepend-inner-icon="mdi-magnify" value="검색" v-bind="props"></v-text-field>
                            </template>

                            <!-- dialog inner -->
                            <v-card>
                              <!-- dialog title -->
                              <v-card-title class="bg-primary">v-dialog 사이즈 조절 가능합니다</v-card-title>
                              <v-divider></v-divider>

                              <!-- dialog content -->
                              <v-card-text>
                                <v-row>
                                  <v-col cols="12"> v-dialog 태그 내에 width 값으로 조절 가능 </v-col>
                                  <v-col cols="12"> -- </v-col>
                                </v-row>
                              </v-card-text>
                              <v-divider></v-divider>

                              <!-- dialog button -->
                              <v-card-actions class="justify-end">
                                <v-btn variant="tonal" color="error" @click="dialog3 = false">취소</v-btn>
                                <v-btn variant="flat" color="success" @click="dialog3 = false">저장</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
            </BaseCard>
          </v-window-item>
          <v-window-item value="two">
            <BaseCard title="UI 추가">
              <v-row>
                <v-col cols="12">
                  <BaseCard>
                    <template v-slot:title>
                      <div class="text-h6">추가된 UI</div>
                    </template>
                    <BaseCard class="mb-2">
                      <template v-slot:title>
                        <div class="text-h6">과정 CQI 작성기간</div>
                      </template>
                      <p class="text-primary text-h6">2025/01/01 ~ 2025/01/31</p>
                    </BaseCard>
                    <BaseCard>
                      <template v-slot:title>
                        <div class="text-h6">과정 CQI 작성현황</div>
                      </template>
                      <v-row>
                        <v-col cols="4">
                          <div class="d-flex align-center justify-center">
                            <p class="text-subtitle-1 font-weight-bold">사용중 과정</p>
                            <p class="text-h4 text-info font-weight-bold ml-5">102</p>
                          </div>
                        </v-col>
                        <v-col cols="4">
                          <div class="d-flex align-center justify-center">
                            <p class="text-subtitle-1 font-weight-bold">작성완료</p>
                            <p class="text-h4 text-success font-weight-bold ml-5">35/102</p>
                          </div>
                        </v-col>
                        <v-col cols="4">
                          <div class="d-flex align-center justify-center">
                            <p class="text-subtitle-1 font-weight-bold">작성 중/작성 전</p>
                            <p class="text-h4 text-warning ml-5">102</p>
                          </div>
                        </v-col>
                      </v-row>
                    </BaseCard>
                  </BaseCard>
                </v-col>
              </v-row>
            </BaseCard>
          </v-window-item>
          <v-window-item value="three">
            <BaseCard title="TAB 3">
              <v-row>
                <v-col cols="12"> </v-col>
              </v-row>
            </BaseCard>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script lang="ts">
/** easy-data-table */
import tableConfig from "@/types/dataTable/EasyDataTableConfig";

export default {
  data: () => ({
    /** theme breadcrumb */
    title: "Guide - Detail2",
    breadcrumbs: [
      { title: "Guide - 1depth", disabled: false },
      { title: "Guide - 2depth", disabled: true },
    ],
    /**  tab */
    tab: null,
    /**  dialog */
    dialog: false,
    dialog2: false,
    dialog3: false,
    /** select */
    selectOption: {
      items: ["10개씩 보기", "50개씩 보기", "100개씩 보기"],
      value: "10개씩 보기",
    },
    selectOption2: {
      year: ["2024", "2023", "2022"],
      value: "2024",
    },
    selectOption3: {
      university: ["서울대학교", "대학교1", "대학교2"],
    },
    selectOption4: {
      depart: ["학과1", "학과2", "학과3"],
    },
    /** easy-data-table */
    config: tableConfig,
    header: [
      { text: "학년도", value: "year", sortable: true },
      { text: "학기", value: "smstr", sortable: true },
      { text: "교과목", value: "sbjtKorNm", sortable: true },
      { text: "역량", value: "name", sortable: true },
      { text: "점수", value: "coreScore", sortable: true },
      { text: "관리", value: "operation" },
    ],
    list: [
      {
        year: "2024",
        smstr: "1학기",
        sbjtKorNm: "정수론",
        name: "역량쓰",
        coreScore: "1",
      },
      {
        year: "2024",
        smstr: "1학기",
        sbjtKorNm: "정수론",
        name: "2역량쓰",
        coreScore: "2",
      },
    ],
    selectedItems: [],
  }),
};
</script>
