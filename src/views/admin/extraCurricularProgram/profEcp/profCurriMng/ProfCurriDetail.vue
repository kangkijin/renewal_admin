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
                        <v-text-field
                          v-model="regDatas.eciDeptNm"
                          value="과정등록 이후 제공됩니다."
                          disabled
                        ></v-text-field>
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
                      <th scope="row" class="required">역량</th>
                      <td>
                        <v-row class="ma-0">
                          <v-col v-for="(ability, idx) in regDatas.abilityInfo" :key="idx" cols="2">
                            <div class="d-flex flex-column">
                              <v-checkbox readonly v-model="ability.useYn" :label="ability.text" />
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
      abilityInfo: [],
    },
    /** theme breadcrumb */
    title: "과정 조회",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(교수)", disabled: false },
      { title: "과정 관리", disabled: true },
    ],
    /** tab */
    tab: null,
    categoryList: [],
    categoryNm: "",
  }),
  beforeMount() {
    const vm = this;
    vm.fnGetAbilityList();
    vm.fnGetCurriDetail();
  },
  methods: {
    //저장
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
        vm.categoryNm = resData.data.categoryNm;

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
