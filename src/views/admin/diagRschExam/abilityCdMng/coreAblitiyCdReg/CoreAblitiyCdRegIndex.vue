<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

  <v-row>
    <v-col>
      <BaseCard :title="'핵심역량코드'">
        <div class="d-flex align-center">
          <div>Total {{ totalCnt }}</div>
          <v-spacer></v-spacer>
          <v-btn @click="fnExcelDown">엑셀 다운로드</v-btn>
        </div>
        <v-divider class="my-4"></v-divider>
        <v-card elevation="0" style="border: 1px solid #e5eaef">
          <v-container class="pa-3 overflow-hidden" style="max-width: none">
            <v-row>
              <v-col cols="12" md="5" class="pa-0" :class="!loaded ? 'loading_md' : ''">
                <v-card elevation="0" class="overflow-hidden">
                  <v-row>
                    <v-col>
                      <v-container class="py-2">
                        <v-btn @click="onClickExpand()">모두 열기</v-btn>
                        <v-btn class="ml-2" @click="onClickCollapse()">모두 닫기</v-btn>
                      </v-container>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row>
                    <v-col>
                      <AbilityTreeView
                        v-model:selected="selectedAbility"
                        v-model:opened="opened"
                        :list="list"
                      ></AbilityTreeView>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12" md="7" class="pa-0">
                <v-card
                  elevation="0"
                  class="h-100 rounded-e rounded-s-0 overflow-hidden"
                  color="lightprimary"
                  min-height="300"
                  :class="!loaded ? 'loading_md' : ''"
                >
                  <v-row>
                    <v-col>
                      <v-container class="pt-4" style="padding-bottom: 2px">
                        <p class="text-h5">코드 설명</p>
                      </v-container>
                    </v-col>
                  </v-row>
                  <v-divider class="mt-2"></v-divider>
                  <v-row>
                    <v-col cols="3">
                      <v-container class="py-2">
                        <span class="font-weight-medium">
                          {{ selectedAbility.cdNm == "" ? "핵심역량을 선택해주세요." : selectedAbility.cdNm }}
                        </span>
                      </v-container>
                    </v-col>
                    <v-col cols="9">
                      <v-container class="py-2">
                        {{ selectedAbility.cdDesc }}
                      </v-container>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import type { AxiosResponse } from "axios";
import AbilityTreeView from "@/components/diagRschExam/abilityCdMng/AbilityTreeView.vue";
import type { AbilityTypes } from "@/types/diagTypes/AbilityTypes";

import { excelDown } from "@/plugins/xlsx";
import type { Header, Item } from "@/plugins/xlsx";

export default {
  components: { AbilityTreeView },
  data: () => ({
    loaded: false,
    title: "핵심역량코드",
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "역량 코드 관리", disabled: true },
    ],
    totalCnt: 0,
    list: [] as AbilityTypes[],
    opened: [],

    selectedAbility: { cdId: "", cdNm: "" } as AbilityTypes,
  }),
  created() {
    this.fnGetAbilityCd();
  },
  methods: {
    /** 모두 열기 버튼 */
    onClickExpand() {
      const vm = this;
      const openedArr = [];
      for (var i = 0; i < vm.list.length; i++) {
        openedArr.push(i);
      }
      vm.opened = openedArr;
    },
    /** 모두 닫기 버튼 */
    onClickCollapse() {
      const vm = this;
      vm.opened = [];
    },

    /** 핵심역량 코드 가져오기 */
    fnGetAbilityCd() {
      const vm = this;

      const param = {
        cdDiv: "C",
      };

      vm.$axios
        .get("/api/cmmn/diag/getAbilityInfo", { params: param })
        .then((res: AxiosResponse) => {
          const resData = res.data;
          vm.list = resData.data;

          //acc: 누적 결과 item: 각 배열의 요소
          vm.totalCnt = vm.list.reduce((acc: Number, item: any) => acc + item.children.length, vm.list.length);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          // 로딩 제어
          vm.loaded = true;
        });
    },

    /** 엑셀 다운로드 */
    fnExcelDown() {
      const vm = this;

      const headers: Header[] = [
        { header: "No", key: "no", width: 10 },
        { header: "핵심역량명", key: "cdNm", width: 30 },
        { header: "핵심역량코드", key: "cdId", width: 15 },
        { header: "핵심역량설명", key: "cdDesc", width: 40 },
        { header: "하위역량명", key: "childrenCdNm", width: 30 },
        { header: "하위역량코드", key: "childrenCdId", width: 15 },
        { header: "하위역량설명", key: "childrenCdDesc", width: 40 },
      ];

      let idx = 1;
      const items: Item[] = vm.list.flatMap((ability: AbilityTypes) => {
        return ability.children?.map((item: AbilityTypes) => {
          return {
            no: idx++,
            cdNm: ability.cdNm,
            cdId: ability.cdId,
            cdDesc: ability.cdDesc,
            childrenCdNm: item.cdNm,
            childrenCdId: item.cdId,
            childrenCdDesc: item.cdDesc,
          };
        });
      });

      const fileNm = "핵심_역량_코드";
      excelDown(headers, items, fileNm);
    },

    /**
     * TODO 삭제 예정
     * 핵심역량 코드 가져오기 (POST)
     */
    fnPostAbilityCd() {
      const vm = this;

      const param = {
        cdDiv: "C",
      };

      vm.$axios.post("/api/cmmn/diag/postAbilityInfo", JSON.stringify(param)).then((res: AxiosResponse) => {
        const resData = res.data;
        vm.list = resData.data;
      });
    },
  },
};
</script>
