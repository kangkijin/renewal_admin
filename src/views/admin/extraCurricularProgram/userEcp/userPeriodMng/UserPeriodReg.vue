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
                        <v-autocomplete
                          readonly
                          v-model="ecmId"
                          item-title="ecmTitle"
                          item-value="ecmId"
                          :items="categoryList"
                          placeholder="과정 선택시 자동으로 입력됩니다."
                        ></v-autocomplete>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">과정</th>
                      <td>
                        <v-dialog v-model="regDatas.searchTitle" persistent width="1024">
                          <template v-slot:activator="{ props }">
                            <v-text-field
                              @click="fnGetCurriList()"
                              v-bind="props"
                              v-model="eciTitle"
                              append-icon="mdi-magnify"
                              :items="selectOption1.year"
                              readonly
                              placeholder="과정을 선택해주세요"
                            ></v-text-field>
                          </template>
                          <v-card>
                            <!-- dialog title -->
                            <v-card-title class="bg-primary">과정명</v-card-title>
                            <v-divider></v-divider>

                            <!-- dialog content -->
                            <v-card-text>
                              <v-row>
                                <v-col cols="12">
                                  <v-table>
                                    <colgroup>
                                      <col style="width: 15%" />
                                      <col style="width: 85%" />
                                    </colgroup>
                                    <tbody>
                                      <tr>
                                        <th>과정명</th>
                                        <td>
                                          <v-text-field v-model="searchCurri"></v-text-field>
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
                            <v-card-text>
                              <v-easy-table ref="dataTable" :headers="searchHeader" :items="searchCurriList">
                                <template #item-operation="item">
                                  <v-btn size="small" @click="fnGetCurriInfo(item.eciId)"> 선택</v-btn>
                                </template>
                              </v-easy-table>
                            </v-card-text>
                            <v-divider></v-divider>

                            <!-- dialog button -->
                            <v-card-actions class="justify-end">
                              <v-btn variant="outlined" color="error" @click="regDatas.searchTitle = false">취소</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">차수명</th>
                      <td>
                        <v-text-field
                          v-model="regDatas.eliTitle"
                          :items="selectOption1.year"
                          placeholder="차수명을 입력해주세요"
                        ></v-text-field>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">담당부서/학과</th>
                      <td>
                        <v-autocomplete
                          v-model="eciDeptNm"
                          prepend-inner-icon="mdi-magnify"
                          :items="selectOption1.category"
                          placeholder="과정등록시 자동으로 입력됩니다."
                          readonly
                        ></v-autocomplete>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">담당자</th>
                      <td>
                        <v-dialog v-model="regDatas.searchStf" persistent width="1024">
                          <template v-slot:activator="{ props }">
                            <v-text-field
                              @click="fnGetStfList()"
                              v-bind="props"
                              v-model="regDatas.eliStfNm"
                              append-icon="mdi-magnify"
                              placeholder="담당자를 선택해주세요"
                              readonly
                            ></v-text-field>
                          </template>
                          <v-card>
                            <!-- dialog title -->
                            <v-card-title class="bg-primary">운영담당자 검색</v-card-title>
                            <v-divider></v-divider>
                            <!-- dialog content -->
                            <v-card-text>
                              <v-row>
                                <v-col cols="12">
                                  <v-table>
                                    <colgroup>
                                      <col style="width: 15%" />
                                      <col style="width: 85%" />
                                    </colgroup>
                                    <tbody>
                                      <tr>
                                        <th>담당자명/교번·사번</th>
                                        <td>
                                          <v-text-field v-model="searchStfNm"></v-text-field>
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
                            <v-card-text>
                              <v-easy-table ref="dataTable1" :headers="searchStfHeader" :items="searchStfList">
                                <template #item-operation="item">
                                  <v-btn size="small" @click="fnGetStfInfo(item.korNm, item.telNo)"> 선택</v-btn>
                                </template>
                              </v-easy-table>
                            </v-card-text>
                            <v-divider></v-divider>

                            <!-- dialog button -->
                            <v-card-actions class="justify-end">
                              <v-btn variant="outlined" color="error" @click="regDatas.searchStf = false">취소</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">담당자 연락처</th>
                      <td>
                        <div class="d-flex align-center" style="width: 40%">
                          <v-text-field
                            v-model="regDatas.eliStfPh"
                            placeholder="담당자 선택시 자동으로 채워집니다."
                            readonly
                          ></v-text-field>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">참여유형</th>
                      <td>
                        <v-radio-group v-model="regDatas.eliPartiCd" inline>
                          <v-radio label="개인" class="mr-4" value="PERSON"></v-radio>
                          <v-radio label="팀" class="mr-4" value="TEAM"></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">운영학년도</th>
                      <td>
                        <!--TODO 당해 년도 구하는 변수가 존재한다면 수정하여 집어넣을것.-->
                        <v-autocomplete
                          v-model="regDatas.eliOprtYear"
                          :items="['2024', '2025']"
                          placeholder="선택"
                        ></v-autocomplete>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">운영학기</th>
                      <td>
                        <v-autocomplete
                          v-model="regDatas.eliOprtTerm"
                          :items="['1학기', '여름학기', '2학기', '겨울학기']"
                          placeholder="선택"
                        ></v-autocomplete>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">신청기간</th>
                      <td>
                        <div class="d-flex mt-2 justify-start align-center">
                          <VDateInput v-model="regDatas.eliReqStrDate" />
                          <VTimeInput v-model="regDatas.eliReqStrTime"></VTimeInput>
                          <span class="mx-1">~</span>
                          <VDateInput v-model="regDatas.eliReqEndDate" />
                          <VTimeInput v-model="regDatas.eliReqEndTime"></VTimeInput>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">운영기간</th>
                      <td>
                        <div class="d-flex mt-2 justify-start align-center">
                          <VDateInput v-model="regDatas.eliOprtStrDate" />
                          <VTimeInput v-model="regDatas.eliOprtStrTime"></VTimeInput>
                          <span class="mx-1">~</span>
                          <VDateInput v-model="regDatas.eliOprtEndDate" />
                          <VTimeInput v-model="regDatas.eliOprtEndTime"></VTimeInput>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th class="required">신청/대기 인원</th>
                      <td>
                        <div class="d-flex">
                          <div class="d-flex align-center mr-4" style="width: 150px">
                            <v-text-field v-model="regDatas.eliRecrtCnt" class="mr-2"></v-text-field> 명
                          </div>
                          <v-checkbox v-model="regDatas.eliWaitYn" class="flex-0-0 mr-4" label="대기 선택" />
                          <div class="d-flex align-center mr-4" style="width: 100px">
                            <v-text-field
                              v-model="regDatas.eliWaitCnt"
                              class="mr-2"
                              :disabled="regDatas.eliWaitYn != true"
                            ></v-text-field>
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
                          v-model="regDatas.eliDesc"
                          :config="editorConfig"
                          style="min-height: 200px"
                        ></ckeditor>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">썸네일 이미지</th>
                      <td>
                        <v-dialog v-model="searchThumb" persistent width="1024">
                          <template v-slot:activator="{ props }">
                            <div class="program_thumbbox" @click="fnGetThumbnailList()" v-if="regDatas.etiId == ''">
                              <p class="attach_img">
                                <label for="input-file" v-bind="props">썸네일 이미지를 선택해주세요</label>
                              </p>
                            </div>
                            <div class="img_wrap" v-else>
                              <img :src="etiUrl" alt="비교과 이미지" v-bind="props" @click="fnGetThumbnailList()" />
                            </div>
                          </template>
                          <v-card>
                            <!-- dialog title -->
                            <v-card-title class="bg-primary">썸네일 선택</v-card-title>
                            <v-divider></v-divider>
                            <!-- dialog content -->
                            <v-card-text>
                              <v-easy-table ref="dataTable1" :headers="searchTumbHeader" :items="searchImgList">
                                <template #item-imgUrl="item">
                                  <div class="img_wrap">
                                    <img :src="item.etiUrl" :alt="'비교과 이미지' + item.etiId" />
                                  </div>
                                </template>
                                <template #item-operation="item">
                                  <v-btn size="small" @click="fnGetImgInfo(item.etiUrl, item.etiId)"> 선택</v-btn>
                                </template>
                              </v-easy-table>
                            </v-card-text>
                            <v-divider></v-divider>

                            <!-- dialog button -->
                            <v-card-actions class="justify-end">
                              <v-btn variant="outlined" color="error" @click="searchThumb = false">취소</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
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
                            <VDateInput v-model="regDatas.eliSatisStrDate" :disabled="regDatas.eliSatisYn != true" />
                            <VTimeInput
                              v-model="regDatas.eliSatisStrTime"
                              :disabled="regDatas.eliSatisYn != true"
                            ></VTimeInput>
                            <span class="mx-1">~</span>
                            <VDateInput v-model="regDatas.eliSatisEndDate" :disabled="regDatas.eliSatisYn != true" />
                            <VTimeInput
                              v-model="regDatas.eliSatisEndTime"
                              :disabled="regDatas.eliSatisYn != true"
                            ></VTimeInput>
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
                            <VDateInput v-model="regDatas.eliPreStrDate" :disabled="regDatas.eliPreYn != true" />
                            <VTimeInput
                              v-model="regDatas.eliPreStrTime"
                              :disabled="regDatas.eliPreYn != true"
                            ></VTimeInput>
                            <span class="mx-1">~</span>
                            <VDateInput v-model="regDatas.eliPreEndDate" :disabled="regDatas.eliPreYn != true" />
                            <VTimeInput
                              v-model="regDatas.eliPreEndTime"
                              :disabled="regDatas.eliPreYn != true"
                            ></VTimeInput>
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
                            <VDateInput v-model="regDatas.eliAfterStrDate" :disabled="regDatas.eliAfterYn != true" />
                            <VTimeInput
                              v-model="regDatas.eliAfterStrTime"
                              :disabled="regDatas.eliAfterYn != true"
                            ></VTimeInput>
                            <span class="mx-1">~</span>
                            <VDateInput v-model="regDatas.eliAfterEndDate" :disabled="regDatas.eliAfterYn != true" />
                            <VTimeInput
                              v-model="regDatas.eliAfterEndTime"
                              :disabled="regDatas.eliAfterYn != true"
                            ></VTimeInput>
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
                    variant="tonal"
                    color="error"
                    width="80"
                    class="mr-2"
                    to="/admin/extraCurricularProgram/userEcp/userPeriodMng"
                    >취소</v-btn
                  >
                  <v-btn class="mr-2" variant="flat" color="success" width="80" @click="this.tab = 'addInfo'">
                    다음</v-btn
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
                      <td>
                        <v-textarea
                          v-model="regDatas.elsProgGoal"
                          :counter="2000"
                          class="mt-3"
                          :rules="rules"
                        ></v-textarea>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">주요 교육 내용</th>
                      <td>
                        <v-textarea
                          v-model="regDatas.elsMainEduCont"
                          :counter="2000"
                          class="mt-3"
                          :rules="rules"
                        ></v-textarea>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">기대효과</th>
                      <td>
                        <v-textarea
                          v-model="regDatas.elsBenefit"
                          :counter="2000"
                          class="mt-3"
                          :rules="rules"
                        ></v-textarea>
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
                    to="/admin/extraCurricularProgram/userEcp/userPeriodMng"
                    >취소</v-btn
                  >
                  <v-btn class="mr-2" variant="flat" color="success" width="80" @click="this.tab = 'basicInfo'">
                    이전</v-btn
                  >
                  <v-btn class="mr-2" variant="flat" color="success" width="80" @click="this.tab = 'attentSetup'">
                    다음</v-btn
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
                            v-model="regDatas.elsApplyTargetCd"
                            value="All"
                            class="flex-0-0 mr-4"
                            label="재학생 전체"
                          />
                          <v-checkbox
                            v-model="regDatas.elsApplyTargetCd"
                            value="1"
                            class="flex-0-0 mr-4"
                            label="1학년"
                          />
                          <v-checkbox
                            v-model="regDatas.elsApplyTargetCd"
                            value="2"
                            class="flex-0-0 mr-4"
                            label="2학년"
                          />
                          <v-checkbox
                            v-model="regDatas.elsApplyTargetCd"
                            value="3"
                            class="flex-0-0 mr-4"
                            label="3학년"
                          />
                          <v-checkbox
                            v-model="regDatas.elsApplyTargetCd"
                            value="4"
                            class="flex-0-0 mr-4"
                            label="4학년"
                          />
                          <v-checkbox
                            v-model="regDatas.elsApplyTargetCd"
                            value="REST"
                            class="flex-0-0 mr-4"
                            label="휴학생"
                          />
                          <v-checkbox
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
                        <div class="d-flex align-center mr-4" style="width: 400px">
                          <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
                          <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
                          <v-btn class="ml-2" color="success" width="80">추가</v-btn>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="required">신청접수여부</th>
                      <td class="d-flex">
                        <div class="d-flex align-center mr-4" style="width: 400px">
                          <v-switch color="primary" :model-value="true"></v-switch>
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
                    v-model:rowPerPage="serverOptions.rowsPerPage"
                  >
                    <template #top-btn-area>
                      <v-dialog v-model="regDatas.searchStf" persistent width="1024">
                        <template v-slot:activator="{ props }">
                          <v-btn v-bind="props" @click="fnGetStfList()" class="mr-2">지도학생목록 불러오기</v-btn>
                        </template>
                        <v-card>
                          <!-- dialog title -->
                          <v-card-title class="bg-primary">운영담당자 검색</v-card-title>
                          <v-divider></v-divider>
                          <!-- dialog content -->
                          <v-card-text>
                            <v-row>
                              <v-col cols="12">
                                <v-table>
                                  <colgroup>
                                    <col style="width: 15%" />
                                    <col style="width: 85%" />
                                  </colgroup>
                                  <tbody>
                                    <tr>
                                      <th>담당자명/교번·사번</th>
                                      <td>
                                        <v-text-field v-model="searchStfNm"></v-text-field>
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
                          <v-card-text>
                            <v-easy-table ref="dataTable1" :headers="searchStfHeader" :items="searchStfList">
                              <template #item-operation="item">
                                <v-btn size="small" @click="fnGetStfInfo(item.korNm, item.telNo)"> 선택</v-btn>
                              </template>
                            </v-easy-table>
                          </v-card-text>
                          <v-divider></v-divider>

                          <!-- dialog button -->
                          <v-card-actions class="justify-end">
                            <v-btn variant="outlined" color="error" @click="regDatas.searchStf = false">취소</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-btn class="mr-2">양식 다운로드 양식</v-btn>
                      <v-btn class="mr-2">파일 업로드</v-btn>
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
                    :server-items-length="serverOptions.totalCount"
                    v-model:server-options="serverOptions"
                  >
                  </v-easy-table>
                </BaseCard>
                <v-divider />
                <div class="d-flex justify-end pt-4">
                  <v-btn
                    variant="tonal"
                    color="error"
                    width="80"
                    class="mr-2"
                    to="/admin/extraCurricularProgram/userEcp/userPeriodMng"
                    >취소</v-btn
                  >
                  <v-btn class="mr-2" variant="flat" color="success" width="80" @click="this.tab = 'addInfo'">
                    이전</v-btn
                  >
                  <v-btn variant="flat" color="info" width="80" @click="fnSavePeriod()">저장</v-btn>
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
import type { TableServerOption } from "@/types/dataTable/EasyDataTableConfig";

export default {
  data: () => ({
    /** theme breadcrumb */
    title: "차수 등록",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "비교과프로그램(학생)", disabled: false },
      { title: "차수 관리", disabled: true },
    ],
    /** tab */
    tab: null,
    selectOption1: {
      year: ["2024", "2023", "2022"],
      value: "2024",
      category: ["선택1", "선택2", "선택3"],
    },

    checkWait: false,
    /** ck에디터 */
    editor: ClassicEditor,
    editorData: "",
    editorConfig: {
      placeholder: "프로그램 소개 및 유의사항을 입력해주세요",
    },
    /** 기간 설정 */
    satisYn: "N",
    satisDayYn: false,
    //주석, 불필요한 키값 삭제 예정 <!--TODO-->
    regDatas: {
      eliId: "", //비교과 차수 기본 정보 id   VARCHAR2(20 BYTE)
      eciId: "", //비교과 과정 기본 정보 id   VARCHAR2(20 BYTE)
      eliTitle: "", //비교과 차수명   VARCHAR2(100 BYTE)
      edhId: "", //비교과 과정 담당 부서 이력 id   VARCHAR2(20 BYTE)
      eliDeptNm: "", //담당부서/학과명   VARCHAR2(100 BYTE)
      eliStfId: "", //운영담당자 id   VARCHAR2(20 BYTE)
      eliStfNm: "", //운영담당자명   VARCHAR2(50 BYTE)
      eliStfPh: null, //담당자 연락처   VARCHAR2(50 BYTE)
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
      eliRejectCont: "", //반려 사유   VARCHAR2(1000 BYTE)
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
      regId: "", //등록자   VARCHAR2(20 BYTE)
      regDate: "", //등록일   DATE
      updId: "", //수정자   VARCHAR2(20 BYTE)
      updDate: "", //수정일   DATE
      delYn: "", //삭제여부     CHAR(1 BYTE)
      eliAfterYn: false,
      eliAfterStrDate: "",
      eliAfterStrTime: "",
      eliAfterEndDate: "",
      eliAfterEndTime: "",
      searchTitle: false,
      searchStf: false,
      eciSatisYn: "",
      eciPreYn: "",
      eciAfterYn: "",
      etiId: "",

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
    rules: [(v: any) => v.length <= 2000 || "2000자 이하로 입력하시오."],
    checkbox: ["value1"],
    searchStfList: [],
    searchStfHeader: [
      { text: "직원구분", value: "stfDiv", sortable: false },
      { text: "이름", value: "korNm", sortable: true },
      { text: "", value: "operation" },
    ],
    searchCurri: "",
    searchHeader: [
      { text: "담당부서", value: "eciDeptNm", sortable: false },
      { text: "과정", value: "eciTitle", sortable: true },
      { text: "", value: "operation" },
    ],
    searchImgList: [],
    searchTumbHeader: [
      { text: "아이콘", value: "imgUrl" },
      { text: "", value: "operation" },
    ],
    selectedItems: [],
    searchCurriList: [],
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
    searchStfNm: "",
    eosLevelMap: [],
    etiUrl: "",
    list: [],
    categoryList: [],
    regions: [],
    searchThumb: false,
    //***paging***
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: ["eciId"], // ["recrtTitle"] or []
      sortType: ["desc"], // ["asc"] or []
      totalCount: 0,
    } as TableServerOption,
    //***paging***
    serverOptions1: {
      page: 1,
      rowsPerPage: 10,
      sortBy: ["korNm"], // ["recrtTitle"] or []
      sortType: ["asc"], // ["asc"] or []
      totalCount: 0,
    } as TableServerOption,
    loading: false,
  }),
  computed: {
    fnNextBtnDisabled() {
      const vm = this;
      if (
        vm.ecmId != null &&
        vm.regDatas.searchTitle != null &&
        vm.regDatas.eliTitle != null &&
        vm.eciDeptNm != null &&
        vm.regDatas.eliStfNm != null &&
        vm.regDatas.eliStfPh != null &&
        vm.regDatas.eliPartiCd != null &&
        vm.regDatas.eliOprtYear != null &&
        vm.regDatas.eliOprtTerm != null &&
        vm.regDatas.eliReqStrDate != null &&
        vm.regDatas.eliReqStrTime != null &&
        vm.regDatas.eliReqEndDate != null &&
        vm.regDatas.eliReqEndTime != null &&
        vm.regDatas.eliOprtStrDate != null &&
        vm.regDatas.eliOprtStrTime != null &&
        vm.regDatas.eliOprtEndDate != null &&
        vm.regDatas.eliOprtEndTime != null &&
        vm.regDatas.eliRecrtCnt != null &&
        vm.regDatas.eliWaitYn != null &&
        vm.regDatas.eliWaitCnt != null &&
        vm.regDatas.eliDesc != null
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    //***paging***
    serverOptions: {
      handler() {
        this.fnGetCurriList();
        this.fnGetStfList();
      },
      deep: true,
    },
  },
  beforeMount() {
    const vm = this;
    vm.fnGetCategorySelect();
    vm.fnGetThumbnailList();
  },
  methods: {
    fnGetCategorySelect() {
      const vm = this;
      vm.$axios.get("/api/admin/ecpUser/ecpCategorySelect").then((res: AxiosResponse) => {
        const resData = res.data;
        vm.categoryList = resData.data;
      });
    },
    fnGetCurriList() {
      const vm = this;
      const searchParam = {
        searchCurri: vm.searchCurri,
        ...vm.$serial(vm.serverOptions), //***paging***
      };
      vm.loading = true; //***paging***
      vm.$axios
        .get("/api/admin/ecpUser/ecpCurriList", { params: searchParam })
        .then((res: AxiosResponse) => {
          vm.searchCurriList = res.data.data;
          const dataTable = vm.$refs.dataTable; //***paging***
          dataTable.updateRowsPerPageActiveOption(vm.serverOptions.rowsPerPage); //***paging*** BaseTableConfig<->easyDataTable  rowsPerPage맞춰줘야함
          vm.serverOptions.totalCount = res.data.data.length > 0 ? res.data.data[0].totalCount : 0; //***paging***
          vm.loading = false; //***paging***
        })
        .catch((e: any) => {
          console.error(e);
        });
    },
    fnGetCurriInfo(eciId: String) {
      const vm = this;
      const param = {
        eciId: eciId,
      };
      vm.$axios.get("/api/admin/ecpUser/ecpCurriDetail", { params: param }).then((res: AxiosResponse) => {
        const resData = res.data;
        vm.eciId = resData.data.eciId;
        vm.regDatas.eciId = resData.data.eciId;
        vm.ecmId = resData.data.ecmId;
        vm.eciTitle = resData.data.eciTitle;
        vm.eciYn = resData.data.eciYn;
        vm.edhId = resData.data.edhId;
        vm.regDatas.edhId = resData.data.edhId;
        vm.eciDeptNm = resData.data.eciDeptNm;
        vm.regDatas.eliDeptNm = resData.data.eciDeptNm;
        vm.regDatas.eliPartiCd = resData.data.eciPartiCd;
        vm.eciCertiNm = resData.data.eciCertiNm;
        vm.eciOprtStrYear = resData.data.eciOprtStrYear;
        vm.eciDesc = resData.data.eciDesc;
        vm.eciReqYn = resData.data.eciReqYn;
        vm.eciCertiYn = resData.data.eciCertiYn;
        vm.eciSatisYn = resData.data.eciSatisYn;
        vm.eciPreYn = resData.data.eciPreYn;
        vm.eciAfterYn = resData.data.eciAfterYn;
        vm.regDatas.eciSatisYn = resData.data.eciSatisYn;
        vm.regDatas.eciPreYn = resData.data.eciPreYn;
        vm.regDatas.eciAfterYn = resData.data.eciAfterYn;
        vm.eosId = resData.data.eosId;
        vm.eosPartiTime = resData.data.eosPartiTime;
        vm.eosPartiTimeCd = resData.data.eosPartiTimeCd;
        vm.eosScore = resData.data.eosScore;
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
      vm.regDatas.searchTitle = false;
    },
    //저장
    fnSavePeriod() {
      const vm = this;
      vm.$loading.show();
      let elsAplTgt = "";
      let elsAplTgtNm = "";
      for (let i = 0; i < vm.regDatas.elsApplyTargetCd.length; i++) {
        elsAplTgt += vm.regDatas.elsApplyTargetCd[i];
        if (vm.regDatas.elsApplyTargetCd[i] === "All") {
          elsAplTgtNm += "재학생 전체";
        } else if (vm.regDatas.elsApplyTargetCd[i] === "1") {
          elsAplTgtNm += "1학년";
        } else if (vm.regDatas.elsApplyTargetCd[i] === "2") {
          elsAplTgtNm += "2학년";
        } else if (vm.regDatas.elsApplyTargetCd[i] === "3") {
          elsAplTgtNm += "3학년";
        } else if (vm.regDatas.elsApplyTargetCd[i] === "4") {
          elsAplTgtNm += "4학년";
        } else if (vm.regDatas.elsApplyTargetCd[i] === "REST") {
          elsAplTgtNm += "휴학생";
        } else if (vm.regDatas.elsApplyTargetCd[i] === "GRDT") {
          elsAplTgtNm += "졸업생";
        }
        if (i < vm.regDatas.elsApplyTargetCd.length - 1) {
          elsAplTgt += ",";
          elsAplTgtNm += ", ";
        }
      }
      vm.regDatas.elsApplyTargetCd = elsAplTgt;
      vm.regDatas.elsApplyTargetNm = elsAplTgtNm;
      vm.$axios.post("/api/admin/ecpUser/saveEcpPeriod", vm.regDatas).then((res: AxiosResponse) => {
        if (res.data.code == "200") {
          alert("저장되었습니다.");
          location.href = "/admin/extraCurricularProgram/userEcp/userPeriodMng";
        } else {
          alert("잠시 후 다시 시도해 주십시오.");
        }
      });
      vm.$loading.hide();
    },
    fnGetStfList() {
      const vm = this;
      const searchParam = {
        searchStfNm: vm.searchStfNm,
        ...vm.$serial(vm.serverOptions1), //***paging***
      };
      vm.loading = true; //***paging***
      vm.$axios
        .get("/api/admin/ecpStfList", { params: searchParam })
        .then((res: AxiosResponse) => {
          vm.searchStfList = res.data.data;
          const dataTable1 = vm.$refs.dataTable1; //***paging***
          dataTable1.updateRowsPerPageActiveOption(vm.serverOptions1.rowsPerPage); //***paging*** BaseTableConfig<->easyDataTable  rowsPerPage맞춰줘야함
          vm.serverOptions1.totalCount = res.data.data.length > 0 ? res.data.data[0].totalCount : 0; //***paging***
          vm.loading = false; //***paging***
        })
        .catch((e: any) => {
          console.error(e);
        });
    },
    fnGetThumbnailList() {
      const vm = this;
      vm.$axios
        .get("/api/admin/getEtiList")
        .then((res: AxiosResponse) => {
          vm.searchImgList = res.data.data;
          console.log(res.data);
        })
        .catch((e: any) => {
          console.error(e);
        });
    },
    fnGetStfInfo(korNm: String, telNo: String) {
      this.regDatas.eliStfNm = korNm;
      this.regDatas.eliStfPh = telNo;
      this.regDatas.searchStf = false;
    },
    fnGetImgInfo(etiUrl: String, etiId: String) {
      this.regDatas.etiId = etiId;
      this.etiUrl = etiUrl;
      this.searchThumb = false;
    },
  },
};
</script>
