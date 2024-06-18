<template>
  <v-row>
    <v-col cols="12">
      <div class="text-h4">문항지</div>
      <div class="d-flex align-center pt-4">
        <div class="mr-2" style="font-weight: bold">{{ checkedList.length }}개 선택</div>
        <up-btn @click="onClickMoveBtn('UP')"></up-btn>
        <dw-btn @click="onClickMoveBtn('DW')"></dw-btn>
        <top-btn @click="onClickMoveBtn('TOP')"></top-btn>
        <btm-btn @click="onClickMoveBtn('BTM')"></btm-btn>
        <v-btn @click="onClickDelete()" color="grey-darken-1" class="mr-2">삭제</v-btn>

        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" persistent width="1300">
          <!-- dialog button -->
          <template v-slot:activator>
            <v-btn @click="onClickPreviewPopup()" class="mr-2" variant="outlined" color="text-background" width="80">
              미리보기
            </v-btn>
          </template>
          <DiagPreview v-model="dialog" :qusPaper="fnPreviewQusInfo()" :paperInfo="fnPreviewPaperInfo()"></DiagPreview>
        </v-dialog>

        <slot></slot>
      </div>
    </v-col>
  </v-row>

  <v-row>
    <v-col v-if="diagQusList.length === 0" cols="12">
      <div class="infomation_box">
        <div>
          <v-icon icon="mdi-file-question" size="x-large"></v-icon>
          문항이 없습니다
          <span class="mt-2 ml-4">문항을 업로드해주세요</span>
        </div>
      </div>
    </v-col>
    <v-col v-else>
      <div class="diag_qus_wrap qus_option_check">
        <template v-for="(item, order) in formattedQusList" :key="order">
          <div class="diag_qus">
            <v-checkbox class="d-inline-flex" :value="order" v-model="checkedList" />
            <QusOutput :qusInfo="item" :order="item.order"></QusOutput>
          </div>
        </template>
      </div>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { ref, computed, getCurrentInstance } from "vue";
import QusOutput from "@/components/diagRschExam/IO/QusOutput.vue";
import { UpBtn, DwBtn, TopBtn, BtmBtn } from "@/components/diagRschExam/common/BtnImport";
import DiagPreview from "@/components/diagRschExam/preview/DiagPreview.vue";

import type {
  AbilityDiagPaperTypes,
  AbilityDiagAnsInfoTypes,
  AbilityDiagQusExcelForm,
} from "@/types/diagTypes/AbilityDiagTypes";
import type { AnsOuputTypes, QusOutputTypes, PaperOutputTypes } from "@/types/diagTypes/DiagIOTypes";
import type { PreviewPaperTypes } from "@/types/diagTypes/PreviewTypes";

const instance = getCurrentInstance();
if (!instance) {
  throw new Error("getCurrentInstance returned null");
}
const vm = instance.appContext.config.globalProperties;

const diagQusList = defineModel<AbilityDiagQusExcelForm[]>({ required: true });

const props = defineProps<{
  diagPaperInfo: AbilityDiagPaperTypes;
}>();

/** 미리보기 팝업 제어 */
const dialog = ref(false);

/** 미리보기 팝업 활성화 */
const onClickPreviewPopup = () => {
  if (props.diagPaperInfo.dapViewCnt === "n" && !(props.diagPaperInfo.perPageCnt > 0)) {
    vm.$alert("페이지 당 출력 문항 수가 유효하지 않습니다.", "");
    return;
  } else if (diagQusList.value.length === 0) {
    vm.$alert("문항을 등록해주세요.", "");
    return;
  }

  dialog.value = true;
};

/** 선택된 문항 */
const checkedList = ref([] as number[]);

/** 핵심역량진단 관련 코드를 Output 양식에 맞추어 변환 */
const formattedQusList = computed((): QusOutputTypes[] => {
  // 답변 처리
  const ansInfo: AnsOuputTypes[] = props.diagPaperInfo.dapAnsInfo.map(
    (item: AbilityDiagAnsInfoTypes, ansIdx: number) => {
      const formatted: AnsOuputTypes = {
        title: item.dapAnsTitle ?? "",
        order: ansIdx,
        score: item.dapAnsScore ?? 0,
      };
      return formatted;
    },
  );

  return diagQusList.value.map((item, qusIdx): QusOutputTypes => {
    return {
      title: item.daqTitle,
      order: qusIdx,
      multiYn: "N",
      pageNo: 0,
      type: "SCALE",
      ansInfo: ansInfo,
    };
  });
});

/** 진단 미리보기 진단지 정보 데이터 가공 */
const fnPreviewPaperInfo = (): PreviewPaperTypes => {
  return {
    title: props.diagPaperInfo.dapTitle,
    guide: props.diagPaperInfo.dapGuide,
  };
};

/** 진단 미리보기 문항 정보 데이터 가공 */
const fnPreviewQusInfo = (): PaperOutputTypes[] => {
  let pagingCnt: number = 1;

  const viewCnt = props.diagPaperInfo.dapViewCnt ?? 0;
  if (viewCnt === "n") pagingCnt = parseInt(props.diagPaperInfo.perPageCnt.toString());
  else if (viewCnt < 0) pagingCnt = diagQusList.value.length;

  const convertedArr = fnConvertR2Arr(formattedQusList.value, pagingCnt);

  return convertedArr.map((item): PaperOutputTypes => {
    return {
      qusInfo: item,
      relatedDiv: "N",
    };
  });
};

/** 1차원배열 > 2차원배열 변환 */
const fnConvertR2Arr = <T,>(arr: T[], n: number) => {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += n) {
    res.push(arr.slice(i, i + n));
  }
  return res;
};

/**
 * 문항 이동 관련 버튼
 * @param _dir
 * "UP" | "DW" | "TOP" | "BTM"
 * @commet 문항 이동은 한개씩만 가능하다
 */
const onClickMoveBtn = (_dir: string) => {
  const length = checkedList.value.length;

  if (length === 0) {
    vm.$toast("문항을 선택해주세요", "warning");
    return;
  } else if (length > 1) {
    vm.$toast("문항 이동은 한개씩만 가능합니다", "warning");
    return;
  }

  const index = checkedList.value[0];
  if (_dir === "UP") {
    onClickMoveUp(index);
  } else if (_dir === "DW") {
    onClickMoveDw(index);
  } else if (_dir === "TOP") {
    onClickMoveTop(index);
  } else if (_dir === "BTM") {
    onClickMoveBtm(index);
  }
};

/** 위로 버튼 */
const onClickMoveUp = (index: number) => {
  if (index === 0) {
    vm.$toast("첫 번째 행입니다", "error");
    return;
  }

  const selectedRow = diagQusList.value[index];
  diagQusList.value.splice(index, 1);
  diagQusList.value.splice(index - 1, 0, selectedRow);
  checkedList.value[0] = checkedList.value[0] - 1;
};

/** 아래로 버튼 */
const onClickMoveDw = (index: number) => {
  if (index === diagQusList.value.length - 1) {
    vm.$toast("마지막 행입니다", "error");
    return;
  }
  const selectedRow = diagQusList.value[index];
  diagQusList.value.splice(index, 1);
  diagQusList.value.splice(index + 1, 0, selectedRow);
  checkedList.value[0] = checkedList.value[0] + 1;
};

/** 최상위 버튼 */
const onClickMoveTop = (index: number) => {
  if (index === 0) {
    vm.$toast("첫 번째 행입니다", "error");
    return;
  }
  const selectedRow = diagQusList.value[index];
  diagQusList.value.splice(index, 1);
  diagQusList.value.unshift(selectedRow);
  checkedList.value[0] = 0;
};

/** 최하위 버튼 */
const onClickMoveBtm = (index: number) => {
  if (index === diagQusList.value.length - 1) {
    vm.$toast("마지막 행입니다", "error");
    return;
  }
  const selectedRow = diagQusList.value[index];
  diagQusList.value.splice(index, 1);
  diagQusList.value.push(selectedRow);
  checkedList.value[0] = diagQusList.value.length - 1;
};

/** 문항 삭제 버튼 */
const onClickDelete = () => {
  if (checkedList.value.length === 0) {
    vm.$toast("문항을 선택해주세요", "warning");
    return false;
  }

  vm.$confirm("선택한 문항을 삭제하시겠습니까?", "주의!", (isConfirm: Boolean) => {
    if (isConfirm) {
      // 체크 버튼을 누른 순서대로 배열에 입력되어 삭제 시 내림차순으로 정렬해서 삭제해야한다
      checkedList.value.sort((a: number, b: number) => b - a);

      for (let i = 0; i < checkedList.value.length; i++) {
        const index = checkedList.value[i];
        diagQusList.value.splice(index, 1);
      }
      checkedList.value = [];
      vm.$toast("삭제되었습니다.", "success");
    }
  });
};
</script>
