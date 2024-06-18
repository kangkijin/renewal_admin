<template>
  <!-- 문항지 Header -->
  <v-row>
    <v-col>
      <div class="d-flex align-baseline">
        <div class="text-h4">문항지</div>
        <div class="required_txt ml-2">정확한 문항 번호는 저장 시 부여됩니다.</div>
      </div>

      <v-row>
        <v-col class="d-flex align-center pt-4">
          <div class="mr-2" style="font-weight: bold">{{ checkedList.length }}개 선택</div>
          <up-btn @click="onClickMoveBtn('UP')"></up-btn>
          <dw-btn @click="onClickMoveBtn('DW')"></dw-btn>
          <top-btn @click="onClickMoveBtn('TOP')"></top-btn>
          <btm-btn @click="onClickMoveBtn('BTM')"></btm-btn>
          <v-btn @click="onClickDelete()" class="mr-2">삭제</v-btn>

          <!-- Paging -->
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            class="text-primary text-h2"
            :disabled="activePageIdx === 0"
            @click="onClickMovePage('prev')"
          ></v-btn>
          <v-select class="flex-0-0" :items="pageOptions" v-model="activePageIdx"> </v-select>
          <p class="ml-2">페이지</p>
          <v-btn
            icon="mdi-chevron-right"
            variant="text"
            class="text-primary text-h2"
            :disabled="surveyPaper.length <= activePageIdx + 1"
            @click="onClickMovePage('next')"
          ></v-btn>
          <!-- Paging -->

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" persistent width="1300">
            <!-- dialog button -->
            <template v-slot:activator>
              <v-btn @click="onClickOpenPreview()" class="mr-2" variant="outlined" width="80">미리보기</v-btn>
            </template>
            <DiagPreview v-model="dialog" :qusPaper="fnPreviewQusInfo()" :paperInfo="paperInfo"></DiagPreview>
          </v-dialog>
          <!-- slot -->
          <slot></slot>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

  <!-- 문항지 Contents -->
  <v-row v-for="(page, pageNo) in surveyPaper" :key="pageNo" v-show="activePageIdx === pageNo">
    <v-col>
      <v-row v-if="page.relatedDiv === 'T'">
        <v-col>
          <v-chip label variant="flat" color="primary"> <v-icon icon="mdi-label" start></v-icon>연계 페이지 </v-chip>
        </v-col>
      </v-row>
      <v-row v-else-if="page.relatedDiv === 'S'">
        <v-col>
          <v-chip label variant="flat" color="primary"> <v-icon icon="mdi-label" start></v-icon>연계 시작 </v-chip>
        </v-col>
      </v-row>
      <v-row v-if="page.qusInfo.length === 0">
        <v-col cols="12">
          <div class="infomation_box text-center">
            <div>
              <v-icon icon="mdi-file-question" size="x-large"></v-icon>
              문항이 없습니다
              <span class="mt-2 ml-4">문항을 추가해주세요.</span>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <div class="diag_qus_wrap qus_option_check">
            <template v-for="(item, order) in page.qusInfo" :key="order">
              <div class="diag_qus">
                <v-checkbox class="d-inline-flex" :value="order" v-model="checkedList" />
                <QusOutput :qusInfo="item" :order="order"></QusOutput>
              </div>
            </template>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { ref, computed, getCurrentInstance } from "vue";
import QusOutput from "@/components/diagRschExam/IO/QusOutput.vue";
import { UpBtn, DwBtn, TopBtn, BtmBtn } from "@/components/diagRschExam/common/BtnImport";
import DiagPreview from "@/components/diagRschExam/preview/DiagPreview.vue";

import type { PaperOutputTypes } from "@/types/diagTypes/DiagIOTypes";
import type { PreviewPaperTypes } from "@/types/diagTypes/PreviewTypes";

defineProps<{
  viewType: string;
  paperInfo: PreviewPaperTypes;
}>();

const instance = getCurrentInstance();
if (!instance) {
  throw new Error("getCurrentInstance returned null");
}
const vm = instance.appContext.config.globalProperties;

/** 문항정보 */
const surveyPaper = defineModel<PaperOutputTypes[]>({ required: true });
/** 문항지 활성화 페이지 */
const activePageIdx = ref(0);

/** 선택된 문항 */
const checkedList = ref([] as number[]);

/** 동적 페이지 갯수 */
const pageOptions = computed(() => {
  const options = [];
  for (let i = 0; i < surveyPaper.value.length; i++) {
    options.push({ title: i + 1, value: i });
  }
  return options;
});

/** 미리보기 팝업 제어 */
const dialog = ref(false);

/** 미리보기 - 문항 */
const fnPreviewQusInfo = () => {
  let qusOrder = 0;
  for (let i = 0; i < surveyPaper.value.length; i++) {
    for (let j = 0; j < surveyPaper.value[i].qusInfo.length; j++) {
      surveyPaper.value[i].qusInfo[j].order = qusOrder++;
    }
  }
  return surveyPaper.value;
};

/** 미리보기 팝업 열기 */
const onClickOpenPreview = () => {
  for (let i = 0; i < surveyPaper.value.length; i++) {
    if (surveyPaper.value[i].qusInfo.length === 0) {
      vm.$alert(`${i + 1}페이지에 문항을 입력해주세요.`);
      return;
    }
  }

  dialog.value = true;
};

/** 페이지 변경 */
const onClickMovePage = (_dir: string) => {
  if (_dir === "next") {
    activePageIdx.value = activePageIdx.value + 1;
  } else if (_dir === "prev") {
    activePageIdx.value = activePageIdx.value - 1;
  }
  checkedList.value = [];
};

/** 문항 삭제 */
const onClickDelete = () => {
  if (checkedList.value.length === 0) {
    vm.$toast("문항을 선택해주세요", "warning");
    return;
  }

  // 체크 버튼을 누른 순서대로 배열에 입력되어 삭제 시 내림차순으로 정렬해서 삭제해야한다
  checkedList.value.sort((a: number, b: number) => b - a);
  const activePage = surveyPaper.value[activePageIdx.value];

  let msg = "선택한 문항을 삭제하시겠습니까?";
  if (activePage.qusInfo[checkedList.value[0]].type === "BRANCH") {
    msg = `선택된 문항 중 <span class="text-error font-weight-medium">분기문항</span>이 존재합니다.<br />
    분기 문항 연계 페이지와 등록된 문항도 함께 삭제됩니다.<br />
    삭제하시겠습니까?`;
  }

  vm.$confirm(msg, "주의!", (isConfirm: boolean) => {
    if (isConfirm) {
      // 분기 문항 관련 삭제 로직
      if (activePage.qusInfo[checkedList.value[0]].type === "BRANCH") {
        activePage.relatedDiv = "N"; // 연계 미사용 처리
        surveyPaper.value.splice(activePageIdx.value + 1, 2);
      }

      checkedList.value.forEach((item) => {
        activePage.qusInfo.splice(item, 1);
      });
      checkedList.value = [];
      vm.$toast("삭제되었습니다.", "success");
    }
  });
};

/** 문항 이동 버튼 */
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
  if (surveyPaper.value[activePageIdx.value].qusInfo[index].type === "BRANCH") {
    vm.$alert("분기문항은 이동할 수 없습니다.");
    return;
  }

  if (_dir === "UP") {
    fnMoveUp(index);
  } else if (_dir === "DW") {
    fnMoveDw(index);
  } else if (_dir === "TOP") {
    fnMoveTop(index);
  } else if (_dir === "BTM") {
    fnMoveBtm(index);
  }
};

/** 위로 버튼 */
const fnMoveUp = (index: number) => {
  const activePage = surveyPaper.value[activePageIdx.value];
  const beforePage = surveyPaper.value[activePageIdx.value - 1];

  // 첫 번째 페이지 첫 번째 문항인 경우
  if (index === 0 && activePageIdx.value === 0) {
    vm.$toast("첫 번째 페이지의 첫 번째 문항입니다.", "error");
    // return;
  }
  // 첫 번째 페이지 X 첫번째 문항인 경우
  else if (index === 0 && activePageIdx.value !== 0) {
    const shiftRow = activePage.qusInfo.shift();

    // 이전 페이지 마지막 문항이 분기 문항인 경우
    let targetIdx = beforePage.qusInfo.length;

    if (beforePage.qusInfo.length > 0 && beforePage.qusInfo[beforePage.qusInfo.length - 1].type === "BRANCH") {
      targetIdx = targetIdx - 1;
    }

    if (shiftRow) beforePage.qusInfo.splice(targetIdx, 0, shiftRow);
    checkedList.value = [];

    vm.$toast(`${activePageIdx.value}페이지 마지막 문항으로<br />이동하였습니다.`, "success");
  } else {
    const selectedRow = activePage.qusInfo[index];
    activePage.qusInfo.splice(index, 1);
    activePage.qusInfo.splice(index - 1, 0, selectedRow);
    checkedList.value[0] = checkedList.value[0] - 1; // 체크된 문항 같이 이동시켜주기
  }
};

/** 아래로 버튼 */
const fnMoveDw = (index: number) => {
  const activePage: number = activePageIdx.value;

  // 마지막 페이지 마지막 문항인 경우
  if (index + 1 === surveyPaper.value[activePage].qusInfo.length && activePage + 1 === surveyPaper.value.length) {
    vm.$toast("마지막 페이지의 마지막 문항입니다.", "error");
    // return;
  }
  // 마지막 페이지 X 마지막 문항인 경우
  else if (index + 1 === surveyPaper.value[activePage].qusInfo.length && activePage + 1 !== surveyPaper.value.length) {
    const popRow = surveyPaper.value[activePage].qusInfo.pop();
    if (popRow) surveyPaper.value[activePage + 1].qusInfo.unshift(popRow);
    checkedList.value = [];

    vm.$toast(`${activePage + 2}페이지 첫 번째 문항으로<br />이동하였습니다.`, "success");
  }
  // 다음 문항이 분기 문항인 경우
  else if (surveyPaper.value[activePage].qusInfo[index + 1].type === "BRANCH") {
    vm.$alert("분기문항보다 아래로 이동할 수 없습니다.");
    // return
  } else {
    const selectedRow = surveyPaper.value[activePage].qusInfo[index];
    surveyPaper.value[activePage].qusInfo.splice(index, 1);
    surveyPaper.value[activePage].qusInfo.splice(index + 1, 0, selectedRow);
    checkedList.value[0] = checkedList.value[0] + 1; // 체크된 문항 같이 이동시켜주기
  }
};

/** 최상위 버튼 */
const fnMoveTop = (index: number) => {
  if (index === 0) {
    vm.$toast("첫 번째 문항입니다.", "error");
    return;
  }

  const activePage = surveyPaper.value[activePageIdx.value];
  const selectedRow = activePage.qusInfo[index];

  activePage.qusInfo.splice(index, 1);
  activePage.qusInfo.unshift(selectedRow);
  checkedList.value[0] = 0;
};

/** 최하위 버튼 */
const fnMoveBtm = (index: number) => {
  const activePage = surveyPaper.value[activePageIdx.value];

  // 마지막 문항인 경우
  if (index + 1 === activePage.qusInfo.length) {
    vm.$toast("마지막 문항입니다.", "error");
    return;
  }

  const selectedRow = activePage.qusInfo[index];
  activePage.qusInfo.splice(index, 1);

  let targetIdx = activePage.qusInfo.length;

  // 마지막 문항이 분기문항인 경우
  if (activePage.qusInfo[activePage.qusInfo.length - 1].type === "BRANCH") {
    targetIdx = targetIdx - 1;
    vm.$toast("마지막 문항이 분기문항입니다.<br />마지막 전 문항으로 이동합니다.", "info");
  }

  activePage.qusInfo.splice(targetIdx, 0, selectedRow);
  checkedList.value[0] = targetIdx;
};
</script>
