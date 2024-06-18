<template>
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
              <th scope="row" class="required">
                부서/학과변경이력
                <v-avatar class="mr-1 bg-primary" size="18">
                  <v-icon style="font-size: 12px">mdi-exclamation-thick</v-icon>
                  <v-tooltip>부서/학과변경이력 툴팁입니다</v-tooltip>
                </v-avatar>
              </th>
              <td>
                <v-text-field value="과정등록 이후 제공됩니다." disabled></v-text-field>
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
          <v-btn variant="flat" color="success" width="80" @click="fnSaveCategory()">저장</v-btn>
        </div>
      </v-col>
    </v-row>
  </BaseCard>
</template>
<script lang="ts">
import type { AxiosResponse } from "axios";

export default {
  data: () => ({
    rules: [(v: any) => v.length <= 2000 || "2000자 이하로 작성해주세요."],
    selectOption1: {
      year: ["2024", "2023", "2022"],
      value: "",
      category: ["카테고리 이름1", "카테고리 이름2", "카테고리 이름3"],
    },
    categoryList: [],
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
    },
  }),
  beforeMount() {
    const vm = this;
    vm.fnGetCategorySelect();
  },
  methods: {
    //저장
    fnSaveCategory() {
      const vm = this;
      vm.$axios.post("/api/v1/saveEcpCurri", vm.regDatas).then((res: AxiosResponse) => {
        console.log(res);
        if (res.data.code == "200") {
          alert("저장되었습니다.");
          console.log(res);
        }
      });
    },
    fnGetCategorySelect() {
      const vm = this;
      vm.$axios.get("/api/v1/ecpCategorySelect").then((res: AxiosResponse) => {
        const resData = res.data;
        vm.categoryList = resData.data;
      });
    },
  },
};
</script>
