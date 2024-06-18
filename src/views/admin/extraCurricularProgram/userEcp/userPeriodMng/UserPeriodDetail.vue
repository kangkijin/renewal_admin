<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-tabs v-model="tab" color="primary" align-tabs="start">
        <v-tab value="basicInfo">기본정보</v-tab>
        <v-tab value="addInfo">추가정보</v-tab>
        <v-tab value="attentSetup">입과자 설정</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="basicInfo">
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
                        {{ categoryNm }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">과정</th>
                      <td>{{ eciTitle }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">차수명</th>
                      <td>{{ regDatas.eliTitle }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">담당부서/학과</th>
                      <td>{{ eciDeptNm }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">담당자</th>
                      <td>{{ regDatas.eliStfNm }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">담당자 연락처</th>
                      <td>{{ regDatas.eliStfPh }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">참여유형</th>
                      <td>
                        <v-radio-group v-model="regDatas.eliPartiCd" readonly inline>
                          <v-radio label="개인" class="mr-4" value="PERSON"></v-radio>
                          <v-radio label="팀" class="mr-4" value="TEAM"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">운영학년도</th>
                      <td>{{ regDatas.eliOprtYear }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">운영학기</th>
                      <td>{{ regDatas.eliOprtTerm }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">신청기간</th>
                      <td>
                        <div class="d-flex mt-2 justify-start align-center">
                          {{ regDatas.eliReqStrDate }}
                          {{ regDatas.eliReqStrTime }}
                          <span class="mx-1">~</span>
                          {{ regDatas.eliReqEndDate }}
                          {{ regDatas.eliReqEndTime }}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">운영기간</th>
                      <td>
                        <div class="d-flex mt-2 justify-start align-center">
                          {{ regDatas.eliOprtStrDate }}
                          {{ regDatas.eliOprtStrTime }}
                          <span class="mx-1">~</span>
                          {{ regDatas.eliOprtEndDate }}
                          {{ regDatas.eliOprtEndTime }}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th class="required">신청/대기 인원</th>
                      <td>
                        <div class="d-flex">
                          <div class="d-flex align-center mr-4" style="width: 50px">{{ regDatas.eliRecrtCnt }} 명</div>
                          <v-checkbox readonly v-model="regDatas.eliWaitYn" class="flex-0-0 mr-4" label="대기 선택" />
                          <div class="d-flex align-center mr-4" style="width: 100px" v-if="regDatas.eliWaitYn === true">
                            {{ regDatas.eliWaitCnt }}
                            명
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">프로그램 소개 및 유의사항</th>
                      <td>
                        <ckeditor
                          :editor="editor"
                          disabled
                          v-model="regDatas.eliDesc"
                          :config="editorConfig"
                          style="min-height: 200px"
                        ></ckeditor>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">썸네일 이미지</th>
                      <td>
                        <div class="img_wrap">
                          <img :src="etiUrl" alt="비교과 이미지" />
                        </div>
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
                        <v-radio-group v-model="eciCertiYn" readonly inline>
                          <v-radio label="사용" class="mr-4" value="Y"></v-radio>
                          <v-radio label="미사용" class="mr-4" value="N"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">만족도조사</th>
                      <td>
                        <v-radio-group inline v-model="eciSatisYn" readonly>
                          <v-radio label="사용" class="mr-4" color="primary" value="Y"></v-radio>
                          <v-radio label="미사용" class="mr-4" color="primary" value="N"></v-radio>
                        </v-radio-group>
                        <template v-if="eciSatisYn === 'Y'">
                          <div class="d-flex mt-2 justify-start align-center">
                            <v-checkbox v-model="regDatas.eliSatisYn" class="flex-0-0 mr-4" label="기간설정" />
                            {{ regDatas.eliSatisStrDate }}
                            {{ regDatas.eliSatisStrTime }}
                            <span class="mx-1">~</span>
                            {{ regDatas.eliSatisEndDate }}
                            {{ regDatas.eliSatisEndTime }}
                          </div>
                          <p class="mt-1 text-error">* 기간 설정 미사용 시 입과승인 후 진행됩니다.</p>
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">사전조사</th>
                      <td>
                        <v-radio-group inline v-model="eciPreYn" readonly>
                          <v-radio label="사용" class="mr-4" color="primary" value="Y"></v-radio>
                          <v-radio label="미사용" class="mr-4" color="primary" value="N"></v-radio>
                        </v-radio-group>
                        <template v-if="eciPreYn === 'Y'">
                          <div class="d-flex mt-2 justify-start align-center">
                            <v-checkbox v-model="regDatas.eliPreYn" class="flex-0-0 mr-4" label="기간설정" />
                            {{ regDatas.eliPreStrDate }}
                            {{ regDatas.eliPreStrTime }}
                            <span class="mx-1">~</span>
                            {{ regDatas.eliPreEndDate }}
                            {{ regDatas.eliPreEndTime }}
                          </div>
                          <p class="mt-1 text-error">* 기간 설정 미사용 시 운영 종료 후 진행됩니다.</p>
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">사후조사</th>
                      <td>
                        <v-radio-group inline v-model="eciAfterYn" readonly>
                          <v-radio label="사용" class="mr-4" color="primary" value="Y"></v-radio>
                          <v-radio label="미사용" class="mr-4" color="primary" value="N"></v-radio>
                        </v-radio-group>
                        <template v-if="eciAfterYn === 'Y'">
                          <div class="d-flex mt-2 justify-start align-center">
                            <v-checkbox v-model="regDatas.eliAfterYn" class="flex-0-0 mr-4" label="기간설정" />
                            {{ regDatas.eliAfterStrDate }}
                            {{ regDatas.eliAfterStrTime }}
                            <span class="mx-1">~</span>
                            {{ regDatas.eliAfterEndDate }}
                            {{ regDatas.eliAfterEndTime }}
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
                    v-if="$route.query.aprvYn === 'Y'"
                    variant="tonal"
                    color="info"
                    width="80"
                    class="mr-2"
                    to="/admin/extraCurricularProgram/userEcp/userPeriodAprv"
                    >목록</v-btn
                  >
                  <v-btn
                    v-else
                    variant="tonal"
                    color="info"
                    width="80"
                    class="mr-2"
                    to="/admin/extraCurricularProgram/userEcp/userPeriodMng"
                    >목록</v-btn
                  >
                  <v-btn class="mr-2" variant="flat" color="success" width="80" @click="this.tab = 'addInfo'">
                    다음</v-btn
                  >
                  <v-btn
                    v-if="$route.query.aprvYn !== 'Y'"
                    :to="{
                      path: '/admin/extraCurricularProgram/userEcp/userPeriodModify',
                      query: { eliId: regDatas.eliId },
                    }"
                    >수정</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </BaseCard>
        </v-window-item>
        <v-window-item value="addInfo">
          <!-- 추가정보 페이지 -->
          <BaseCard title="추가정보">
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
                          <!-- TODO SB 툴팁 내용 누락 -->
                          <v-tooltip>난이도 툴팁입니다.</v-tooltip>
                        </v-avatar>
                      </th>
                      <td>
                        <div class="d-flex align-center" style="width: 400px">
                          <v-combobox
                            v-model="eosLevelMap"
                            readonly
                            item-title="level"
                            item-value="score"
                            :items="selectLevel"
                            placeholder="선택"
                            class="mr-5"
                          />
                          <span class="mr-2">난이도 배점</span>
                          <v-text-field disabled>{{ eosLevelMap.score }}</v-text-field>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">참여시간</th>
                      <td class="d-flex">
                        <div class="d-flex align-center mr-4" style="width: 160px">
                          <v-text-field
                            class="mr-2"
                            readonly
                            v-model="eosPartiTime"
                            :disabled="eosPartiTimeCd != 'ECT001'"
                          ></v-text-field>
                          시간
                        </div>
                        <v-radio-group v-model="eosPartiTimeCd" inline readonly>
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
                          <v-col v-for="(ability, idx) in abilityInfo" :key="idx" cols="4">
                            <div class="d-flex flex-column">
                              <v-checkbox v-model="ability.useYn" :label="ability.text" readonly />
                              <div class="d-inline-flex align-center ml-3" style="width: 120px">
                                <v-text-field
                                  readonly
                                  append-inner-icon="mdi-percent"
                                  v-model="ability.percent"
                                  :disabled="ability.useYn != true"
                                ></v-text-field>
                              </div>
                              <div class="d-flex align-center mt-1 ml-3" style="width: 120px">
                                <v-text-field
                                  readonly
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
                      <th scope="row" class="required">AI 추천 설정</th>
                      <td>
                        <v-row class="mt-1" v-for="(ecaItem, idx) in ecaInfo" :key="idx">
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
                              readonly
                              v-model="ecaItem.ecaItemNm"
                              :disabled="ecaItem.useYn != true"
                              placeholder=""
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="2" class="pb-0">
                            <v-autocomplete
                              v-if="idx === 0"
                              readonly
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
                            <v-checkbox readonly v-model="distance.useYn" class="d-inline-flex mr-2" label="원거리" />
                          </v-col>
                          <v-col cols="12" md="10" class="mt-3">
                            <div style="display: inline-flex">
                              <div v-for="(regionsSelected, idx) in regions" :key="idx" class="d-flex align-center">
                                <div class="mr-2">{{ regionsSelected }}</div>
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">보고양식 첨부파일</th>
                      <td>양식 첨부 파일이 들어갈 예정</td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">프로그램 목적 및 필요성</th>
                      <td>{{ regDatas.elsProgGoal }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">주요 교육 내용</th>
                      <td>{{ regDatas.elsMainEduCont }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">기대효과</th>
                      <td>{{ regDatas.elsBenefit }}</td>
                    </tr>
                  </tbody>
                </v-table>
                <v-divider />
                <div class="d-flex justify-end pt-4">
                  <v-btn
                    v-if="$route.query.aprvYn === 'Y'"
                    variant="tonal"
                    color="info"
                    width="80"
                    class="mr-2"
                    to="/admin/extraCurricularProgram/userEcp/userPeriodAprv"
                    >목록</v-btn
                  >
                  <v-btn
                    v-else
                    variant="tonal"
                    color="info"
                    width="80"
                    class="mr-2"
                    to="/admin/extraCurricularProgram/userEcp/userPeriodMng"
                    >목록</v-btn
                  >
                  <v-btn class="mr-2" variant="flat" color="success" width="80" @click="this.tab = 'basicInfo'">
                    이전</v-btn
                  >
                  <v-btn class="mr-2" variant="flat" color="success" width="80" @click="this.tab = 'attentSetup'">
                    다음</v-btn
                  >
                  <v-btn
                    v-if="$route.query.aprvYn !== 'Y'"
                    :to="{
                      path: '/admin/extraCurricularProgram/userEcp/userPeriodModify',
                      query: { eliId: regDatas.eliId },
                    }"
                    >수정</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </BaseCard>
        </v-window-item>
        <v-window-item value="attentSetup">
          <!-- 입과자 페이지 -->
          <BaseCard title="입과자 설정">
            <v-row>
              <v-col cols="12">
                <v-table>
                  <colgroup>
                    <col style="width: 20%" />
                    <col style="width: auto" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row" class="required">신청대상자 1</th>
                      <td>
                        <div class="d-flex align-center">
                          <v-checkbox
                            readonly
                            v-model="regDatas.elsApplyTargetCd"
                            value="All"
                            class="flex-0-0 mr-4"
                            label="재학생 전체"
                          />
                          <v-checkbox
                            readonly
                            v-model="regDatas.elsApplyTargetCd"
                            value="1"
                            class="flex-0-0 mr-4"
                            label="1학년"
                          />
                          <v-checkbox
                            readonly
                            v-model="regDatas.elsApplyTargetCd"
                            value="2"
                            class="flex-0-0 mr-4"
                            label="2학년"
                          />
                          <v-checkbox
                            readonly
                            v-model="regDatas.elsApplyTargetCd"
                            value="3"
                            class="flex-0-0 mr-4"
                            label="3학년"
                          />
                          <v-checkbox
                            readonly
                            v-model="regDatas.elsApplyTargetCd"
                            value="4"
                            class="flex-0-0 mr-4"
                            label="4학년"
                          />
                          <v-checkbox
                            readonly
                            v-model="regDatas.elsApplyTargetCd"
                            value="REST"
                            class="flex-0-0 mr-4"
                            label="휴학생"
                          />
                          <v-checkbox
                            readonly
                            v-model="regDatas.elsApplyTargetCd"
                            value="GRDT"
                            class="flex-0-0 mr-4"
                            label="졸업생"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">신청대상자 2</th>
                      <td class="d-flex">
                        <!--TODO 추후 부서 선정부분에 대해 정해진 것이 생기면 신청 대상 부서 나열시킬것.-->
                        <div class="d-flex align-center mr-4" style="width: 400px"></div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">신청접수여부</th>
                      <td class="d-flex">
                        <div class="d-flex align-center mr-4" style="width: 400px">
                          <v-switch color="primary" :model-value="true" readonly></v-switch>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
              <v-col>
                <BaseCard>
                  <template v-slot:title>
                    <div class="text-h4">입과자 직접 등록 목록</div>
                  </template>
                  <BaseTableConfig
                    :totalCnt="list.length"
                    checked
                    :checkedCnt="selectedItems.length"
                    @update:rowPerPage="updateRowPerPage"
                  >
                    <template #top-btn-area>
                      <v-btn>엑셀 다운로드</v-btn>
                    </template>
                    <template #left-btn-area>
                      <v-btn color="grey" class="mr-2" :disabled="selectedItems.length === 0">삭제</v-btn>
                      <v-btn color="grey" class="mr-2">전체 삭제</v-btn>
                      <v-text-field class="mr-2" placeholder="팀명을 입력해주세요" style="width: 160px"></v-text-field>
                      <v-btn color="grey" class="mr-2" :disabled="selectedItems.length === 0">팀명 등록</v-btn>
                      <v-autocomplete class="mr-2" :items="selectOption1.year" placeholder="선택"></v-autocomplete>
                      <v-btn color="grey" :disabled="selectedItems.length === 0">팀장 여부 등록</v-btn>
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
                  </v-easy-table>
                </BaseCard>
                <v-divider />
                <div class="d-flex justify-end pt-4">
                  <v-btn
                    v-if="$route.query.aprvYn === 'Y'"
                    variant="tonal"
                    color="info"
                    width="80"
                    class="mr-2"
                    to="/admin/extraCurricularProgram/userEcp/userPeriodAprv"
                    >목록</v-btn
                  >
                  <v-btn
                    v-else
                    variant="tonal"
                    color="info"
                    width="80"
                    class="mr-2"
                    to="/admin/extraCurricularProgram/userEcp/userPeriodMng"
                  >
                    목록</v-btn
                  >
                  <v-btn class="mr-2" variant="flat" color="success" width="80" @click="this.tab = 'addInfo'">
                    이전</v-btn
                  >
                  <v-btn
                    v-if="$route.query.aprvYn !== 'Y'"
                    :to="{
                      path: '/admin/extraCurricularProgram/userEcp/userPeriodModify',
                      query: { eliId: regDatas.eliId },
                    }"
                    >수정</v-btn
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
/** ck에디터 */
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";

export default {
  data: () => ({
    selectOption1: {
      year: ["2024", "2023", "2022"],
      value: "2024",
      category: ["선택1", "선택2", "선택3"],
    },
    /** theme breadcrumb */
    title: "차수 조회",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(학생)", disabled: false },
      { title: "차수 관리", disabled: true },
    ],
    checkWait: false,

    /** ck에디터 */
    editor: ClassicEditor,
    editorData: "",
    editorConfig: {
      placeholder: "프로그램 소개 및 유의사항을 입력해주세요",
    },

    tab: null,
    regDatas: {
      eliId: "", //비교과 차수 기본 정보 id   VARCHAR2(20 BYTE)
      eciId: "", //비교과 과정 기본 정보 id   VARCHAR2(20 BYTE)
      eliTitle: "", //비교과 차수명   VARCHAR2(100 BYTE)
      edhId: "", //비교과 과정 담당 부서 이력 id   VARCHAR2(20 BYTE)
      eliDeptNm: "", //담당부서/학과명   VARCHAR2(100 BYTE)
      eliStfId: "", //운영담당자 id   VARCHAR2(20 BYTE)
      eliStfNm: "", //운영담당자명   VARCHAR2(50 BYTE)
      eliStfPh: "", //담당자 연락처   VARCHAR2(50 BYTE)
      eliPartiCd: "", //참여유형 코드   VARCHAR2(20 BYTE)
      eliOprtYear: "2024", //운영 학년도   VARCHAR2(4 BYTE)
      eliOprtTerm: "", //운영 학기   VARCHAR2(20 BYTE)
      eliReqStrDate: "", //신청기간 시작일   DATE
      eliReqStrTime: "", //신청기간 시작시간   VARCHAR2(20 BYTE)
      eliReqEndDate: "", //신청기간 종료일   DATE
      eliReqEndTime: "", //신청기간 종료시간   VARCHAR2(20 BYTE)
      eliOprtStrDate: "", //운영기간 시작일   DATE
      eliOprtStrTime: "", //운영기간 시작시간   VARCHAR2(20 BYTE)
      eliOprtEndDate: "", //운영기간 종료일   DATE
      eliOprtEndTime: "", //운영기간 종료시간   VARCHAR2(20 BYTE)
      eliRecrtCnt: "", //신청(모집)인원   NUMBER
      eliWaitYn: false, //대기인원 선택 여부   CHAR(1 BYTE)
      eliWaitCnt: "", //대기 인원   NUMBER
      eliSts: "", //상태   VARCHAR2(20 BYTE)
      ecrId: "", //반려 사유 아이디값   VARCHAR2(1000 BYTE)
      eliDesc: "", //프로그램 소개 및 유의사항   CLOB
      eliSatisYn: false, //만족도 조사 기간설정 여부    CHAR(1 BYTE)
      eliSatisStrDate: "", //만족도 조사 기간 시작일   DATE
      eliSatisStrTime: "", //만족도 조사 기간 시작시간   VARCHAR2(20 BYTE)
      eliSatisEndDate: "", //만족도 조사 기간 종료일   DATE
      eliSatisEndTime: "", //만족도 조사 기간 종료시간   VARCHAR2(20 BYTE)
      eliPreYn: false, //사전조사 기간설정 여부    CHAR(1 BYTE)
      eliPreStrDate: "", //사전조사 기간 시작일   DATE
      eliPreStrTime: "", //사전조사 기간 시작시간   VARCHAR2(20 BYTE)
      eliPreEndDate: "", //사전조사 기간 종료일   DATE
      eliPreEndTime: "", //사전조사 기간 종료시간   VARCHAR2(20 BYTE)
      locale: "", //언어(한국어: KO, 영어: EN, 베트남어: VN)   VARCHAR2(10 BYTE)
      eliAfterYn: false,
      eliAfterStrDate: "",
      eliAfterStrTime: "",
      eliAfterEndDate: "",
      eliAfterEndTime: "",
      eciSatisYn: "",
      eciPreYn: "",
      eciAfterYn: "",
      eciCertiYn: "",
      //
      elsId: "",
      elsProgGoal: "",
      elsMainEduCont: "",
      elsBenefit: "",
      elsApplyTargetCd: [],
      elsApplyTargetNm: "",
      elsApplyTargetId: "",
      elsApplyYn: "",
      eosId: "",
      ecaItemCd: "",
      ecaItemNm: "",
      ecaOptionCd: "",
    },
    searchTitle: false,
    //차수의 부모가 되는 과정 키값들.
    ecmId: null, //비교과 카테고리 관리 id  VARCHAR2(20 BYTE)
    eciTitle: "", //과정명  VARCHAR2(200 BYTE)
    eciYn: "", //사용여부   CHAR(1 BYTE)
    eciDeptNm: null, //담당부서/학과명  VARCHAR2(100 BYTE)
    eciPartiCd: "", //참여유형 코드   VARCHAR2(20 BYTE)
    eciCertiNm: "", //이수증 명의   VARCHAR2(200 BYTE)
    eciOprtStrYear: "", //운영시작연도  VARCHAR2(4 BYTE)
    eciDesc: "", //과정 개설 사유 및 설명   VARCHAR2(4000 BYTE)
    eciReqYn: "", //신청서 제출   CHAR(1 BYTE)
    eciCertiYn: "", //이수증  CHAR(1 BYTE)
    eciSatisYn: "", //만족도조사  CHAR(1 BYTE)
    eciPreYn: "", //사전조사  CHAR(1 BYTE)
    eciAfterYn: "", //사후조사  CHAR(1 BYTE)
    eosPartiTimeCd: "",
    eosPartiTime: "",
    categoryNm: "",

    attendTime: [],
    abilityInfo: [
      { code: "A001", text: "종합적사고력", useYn: false, percent: 0, mileage: null },
      { code: "A002", text: "자원정보기술활용능력", useYn: false, percent: 0, mileage: null },
      { code: "A003", text: "자기관리역량", useYn: false, percent: 0, mileage: null },
      { code: "A004", text: "의사소통역량", useYn: false, percent: 0, mileage: null },
      { code: "A005", text: "대인관계역량", useYn: false, percent: 0, mileage: null },
      { code: "A006", text: "글로컬역량", useYn: false, percent: 0, mileage: null },
    ],
    AIvalue: [
      { text: "이상", upDown: "상승", value: "UP" },
      { text: "이하", upDown: "하락", value: "DOWN" },
    ],
    rules: [(v: String) => v.length <= 2000 || "2000자 이하로 입력하시오."],
    checkbox: ["value1"],
    searchTitleNm: "",
    searchHeader: [
      { text: "담당부서", value: "eciDeptNm", sortable: false },
      { text: "성명", value: "eciTitle", sortable: true },
      { text: "", value: "operation" },
    ],
    selectedItems: [],
    searchList: [],
    etiUrl: "",
    selectLevel: [
      { level: "A", score: "3.0" },
      { level: "B", score: "2.0" },
      { level: "C", score: "1.0" },
      { level: "D", score: "0.8" },
      { level: "E", score: "0.5" },
    ],
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
    header: [
      { text: "No", value: "no", sortable: false },
      { text: "대학", value: "univ", sortable: true },
      { text: "학과", value: "sustName", sortable: true },
      { text: "지도교수", value: "profName", sortable: true },
      { text: "팀", value: "teamName", sortable: true },
      { text: "팀장여부", value: "captain", sortable: true },
      { text: "이름", value: "korName", sortable: true },
      { text: "학년", value: "grade", sortable: true },
      { text: "학번", value: "stdNo", sortable: true },
      { text: "연락처", value: "phoneNo", sortable: true },
      { text: "이메일", value: "email", sortable: true },
    ],
    eosLevelMap: [],
    list: [],
    categoryList: [],
    regions: [],
    searchStf: false,
  }),
  beforeMount() {
    const vm = this;
    vm.fnGetCategorySelect();
    vm.fnGetCurriInfo();
  },
  methods: {
    updateRowPerPage(selected: number) {
      const vm = this;
      const dataTable = vm.$refs.dataTable;
      dataTable.updateRowsPerPageActiveOption(selected);
    },
    fnGetCategorySelect() {
      const vm = this;
      vm.$axios.get("/api/admin/ecpUser/ecpCategorySelect").then((res: AxiosResponse) => {
        const resData = res.data;
        vm.categoryList = resData.data;
      });
    },
    fnGetCurriInfo() {
      const vm = this;
      const param = {
        eliId: vm.$route.query.eliId,
      };
      vm.$axios.get("/api/admin/ecpUser/getEcpPeriodDetail", { params: param }).then((res: AxiosResponse) => {
        const resData = res.data;
        vm.eciId = resData.data.eciId;
        vm.ecmId = resData.data.ecmId;
        vm.eciTitle = resData.data.eciTitle;
        vm.categoryNm = resData.data.categoryNm;
        vm.eciYn = resData.data.eciYn;
        vm.edhId = resData.data.edhId;
        vm.eciDeptNm = resData.data.eciDeptNm;
        vm.eciCertiNm = resData.data.eciCertiNm;
        vm.eciOprtStrYear = resData.data.eciOprtStrYear;
        vm.eciDesc = resData.data.eciDesc;
        vm.eciReqYn = resData.data.eciReqYn;
        vm.eciCertiYn = resData.data.eciCertiYn;
        vm.eciSatisYn = resData.data.eciSatisYn;
        vm.eciPreYn = resData.data.eciPreYn;
        vm.eciAfterYn = resData.data.eciAfterYn;
        vm.eosId = resData.data.eosId;
        vm.eosPartiTime = resData.data.eosPartiTime;
        vm.eosPartiTimeCd = resData.data.eosPartiTimeCd;
        vm.eosScore = resData.data.eosScore;
        vm.regDatas.eliId = resData.data.regDatas.eliId;
        vm.regDatas.eciId = resData.data.regDatas.eciId;
        vm.regDatas.eliTitle = resData.data.regDatas.eliTitle;
        vm.regDatas.edhId = resData.data.regDatas.edhId;
        vm.regDatas.eliDeptNm = resData.data.regDatas.eliDeptNm;
        vm.regDatas.eliStfId = resData.data.regDatas.eliStfId;
        vm.regDatas.eliStfNm = resData.data.regDatas.eliStfNm;
        vm.regDatas.eliStfPh = resData.data.regDatas.eliStfPh;
        vm.regDatas.eliPartiCd = resData.data.regDatas.eliPartiCd;
        vm.regDatas.eliOprtYear = resData.data.regDatas.eliOprtYear;
        vm.regDatas.eliOprtTerm = resData.data.regDatas.eliOprtTerm;
        vm.regDatas.eliRecrtCnt = resData.data.regDatas.eliRecrtCnt;
        vm.regDatas.eliWaitYn = resData.data.regDatas.eliWaitYn == "Y" ? true : false;
        vm.regDatas.eliWaitCnt = resData.data.regDatas.eliWaitCnt;
        vm.regDatas.eliSts = resData.data.regDatas.eliSts;
        vm.regDatas.ecrId = resData.data.regDatas.ecrId;
        vm.regDatas.eliDesc = resData.data.regDatas.eliDesc == null ? "" : resData.data.regDatas.eliDesc;
        vm.regDatas.elsApplyYn = resData.data.regDatas.elsApplyYn == "Y" ? true : false;
        vm.regDatas.eliSatisYn = resData.data.regDatas.eliSatisYn == "Y" ? true : false;
        vm.regDatas.eliPreYn = resData.data.regDatas.eliPreYn == "Y" ? true : false;
        vm.regDatas.eliAfterYn = resData.data.regDatas.eliAfterYn == "Y" ? true : false;
        vm.regDatas.eciSatisYn = resData.data.regDatas.eciSatisYn == "Y" ? true : false;
        vm.regDatas.eciPreYn = resData.data.regDatas.eciPreYn == "Y" ? true : false;
        vm.regDatas.eciAfterYn = resData.data.regDatas.eciAfterYn == "Y" ? true : false;
        vm.regDatas.eciCertiYn = resData.data.regDatas.eciCertiYn == "Y" ? true : false;
        vm.etiUrl = resData.data.regDatas.etiUrl;
        vm.regDatas.eliReqStrDate =
          resData.data.regDatas.eliReqStrDate != null
            ? moment(resData.data.regDatas.eliReqStrDate).format("YYYY-MM-DD")
            : "";
        vm.regDatas.eliReqEndDate =
          resData.data.regDatas.eliReqEndDate != null
            ? moment(resData.data.regDatas.eliReqEndDate).format("YYYY-MM-DD")
            : "";
        vm.regDatas.eliOprtStrDate =
          resData.data.regDatas.eliOprtStrDate != null
            ? moment(resData.data.regDatas.eliOprtStrDate).format("YYYY-MM-DD")
            : "";
        vm.regDatas.eliOprtEndDate =
          resData.data.regDatas.eliOprtEndDate != null
            ? moment(resData.data.regDatas.eliOprtEndDate).format("YYYY-MM-DD")
            : "";
        vm.regDatas.eliSatisStrDate =
          resData.data.regDatas.eliSatisStrDate != null
            ? moment(resData.data.regDatas.eliSatisStrDate).format("YYYY-MM-DD")
            : "";
        vm.regDatas.eliSatisEndDate =
          resData.data.regDatas.eliSatisEndDate != null
            ? moment(resData.data.regDatas.eliSatisEndDate).format("YYYY-MM-DD")
            : "";
        vm.regDatas.eliPreStrDate =
          resData.data.regDatas.eliPreStrDate != null
            ? moment(resData.data.regDatas.eliPreStrDate).format("YYYY-MM-DD")
            : "";
        vm.regDatas.eliPreEndDate =
          resData.data.regDatas.eliPreEndDate != null
            ? moment(resData.data.regDatas.eliPreEndDate).format("YYYY-MM-DD")
            : "";
        vm.regDatas.eliAfterStrDate =
          resData.data.regDatas.eliAfterStrDate != null
            ? moment(resData.data.regDatas.eliAfterStrDate).format("YYYY-MM-DD")
            : "";
        vm.regDatas.eliAfterEndDate =
          resData.data.regDatas.eliAfterEndDate != null
            ? moment(resData.data.regDatas.eliAfterEndDate).format("YYYY-MM-DD")
            : "";
        vm.regDatas.eliReqStrTime = resData.data.regDatas.eliReqStrTime;
        vm.regDatas.eliReqEndTime = resData.data.regDatas.eliReqEndTime;
        vm.regDatas.eliOprtStrTime = resData.data.regDatas.eliOprtStrTime;
        vm.regDatas.eliOprtEndTime = resData.data.regDatas.eliOprtEndTime;
        vm.regDatas.eliSatisStrTime = resData.data.regDatas.eliSatisStrTime;
        vm.regDatas.eliSatisEndTime = resData.data.regDatas.eliSatisEndTime;
        vm.regDatas.eliPreStrTime = resData.data.regDatas.eliPreStrTime;
        vm.regDatas.eliPreEndTime = resData.data.regDatas.eliPreEndTime;
        vm.regDatas.locale = resData.data.regDatas.locale;
        vm.regDatas.eliAfterStrTime = resData.data.regDatas.eliAfterStrTime;
        vm.regDatas.eliAfterEndTime = resData.data.regDatas.eliAfterEndTime;
        vm.regDatas.elsId = resData.data.regDatas.elsId;
        vm.regDatas.elsProgGoal = resData.data.regDatas.elsProgGoal;
        vm.regDatas.elsMainEduCont = resData.data.regDatas.elsMainEduCont;
        vm.regDatas.elsBenefit = resData.data.regDatas.elsBenefit;
        vm.regDatas.elsApplyTargetCd =
          resData.data.regDatas.elsApplyTargetCd != null ? resData.data.regDatas.elsApplyTargetCd.split(",") : "";
        vm.regDatas.elsApplyTargetNm = resData.data.regDatas.elsApplyTargetNm;
        vm.regDatas.elsApplyTargetId = resData.data.regDatas.elsApplyTargetId;

        vm.eosLevelMap = vm.selectLevel.find((item: { score: any }) => item.score === resData.data.eosScore);

        for (let i = 0; i < vm.ecaInfo.length; i++) {
          for (let j = 0; j < resData.data.ecaInfo.length; j++) {
            if (resData.data.ecaInfo[j].ECA_ITEM_CD === vm.ecaInfo[i].ecaItemCd) {
              vm.ecaInfo[i].useYn = true;
              vm.ecaInfo[i].ecaItemNm = resData.data.ecaInfo[j].ECA_ITEM_NM;
              vm.ecaInfo[i].ecaOptionCd = resData.data.ecaInfo[j].ECA_OPTION_CD;
              break;
            }
            if (resData.data.ecaInfo[j].ECA_ITEM_CD === "ECA007") {
              vm.distance.useYn = true;
              vm.regions = resData.data.ecaInfo[j].ECA_ITEM_NM.split("|");
              break;
            }
          }
        }

        for (let i = 0; i < vm.abilityInfo.length; i++) {
          for (let j = 0; j < resData.data.abilityInfo.length; j++) {
            if (resData.data.abilityInfo[j].EAI_ABILITY_CODE === vm.abilityInfo[i].code) {
              vm.abilityInfo[i].useYn = true;
              vm.abilityInfo[i].percent = resData.data.abilityInfo[j].EAI_PERCENT;
              vm.abilityInfo[i].mileage = resData.data.abilityInfo[j].MILEAGE_SCORE;
              break;
            }
          }
        }
      });
    },

    //저장
    fnUpdatePeriod() {
      const vm = this;
      vm.$loading.show();
      let elsAplTgt = "";
      for (let i = 0; i < vm.regDatas.elsApplyTargetCd.length; i++) {
        if (vm.regDatas.elsApplyTargetCd[i] != "") {
          elsAplTgt += vm.regDatas.elsApplyTargetCd[i];
          if (i < vm.regDatas.elsApplyTargetCd.length - 1) {
            elsAplTgt += ",";
          }
        }
      }
      vm.regDatas.elsApplyTargetCd = elsAplTgt;

      vm.$axios.post("/api/admin/ecpUser/modifyEcpPeriod", JSON.stringify(vm.regDatas)).then((res: AxiosResponse) => {
        if (res.data.code == "200") {
          alert("저장되었습니다.");
          location.href = "/admin/extraCurricularProgram/userEcp/userPeriodMng";
        }
      });
      vm.$loading.hide();
    },
  },
};
</script>
