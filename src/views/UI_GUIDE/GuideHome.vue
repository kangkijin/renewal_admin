<!--
  mdi icon 주소 : https://pictogrammers.com/library/mdi/
  class="mdi- ???"
-->
<template>
  <BaseBreadcrumb :title="$t(title)" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <BaseCard>
        <template v-slot:title>
          <div class="d-flex align-center">
            <div class="text-h4">본문 기본 레이아웃</div>
            <!-- tooltip -->
            <v-avatar class="mx-2" size="20" color="primary">
              <v-icon style="font-size: 14px">mdi-exclamation-thick</v-icon>
              <v-tooltip>
                툴팁 내용이 보여집니다<br />
                BaseCard template 내 v-avatar 추가
              </v-tooltip>
            </v-avatar>
          </div>
        </template>

        <pre>
&lt;BaseBreadcrumb :title="title" :breadcrumb="breadcrumbs"/&gt;
&lt;v-row&gt;
  &lt;v-col cols="12"&gt; -- <span class="bg-primary">영역 나누는 부분</span>
    &lt;BaseCard"&gt; -- <span class="bg-primary">Border 로 감싸져 있는 부분</span>
      &lt;template v-slot:title&gt; -- <span class="bg-primary">영역 제목 슬롯</span>
        &lt;div class="d-flex align-center"&gt;
          &lt;div class="text-h6"&gt;본문 기본 레이아웃&lt;/div&gt; -- <span class="bg-primary">영역 제목</span>
        &lt;/div&gt;
      &lt;/template&gt;
      ...
      ... -- <span class="bg-primary">내용</span>
      ...
    &lt;/BaseCard"&gt;
  &lt;/v-col&gt;
  &lt;v-col cols="12"&gt;
  ...
  ...
  &lt;/v-col&gt;
&lt;/v-row&gt;

&lt;script lang="ts"&gt;
import { example } from "@/경로/...";  -- <span class="bg-primary">import 파일이 있으면 추가</span>

export default {
  components: { example },
  data: () => ({
    /** theme breadcrumb */
    title: "Home page",
    breadcrumbs: [
      { title: "Welcome to Vuetify", disabled: false }, -- <span class="bg-primary">상단 BaseBreadcrumb 불러오기</span>
      { title: "We support your coding", disabled: true }, -- <span class="bg-primary">상단 BaseBreadcrumb 불러오기</span>
    ],
    ...
    ...  -- <span class="bg-primary">data 추가</span>
    ...
  }),

  <span class="bg-primary">추가 스크립트</span>
  mounted: function () {},
  methods: {},

};
</pre>
      </BaseCard>
    </v-col>
    <v-col cols="12">
      <BaseCard>
        <template v-slot:title>
          <div class="d-flex align-center">
            <div class="text-h4">Buttons</div>
          </div>
        </template>
        <v-row>
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">Color</div>
            <v-btn icon="mdi-plus-box-outline" variant="flat" color="transparent"></v-btn>
            <v-btn icon="mdi-minus-box-outline" variant="flat" color="transparent" class="filter_red"></v-btn>
            <v-btn>normal</v-btn>
            <v-btn color="primary">basic</v-btn>
            <v-btn color="secondary">secondary</v-btn>
            <v-btn color="success">success</v-btn>
            <v-btn color="error">error</v-btn>
            <v-btn color="info">info</v-btn>
            <v-btn color="warning">warning</v-btn>
            <v-btn class="bg-lightprimary">bg-lightprimary</v-btn>
            <v-btn class="bg-lightsecondary">bg-lightsecondary</v-btn>
            <v-btn class="bg-lightsuccess">bg-lightsuccess</v-btn>
            <v-btn class="bg-lighterror">bg-lighterror</v-btn>
            <v-btn class="bg-lightinfo">bg-lightinfo</v-btn>
            <v-btn class="bg-lightwarning">bg-lightwarning</v-btn>
            <v-btn class="bg-textPrimary">bg-textPrimary</v-btn>
          </v-col>
          <v-divider />
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">Type</div>
            <v-btn>basic</v-btn>
            <v-btn variant="tonal">variant tonal</v-btn>
            <v-btn variant="flat">variant flat</v-btn>
            <v-btn variant="outlined">variant outlined</v-btn>
            <v-btn variant="text">variant text</v-btn>
            <v-btn variant="plain">variant plain</v-btn>
          </v-col>
          <v-divider />
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">Size</div>
            <v-btn>default</v-btn>
            <v-btn size="x-small">x-small</v-btn>
            <v-btn size="small">small</v-btn>
            <v-btn size="large">large</v-btn>
            <v-btn size="x-large">x-large</v-btn>
          </v-col>
          <v-divider />
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">Icon</div>
            <v-btn icon="mdi-vuetify"></v-btn>
            <v-btn icon="mdi-vuetify" variant="flat" color="transparent"></v-btn>
            <v-btn prepend-icon="mdi-vuetify">prepend-icon</v-btn>
            <v-btn append-icon="mdi-vuetify">append-icon</v-btn>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>
    <v-col cols="12">
      <BaseCard>
        <template v-slot:title>
          <div class="d-flex align-center">
            <div class="text-h4">Check, Radio</div>
          </div>
        </template>
        <v-row>
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">check - inline</div>
            <v-checkbox v-model="checked.all" class="d-inline-flex mr-4" label="전체" />
            <v-checkbox v-model="checked.useY" class="d-inline-flex mr-4" label="사용" />
            <v-checkbox v-model="checked.useN" class="d-inline-flex" label="미사용" />
          </v-col>
          <v-divider />
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">check - block</div>
            <v-checkbox v-model="checked.all" class="" label="전체" />
            <v-checkbox v-model="checked.useY" class="" label="사용" />
            <v-checkbox v-model="checked.useN" class="" label="미사용" />
          </v-col>
          <v-divider />
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">radio - inline</div>
            <v-radio-group inline>
              <v-radio label="Radio One" class="mr-4" value="one"></v-radio>
              <v-radio label="Radio Two" class="mr-4" value="two"></v-radio>
              <v-radio label="Radio Three" value="three"></v-radio>
            </v-radio-group>
          </v-col>
          <v-divider />
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">radio - block</div>
            <v-radio-group>
              <v-radio label="Radio One" class="mr-4" value="one"></v-radio>
              <v-radio label="Radio Two" class="mr-4" value="two"></v-radio>
              <v-radio label="Radio Three" value="three"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>
    <v-col cols="12">
      <BaseCard>
        <template v-slot:title>
          <div class="d-flex align-center">
            <div class="text-h4">Tab, Datepicker</div>
          </div>
        </template>
        <v-row>
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">Tab style</div>
            <v-tabs v-model="tab" bg-color="primary">
              <v-tab value="one">탭 1</v-tab>
              <v-tab value="two">탭 2</v-tab>
              <v-tab value="three">탭 3 - 제목</v-tab>
            </v-tabs>
            <v-card-text class="bg-grey100 mt-4 rounded-md">
              <v-window v-model="tab">
                <v-window-item value="one">11</v-window-item>
                <v-window-item value="two">222</v-window-item>
                <v-window-item value="three">33333</v-window-item>
              </v-window>
            </v-card-text>
          </v-col>
          <v-divider />
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">Tab style2</div>
            <v-tabs v-model="tab2" color="primary" align-tabs="center">
              <v-tab value="one">탭 1</v-tab>
              <v-tab value="two">탭 2</v-tab>
              <v-tab value="three">탭 3 - 제목</v-tab>
            </v-tabs>
            <v-card-text class="bg-grey100 mt-4 rounded-md">
              <v-window v-model="tab2">
                <v-window-item value="one">11</v-window-item>
                <v-window-item value="two">222</v-window-item>
                <v-window-item value="three">33333</v-window-item>
              </v-window>
            </v-card-text>
          </v-col>
          <v-divider />
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">Datepicker</div>
            <VDateInput />
            <p class="mt-2">@/components/common/VDateInput.vue 참고</p>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>
    <v-col cols="12">
      <BaseCard>
        <template v-slot:title>
          <div class="d-flex align-center">
            <div class="text-h4">easy-data-table (slot). - @/components/base/BaseTableConfig.vue 참고</div>
          </div>
        </template>
        <v-row>
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">Tab style 1 - 기본</div>
            <BaseTableConfig :totalCnt="list.length" @update:rowPerPage="updateRowPerPage"> </BaseTableConfig>
            <v-easy-table ref="dataTable" :headers="header" :items="list" :loading="true"></v-easy-table>
          </v-col>
          <v-divider />
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">Tab style 2 - 체크 추가 및 버튼 추가</div>
            <BaseTableConfig :totalCnt="list.length" checked :checkedCnt="selectedItems.length">
              <!-- 토탈 우측 버튼 영역 -->
              <template #top-btn-area>
                <v-btn class="mr-2">전년도 목록 복사</v-btn>
                <v-btn class="mr-2">양식 다운로드</v-btn>
                <v-btn class="mr-2">파일 업로드</v-btn>
                <v-btn>엑셀 다운로드</v-btn>
              </template>
              <!-- 아래, 왼쪽 영역 -->
              <template #left-btn-area>
                <v-btn color="grey" class="mr-2">삭제</v-btn>
                <v-btn color="grey" class="mr-2">사용</v-btn>
                <v-btn color="grey">미사용</v-btn>
              </template>
              <!-- 아래, 오른쪽 영역 -->
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
              ref="dataTable1"
              :headers="header"
              :items="list"
              fixed-checkbox
              :checkbox-column-width="50"
              v-model:items-selected="selectedItems"
            >
              <template #item-operation>
                <v-btn size="small">size small</v-btn>
              </template>
            </v-easy-table>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>
    <v-col cols="12">
      <BaseCard>
        <template v-slot:title>
          <div class="d-flex align-center">
            <div class="text-h4">Input, textarea, ckeditor</div>
          </div>
        </template>
        <v-row>
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">input - normal</div>
            <v-text-field></v-text-field>
          </v-col>
          <v-divider />
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">input - icon</div>
            <v-text-field prepend-inner-icon="mdi-vuetify" class="mb-2"></v-text-field>
            <v-text-field append-inner-icon="mdi-vuetify"></v-text-field>
          </v-col>
          <v-divider />
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">textarea</div>
            <v-textarea counter :rules="rules" :model-value="textValue" persistent-counter placeholder="예시" />
          </v-col>
          <v-divider />
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">ckeditor</div>
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>
    <v-col cols="12">
      <BaseCard>
        <template v-slot:title>
          <div class="d-flex align-center">
            <div class="text-h4">Dialog - @/views/UI_GUIDE/detail/DetailView2.vue 참고</div>
          </div>
        </template>
        <v-row>
          <v-col cols="12">
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
                                v-model="dialogOption2.value"
                                :items="dialogOption2.year"
                              ></v-autocomplete>
                            </td>
                            <th>대학</th>
                            <td>
                              <v-autocomplete placeholder="선택" :items="dialogOption3.university"></v-autocomplete>
                            </td>
                          </tr>
                          <tr>
                            <th>학과</th>
                            <td>
                              <v-autocomplete placeholder="선택" :items="dialogOption4.depart"></v-autocomplete>
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
                  </v-row>
                </v-card-text>
                <v-divider></v-divider>

                <!-- dialog button -->
                <v-card-actions class="justify-end">
                  <v-btn variant="outlined" color="error" @click="dialog = false">취소</v-btn>
                  <v-btn variant="flat" color="success" @click="dialog = false">저장</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn class="ml-2" @click="onClickLoading">누르면로딩나옵니다</v-btn>
            <v-btn class="ml-2" @click="onClickConfirm('컨펌입니다')">누르면컨펌나옵니다</v-btn>
            <v-btn class="ml-2" @click="this.$alert('알럿입니다')">누르면알럿나옵니다</v-btn>
            <v-btn class="ml-2" @click="this.$toast('토스트입니다')">누르면토스트나옵니다</v-btn>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>
    <v-col cols="12">
      <BaseCard>
        <template v-slot:title>
          <div class="d-flex align-center">
            <div class="text-h4">첨부파일 - 추후 부장님께서 작업 예정</div>
          </div>
        </template>
        <v-row>
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">첨부파일 기본</div>
            <v-file-input hide-details></v-file-input>
          </v-col>
          <v-divider />
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">첨부파일 용량</div>
            <v-file-input chips counter :show-size="1000"></v-file-input>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>

    <v-col cols="12">
      <LabelCard :title="'Label Card Title'">
        <v-row>
          <v-col cols="12">
            <div class="mb-2 text-subtitle-1 font-weight-bold">첨부파일 기본</div>
            <v-file-input hide-details></v-file-input>
          </v-col>
        </v-row>
      </LabelCard>
    </v-col>

    <v-col cols="12">
      <BaseCard>
        <template v-slot:title>
          <div class="d-flex align-center">
            <div class="text-h4">안내 영역</div>
          </div>
        </template>
        <v-row>
          <v-col cols="12">
            <div class="infomation_box">
              <div>
                <v-icon icon="mdi-file-question" size="x-large"></v-icon>
                검색결과가 없습니다
                <span class="mt-4">부제인데 사용하실려면 사용하십시오</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>
    <!-- <v-col cols="12">
      <BaseCard>
        <template v-slot:title>
          <div class="d-flex align-center">
            <div class="text-h6">example</div>
          </div>
        </template>
        <v-row>
          <v-col cols="12"> </v-col>
        </v-row>
      </BaseCard>
    </v-col> -->
  </v-row>
</template>

<script lang="ts">
/** ck에디터 */
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
/** Label title */
import LabelCard from "@/components/common/LabelCard.vue";

export default {
  components: {
    LabelCard,
  },
  data: () => ({
    /** theme breadcrumb */
    title: "UI Guide",
    breadcrumbs: [
      { title: "Welcome to Vuetify", disabled: false },
      { title: "We support your coding", disabled: true },
    ],
    /** check */
    checked: {
      all: null,
      useY: null,
      useN: null,
    },
    /** tab - on = 첫번째:0, 두번째:1, 세번째:2, */
    tab: null,
    tab2: null,
    /** select */
    selectOption1: {
      category: ["선택1", "선택2", "선택3"],
    },
    /** easy-data-table */
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
    /** textarea */
    rules: [(v: any) => v.length <= 2000 || "2000자 이상 제한합니다."],
    textValue: "textarea value",
    /** ck에디터 */
    editor: ClassicEditor,
    editorData: "",
    editorConfig: {
      placeholder: "ckeditor placeholder 입니다",
    },
    /** dialog */
    dialog: false,
    dialog2: false,
    dialog3: false,
    /** select */
    dialogOption: {
      items: ["10개씩 보기", "50개씩 보기", "100개씩 보기"],
      value: "10개씩 보기",
    },
    dialogOption2: {
      year: ["2024", "2023", "2022"],
      value: "2024",
    },
    dialogOption3: {
      university: ["서울대학교", "대학교1", "대학교2"],
    },
    dialogOption4: {
      depart: ["학과1", "학과2", "학과3"],
    },
  }),
  methods: {
    /** easy-date-table */
    updateRowPerPage(selected: number) {
      const vm = this;
      const dataTable = vm.$refs.dataTable;
      dataTable.updateRowsPerPageActiveOption(selected);
    },
    updateRowPerPage1(selected: number) {
      const vm = this;
      const dataTable1 = vm.$refs.dataTable1 as any;
      dataTable1.updateRowsPerPageActiveOption(selected);
    },
    onClickLoading() {
      const vm = this as any;
      vm.$loading.show();
    },
    onClickConfirm(_text: string) {
      const vm = this;
      vm.$confirm(_text, "", (isConfirm: boolean) => {
        if (isConfirm) {
          vm.$toast("확인되었습니다.", "success");
        } else {
          vm.$toast("취소되었습니다.", "error");
        }
      });
    },
  },
};
</script>
