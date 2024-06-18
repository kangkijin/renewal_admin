<!-- 
  tabs 참고 사이트 주소 : 
  https://vuetifyjs.com/en/components/tabs/#usage
  
  datepickers 참고 사이트 주소 : 
  https://vuetifyjs.com/en/components/date-pickers/#usage
-->
<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <BaseCard title="검색">
        <v-table>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: 35%" />
            <col style="width: 15%" />
            <col style="width: 35%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">datepicker</th>
              <td>
                <VDateInput :placeholder="'시작일'" />
              </td>
              <th scope="row">input</th>
              <td>
                <v-text-field></v-text-field>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="d-flex pt-4 justify-end">
          <v-btn class="mr-2" width="80">초기화</v-btn>
          <v-btn variant="flat" color="primary" width="80">검색</v-btn>
        </div>
      </BaseCard>
    </v-col>
    <v-col>
      <BaseCard>
        <template v-slot:title>
          <div class="text-h4">검색 결과</div>
        </template>
        <v-tabs v-model="tab" bg-color="primary">
          <v-tab value="one">탭 1</v-tab>
          <v-tab value="two">탭 2</v-tab>
          <v-tab value="three">탭 3 - 제목</v-tab>
        </v-tabs>
        <v-card-text class="bg-grey100 mt-4 rounded-md">
          <v-window v-model="tab">
            <v-window-item value="one">
              <div class="d-flex py-2 justify-space-between">
                <div class="d-flex align-center">
                  <p class="font-weight-medium mr-2" style="color: grey">Total: <span>150</span></p>
                  <v-switch color="primary" :model-value="false" inset></v-switch>
                </div>
                <div class="d-flex align-center">
                  <v-btn variant="flat" color="secondary">등록</v-btn>
                </div>
              </div>
              <v-divider />
              <div class="d-flex py-2 justify-space-between">
                <div class="d-flex align-center">
                  <p class="font-weight-medium mr-2" style="color: grey"><span>0</span>개 선택</p>
                  <v-btn icon="mdi-arrow-up" density="compact" class="mr-2"></v-btn>
                  <v-btn icon="mdi-arrow-down" density="compact" class="mr-2"></v-btn>
                  <v-btn prepend-icon="mdi-arrow-up" class="mr-2">최상위</v-btn>
                  <v-btn prepend-icon="mdi-arrow-down" base-color="white">최하위</v-btn>
                </div>
                <div class="d-flex align-center">
                  <p class="text-error">*모집기간 종료시 자동으로 미사용 전환됩니다.</p>
                </div>
              </div>
            </v-window-item>
            <v-window-item value="two"></v-window-item>
            <v-window-item value="three"></v-window-item>
          </v-window>
        </v-card-text>
      </BaseCard>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  data: () => ({
    /** theme breadcrumb */
    title: "Guide - Tab, Datepicker",
    breadcrumbs: [
      { title: "Guide - 1depth", disabled: false },
      { title: "Guide - 2depth", disabled: true },
    ],
    tab: null,
  }),
};
</script>
