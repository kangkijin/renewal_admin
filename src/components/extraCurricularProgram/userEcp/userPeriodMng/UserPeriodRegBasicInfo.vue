<template>
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
                  v-model="ecmId"
                  :items="selectOption1.year"
                  placeholder="선택"
                  disabled
                ></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">과정</th>
              <td>
                <v-autocomplete v-model="eciTitle" :items="selectOption1.year" placeholder="선택"></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">차수명</th>
              <td>
                <v-autocomplete v-model="eliTitle" :items="selectOption1.year" placeholder="선택"></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">담당부서/학과</th>
              <td>
                <v-autocomplete
                  v-model="edhId"
                  prepend-inner-icon="mdi-magnify"
                  :items="selectOption1.category"
                  placeholder="담당부서/학과를 입력해 주세요."
                  :disabled="true"
                ></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">담당자</th>
              <td>
                <v-text-field v-model="eliStfNm" placeholder="담당자를 선택해주세요" readonly></v-text-field>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">담당자 연락처</th>
              <td>
                <div class="d-flex align-center" style="width: 300px">
                  <v-text-field placeholder="000" disabled></v-text-field>
                  <span class="mx-1">-</span>
                  <v-text-field placeholder="0000" disabled></v-text-field>
                  <span class="mx-1">-</span>
                  <v-text-field placeholder="0000" disabled></v-text-field>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">참여유형</th>
              <td>
                <v-radio-group inline>
                  <v-radio label="개인" class="mr-4" value="Y"></v-radio>
                  <v-radio label="팀" class="mr-4" value="N"></v-radio>
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">운영학년도</th>
              <td>
                <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">운영학기</th>
              <td>
                <v-autocomplete :items="selectOption1.year" placeholder="선택"></v-autocomplete>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">신청기간</th>
              <td>
                <div class="d-flex mt-2 justify-start align-center">
                  <VDateInput />
                  <VTimeInput v-model="selectTime.applyStrTime"></VTimeInput>
                  <span class="mx-1">~</span>
                  <VDateInput />
                  <VTimeInput v-model="selectTime.applyEndTime"></VTimeInput>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">운영기간</th>
              <td>
                <div class="d-flex mt-2 justify-start align-center">
                  <VDateInput />
                  <VTimeInput v-model="selectTime.oprtStrTime"></VTimeInput>
                  <span class="mx-1">~</span>
                  <VDateInput />
                  <VTimeInput v-model="selectTime.oprtEndTime"></VTimeInput>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">신청/대기 인원</th>
              <td>
                <div class="d-flex">
                  <div class="d-flex align-center mr-4" style="width: 150px">
                    <v-text-field v-model="eliRecrtCnt" class="mr-2"></v-text-field> 명
                  </div>
                  <v-checkbox v-model="eliWaitYn" class="flex-0-0 mr-4" label="대기 선택" />
                  <div class="d-flex align-center mr-4" style="width: 100px">
                    <v-text-field v-model="eliWaitCnt" class="mr-2" :disabled="eliWaitYn != true"></v-text-field> 명
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">프로그램 소개 및 유의사항</th>
              <td>
                <ckeditor
                  :editor="editor"
                  v-model="editorData"
                  :config="editorConfig"
                  style="min-height: 200px"
                ></ckeditor>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">썸네일 이미지</th>
              <td>
                <v-file-input chips counter :show-size="1000"></v-file-input>
                <p class="text-error mt-1">* 사이즈 140*140pixel / 파일갯수 1 개/JPG,PNG 파일만 등록가능합니다.</p>
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
                <v-radio-group v-model="eciCertiYn" inline>
                  <v-radio label="사용" class="mr-4" value="Y"></v-radio>
                  <v-radio label="미사용" class="mr-4" value="N"></v-radio>
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">만족도조사</th>
              <td>
                <v-radio-group inline v-model="eliSatisYn">
                  <v-radio label="사용" class="mr-4" color="primary" value="Y"></v-radio>
                  <v-radio label="미사용" class="mr-4" color="primary" value="N"></v-radio>
                </v-radio-group>
                <template v-if="eliSatisYn === 'Y'">
                  <div class="d-flex mt-2 justify-start align-center">
                    <v-checkbox v-model="satisDayYn" class="flex-0-0 mr-4" label="기간설정" />
                    <VDateInput v-model="eliSatisStrDate" :disabled="satisDayYn != true" />
                    <VTimeInput v-model="eliSatisStrTime" :disabled="satisDayYn != true"></VTimeInput>
                    <span class="mx-1">~</span>
                    <VDateInput v-model="eliSatisEndDate" :disabled="satisDayYn != true" />
                    <VTimeInput v-model="eliSatisEndTime" :disabled="satisDayYn != true"></VTimeInput>
                  </div>
                  <p class="mt-1 text-error">* 기간 설정 미사용 시 운영 종료 후 진행됩니다.</p>
                </template>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">사전조사</th>
              <td>
                <v-radio-group inline v-model="eliPreYn">
                  <v-radio label="사용" class="mr-4" color="primary" value="Y"></v-radio>
                  <v-radio label="미사용" class="mr-4" color="primary" value="N"></v-radio>
                </v-radio-group>
                <template v-if="eliPreYn === 'Y'">
                  <div class="d-flex mt-2 justify-start align-center">
                    <v-checkbox v-model="satisDayYn" class="flex-0-0 mr-4" label="기간설정" />
                    <VDateInput v-model="eliPreStrDate" :disabled="satisDayYn != true" />
                    <VTimeInput v-model="eliPreStrTime" :disabled="satisDayYn != true"></VTimeInput>
                    <span class="mx-1">~</span>
                    <VDateInput v-model="eliPreEndDate" :disabled="satisDayYn != true" />
                    <VTimeInput v-model="eliPreEndTime" :disabled="satisDayYn != true"></VTimeInput>
                  </div>
                  <p class="mt-1 text-error">* 기간 설정 미사용 시 운영 종료 후 진행됩니다.</p>
                </template>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">사후조사</th>
              <td>
                <v-radio-group inline v-model="eliAfterYn">
                  <v-radio label="사용" class="mr-4" color="primary" value="Y"></v-radio>
                  <v-radio label="미사용" class="mr-4" color="primary" value="N"></v-radio>
                </v-radio-group>
                <template v-if="eliAfterYn === 'Y'">
                  <div class="d-flex mt-2 justify-start align-center">
                    <v-checkbox v-model="satisDayYn" class="flex-0-0 mr-4" label="기간설정" />
                    <VDateInput v-model="eliAfterStrDate" :disabled="satisDayYn != true" />
                    <VTimeInput v-model="eliAfterStrTime" :disabled="satisDayYn != true"></VTimeInput>
                    <span class="mx-1">~</span>
                    <VDateInput v-model="eliAfterEndDate" :disabled="satisDayYn != true" />
                    <VTimeInput v-model="eliAfterEndTime" :disabled="satisDayYn != true"></VTimeInput>
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
          <v-btn variant="flat" color="success" width="80">저장</v-btn>
        </div>
      </v-col>
    </v-row>
  </BaseCard>
</template>

<script lang="ts">
/** ck에디터 */
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  data: () => ({
    /** select */
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
    selectTime: {
      satisRschStrTime: "00:00",
      satisRschEndTime: "00:00",
      applyStrTime: "00:00",
      applyEndTime: "00:00",
      oprtStrTime: "00:00",
      oprtEndTime: "00:00",
      preRschStrTime: "00:00",
      preRschEndTime: "00:00",
      afterRschStrTime: "00:00",
      afterRschEndTime: "00:00",
    },
    //주석, 불필요한 키값 삭제 예정 <!--TODO-->
    eliId: "", //비교과 차수 기본 정보 id   VARCHAR2(20 BYTE)
    eciId: "", //비교과 과정 기본 정보 id   VARCHAR2(20 BYTE)
    eliTitle: "", //비교과 차수명   VARCHAR2(100 BYTE)
    edhId: "", //비교과 과정 담당 부서 이력 id   VARCHAR2(20 BYTE)
    eliDeptNm: "", //담당부서/학과명   VARCHAR2(100 BYTE)
    eliStfId: "", //운영담당자 id   VARCHAR2(20 BYTE)
    eliStfNm: "", //운영담당자명   VARCHAR2(50 BYTE)
    eliStfPh: "", //담당자 연락처   VARCHAR2(50 BYTE)
    eliPartiCd: "", //참여유형 코드   VARCHAR2(20 BYTE)
    eliOprtYear: "", //운영 학년도   VARCHAR2(4 BYTE)
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
    eliWaitYn: null, //대기인원 선택 여부   CHAR(1 BYTE)
    eliWaitCnt: "", //대기 인원   NUMBER
    eliSts: "", //상태   VARCHAR2(20 BYTE)
    eliRejectCont: "", //반려 사유   VARCHAR2(1000 BYTE)
    eliDesc: "", //프로그램 소개 및 유의사항   CLOB
    eliSatisYn: "", //만족도 조사 기간설정 여부    CHAR(1 BYTE)
    eliSatisStrDate: "", //만족도 조사 기간 시작일   DATE
    eliSatisStrTime: "", //만족도 조사 기간 시작시간   VARCHAR2(20 BYTE)
    eliSatisEndDate: "", //만족도 조사 기간 종료일   DATE
    eliSatisEndTime: "", //만족도 조사 기간 종료시간   VARCHAR2(20 BYTE)
    eliPreYn: "", //사전조사 기간설정 여부    CHAR(1 BYTE)
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
    eliAfterYn: "",
    eliAfterStrDate: "",
    eliAfterStrTime: "",
    eliAfterEndDate: "",
    eliAfterEndTime: "",

    //차수의 부모가 되는 과정 키값들.
    ecmId: "", //비교과 카테고리 관리 id  VARCHAR2(20 BYTE)
    eciTitle: "", //과정명  VARCHAR2(200 BYTE)
    eciYn: "", //사용여부   CHAR(1 BYTE)
    eciDeptNm: "", //담당부서/학과명  VARCHAR2(100 BYTE)
    eciPartiCd: "", //참여유형 코드   VARCHAR2(20 BYTE)
    eciCertiNm: "", //이수증 명의   VARCHAR2(200 BYTE)
    eciOprtStrYear: "", //운영시작연도  VARCHAR2(4 BYTE)
    eciDesc: "", //과정 개설 사유 및 설명   VARCHAR2(4000 BYTE)
    eciReqYn: "", //신청서 제출   CHAR(1 BYTE)
    eciCertiYn: "", //이수증  CHAR(1 BYTE)
    eciSatisYn: "", //만족도조사  CHAR(1 BYTE)
    eciPreYn: "", //사전조사  CHAR(1 BYTE)
    eciAfterYn: "", //사후조사  CHAR(1 BYTE)
  }),
};
</script>
