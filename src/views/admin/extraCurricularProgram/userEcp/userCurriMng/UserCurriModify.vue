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
                          v-model="regDatas.eciDeptCd"
                          prepend-inner-icon="mdi-magnify"
                          item-title="deptKorNm"
                          item-value="deptCd"
                          :items="deptList"
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
                        <div v-for="(dept, idx) in deptHistory" :key="idx">
                          {{ dept.edhDeptNm }} - {{ dept.regDate }}
                        </div>
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
                    to="/admin/extraCurricularProgram/userEcp/userCurriMng"
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
                          <v-text-field
                            class="mr-2"
                            :rules="rules2"
                            v-model="regDatas.eosPartiTime"
                            :disabled="regDatas.eosPartiTimeCd != 'ECT001'"
                          ></v-text-field>
                          시간
                        </div>
                        <v-radio-group v-model="regDatas.eosPartiTimeCd" @change="fnGetMilege()" inline>
                          <v-radio value="ECT001" class="flex-0-0 mr-4" label="4시간 이하" />
                          <v-radio value="ECT002" class="flex-0-0 mr-4" label="4시간 초과 ~ 8시간 이하" />
                          <v-radio value="ECT003" class="flex-0-0 mr-4" label="8시간 초과 ~ 16시간 이하" />
                          <v-radio value="ECT004" class="flex-0-0 mr-4" label="16시간 초과 ~ 24시간 이하" />
                          <v-radio value="ECT005" class="flex-0-0 mr-4" label="24시간 이상" />
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">역량</th>
                      <td>
                        <v-row class="ma-0">
                          <v-col v-for="(ability, idx) in regDatas.abilityInfo" :key="idx" cols="4">
                            <div class="d-flex flex-column">
                              <v-checkbox v-model="ability.useYn" :label="ability.text" />
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
                            <v-checkbox v-model="ecaItem.useYn" class="d-inline-flex mr-2" :label="ecaItem.text" />
                          </v-col>
                          <v-col cols="12" md="5" class="pb-0">
                            <v-text-field
                              :rules="idx == 0 || idx == 3 ? rules1 : rules2"
                              v-model="ecaItem.ecaItemNm"
                              :disabled="ecaItem.useYn != true"
                              placeholder=""
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="2" class="pb-0">
                            <v-autocomplete
                              v-if="idx === 0"
                              v-model="ecaItem.ecaOptionCd"
                              item-title="upDown"
                              item-value="value"
                              :items="AIvalue"
                              placeholder="선택"
                              :disabled="ecaItem.useYn != true"
                            ></v-autocomplete>
                            <v-autocomplete
                              v-else
                              v-model="ecaItem.ecaOptionCd"
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
                          <v-col cols="12" md="3" class="pb-0">
                            <v-autocomplete
                              v-model="selectedRegion"
                              :items="region"
                              placeholder="선택"
                              @update:modelValue="populateDistricts"
                              :disabled="regDatas.distance.useYn != true"
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12" md="3" class="pb-0">
                            <v-autocomplete
                              v-model="selectedDistrict"
                              :disabled="regDatas.distance.useYn != true"
                              :items="districts"
                              placeholder="선택"
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12" md="1" class="pb-0 aligne-center">
                            <v-btn
                              color="success"
                              width="80"
                              @click="onClickAddRow()"
                              :disabled="selectedRegion === null"
                            >
                              추가</v-btn
                            >
                          </v-col>
                          <v-col cols="12" md="3" class="pb-0">
                            <p class="mt-2 ml-2 text-error">* 참고: 원거리 제외 지역입력, 최대 5개</p>
                          </v-col>
                        </v-row>
                        <div style="display: inline-flex; margin-left: 18%">
                          <div v-for="(regionsSelected, idx) in regions" :key="idx" class="d-flex align-center">
                            <div>{{ regionsSelected.regionsSelected }}</div>
                            <v-btn
                              v-if="idx != 5"
                              icon="mdi-minus-box-outline"
                              variant="flat"
                              class="filter_red"
                              color="transparent"
                              @click="onClickDelRow(idx)"
                            ></v-btn>
                          </div>
                        </div>
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
      eciDeptCd: "",
      edhDeptCd: "",
      eciDeptCdCur: "",
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
    region: [
      "서울특별시",
      "인천광역시",
      "부산광역시",
      "대전광역시",
      "대구광역시",
      "울산광역시",
      "광주광역시",
      "제주특별자치도",
      "세종특별자치시",
      "경기도",
      "강원도",
      "충청북도",
      "충청남도",
      "경상북도",
      "경상남도",
      "전라북도",
      "전라남도",
    ],
    districtMap: {
      서울특별시: [
        "강남구",
        "강동구",
        "강북구",
        "강서구",
        "관악구",
        "광진구",
        "구로구",
        "금천구",
        "노원구",
        "도봉구",
        "동대문구",
        "동작구",
        "마포구",
        "서대문구",
        "서초구",
        "성동구",
        "성북구",
        "송파구",
        "양천구",
        "영등포구",
        "용산구",
        "은평구",
        "종로구",
        "중구",
        "중랑구",
      ],
      인천광역시: ["계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "중구"],
      부산광역시: [
        "강서구",
        "금정구",
        "남구",
        "동구",
        "동래구",
        "부산진구",
        "북구",
        "사상구",
        "사하구",
        "서구",
        "수영구",
        "연제구",
        "영도구",
        "중구",
        "해운대구",
      ],
      대전광역시: ["대덕구", "동구", "서구", "유성구", "중구"],
      대구광역시: ["남구", "달서구", "달서군", "동구", "북구", "서구", "수성구", "중구"],
      울산광역시: ["남구", "동구", "북구", "중구", "울주군"],
      광주광역시: ["광산구", "남구", "동구", "북구", "서구"],
      제주특별자치도: ["서귀포시", "제주시"],
      세종특별자치시: ["세종특별자치시"],
      경기도: [
        "고양시",
        "과천시",
        "광명시",
        "광주시",
        "구리시",
        "군포시",
        "김포시",
        "남양주시",
        "동두천시",
        "부천시",
        "성남시",
        "수원시",
        "시흥시",
        "안산시",
        "안성시",
        "안양시",
        "양주시",
        "여주시",
        "오산시",
        "용인시",
        "의왕시",
        "의정부시",
        "이천시",
        "파주시",
        "평택시",
        "포천시",
        "하남시",
        "화성시",
        "가평군",
        "양평군",
        "연천군",
      ],
      강원도: [
        "강릉시",
        "동해시",
        "삼척시",
        "속초시",
        "원주시",
        "춘천시",
        "태백시",
        "고성군",
        "양구군",
        "양양군",
        "영월군",
        "인제군",
        "정선군",
        "철원군",
        "평창군",
        "홍천군",
        "화천군",
        "횡성군",
      ],
      충청북도: [
        "제천시",
        "청주시",
        "충주시",
        "괴산군",
        "단양군",
        "보은군",
        "영동군",
        "옥천군",
        "음성군",
        "증평군",
        "진천군",
      ],
      충청남도: [
        "계룡시",
        "공주시",
        "논산시",
        "당진시",
        "보령시",
        "서산시",
        "아산시",
        "천안시",
        "금산군",
        "부여군",
        "서천군",
        "예산군",
        "청양군",
        "태안군",
        "홍성군",
      ],
      경상북도: [
        "경산시",
        "경주시",
        "구미시",
        "김천시",
        "문경시",
        "상주시",
        "안동시",
        "영주시",
        "영천시",
        "포항시",
        "고령군",
        "군위군",
        "봉화군",
        "성주군",
        "영덕군",
        "영양군",
        "예천군",
        "울릉군",
        "울진군",
        "의성군",
        "청도군",
        "청송군",
        "칠곡군",
      ],
      경상남도: [
        "거제시",
        "김해시",
        "밀양시",
        "사천시",
        "양산시",
        "진주시",
        "창원시",
        "통영시",
        "거창군",
        "고성군",
        "남해군",
        "산청군",
        "의령군",
        "창녕군",
        "하동군",
        "함안군",
        "함양군",
        "합천군",
      ],
      전라북도: [
        "군산시",
        "김제시",
        "남원시",
        "익산시",
        "전주시",
        "정읍시",
        "고창군",
        "무주군",
        "부안군",
        "순창군",
        "완주군",
        "임실군",
        "장수군",
        "진안군",
      ],
      전라남도: [
        "광양시",
        "나주시",
        "목포시",
        "순천시",
        "여수시",
        "강진군",
        "고흥군",
        "곡성군",
        "구례군",
        "담양군",
        "무안군",
        "보성군",
        "신안군",
        "영광군",
        "영암군",
        "완도군",
        "장성군",
        "장흥군",
        "진도군",
        "함평군",
        "해남군",
        "화순군",
      ],
    },
    districts: [],
    selectedRegion: null,
    selectedDistrict: null,
    deptList: [],
    deptHistory: [],
  }),
  beforeMount() {
    const vm = this;
    vm.fnGetDeptSelect();
    vm.fnGetCategorySelect();
    vm.fnGetCurriDetail();
    vm.fnGetDeptHistory();
  },
  computed: {
    fnNextBtnDisabled() {
      const vm = this;
      if (
        vm.regDatas.ecmId != null &&
        vm.regDatas.eciTitle != null &&
        vm.regDatas.eciTitle != "" &&
        vm.regDatas.eciYn != "" &&
        vm.regDatas.eciDeptCd != null &&
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
      let flag1 = true;
      if (
        !vm.fnNextBtnDisabled &&
        vm.regDatas.eosLevelMap != "" &&
        (vm.regDatas.eosPartiTimeCd == "ECT001" ? vm.regDatas.eosPartiTime != "" : vm.regDatas.eosPartiTimeCd != "")
      ) {
        let totalPer = 0;
        for (let i = 0; i < vm.regDatas.abilityInfo.length; i++) {
          if (
            vm.regDatas.abilityInfo[i].useYn == true &&
            vm.regDatas.abilityInfo[i].percent != "" &&
            vm.regDatas.abilityInfo[i].percent != 0
          ) {
            totalPer += parseInt(vm.regDatas.abilityInfo[i].percent);
          } else if (
            vm.regDatas.abilityInfo[i].useYn == true &&
            (vm.regDatas.abilityInfo[i].percent == 0 || vm.regDatas.abilityInfo[i].percent == 0)
          ) {
            flag = true;
          }
        }
        if (totalPer === 100) {
          flag = false;
        }
        //리스트업 되어있는 값 중
        for (let i = 0; i < vm.regDatas.ecaInfo.length; i++) {
          if (
            vm.regDatas.distance.useYn == true ||
            (vm.regDatas.ecaInfo[i].useYn == true &&
              vm.regDatas.ecaInfo[i].ecaItemNm != "" &&
              vm.regDatas.ecaInfo[i].ecaOptionCd != "" &&
              vm.regDatas.ecaInfo[i].ecaItemNm != null &&
              vm.regDatas.ecaInfo[i].ecaOptionCd != null)
          ) {
            flag1 = false;
          } else if (
            vm.regDatas.ecaInfo[i].useYn == true &&
            (vm.regDatas.ecaInfo[i].ecaItemNm == "" ||
              vm.regDatas.ecaInfo[i].ecaOptionCd == "" ||
              vm.regDatas.ecaInfo[i].ecaItemNm == null ||
              vm.regDatas.ecaInfo[i].ecaOptionCd == null)
          ) {
            flag1 = true;
          }
        }

        if (vm.regDatas.distance.useYn == true && vm.regions.length == 0) {
          flag1 = true;
        }
        return flag === false && flag1 === false ? false : true;
      } else {
        return true;
      }
    },
  },
  methods: {
    //저장
    fnSaveCurri() {
      const vm = this;
      vm.regDatas.eciDeptNm = vm.deptList.find(
        (item: { korNm: number }) => item.deptCd === vm.regDatas.eciDeptCd,
      ).deptKorNm;
      vm.regDatas.regionSelected = vm.regions;
      vm.$loading.show();
      vm.$axios.post("/api/admin/ecpUser/modifyEcpCurri", vm.regDatas).then((res: AxiosResponse) => {
        if (res.data.code == "200") {
          alert("저장되었습니다.");
          location.href = "/admin/extraCurricularProgram/userEcp/userCurriMng";
        }
      });
    },
    fnGetCategorySelect() {
      const vm = this;
      vm.$axios.get("/api/admin/ecpUser/ecpCategorySelect").then((res: AxiosResponse) => {
        const resData = res.data;
        vm.categoryList = resData.data;
      });
    },
    fnGetCurriDetail() {
      const vm = this;
      const param = {
        eciId: vm.$route.query.eciId,
      };
      vm.$axios.get("/api/admin/ecpUser/ecpCurriDetail", { params: param }).then((res: AxiosResponse) => {
        const resData = res.data;
        console.log(resData.data);
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
        vm.regDatas.eciDeptCdCur = resData.data.edhDeptCd;
        vm.regDatas.eciDeptCd = resData.data.edhDeptCd;
        vm.regDatas.edhDeptCd = resData.data.edhDeptCd;
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
    onClickAddRow() {
      const vm = this;
      const rName = vm.selectedRegion + " " + (vm.selectedDistrict === null ? "" : vm.selectedDistrict);
      // 중복 체크
      const isDuplicate = vm.regions.some((region: Map) => region.regionsSelected === rName);

      if (!isDuplicate) {
        if (vm.regions.length < 5) {
          vm.regions.push({ regionsSelected: rName });
        } else {
          alert("최대 5개의 지역만 입력 가능합니다.");
        }
      } else {
        alert("이미 선택된 지역입니다.");
      }
    },
    onClickDelRow(idx: number) {
      const vm = this;
      const tempArr1 = vm.regions.slice(0, idx);
      const tempArr2 = vm.regions.slice(idx + 1, vm.regions.length);
      vm.regions = [...tempArr1, ...tempArr2];
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
    fnGetDeptSelect() {
      const vm = this;
      vm.$axios.get("/api/admin/ecpDeptList").then((res: AxiosResponse) => {
        const resData = res.data;
        vm.deptList = resData.data;
      });
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
