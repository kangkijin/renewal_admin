<template>
  <BaseBreadcrumb :title="title + ' _ ' + damId" :breadcrumbs="breadcrumbs"> </BaseBreadcrumb>
  <v-row>
    <v-col>
      <BaseCard>
        <v-row>
          <v-col>
            <v-table>
              <colgroup>
                <col style="width: 15%" />
                <col style="width: 35%" />
                <col style="width: 15%" />
                <col style="width: 35%" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">학년</th>
                  <td>
                    <div class="d-flex flex-wrap">
                      <v-checkbox
                        class="flex-0-0 mr-4"
                        v-model="actTargetAll"
                        @change="onClickCoreAll(actTargetAll)"
                        label="재학생 전체"
                      >
                      </v-checkbox>
                      <v-checkbox
                        class="flex-0-0 mr-4"
                        value="1"
                        v-model="searchList.diagActTargetList"
                        label="1학년"
                        @change="onCheckGrade('1')"
                      >
                      </v-checkbox>
                      <v-checkbox
                        class="flex-0-0 mr-4"
                        value="2"
                        v-model="searchList.diagActTargetList"
                        label="2학년"
                        @change="onCheckGrade('2')"
                      >
                      </v-checkbox>
                      <v-checkbox
                        class="flex-0-0 mr-4"
                        value="3"
                        v-model="searchList.diagActTargetList"
                        label="3학년"
                        @change="onCheckGrade('3')"
                      >
                      </v-checkbox>
                      <v-checkbox
                        class="flex-0-0 mr-4"
                        value="4"
                        v-model="searchList.diagActTargetList"
                        label="4학년"
                        @change="onCheckGrade('4')"
                      >
                      </v-checkbox>
                    </div>
                  </td>
                  <th scope="row">역량 레벨 선택</th>
                  <td>
                    <v-radio-group inline>
                      <v-radio label="핵심역량" value="UPCD"></v-radio>
                      <v-radio label="하위역량" value="CDID"></v-radio>
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <th scope="row">대학</th>
                  <td>
                    <v-autocomplete
                      class="mr-2"
                      v-model="selectedColg"
                      :items="selectOption.colgList"
                      item-title="deptKorNm"
                      item-value="deptCd"
                      placeholder="대학 선택"
                      @update:modelValue="fnGetHakguaList"
                    ></v-autocomplete>
                  </td>
                  <th scope="row">학과</th>
                  <td>
                    <v-autocomplete
                      class="mr-2"
                      v-model="selectedDept"
                      :items="selectOption.hakguaList"
                      item-title="deptKorNm"
                      item-value="deptCd"
                      placeholder="학과 선택"
                    ></v-autocomplete>
                  </td>
                </tr>
              </tbody>
            </v-table>

            <div class="d-flex pt-4 justify-end">
              <v-btn class="mr-2" width="80" @click="onClickReset()">초기화</v-btn>
              <v-btn variant="flat" color="primary" width="80">검색</v-btn>
            </div>
          </v-col>
        </v-row>
        <v-divider class="mt-5"></v-divider>
        <v-row>
          <v-col class="d-flex">
            <v-spacer></v-spacer>
            <v-btn class="mr-2 mt-5" @click="downloadJpg()">그래프 다운로드</v-btn>
            <v-btn class="mr-2 mt-5">Raw Data 학생응답기준</v-btn>
            <v-btn class="mt-5">Raw Data 종합결과</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <LineChart :data="chartData" :class="chartLoaded ? '' : 'loading_md'"></LineChart>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { ref } from "vue";
import LineChart from "@/components/chart/LineChart.vue";
import type { deptTypes } from "@/types/cmmnTypes";

export default {
  components: {
    LineChart,
  },
  data: () => ({
    title: "결과ㆍ통계",
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "핵심역량진단", disabled: true },
    ],
    damId: history.state.damId ?? null,
    chartLoaded: ref(false),
    chartData: ref<number[]>([]), // 차트 데이터를 초기화합니다.

    actTargetAll: false,
    searchList: {
      diagActTargetList: [],
    },
    selectOption: {
      colgList: [] as deptTypes[],
      hakguaList: [] as deptTypes[],
    },

    selectedColg: null,
    selectedDept: null,
  }),

  created() {
    this.fnOnInit(); //초기 대학/ 학과 리스트 불러오기
  },

  mounted: function () {
    const vm = this;
    setTimeout(() => {
      vm.chartLoaded = true;
    }, 1500);
  },

  methods: {
    async fnOnInit() {
      const vm = this;
      vm.selectOption.colgList = await vm.$fnGetDeptList("C", ""); //대학리스트 불러오기
    },
    async fnGetHakguaList(selectedItem: String) {
      const vm = this;

      vm.selectedDept = null; // 대학 셀렉트시 기존에 선택했던 학과 초기화
      const selectedDeptCd = selectedItem;
      vm.selectOption.hakguaList = await vm.$fnGetDeptList("H", selectedDeptCd); //대학 셀렉트시 학과 불러오기
    },

    /** 역량 전체 버튼 클릭 시 */
    onClickCoreAll(flag: boolean) {
      const vm = this;
      if (flag) {
        vm.searchList.diagActTargetList = ["1", "2", "3", "4"];
      } else {
        vm.searchList.diagActTargetList = [];
      }
    },

    /** 학년 체크 시 */
    onCheckGrade(grade: string) {
      const vm = this;
      const allGrades = ["1", "2", "3", "4"];

      if (vm.searchList.diagActTargetList.includes(grade)) {
        if (vm.searchList.diagActTargetList.length === allGrades.length) {
          vm.actTargetAll = true; // 모든 학년이 선택된 경우 `재학생 전체` 체크
        }
      } else {
        vm.actTargetAll = false; // `재학생 전체` 체크 해제
      }
    },

    /** 초기화 버튼 클릭 시 */
    onClickReset() {
      const vm = this;
      vm.searchList.diagActTargetList = [];
      vm.actTargetAll = false;

      vm.selectedColg = null;
      vm.selectedDept = null;
    },

    generateSVG() {
      const svg = document.querySelector(".apexcharts-svg")?.outerHTML;
      return svg || "";
    },
    downloadJpg() {
      const vm = this;
      const svgData = vm.generateSVG(vm.chartData.value); // SVG 데이터 생성 함수 호출
      if (svgData) {
        // SVG 데이터를 이미지로 변환하기 위해 캔버스를 생성
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        const img = new Image();
        img.onload = function () {
          // 캔버스 배경을 흰색으로 설정
          canvas.width = img.width;
          canvas.height = img.height;
          context.fillStyle = "#ffffff"; // 흰색 배경
          context.fillRect(0, 0, canvas.width, canvas.height);

          // 캔버스에 이미지 그리기 (배경을 투명하게 설정)
          context.drawImage(img, 0, 0);

          // JPG 이미지로 변환하여 다운로드
          const jpgData = canvas.toDataURL("image/jpeg", 1.0);
          const a = document.createElement("a");
          a.href = jpgData;
          a.download = vm.breadcrumbs[1].title + "_통계_그래프.jpg";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };

        // SVG 데이터를 이미지로 변환하여 화면에 표시
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
      }
    },
  },
};
</script>
