<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <BaseCard>
        <v-table>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: 35%" />
            <col style="width: 15%" />
            <col style="width: 35%" />
          </colgroup>
          <tbody>
            <tr>
              <th>부서/학과</th>
              <td>
                <v-radio-group inline v-model="selectedValues.srchRadioDept">
                  <v-radio
                    v-for="obj in srchOption.srchRadioDept"
                    :key="obj.value"
                    :label="obj.name"
                    :value="obj.value"
                  ></v-radio>
                </v-radio-group>
              </td>
              <th>대학</th>
              <td>
                <v-autocomplete
                  placeholder="전체"
                  v-model="selectedValues.srchColg"
                  :items="srchOption.srchColg"
                  item-title="name"
                  item-value="value"
                >
                </v-autocomplete>
              </td>
            </tr>
            <tr>
              <th>부서</th>
              <td>
                <v-autocomplete
                  placeholder="전체"
                  v-model="selectedValues.srchDe"
                  :items="srchOption.srchDe"
                  item-title="name"
                  item-value="value"
                >
                </v-autocomplete>
              </td>
              <th>학과</th>
              <td>
                <v-autocomplete
                  placeholder="전체"
                  v-model="selectedValues.srchDept"
                  :items="srchOption.srchDept"
                  item-title="name"
                  item-value="value"
                >
                </v-autocomplete>
              </td>
            </tr>
            <tr>
              <th>학년도</th>
              <td>
                <v-autocomplete
                  placeholder="전체"
                  v-model="selectedValues.srchYear"
                  :items="srchOption.srchYear"
                  item-title="name"
                  item-value="value"
                >
                </v-autocomplete>
              </td>
              <th>학기</th>
              <td>
                <v-autocomplete
                  placeholder="전체"
                  v-model="selectedValues.srchTerm"
                  :items="srchOption.srchTerm"
                  item-title="name"
                  item-value="value"
                >
                </v-autocomplete>
              </td>
            </tr>
            <tr>
              <th>카테고리</th>
              <td>
                <v-autocomplete
                  placeholder="전체"
                  v-model="selectedValues.srchCate"
                  :items="srchOption.srchCate"
                  item-title="name"
                  item-value="value"
                >
                </v-autocomplete>
              </td>
              <th>과정명</th>
              <td>
                <v-text-field v-model="selectedValues.ecpNm" placeholder="과정명"></v-text-field>
              </td>
            </tr>
            <tr>
              <th>차수명</th>
              <td>
                <v-autocomplete
                  placeholder="전체"
                  v-model="selectedValues.srchDegree"
                  :items="srchOption.srchDegree"
                  item-title="name"
                  item-value="value"
                >
                </v-autocomplete>
              </td>
              <th>운영상태</th>
              <td>
                <v-checkbox
                  v-for="(obj, index) in srchOption.srchSts"
                  class="d-inline-flex mr-4"
                  :key="index"
                  :label="obj.name"
                  :value="obj.value"
                  v-model="selectedValues.srchSts"
                >
                </v-checkbox>
              </td>
            </tr>
            <tr>
              <th>신청기간</th>
              <td>
                <div class="d-flex align-center">
                  <VDateInput v-model="selectedValues.applyStr" :placeholder="'시작일'" />
                  <span class="mx-2">~</span>
                  <VDateInput v-model="selectedValues.applyEnd" :placeholder="'종료일'" />
                </div>
              </td>
              <th>운영기간</th>
              <td>
                <div class="d-flex align-center">
                  <VDateInput v-model="selectedValues.oprtStr" :placeholder="'시작일'" />
                  <span class="mx-2">~</span>
                  <VDateInput v-model="selectedValues.oprtEnd" :placeholder="'종료일'" />
                </div>
              </td>
            </tr>
            <tr>
              <th>역량</th>
              <td colspan="3">
                <v-checkbox
                  v-for="(obj, index) in srchOption.srchAbility"
                  class="d-inline-flex mr-4"
                  :key="index"
                  :label="obj.name"
                  :value="obj.value"
                  v-model="selectedValues.srchAbility"
                ></v-checkbox>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="d-flex pt-4 justify-end">
          <v-btn class="mr-2" width="80">초기화</v-btn>
          <v-btn variant="flat" color="primary" width="80" @click="srchUserPeriodOprtList()">검색</v-btn>
        </div>
      </BaseCard>
    </v-col>
    <v-col>
      <BaseCard>
        <template v-slot:title>
          <div class="d-flex align-center">
            <div class="text-h4">차수 운영 목록</div>
            <v-avatar class="mx-2" size="20" color="primary">
              <v-icon style="font-size: 14px">mdi-exclamation-thick</v-icon>
              <v-tooltip>
                툴팁 내용이 보여집니다<br />
                화이팅
              </v-tooltip>
            </v-avatar>
          </div>
        </template>
        <BaseTableConfig :totalCnt="list.length" @update:rowPerPage="updateRowPerPage"></BaseTableConfig>
        <v-easy-table ref="dataTable" :headers="header" :items="list" :loading="!loaded">
          <template #item-operation>
            <v-btn size="small" @click="this.$alert('기능준비중입니다.')">바로가기</v-btn>
          </template>
        </v-easy-table>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import axios from "axios";

export default {
  data: () => ({
    // 브레드크럼프 관련
    title: "차수 운영",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(외부인)", disabled: true },
    ],
    // 검색 필터 관련
    srchOption: {
      srchRadioDept: [
        { name: "전체", value: "1" },
        { name: "부서", value: "2" },
        { name: "학과", value: "3" },
      ],
      srchColg: [
        { name: "전체", value: "1" },
        { name: "부서", value: "2" },
        { name: "학과", value: "3" },
      ],
      srchDe: [
        { name: "전체", value: "1" },
        { name: "부서", value: "2" },
        { name: "학과", value: "3" },
      ],
      srchDept: [
        { name: "전체", value: "1" },
        { name: "부서", value: "2" },
        { name: "학과", value: "3" },
      ],
      srchYear: [
        { name: "전체", value: "1" },
        { name: "부서", value: "2" },
        { name: "학과", value: "3" },
      ],
      srchTerm: [
        { name: "전체", value: "1" },
        { name: "부서", value: "2" },
        { name: "학과", value: "3" },
      ],
      srchCate: [
        { name: "전체", value: "1" },
        { name: "부서", value: "2" },
        { name: "학과", value: "3" },
      ],
      srchDegree: [
        { name: "전체", value: "1" },
        { name: "부서", value: "2" },
        { name: "학과", value: "3" },
      ],
      srchSts: [
        { name: "전체", value: "1" },
        { name: "승인대기", value: "2" },
        { name: "승인", value: "3" },
        { name: "반려", value: "4" },
      ],
      srchAbility: [
        { name: "전체", value: "1" },
        { name: "역량1", value: "2" },
        { name: "역량2", value: "3" },
        { name: "역량3", value: "4" },
        { name: "역량4", value: "5" },
        { name: "역량5", value: "6" },
        { name: "역량6", value: "7" },
      ],
    },

    selectedValues: {
      srchRadioDept: "1",
      srchColg: "1",
      srchDe: "1",
      srchDept: "1",
      srchYear: "1",
      srchTerm: "1",
      srchCate: "1",
      ecpNm: "",
      srchDegree: "1",
      srchSts: ["2", "3"],
      applyStr: "1",
      applyEnd: "1",
      oprtStr: "1",
      oprtEnd: "1",
      srchAbility: ["1"],
    },
    // 선택된 값들을 저장할 객체
    // 데이터테이블 관련
    header: [
      { text: "No", value: "no", sortable: true, width: 40 },
      { text: "운영상태", value: "oprtSts", sortable: true, width: 90 },
      { text: "Class", value: "operation", width: 100 },
      { text: "신청인원", value: "", sortable: true, width: 90 },
      { text: "입과인원", value: "", sortable: true, width: 90 },
      { text: "이수인원", value: "", sortable: true, width: 90 },
      { text: "카테고리", value: "ecmNm", sortable: true, width: 90 },
      { text: "과정명", value: "eciTitle", sortable: true, width: 300 },
      { text: "차수명", value: "eliTitle", sortable: true, width: 300 },
      { text: "부서/학과", value: "eciDeptNm", sortable: true, width: 120 },
      { text: "담당자", value: "eliStfNm", sortable: true, width: 100 },
      { text: "학년도", value: "eliOprtYear", sortable: true, width: 100 },
      { text: "학기", value: "eliOprtTerm", sortable: true, width: 100 },
      { text: "신청기간", value: "reqDate", sortable: true, width: 200 },
      { text: "운영기간", value: "oprtDate", sortable: true, width: 200 },
      { text: "역량", value: "ability", sortable: true, width: 400 },
    ],
    loaded: false,
    list: [],
    selectedItems: [],
  }),
  created() {
    // 이 부분에서 list에 데이터를 넣는 작업 한다
    this.srchUserPeriodOprtList();
  },
  methods: {
    // 목록 데이터 가져오는 이벤트
    srchUserPeriodOprtList() {
      const _url = "";
      const param = this.selectedValues;
      const vm = this;
      axios
        .get(_url, param)
        .then((response) => {
          if (response.status != 200) {
            throw new Error();
          }
          vm.list = [
            {
              no: "2",
              oprtSts: "운영중",
              applyCnt: "5",
              testVarCnt: "7",
              finishCnt: "1",
              category: "취업",
              ecpNm: "교수님과 함께하는 비교과",
              periodNm: "교수님과 함께하는 비교과2",
              deptNm: "컴퓨터공학과",
              stf: "담당자2",
              gradeYear: "2024",
              term: "1학기",
              reqTerm: "2024/01/01 ~ 2024/01/07",
              oprtTerm: "2024/01/08 ~ 2024/01/14",
              ability: "핵심역량1",
            },
            {
              no: "1",
              oprtSts: "운영대기",
              applyCnt: "2",
              testVarCnt: "5",
              finishCnt: "0",
              category: "취업",
              ecpNm: "교수님과 함께하는 비교과",
              periodNm: "교수님과 함께하는 비교과1",
              deptNm: "컴퓨터공학과",
              stf: "담당자1",
              gradeYear: "2023",
              term: "2학기",
              reqTerm: "2024/01/01 ~ 2024/01/07",
              oprtTerm: "2024/01/08 ~ 2024/01/14",
              ability: "핵심역량2",
            },
          ];
          /*this.list = response.data.datalist;*/
        })
        .catch((error) => {
          vm.$alert("기능 이상: " + error);
        });
      vm.loaded = true;
    },
    //
    updateRowPerPage(selected: number) {
      const vm = this;
      const dataTable = vm.$refs.dataTable as any;
      dataTable.updateRowsPerPageActiveOption(selected);
    },
  },
};
</script>
