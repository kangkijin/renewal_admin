<template>
  <ChoiceOutput v-if="qusInfo.type === 'CHOICE'" :qusInfo="qusInfo" :order="order" v-model="model"></ChoiceOutput>
  <OpenOutput v-else-if="qusInfo.type === 'OPEN'" :qusInfo="qusInfo" :order="order" v-model="model"></OpenOutput>
  <ScaleOutput v-else-if="qusInfo.type === 'SCALE'" :qusInfo="qusInfo" :order="order" v-model="model"></ScaleOutput>
  <BranchOutput
    v-else-if="qusInfo.type === 'BRANCH'"
    :preview="preview"
    :qusInfo="qusInfo"
    :order="order"
    v-model="model"
  ></BranchOutput>
</template>
<script setup lang="ts">
import ChoiceOutput from "@/components/diagRschExam/IO/ChoiceOutput.vue";
import OpenOutput from "@/components/diagRschExam/IO/OpenOutput.vue";
import ScaleOutput from "@/components/diagRschExam/IO/ScaleOutput.vue";
import BranchOutput from "@/components/diagRschExam/IO/BranchOutput.vue";

import type { QusOutputTypes } from "@/types/diagTypes/DiagIOTypes";

interface Props {
  qusInfo: QusOutputTypes;
  order: number;
  preview?: boolean;
}

withDefaults(defineProps<Props>(), {
  preview: false,
});

const model = defineModel();
</script>
