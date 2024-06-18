<template>
  <div class="qus_header">
    <strong class="qus_num">{{ order + 1 < 10 ? `0${order + 1}` : order + 1 }}.</strong>
    <p class="qus_tit">{{ qusInfo.title }}</p>
  </div>
  <div class="hint_wrap mb-4" v-if="qusInfo.hint != ''">
    <strong>Hint</strong>
    {{ qusInfo.hint }}
  </div>
  <div class="qus_cnt">
    <input type="text" class="form_style" v-model="model" variant="underlined" placeholder="입력해주세요" />
  </div>
</template>

<script setup lang="ts">
import type { QusOutputTypes } from "@/types/diagTypes/DiagIOTypes";

defineProps<{ qusInfo: QusOutputTypes; order: number }>();
const model = defineModel({ type: String });
</script>
