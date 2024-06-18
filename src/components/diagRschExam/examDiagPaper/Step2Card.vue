<template>
  <v-container>
    <!-- 문항 등록 -->
    <v-row>
      <v-col cols="12" md="2" class="d-flex align-center text-h6">
        <span class="required">문항등록</span>
      </v-col>
      <v-col cols="12" md="10" class="d-flex align-center">
        <span class="d-flex align-center">
          (
          <v-text-field
            type="number"
            v-model="(qus ?? []).length"
            class="flex-0-0 mx-2"
            hideSpinButtons
            style="width: 50px"
            disabled
          ></v-text-field
          >) 개
        </span>

        <v-btn size="small" class="ml-2" @click="onClickDownloadExcelForm">양식 다운로드</v-btn>

        <v-dialog v-model="isPopup" persistent width="60%">
          <template v-slot:activator="{ props }">
            <v-btn size="small" class="ml-2" v-bind="props">파일 업로드</v-btn>
          </template>
          <!-- dialog inner -->
          <ExcelUploadPopup v-model="isPopup" :header="headers" @upload:list="onUploadExcelData">
            <template #title>
              <div>문항등록 할 엑셀파일을 업로드 해주세요.</div>
            </template>
          </ExcelUploadPopup>
        </v-dialog>
      </v-col>
    </v-row>

    <!-- 페이지 출력 방식 -->
    <v-row>
      <v-col cols="12" md="2" class="d-flex align-center text-h6">
        <span class="required">페이지 출력 방식</span>
      </v-col>
      <v-col cols="12" md="10">
        <v-radio-group v-model="paper.dapViewCnt" inline>
          <v-radio label="1문항출력" class="mr-4" :value="1" density="compact"></v-radio>
          <v-radio label="전체 문항출력" class="mr-4" :value="-1" density="compact"></v-radio>
          <v-radio value="n" density="compact">
            <template #label>
              출력단위 입력(
              <v-text-field
                type="number"
                oninput="javascript: this.value = this.value.replace(/[e.]/g, '' );"
                v-model="paper.perPageCnt"
                class="flex-0-0 mx-2"
                :rules="[(v) => v > 0]"
                hideSpinButtons
                style="width: 50px"
                :disabled="paper.dapViewCnt != 'n'"
              ></v-text-field>
              개)
            </template>
          </v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- 점수 산정 방식 -->
    <v-row>
      <v-col cols="12" md="2" class="d-flex align-center text-h6">
        <span class="required">점수 산정 방식</span>
      </v-col>
      <v-col cols="12" md="10">
        <v-radio-group v-model="paper.dapCalcDiv" inline>
          <v-radio label="평균" class="mr-4" value="A" density="compact"></v-radio>
          <v-radio label="합산" class="mr-4" value="R" density="compact"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- 문항 배점 -->
    <v-row>
      <v-col cols="12" md="2" class="d-flex align-center text-h6">
        <span class="required">문항배점</span>
      </v-col>
      <v-col cols="12" md="10">
        <span class="d-flex align-center">
          점수(
          <v-text-field
            type="number"
            class="flex-0-0 mx-2"
            v-model="paper.dapScore"
            hideSpinButtons
            style="width: 50px"
          >
          </v-text-field>
          점)
        </span>
      </v-col>
    </v-row>

    <!-- 보기별 내용/배점 -->
    <v-row>
      <v-col cols="12" md="2" class="d-flex text-h6">
        <span class="required">보기별 내용/배점</span>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col>
            <v-row v-for="(ansInfo, idx) in paper.dapAnsInfo" :key="idx">
              <v-col class="d-flex align-center py-1">
                <span>{{ idx + 1 }}</span>
                <v-text-field
                  class="ml-3 mr-3"
                  v-model="ansInfo.dapAnsTitle"
                  placeholder="보기내용을 입력해주세요."
                ></v-text-field>
                <v-text-field
                  type="number"
                  v-model="ansInfo.dapAnsScore"
                  :rules="[(v: any) => parseInt(v) <= (paper.dapScore ?? 0)]"
                  class="flex-0-0"
                  placeholder="배점"
                  style="width: 100px"
                  hideSpinButtons
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="text-error">문항 배점 및 보기 배점은 소수점 첫째 자리까지 반올림됩니다. </span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from "vue";
import ExcelUploadPopup from "@/components/common/ExcelUploadPopup.vue";
import type { Header, Item } from "@/plugins/xlsx";
import { excelDown } from "@/plugins/xlsx";
import type { AxiosResponse } from "axios";
import type { AbilityTypes } from "@/types/diagTypes/AbilityTypes";
import type { AbilityDiagPaperTypes, AbilityDiagQusExcelForm } from "@/types/diagTypes/AbilityDiagTypes";

/** 컴포넌트 로드 시 실행 */
onMounted(() => {
  getAbilityEnum();
});

/** 전역변수 접근용 instance */
const instance = getCurrentInstance();
if (!instance) {
  throw new Error("getCurrentInstance returned null");
}
const vm = instance.appContext.config.globalProperties;

/** 진단지 정보 v-model */
const paper = defineModel<AbilityDiagPaperTypes>("diagPaper", { required: true });
/** 진단지 문항 정보 v-model */
const qus = defineModel<AbilityDiagQusExcelForm[]>("diagQus", { required: true });

/** 엑셀 파일 업로드 팝업 제어 변수 */
let isPopup = ref(false);

/** 엑셀 양식다운로드 버튼 */
const onClickDownloadExcelForm = () => {
  excelDown(headers, items, "핵심역량진단_문항_양식");
};

/** 엑셀 파일 업로드 버튼 */
const onUploadExcelData = (_list: AbilityDiagQusExcelForm[]) => {
  qus.value = _list;
};

/** 엑셀 업로드 시 역량 코드 값 제한용 */
const abilityEnum = ref([] as string[]);

/** 역량 정보 가져와서 하위역량 string[]로 가공 */
const getAbilityEnum = () => {
  const param = {
    cdDiv: "C",
  };
  vm.$axios.get("/api/cmmn/diag/getAbilityInfo", { params: param }).then((res: AxiosResponse) => {
    const resData = res.data;
    const abilityList: AbilityTypes[] = resData.data;
    abilityList.forEach((ability: AbilityTypes) => {
      ability.children?.forEach((item: AbilityTypes) => {
        abilityEnum.value.push(item.cdId);
      });
    });
  });
};

/** 엑셀 업로드/다운로드 헤더 */
const headers: Header[] = [
  {
    header: "핵심역량코드",
    key: "upAbilityCd",
    width: 20,
    required: true,
  },
  {
    header: "하위역량코드",
    key: "abilityCd",
    width: 20,
    required: true,
    chkEnum: abilityEnum.value,
  },
  {
    header: "문항 내용",
    key: "daqTitle",
    width: 40,
    required: true,
  },
  {
    header: "역채점여부 (Y 표시)",
    key: "rvrsYn",
    width: 20,
  },
];

/** 엑셀 양식 다운로드 시 예시 데이터 */
const items: Item[] = [
  {
    upAbilityCd: "A001",
    abilityCd: "A001001",
    daqTitle: "ex) 나는 해결하기 힘든 일에 직면했을 때, 여러 대안들을 찾는다.",
    rvrsYn: "Y",
  },
];
</script>
