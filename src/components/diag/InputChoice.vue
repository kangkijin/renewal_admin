<template>
  <v-row>
    <v-col class="d-flex align-center" cols="12">
      <v-col cols="2">
        <v-checkbox v-if="choice" @update:model-value="updateMultiYn" v-model="model.multiAnsYn">
          <template v-slot:label>
            <div>복수응답</div>
          </template>
        </v-checkbox>
      </v-col>
      <v-col v-if="!survey" cols="10" class="d-flex align-center">
        <v-spacer></v-spacer>
        <p>문항배점 :</p>
        <v-text-field
          type="number"
          v-model="model.qusScore"
          hideSpinButtons
          placeholder="0"
          class="flex-0-0 mr-2"
          style="width: 80px"
        ></v-text-field>
      </v-col>
      <v-col v-else-if="survey && choice" cols="2">
        <v-checkbox label="문항별 점수 부여" v-model="model.ansScoreYn" />
      </v-col>
    </v-col>

    <!-- 문제 설명 Part -->
    <v-col>
      <v-col class="d-flex align-center" cols="12">
        <v-text-field
          v-model="model.title"
          :placeholder="!choice ? '설문설명을 입력해주세요' : '문제설명을 입력해주세요'"
        ></v-text-field>
      </v-col>
      <v-col class="d-flex pt-1" cols="12">
        <v-text-field
          v-model="model.subTitle"
          :placeholder="!choice ? '설문을 입력해주세요' : '문제를 입력해주세요'"
          :rules="titleRules"
          :hide-details="false"
        ></v-text-field>
        <v-btn class="ml-2" color="primary" icon="mdi-image" density="comfortable" variant="outlined"></v-btn>
      </v-col>
    </v-col>
  </v-row>

  <v-divider v-if="itemdiv != 'surveySbjct'" class="pt-3 mb-3" />

  <!-- 문제 보기 Part -->
  <v-row>
    <v-col>
      <v-row>
        <v-col class="ml-2">
          <v-checkbox v-if="!choice && itemdiv != 'surveySbjct'" v-model="model.blankYn">
            <template v-slot:label>
              <div>공백포함</div>
            </template>
          </v-checkbox>
        </v-col>
      </v-row>
      <v-radio-group v-model="model.ansAnswer" @update:model-value="chkRadioCnt">
        <v-row v-for="(ansInfo, idx) in model.ansInfo" :key="idx" class="align-center px-4 mt-2">
          <v-col v-if="!survey && choice" cols="2">
            <v-radio label="정답여부" :value="idx" color="primary" multiple></v-radio>
          </v-col>
          <v-col class="d-flex pt-1">
            <v-text-field
              type="number"
              hideSpinButtons
              v-model="model.ansInfo[idx].ansScore"
              v-if="model.ansScoreYn && survey"
              placeholder="배점"
              class="flex-0-0 mr-2"
              style="width: 100px"
            ></v-text-field>
            <v-text-field
              v-if="itemdiv != 'surveySbjct'"
              :placeholder="!choice ? '복수로 들어갈 답을 입력해주세요' : '보기를 입력해주세요'"
              v-model="model.ansInfo[idx].title"
              class="mr-2"
            ></v-text-field>
            <v-btn
              class="ml-2"
              v-if="choice"
              color="primary"
              icon="mdi-image"
              density="comfortable"
              variant="outlined"
            ></v-btn>
            <v-btn
              v-if="idx === 0 && itemdiv != 'surveySbjct'"
              @click="insertRow()"
              icon="mdi-plus-box-outline"
              variant="flat"
              color="transparent"
            ></v-btn>
            <v-btn
              v-else-if="idx != 0 && itemdiv != 'surveySbjct'"
              @click="deleteRow(idx)"
              icon="mdi-minus-box-outline"
              variant="flat"
              class="filter_red"
              color="transparent"
            ></v-btn>
          </v-col>
        </v-row>
      </v-radio-group>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const model = defineModel({ type: Object });

defineProps({
  survey: { type: Boolean, default: false },
  choice: { type: Boolean, default: false },
  itemdiv: { type: String, required: true },
});

const titleRules = [(v: any) => !!v || "필수입니다."];

const insertRow = () => {
  model.value.ansInfo.push({ title: "", ansImg: "" });
};

const deleteRow = (idx: any) => {
  const tempArr1 = model.value.ansInfo.slice(0, idx);
  const tempArr2 = model.value.ansInfo.slice(idx + 1, model.value.ansInfo.length);
  model.value.ansInfo = [...tempArr1, ...tempArr2];
};

// const counterRule = [(v: any) => v && v.length <= 2];

/**
 * 라디오버튼 복수선택 제어
 *
 * @복수응답_체크시
 * 2개 이상 선택 시 맨 처음 입력했던 값을 삭제한다
 *
 * @복수응답_미체크시
 * 마지막에 선택한 값만 살려놓는다
 */
const chkRadioCnt = () => {
  // 복수응답 체크 시
  if (model.value.multiAnsYn) {
    const ansLength = model.value.ansAnswer.length;
    if (ansLength > 2) model.value.ansAnswer.shift();
  }

  // 복수응답 미체크 시
  else {
    model.value.ansAnswer = model.value.ansAnswer.slice(-1);
  }
};

/**
 * 복수응답 체크박스 update:model-value
 *
 * @vuetify 3.4.10 버전 기준
 * @comment
 * event 시점이 값이 변경되고 나서가 아닌, 변경되는 시점이다.
 * 따라서 true > false 일 때 로직이 작동하도록 구현되어있다.
 */
const updateMultiYn = () => {
  // 복수응답 체크 시
  if (model.value.multiAnsYn) {
    model.value.ansAnswer = model.value.ansAnswer.slice(-1);
  }
};
</script>
