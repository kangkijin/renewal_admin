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
                        <v-autocomplete
                          v-model="regDatas.ecmId"
                          item-title="ecmTitle"
                          item-value="ecmId"
                          :items="categoryList"
                          placeholder="선택"
                        ></v-autocomplete>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">과정명</th>
                      <td>
                        <v-text-field v-model="regDatas.eciTitle" placeholder="과정명을 입력해주세요."></v-text-field>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">사용여부</th>
                      <td>
                        <v-radio-group v-model="regDatas.eciYn" inline>
                          <v-radio label="사용" class="mr-4" value="Y"></v-radio>
                          <v-radio label="미사용" class="mr-4" value="N"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">담당부서/학과</th>
                      <td>
                        <v-autocomplete
                          v-model="regDatas.eciDeptNm"
                          prepend-inner-icon="mdi-magnify"
                          :items="selectOption1.category"
                          placeholder="담당부서/학과를 입력해 주세요."
                        ></v-autocomplete>
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
                        <v-text-field
                          v-model="regDatas.eciDeptNm"
                          placeholder="과정등록 이후 제공됩니다."
                          disabled
                        ></v-text-field>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">참여유형</th>
                      <td>
                        <v-radio-group v-model="regDatas.eciPartiCd" inline>
                          <v-radio label="개인" class="mr-4" value="PERSON"></v-radio>
                          <v-radio label="팀" class="mr-4" value="TEAM"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">이수증 명의</th>
                      <td>
                        <v-text-field
                          v-model="regDatas.eciCertiNm"
                          placeholder="이수증 발급 명의를 입력해주세요."
                        ></v-text-field>
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
                          v-model="regDatas.eciOprtStrYear"
                          prepend-inner-icon="mdi-magnify"
                          :items="selectOption1.year"
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
                          v-model="regDatas.eciDesc"
                          persistent-counter
                          placeholder="사유 및 설명을 입력해주세요."
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">신청서 제출</th>
                      <td>
                        <v-radio-group v-model="regDatas.eciReqYn" inline>
                          <v-radio label="사용" class="mr-4" value="Y"></v-radio>
                          <v-radio label="미사용" class="mr-4" value="N"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">이수증</th>
                      <td>
                        <v-radio-group v-model="regDatas.eciCertiYn" inline>
                          <v-radio label="사용" class="mr-4" value="Y"></v-radio>
                          <v-radio label="미사용" class="mr-4" value="N"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">만족도조사</th>
                      <td>
                        <v-radio-group inline v-model="regDatas.eciSatisYn">
                          <v-radio label="사용" class="mr-4" color="primary" value="Y"></v-radio>
                          <v-radio label="미사용" class="mr-4" color="primary" value="N"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">사전조사</th>
                      <td>
                        <v-radio-group inline v-model="regDatas.eciPreYn">
                          <v-radio label="사용" class="mr-4" color="primary" value="Y"></v-radio>
                          <v-radio label="미사용" class="mr-4" color="primary" value="N"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">사후조사</th>
                      <td>
                        <v-radio-group inline v-model="regDatas.eciAfterYn">
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
                    to="/admin/extraCurricularProgram/profEcp/profCurriMng"
                    >취소</v-btn
                  >
                  <v-btn
                    variant="flat"
                    color="success"
                    width="80"
                    @click="this.tab = 'addInfo'"
                    :disabled="fnNextBtnDisabled"
                    >다음</v-btn
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
                      <th scope="row" class="required">역량</th>
                      <td>
                        <v-row class="ma-0">
                          <v-col v-for="(ability, idx) in regDatas.abilityInfo" :key="idx" cols="2">
                            <div class="d-flex flex-column">
                              <v-checkbox v-model="ability.useYn" :label="ability.text" />
                            </div>
                          </v-col>
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
                    color="error"
                    width="80"
                    class="mr-2"
                    to="/admin/extraCurricularProgram/userEcp/userCurriMng"
                    >취소</v-btn
                  >
                  <v-btn variant="flat" class="mr-2" color="success" width="80" @click="this.tab = 'basicInfo'">
                    이전</v-btn
                  >
                  <v-btn variant="flat" color="info" width="80" :disabled="fnSaveBtnDisabled" @click="fnSaveCurri()">
                    저장</v-btn
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
    rules: [(v: any) => v.length <= 2000 || "2000자 이하로 작성해주세요."],
    rules1: [
      (v: any) => {
        if (/^\d*\.?\d{0,2}$/.test(v)) {
          return true; // 숫자이며 소수점 이하 2자리까지만 입력된 경우
        } else {
          return "숫자와 소수점 이하 2자리까지만 입력해주세요.";
        }
      },
    ],
    rules2: [
      (v: any) => {
        if (/^-?\d+$/.test(v)) {
          return true; // 정수인 경우
        } else {
          return "정수만 입력해주세요.";
        }
      },
    ],
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
      eosId: null, //비교과 과정 추가 정보 id   VARCHAR2(20 BYTE)
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
      abilityInfo: [],
    },
    /** theme breadcrumb */
    title: "과정 수정",
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
  }),
  beforeMount() {
    const vm = this;
    vm.fnGetCategorySelect();
    vm.fnGetAbilityList();
    vm.fnGetCurriDetail();
  },
  computed: {
    fnNextBtnDisabled() {
      const vm = this;
      if (
        vm.regDatas.ecmId != null &&
        vm.regDatas.eciTitle != null &&
        vm.regDatas.eciTitle != "" &&
        vm.regDatas.eciYn != "" &&
        vm.regDatas.eciDeptNm != null &&
        vm.regDatas.eciPartiCd != "" &&
        vm.regDatas.eciCertiNm != "" &&
        vm.regDatas.eciOprtStrYear != null &&
        vm.regDatas.eciDesc != "" &&
        vm.regDatas.eciReqYn != "" &&
        vm.regDatas.eciCertiYn != "" &&
        vm.regDatas.eciSatisYn != "" &&
        vm.regDatas.eciPreYn != "" &&
        vm.regDatas.eciAfterYn != ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    fnSaveBtnDisabled() {
      const vm = this;
      let flag = true;
      if (!vm.fnNextBtnDisableD) {
        for (let i = 0; i < vm.regDatas.abilityInfo.length; i++) {
          if (vm.regDatas.abilityInfo[i].useYn == true) {
            flag = false;
          }
        }
        return flag;
      } else {
        return true;
      }
    },
  },
  methods: {
    //저장
    fnSaveCurri() {
      const vm = this;
      vm.regDatas.regionSelected = vm.regions;
      vm.$loading.show();
      vm.$axios.post("/api/admin/ecpProf/modifyEcpCurri", vm.regDatas).then((res: AxiosResponse) => {
        if (res.data.code == "200") {
          alert("저장되었습니다.");
          location.href = "/admin/extraCurricularProgram/profEcp/profCurriMng";
        }
      });
    },
    fnGetCategorySelect() {
      const vm = this;
      vm.$axios.get("/api/admin/ecpProf/ecpCategorySelect").then((res: AxiosResponse) => {
        const resData = res.data;
        vm.categoryList = resData.data;
      });
    },
    fnGetCurriDetail() {
      const vm = this;
      const param = {
        eciId: vm.$route.query.eciId,
      };
      vm.$axios.get("/api/admin/ecpProf/ecpCurriDetail", { params: param }).then((res: AxiosResponse) => {
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

        console.log(resData.data.abilityInfo);
        console.log(vm.regDatas.abilityInfo);
        for (let i = 0; i < vm.regDatas.abilityInfo.length; i++) {
          for (let j = 0; j < resData.data.abilityInfo.length; j++) {
            if (resData.data.abilityInfo[j].EAI_ABILITY_CODE === vm.regDatas.abilityInfo[i].code) {
              vm.regDatas.abilityInfo[i].useYn = true;
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
    fnGetAbilityList() {
      const vm = this;
      vm.$axios.get("/api/admin/ecpProf/getAbilityCd").then((res: AxiosResponse) => {
        const resData = res.data;
        vm.regDatas.abilityInfo = resData.data;
      });
    },
  },
};
</script>
