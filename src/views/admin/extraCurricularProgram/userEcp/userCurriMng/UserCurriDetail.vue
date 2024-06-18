<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-tabs v-model="tab" color="primary" align-tabs="start">
        <v-tab value="basicInfo">기본 정보</v-tab>
        <v-tab value="addInfo" :disabled="fnNextBtnDisabled">역량·마일리지·추천설정</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="basicInfo">
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
                        {{ categoryNm }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">과정명</th>
                      <td>{{ regDatas.eciTitle }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">사용여부</th>
                      <td>
                        {{ regDatas.eciYn == "Y" ? "사용" : "미사용" }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">담당부서/학과</th>
                      <td>
                        {{ regDatas.eciDeptNm }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        부서/학과변경이력
                        <v-avatar class="mr-1 bg-primary" size="18">
                          <v-icon style="font-size: 12px">mdi-exclamation-thick</v-icon>
                          <v-tooltip>부서/학과변경이력 툴팁입니다</v-tooltip>
                        </v-avatar>
                      </th>
                      <td>
                        <!-- TODO 임시로 부서 학과 변경이력에 담당부서 박아넣었다. -->
                        <div v-for="(dept, idx) in deptHistory" :key="idx">
                          {{ dept.edhDeptNm }} - {{ dept.regDate }}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">참여유형</th>
                      <td>
                        {{ regDatas.eciPartiCd == "PERSON" ? "개인" : "팀" }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">이수증 명의</th>
                      <td>
                        {{ regDatas.eciCertiNm }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">이수증 직인 파일</th>
                      <td>
                        <v-file-input chips counter :show-size="1000"></v-file-input>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">운영시작년도</th>
                      <td>
                        {{ regDatas.eciOprtStrYear }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="">과정 개설 사유 및 설명</th>
                      <td>
                        <!-- :rules="textRules" -->
                        <v-textarea
                          counter
                          v-model="regDatas.eciDesc"
                          persistent-counter
                          readonly
                          placeholder="사유 및 설명을 입력해주세요."
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">신청서 제출</th>
                      <td>
                        {{ regDatas.eciReqYn == "Y" ? "사용" : "미사용" }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">이수증</th>
                      <td>
                        {{ regDatas.eciCertiYn == "Y" ? "사용" : "미사용" }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">만족도조사</th>
                      <td>
                        {{ regDatas.eciSatisYn == "Y" ? "사용" : "미사용" }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">사전조사</th>
                      <td>
                        {{ regDatas.eciPreYn == "Y" ? "사용" : "미사용" }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">사후조사</th>
                      <td>
                        {{ regDatas.eciAfterYn == "Y" ? "사용" : "미사용" }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
                <v-divider />
                <div class="d-flex justify-end pt-4">
                  <v-btn
                    variant="tonal"
                    color="info"
                    width="80"
                    class="mr-2"
                    to="/admin/extraCurricularProgram/userEcp/userCurriMng"
                  >
                    목록</v-btn
                  >
                  <v-btn class="mr-2" variant="flat" color="success" width="80" @click="this.tab = 'addInfo'">
                    다음</v-btn
                  >
                  <v-btn
                    :to="{
                      path: '/admin/extraCurricularProgram/userEcp/userCurriModify',
                      query: { eciId: regDatas.eciId },
                    }"
                  >
                    수정</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </BaseCard>
        </v-window-item>
        <v-window-item value="addInfo">
          <BaseCard title="과정 등록">
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
                          <v-tooltip>난이도 툴팁입니다</v-tooltip>
                        </v-avatar>
                      </th>
                      <td>
                        <div class="d-flex align-center" style="width: 400px">
                          <v-combobox
                            v-model="regDatas.eosLevelMap"
                            item-title="level"
                            item-value="score"
                            :items="selectLevel"
                            disabled
                            @change="fnGetMilege()"
                            placeholder="선택"
                            class="mr-5"
                          />
                          <span class="mr-2">난이도 배점</span>
                          <v-text-field @change="fnGetMilege()" disabled>{{ regDatas.eosLevelMap.score }}</v-text-field>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">참여시간</th>
                      <td class="d-flex">
                        <div class="d-flex align-center mr-4" style="width: 160px">
                          <v-text-field class="mr-2" v-model="regDatas.eosPartiTime" disabled></v-text-field>
                          시간
                        </div>
                        <v-radio-group v-model="regDatas.eosPartiTimeCd" @change="fnGetMilege()" inline>
                          <v-radio readonly value="ECT001" class="flex-0-0 mr-4" label="4시간 이하" />
                          <v-radio readonly value="ECT002" class="flex-0-0 mr-4" label="4시간 초과 ~ 8시간 이하" />
                          <v-radio readonly value="ECT003" class="flex-0-0 mr-4" label="8시간 초과 ~ 16시간 이하" />
                          <v-radio readonly value="ECT004" class="flex-0-0 mr-4" label="16시간 초과 ~ 24시간 이하" />
                          <v-radio readonly value="ECT005" class="flex-0-0 mr-4" label="24시간 이상" />
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">역량</th>
                      <td>
                        <v-row class="ma-0">
                          <v-col v-for="(ability, idx) in regDatas.abilityInfo" :key="idx" cols="4">
                            <div class="d-flex flex-column">
                              <v-checkbox readonly v-model="ability.useYn" :label="ability.text" />
                              <div class="d-inline-flex align-center ml-3" style="width: 120px">
                                <v-text-field
                                  append-inner-icon="mdi-percent"
                                  v-model="ability.percent"
                                  :disabled="ability.useYn != true"
                                  @change="fnGetMilege()"
                                ></v-text-field>
                              </div>
                              <div class="d-flex align-center mt-1 ml-3" style="width: 120px">
                                <v-text-field
                                  readonly
                                  append-inner-icon="mdi-alpha-m"
                                  :disabled="ability.useYn != true"
                                  >{{ fnGetCoreMile(ability.percent) }}</v-text-field
                                >
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">AI 추천 설정</th>
                      <td>
                        <v-row class="mt-1" v-for="(ecaItem, idx) in regDatas.ecaInfo" :key="idx">
                          <v-col cols="12" md="2" class="pb-0">
                            <v-checkbox
                              readonly
                              v-model="ecaItem.useYn"
                              class="d-inline-flex mr-2"
                              :label="ecaItem.text"
                            />
                          </v-col>
                          <v-col cols="12" md="5" class="pb-0">
                            <v-text-field
                              v-model="ecaItem.ecaItemNm"
                              readonly
                              :disabled="ecaItem.useYn != true"
                              placeholder=""
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="2" class="pb-0">
                            <v-autocomplete
                              v-if="idx === 0"
                              v-model="ecaItem.ecaOptionCd"
                              item-title="upDown"
                              readonly
                              item-value="value"
                              :items="AIvalue"
                              placeholder="선택"
                              :disabled="ecaItem.useYn != true"
                            ></v-autocomplete>
                            <v-autocomplete
                              v-else
                              v-model="ecaItem.ecaOptionCd"
                              readonly
                              item-title="text"
                              item-value="value"
                              :items="AIvalue"
                              placeholder="선택"
                              :disabled="ecaItem.useYn != true"
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12" md="2" class="pb-0">
                            <p class="mt-2 ml-2 text-error">{{ ecaItem.caution }}</p>
                          </v-col>
                        </v-row>
                        <v-row class="mb-2 mt-1">
                          <v-col cols="12" md="2" class="pb-0">
                            <v-checkbox v-model="regDatas.distance.useYn" class="d-inline-flex mr-2" label="원거리" />
                          </v-col>
                          <div style="display: inline-flex; margin-left: 10px" class="mt-3">
                            <div v-for="(regionsSelected, idx) in regions" :key="idx" class="d-flex align-center">
                              <div class="mr-2">{{ regionsSelected.regionsSelected }}</div>
                            </div>
                          </div>
                        </v-row>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">보고양식 첨부파일</th>
                      <td>
                        <v-file-input chips counter :show-size="1000">></v-file-input>
                        <!-- TODO -->
                        첨부파일 목록 들어갈 예정
                      </td>
                    </tr>
                  </tbody>
                </v-table>
                <v-divider />
                <div class="d-flex justify-end pt-4">
                  <v-btn
                    variant="tonal"
                    color="info"
                    width="80"
                    class="mr-2"
                    to="/admin/extraCurricularProgram/userEcp/userCurriMng"
                    >목록</v-btn
                  >
                  <v-btn variant="flat" class="mr-2" color="success" width="80" @click="this.tab = 'basicInfo'">
                    이전</v-btn
                  >
                  <v-btn
                    :to="{
                      path: '/admin/extraCurricularProgram/userEcp/userCurriModify',
                      query: { eciId: regDatas.eciId },
                    }"
                  >
                    수정</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </BaseCard>
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import type { AxiosResponse } from "axios";

export default {
  data: () => ({
    regDatas: {
      // 주석, 불필요한 키값 삭제 예정. <!--TODO-->
      eciId: null, //비교과 과정 기본 정보 id   VARCHAR2(20 BYTE)
      ecmId: null, //비교과 카테고리 관리 id  VARCHAR2(20 BYTE)
      eciTitle: "", //과정명  VARCHAR2(200 BYTE)
      eciYn: "", //사용여부   CHAR(1 BYTE)
      edhId: "", //비교과 과정 담당 부서 이력 id  VARCHAR2(20 BYTE)
      eciDeptNm: null, //담당부서/학과명  VARCHAR2(100 BYTE)
      eciPartiCd: "", //참여유형 코드   VARCHAR2(20 BYTE)
      eciCertiNm: "", //이수증 명의   VARCHAR2(200 BYTE)
      eciOprtStrYear: null, //운영시작연도  VARCHAR2(4 BYTE)
      eciDesc: "", //과정 개설 사유 및 설명   VARCHAR2(4000 BYTE)
      eciReqYn: "", //신청서 제출   CHAR(1 BYTE)
      eciCertiYn: "", //이수증  CHAR(1 BYTE)
      eciSatisYn: "", //만족도조사  CHAR(1 BYTE)
      eciPreYn: "", //사전조사  CHAR(1 BYTE)
      eciAfterYn: "", //사후조사  CHAR(1 BYTE)
      totalMileage: 0,
      eosId: null, //비교과 과정 추가 정보 id   VARCHAR2(20 BYTE)
      eosLevelMap: "", //난이도 코드   VARCHAR2(20 BYTE)
      eosScore: "", //배점    VARCHAR2(10 BYTE)
      eosPartiTimeCd: "", //참여시간 코드   VARCHAR2(20 BYTE)
      eosPartiTime: "", //참여시간 텍스트   VARCHAR2(4 BYTE)
      eaiId: "", //비교과 과정 추가정보 역량 정보 id    VARCHAR2(20 BYTE)
      regionSelected: [],
      /** 역량 설정 */
      ecaInfo: [
        {
          ecaItemCd: "ECA001",
          caution: "* 참고: 소수점 2자리 입력",
          useYn: false,
          text: "성적 등락",
          ecaItemNm: null,
          ecaOptionCd: null,
        },
        {
          ecaItemCd: "ECA002",
          caution: "* 참고: 정수 입력",
          useYn: false,
          text: "결석 횟수",
          ecaItemNm: null,
          ecaOptionCd: null,
        },
        {
          ecaItemCd: "ECA003",
          caution: "* 참고: 정수 입력",
          useYn: false,
          text: "성적 경고",
          ecaItemNm: null,
          ecaOptionCd: null,
        },
        {
          ecaItemCd: "ECA004",
          caution: "* 참고: 소수점 2자리 입력",
          useYn: false,
          text: "학점",
          ecaItemNm: null,
          ecaOptionCd: null,
        },
        {
          ecaItemCd: "ECA005",
          caution: "* 참고: 정수 입력",
          useYn: false,
          text: "지도교수 상담",
          ecaItemNm: null,
          ecaOptionCd: null,
        },
        {
          ecaItemCd: "ECA006",
          caution: "* 참고: 정수 입력",
          useYn: false,
          text: "휴학횟수",
          ecaItemNm: null,
          ecaOptionCd: null,
        },
      ],
      // 원거리의 경우 html형태와 데이터 저장 형태가 다르기 때문에 따로 둔다.
      distance: {
        ecaItemCd: "ECA007",
        caution: "* 참고: 원거리 제외 지역 입력, 최대 5개",
        useYn: false,
        text: "원거리",
      },
      abilityInfo: [
        { code: "A001", text: "종합적사고력", useYn: false, percent: 0, mileage: null },
        { code: "A002", text: "자원정보기술활용능력", useYn: false, percent: 0, mileage: null },
        { code: "A003", text: "자기관리역량", useYn: false, percent: 0, mileage: null },
        { code: "A004", text: "의사소통역량", useYn: false, percent: 0, mileage: null },
        { code: "A005", text: "대인관계역량", useYn: false, percent: 0, mileage: null },
        { code: "A006", text: "글로컬역량", useYn: false, percent: 0, mileage: null },
      ],
    },
    /** theme breadcrumb */
    title: "과정 등록",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(학생)", disabled: false },
      { title: "과정 관리", disabled: true },
    ],
    /** tab */
    tab: null,
    categoryList: [],
    selectOption1: {
      year: ["2024", "2023", "2022"],
      value: "",
      category: ["부서 이름1", "부서 이름2", "부서 이름3"],
    },
    ////////////////////////////////////////////////////////////////////
    selectLevel: [
      { level: "A", score: "3.0" },
      { level: "B", score: "2.0" },
      { level: "C", score: "1.0" },
      { level: "D", score: "0.8" },
      { level: "E", score: "0.5" },
    ],
    regions: [],
    ecpCos: "", //AI 추천설정 id
    AIvalue: [
      { text: "이상", upDown: "상승", value: "UP" },
      { text: "이하", upDown: "하락", value: "DOWN" },
    ],
    districts: [],
    selectedRegion: null,
    selectedDistrict: null,
    categoryNm: "",
    deptHistory: [],
  }),
  beforeMount() {
    const vm = this;
    vm.fnGetCurriDetail();
    vm.fnGetDeptHistory();
  },
  methods: {
    //저장
    fnGetCurriDetail() {
      const vm = this;
      const param = {
        eciId: vm.$route.query.eciId,
      };
      vm.$axios.get("/api/admin/ecpUser/ecpCurriDetail", { params: param }).then((res: AxiosResponse) => {
        const resData = res.data;
        vm.regDatas.eciId = resData.data.eciId;
        vm.regDatas.ecmId = resData.data.ecmId;
        vm.regDatas.eciTitle = resData.data.eciTitle;
        vm.regDatas.eciYn = resData.data.eciYn;
        vm.regDatas.edhId = resData.data.edhId;
        vm.regDatas.eciDeptNm = resData.data.eciDeptNm;
        vm.regDatas.eciPartiCd = resData.data.eciPartiCd;
        vm.regDatas.eciCertiNm = resData.data.eciCertiNm;
        vm.regDatas.eciOprtStrYear = resData.data.eciOprtStrYear;
        vm.regDatas.eciDesc = resData.data.eciDesc;
        vm.regDatas.eciReqYn = resData.data.eciReqYn;
        vm.regDatas.eciCertiYn = resData.data.eciCertiYn;
        vm.regDatas.eciSatisYn = resData.data.eciSatisYn;
        vm.regDatas.eciPreYn = resData.data.eciPreYn;
        vm.regDatas.eciAfterYn = resData.data.eciAfterYn;
        vm.regDatas.eosId = resData.data.eosId;
        vm.regDatas.eosPartiTime = resData.data.eosPartiTime;
        vm.regDatas.eosPartiTimeCd = resData.data.eosPartiTimeCd;
        vm.regDatas.eosScore = resData.data.eosScore;
        vm.categoryNm = resData.data.categoryNm;
        vm.regDatas.eosLevelMap = vm.selectLevel.find(
          (item: { score: number }) => item.score === resData.data.eosScore,
        );

        let getRegion = [];
        for (let i = 0; i < vm.regDatas.ecaInfo.length; i++) {
          for (let j = 0; j < resData.data.ecaInfo.length; j++) {
            if (resData.data.ecaInfo[j].ECA_ITEM_CD === vm.regDatas.ecaInfo[i].ecaItemCd) {
              vm.regDatas.ecaInfo[i].useYn = true;
              vm.regDatas.ecaInfo[i].ecaItemNm = resData.data.ecaInfo[j].ECA_ITEM_NM;
              vm.regDatas.ecaInfo[i].ecaOptionCd = resData.data.ecaInfo[j].ECA_OPTION_CD;
              break;
            }
            if (resData.data.ecaInfo[j].ECA_ITEM_CD === "ECA007" && getRegion.length == 0) {
              vm.regDatas.distance.useYn = true;
              getRegion = resData.data.ecaInfo[j].ECA_ITEM_NM.split("|");
              for (let k = 0; k < getRegion.length; k++) {
                if (getRegion[k] != "") {
                  vm.regions.push({ regionsSelected: getRegion[k] });
                }
              }

              break;
            }
          }
        }

        for (let i = 0; i < vm.regDatas.abilityInfo.length; i++) {
          for (let j = 0; j < resData.data.abilityInfo.length; j++) {
            if (resData.data.abilityInfo[j].EAI_ABILITY_CODE === vm.regDatas.abilityInfo[i].code) {
              vm.regDatas.abilityInfo[i].useYn = true;
              vm.regDatas.abilityInfo[i].percent = resData.data.abilityInfo[j].EAI_PERCENT;
              vm.regDatas.abilityInfo[i].mileage = resData.data.abilityInfo[j].MILEAGE_SCORE;
              break;
            }
          }
        }
        vm.fnGetMilege();
      });
    },
    populateDistricts() {
      const vm = this;
      const selectedRegion = vm.selectedRegion;
      if (selectedRegion !== "") {
        vm.districts = vm.districtMap[selectedRegion];
        vm.selectedDistrict = null;
      } else {
        vm.districts = [];
      }
    },
    fnGetMilege() {
      const vm = this;
      let timePoint =
        vm.regDatas.eosPartiTimeCd === "ECT001"
          ? 1000
          : vm.regDatas.eosPartiTimeCd === "ECT002"
            ? 2000
            : vm.regDatas.eosPartiTimeCd === "ECT003"
              ? 3000
              : vm.regDatas.eosPartiTimeCd === "ECT004"
                ? 4000
                : vm.regDatas.eosPartiTimeCd === "ECT005"
                  ? 5000
                  : 0;
      vm.regDatas.totalMileage = vm.regDatas.eosLevelMap.score * timePoint;
    },
    fnGetCoreMile(percent: number) {
      const vm = this;
      return (vm.regDatas.totalMileage / 100) * percent;
    },
    fnGetDeptHistory() {
      const vm = this;
      const param = {
        eciId: vm.$route.query.eciId,
      };
      vm.$axios.get("/api/admin/ecpDeptHistory", { params: param }).then((res: AxiosResponse) => {
        const resData = res.data;
        vm.deptHistory = resData.data;
        console.log(vm.deptHistory);
      });
    },
  },
};
</script>
