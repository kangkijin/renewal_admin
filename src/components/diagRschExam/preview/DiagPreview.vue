<template>
  <v-card>
    <!-- dialog title -->
    <v-card-title class="bg-primary">{{ exam ? "시험" : "진단" }} 미리보기</v-card-title>
    <!-- dialog content -->
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <div class="intro_wrapper">
            <div class="intro_list">
              <ul>
                <li>
                  <strong>{{ exam ? "시험" : "진단" }}명</strong>
                  <p>{{ paperInfo.title }}</p>
                </li>
                <li>
                  <strong>문항수</strong>
                  <p>{{ expandQusList.length }}</p>
                </li>
                <li>
                  <strong>응시기간</strong>
                  <p>
                    {{
                      planInfo
                        ? moment(planInfo.strDate).format("YYYY-MM-DD hh:mm")
                        : `${moment().format("YYYY-MM-DD")} 09:00`
                    }}
                    ~<br />
                    {{
                      planInfo
                        ? moment(planInfo.endDate).format("YYYY-MM-DD hh:mm")
                        : `${moment().format("YYYY-MM-DD")} 23:59`
                    }}
                  </p>
                </li>
              </ul>
            </div>
            <div class="intro_cnt">
              <div class="wrap">
                <div class="title">{{ planInfo ? planInfo.title : "미리보기" }}</div>
                <div class="cnt">
                  <div class="editor_area">
                    {{ vm.$StringUtil.isEmpty(paperInfo.guide) ? "-" : paperInfo.guide }}
                  </div>
                </div>
              </div>
              <!-- <a href="javascript:void(0);" class="view_ans">정답보기</a> -->
            </div>
          </div>
          <div class="diag_wrapper">
            <DiagWbs
              v-model="panel"
              v-model:dialog="model"
              :qusList="expandQusList"
              :resCnt="getResLength"
              :exam="exam"
            ></DiagWbs>

            <div
              class="diag_qus_wrap"
              v-for="(page, pageCnt) in qusPaper"
              :key="pageCnt"
              v-show="pageCnt === activePage"
            >
              <div class="diag_qus" v-for="item in page.qusInfo" :key="item.order">
                <QusOutput preview :qusInfo="item" :order="item.order" v-model="resList[item.order - 1]"></QusOutput>
              </div>
            </div>
          </div>
          <div class="diag_paging">
            <button type="button" class="prev" :disabled="activePage === 0" @click="onClickMovePage('prev')">
              이전
            </button>
            <button type="button" class="next" :disabled="activePage === maxPage" @click="onClickMovePage('next')">
              다음
            </button>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>

    <!-- dialog button -->
    <v-card-actions class="justify-end">
      <!-- <v-btn variant="outlined" @click="model = false">닫기</v-btn> -->
      <v-btn variant="flat" color="success" @click="model = false">확인</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, computed } from "vue";
import moment from "moment";
import type { PreviewPlanTypes, PreviewPaperTypes } from "@/types/diagTypes/PreviewTypes";
import type { PaperOutputTypes } from "@/types/diagTypes/DiagIOTypes";

import QusOutput from "@/components/diagRschExam/IO/QusOutput.vue";
import DiagWbs from "./DiagWbs.vue";

const instance = getCurrentInstance();
if (!instance) {
  throw new Error("getCurrentInstance returned null");
}
const vm = instance.appContext.config.globalProperties;

/** 미리보기 팝업 True / False */
const model = defineModel({ type: Boolean });

interface Props {
  /** 시험 여부 */
  exam?: boolean;
  /** 실시 계획 관련 정보 */
  planInfo?: PreviewPlanTypes;
  /** 진단지 관련 정보 */
  paperInfo: PreviewPaperTypes;
  /** 문항 리스트 */
  // qusList: PaperOutputTypes[];
  qusPaper: PaperOutputTypes[];
}

const props = withDefaults(defineProps<Props>(), {
  exam: false,
});

/** 문항 응답 정보 */
const resList = ref([] as string[]);

/** 현재 페이지 */
const activePage = ref(0);
/** 최대 페이지 */
const maxPage = props.qusPaper.length - 1;

/** DiagWbs (진단 진행도 확인 부분) 펼치기 제어 */
const panel = ref([0]);

/**
 * 페이징 처리되어있는 2중배열 문항 리스트를 1중배열로 펼친다
 * DiagWbs(문항 진척도) 관련 정보(ansSts)도 계산해서 넣어준다.
 */
const expandQusList = computed(() => {
  const fnConvertR2toR1Arr = <T,>(arr: T[][]) => {
    return arr.reduce((acc, val) => acc.concat(val), []);
  };

  const qusList = props.qusPaper.map((paper) => {
    return paper.qusInfo;
  });

  let expandList = fnConvertR2toR1Arr(qusList);
  for (var i = 0; i < expandList.length; i++) {
    const resValue = resList.value[i];
    if (!vm.$StringUtil.isEmpty(resValue)) {
      expandList[i].ansSts = "checked";
    }
  }
  return expandList;
});

/** 진단 미리보기 페이징 처리 */
const onClickMovePage = (_dir: string) => {
  if (_dir === "next") {
    activePage.value = activePage.value + 1;
  } else if (_dir === "prev") {
    activePage.value = activePage.value - 1;
  }
};

/** 문항 길이 구하기 */
const getResLength = computed(() => {
  return resList.value.filter((item) => item !== null && item !== undefined).length;
});
</script>
