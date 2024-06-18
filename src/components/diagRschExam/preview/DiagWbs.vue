<template>
  <v-expansion-panels class="diag_timer_wrap" v-model="model">
    <v-expansion-panel elevation="0" class="diag_timer">
      <v-expansion-panel-title class="timer_header">
        <p v-if="exam" class="timer">12 : 10</p>
        <p v-else class="text">진단 실시 중</p>

        <p class="qus_counter">
          <span>{{ resCnt }}</span> / {{ qusList.length }}
        </p>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <ul class="timer_quslist">
          <!-- :class="item.ansSts ?? 'disabled'" -->
          <li v-for="item in qusList" :key="item.order" class="qus_item" :class="item.ansSts ?? 'disabled'">
            <p>{{ item.order }}</p>
            <strong></strong>
          </li>
        </ul>
      </v-expansion-panel-text>
      <div class="d-flex justify-center mt-6">
        <v-btn variant="outlined" class="mr-2 flex-1-0" @click="onClickTempSave">임시저장</v-btn>
        <v-btn variant="flat" class="flex-1-0" color="success" @click="onClickSave">
          {{ exam ? "시험" : "진단" }} 제출하기
        </v-btn>
      </div>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup lang="ts">
import type { QusOutputTypes } from "@/types/diagTypes/DiagIOTypes";
import { getCurrentInstance } from "vue";

/** Panels 펼치기 제어 */
const model = defineModel();
const dialog = defineModel("dialog", { type: Boolean, required: true });

interface Props {
  exam?: boolean;
  qusList: QusOutputTypes[];
  resCnt: number;
}

const props = withDefaults(defineProps<Props>(), {
  exam: false,
});

const instance = getCurrentInstance();
if (!instance) {
  throw new Error("getCurrentInstance returned null");
}
const vm = instance.appContext.config.globalProperties;

/** 임시 저장 버튼 */
const onClickTempSave = () => {
  if (props.resCnt === 0) {
    vm.$alert("답변한 문항이 없습니다.");
  } else {
    vm.$alert("임시저장 되었습니다.<br>(미리보기에선 실제로 저장되지 않습니다.)");
  }
};

const onClickSave = () => {
  if (props.resCnt !== props.qusList.length) {
    vm.$alert("답을 체크하지 않은 문항이 있습니다.");
  } else {
    // 제출 여부 confirm
    vm.$confirm("작성하신 답안을 제출하시겠습니까?", "확인", (isConfirm: Boolean) => {
      if (isConfirm) {
        // 제출 완료 alert
        vm.$alert("답안이 제출되었습니다.<br>(미리보기에선 실제로 저장되지 않습니다.)", "알림", () => {
          // 팝업 종료 여부 confirm
          vm.$confirm("미리보기를 종료하시겠습니까?", "확인", (isConfirm: Boolean) => {
            if (isConfirm) {
              dialog.value = false;
            }
          });
        });
      }
    });
  }
};
</script>
