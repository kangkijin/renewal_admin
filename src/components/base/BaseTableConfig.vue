<template>
  <div class="d-flex pb-2 justify-space-between">
    <div class="d-flex align-center justify-start" style="width: 50%">
      <p class="font-weight-medium mr-2" style="color: grey">Total: {{ totalCnt }}</p>
      <v-select
        v-if="!hideRowPerPage"
        :items="rowsPerPageOptions"
        v-model="selectedRowPerPage"
        style="width: 180px; flex: inherit"
      />
    </div>
    <div class="d-flex align-center justify-end" style="width: 50%">
      <!-- template v-slot:top-btn-area (S) -->
      <slot name="top-btn-area"></slot>
      <!-- template v-slot:top-btn-area (E) -->
    </div>
  </div>

  <v-divider />

  <div class="d-flex py-2 justify-space-between">
    <div class="d-flex align-center justify-start" style="width: 50%">
      <!-- template v-slot:left-btn-area (S) -->
      <div class="d-flex align-center justify-start">
        <!-- checked 상태일 때만 나오는 체크된 갯수 -->
        <p v-if="checked" class="font-weight-medium mr-2" style="color: grey">{{ validationCheckedCnt }}</p>
        <slot name="left-btn-area"> </slot>
      </div>
      <!-- template v-slot:left-btn-area (E) -->
    </div>
    <div class="d-flex align-center justify-end" style="width: 50%">
      <!-- template v-slot:right-btn-area (S) -->
      <slot name="right-btn-area"></slot>
      <!-- template v-slot:right-btn-area (E) -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import tableConfig from "@/types/dataTable/EasyDataTableConfig";

const props = defineProps({
  totalCnt: { type: Number, required: true },
  checked: { type: Boolean, default: false },
  checkedCnt: { type: Number },
  hideRowPerPage: { type: Boolean, default: false },
});

const rowsPerPageOptions = tableConfig.rowsItems;
const selectedRowPerPage = defineModel("rowPerPage", { type: Number, required: true });

const validationCheckedCnt = computed(() => {
  return props.checkedCnt === null || props.checkedCnt === undefined
    ? "checkedCnt를 입력해주세요"
    : `${props.checkedCnt}개 선택`;
});
</script>
