<template>
  <div class="qus_header">
    <strong class="qus_num">{{ idx + 1 }}-{{ subIdx + 1 }}.</strong>
    <p class="qus_tit">
      {{ qus.title }}

      <strong v-if="survey && qus.ansScoreYn" class="qus_score">문항별 점수</strong>
      <strong v-else-if="!survey" class="qus_score">{{ qus.qusScore }}점</strong>

      <v-btn icon="mdi-pencil-circle-outline" variant="flat" density="compact" class="filter_green mx-1"> </v-btn>
      <v-btn
        icon="mdi-close-circle-outline"
        variant="flat"
        density="compact"
        class="filter_red mx-1"
        @click="deleteRow(idx, subIdx)"
      >
      </v-btn>
    </p>
  </div>
  <div class="hint_wrap"><strong>Hint</strong>{{ qus.subTitle }}</div>
  <div class="qus_cnt">
    <div v-for="(ansInfo, ansIdx) in qus.ansInfo" :key="ansIdx">
      <p class="qus_tit">
        {{ ansIdx + 1 }}. {{ ansInfo.title }}

        <strong
          v-if="survey && qus.ansScoreYn"
          class="qus_score"
          style="color: #54a5eb; font-weight: lighter; font-size: 10px"
        >
          {{ `${ansInfo.ansScore}점` }}
        </strong>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const model = defineModel({ type: Object });

defineProps({
  idx: { type: Number, required: true },
  subIdx: { type: Number, required: true },
  qus: { type: Object, required: true },
  survey: { type: Boolean, default: false },
});

const deleteRow = (idx: any, subIdx: any) => {
  model.value[idx].splice(subIdx, 1);
};
</script>
