<template>
  <v-menu transition="slide-y-transition" min-width="0" scrim :close-on-content-click="false" v-model="menu">
    <template v-slot:activator="{ props }">
      <v-text-field
        prepend-inner-icon="mdi-calendar-month"
        v-bind="props"
        readonly
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="model"
      ></v-text-field>
    </template>
    <v-list class="pa-0">
      <v-date-picker color="info" v-model="selDate" @update:model-value="updateDatePicker">
        <template v-slot:title></template>
        <template v-slot:header></template>
      </v-date-picker>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import moment from "moment";
import { computed, ref, watch } from "vue";

/** 데이트피커(달력) 보이는 것 제어 */
const menu = ref(false);
/** v-date-picker에서 실제 선택된 값 */
const selDate = ref(null as unknown);

/** 부모 컴포넌트랑 주고받는 값 */
const model = defineModel({ type: String });

defineProps({
  placeholder: { type: String, default: "날짜" },
  disabled: { type: Boolean, default: false },
});

/** selDate(v-date-picker)의 값이 Date 타입으로 넘어오기 때문에 포맷팅해준다. */
const formatted = computed(() => {
  return selDate.value ? moment(selDate.value).format("YYYY-MM-DD") : "";
});

/** v-date-picker에서 값 선택 시 model에 값을 담아주고 달력을 닫는다 */
const updateDatePicker = () => {
  menu.value = false;
  model.value = formatted.value;
};

watch(model, () => {
  selDate.value = moment(model.value).toDate();
});
</script>
