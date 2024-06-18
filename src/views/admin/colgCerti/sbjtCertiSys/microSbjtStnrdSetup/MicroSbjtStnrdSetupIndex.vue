<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <BaseCard>
        <div class="mb-4 text-h4">이수 과정 별 기준</div>
        <v-table>
          <colgroup>
            <col style="width: 30%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col style="width: 40%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">소통의 힘을 키우는 세계시민 소양 과정</th>
              <th scope="row">학점기준</th>
              <td>
                <v-text-field type="number" outlined hide-spin-buttons></v-text-field>
              </td>
              <th scope="row">이수 영역</th>
              <td>
                <div class="d-flex">
                  <v-checkbox class="flex-0-0 mr-4" label="인간과감성" />
                  <v-checkbox class="flex-0-0 mr-4" label="사회路진출" />
                  <v-checkbox class="flex-0-0" label="디지털기술" />
                  <v-checkbox class="flex-0-0" label="글로벌소통" />
                  <v-checkbox class="flex-0-0" label="소프트스킬" />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">생각의 힘을 키우는 디지털 인문 소양 과정</th>
              <th scope="row">학점기준</th>
              <td>
                <v-text-field type="number" outlined hide-spin-buttons></v-text-field>
              </td>
              <th scope="row">이수 영역</th>
              <td>
                <div class="d-flex">
                  <v-checkbox class="flex-0-0 mr-4" label="인간과감성" />
                  <v-checkbox class="flex-0-0 mr-4" label="사회路진출" />
                  <v-checkbox class="flex-0-0" label="디지털기술" />
                  <v-checkbox class="flex-0-0" label="글로벌소통" />
                  <v-checkbox class="flex-0-0" label="소프트스킬" />
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="my-4 text-h4">공통 기준(평점)</div>
        <v-autocomplete v-model="selectOption1.value" :items="selectOption1.year"></v-autocomplete>
      </BaseCard>
    </v-col>
    <v-col cols="12">
      <v-tabs v-model="tab" color="primary" align-tabs="center">
        <v-tab value="one">Human+ 인성과 감성</v-tab>
        <v-tab value="two">Human+ 사회 路 진출</v-tab>
        <v-tab value="three">Human+ 디지털기술</v-tab>
        <v-tab value="four">Human+ 글로벌소통</v-tab>
        <v-tab value="five">Human+ 소프트스킬</v-tab>
      </v-tabs>
      <v-card-text class="bg-grey100 mt-4 rounded-md">
        <v-window v-model="tab">
          <v-window-item v-for="item in tabItems" :key="item.value" :value="item.value">
            <MicroSbjtStnrdSetupList v-if="tab === item.value" />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-col>
  </v-row>
  <v-row class="mt-1">
    <v-col class="d-flex align-center">
      <v-spacer></v-spacer>
      <p class="mr-4 text-error">최종수정일</p>
      <v-btn variant="flat" color="success" width="80">저장</v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import MicroSbjtStnrdSetupList from "../../../../../components/sbjtCertiSys/microSbjtStnrdSetup/MicroSbjtStnrdSetupList.vue";
export default {
  components: {
    MicroSbjtStnrdSetupList,
  },
  data: () => ({
    title: "취득 현황",
    breadcrumbs: [
      { title: "대학인증", disabled: false },
      { title: "졸업 인증제", disabled: true },
    ],
    selectOption1: {
      year: ["2024", "2023", "2022"],
      value: "2024",
    },
    tab: "one",
    tabItems: [{ value: "one" }, { value: "two" }, { value: "three" }, { value: "four" }, { value: "five" }],
  }),
};
</script>
