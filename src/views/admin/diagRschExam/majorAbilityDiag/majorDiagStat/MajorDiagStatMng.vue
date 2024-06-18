<template>
  <BaseBreadcrumb :title="title + ' _ ' + list.strPlanNm" :breadcrumbs="breadcrumbs"> </BaseBreadcrumb>
  <v-row>
    <v-col>
      <BaseCard>
        <v-row>
          <v-col>
            <v-table>
              <colgroup>
                <col style="width: 15%" />
                <col style="width: 35%" />
                <col style="width: 15%" />
                <col style="width: 35%" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">학년</th>
                  <td>
                    <div class="d-flex flex-wrap">
                      <v-checkbox class="flex-0-0 mr-4" value="all" label="재학생 전체"></v-checkbox>
                      <v-checkbox class="flex-0-0 mr-4" value="1" label="1학년"></v-checkbox>
                      <v-checkbox class="flex-0-0 mr-4" value="2" label="2학년"></v-checkbox>
                      <v-checkbox class="flex-0-0 mr-4" value="3" label="3학년"></v-checkbox>
                      <v-checkbox class="flex-0-0 mr-4" value="4" label="4학년"></v-checkbox>
                    </div>
                  </td>
                  <th scope="row">역량 레벨 선택</th>
                  <td>
                    <v-radio-group inline>
                      <v-radio label="핵심역량" value="UPPER"></v-radio>
                      <v-radio label="하위역량" value="ROWER"></v-radio>
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <th scope="row">대학</th>
                  <td>
                    <v-autocomplete placeholder="선택"> </v-autocomplete>
                  </td>
                  <th scope="row">학과</th>
                  <td>
                    <v-autocomplete placeholder="선택"> </v-autocomplete>
                  </td>
                </tr>
              </tbody>
            </v-table>

            <div class="d-flex pt-4 justify-end">
              <v-btn class="mr-2" width="80">초기화</v-btn>
              <v-btn variant="flat" color="primary" width="80">검색</v-btn>
            </div>
          </v-col>
        </v-row>
        <v-divider class="mt-5"></v-divider>
        <v-row>
          <v-col class="d-flex">
            <v-spacer></v-spacer>
            <v-btn class="mr-2 mt-5">그래프 다운로드</v-btn>
            <v-btn class="mr-2 mt-5">Raw Data 학생응답기준</v-btn>
            <v-btn class="mt-5">Raw Data 종합결과</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <LineChart :class="chartLoaded ? '' : 'loading_md'"></LineChart>
          </v-col>
        </v-row>
      </BaseCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import LineChart from "@/components/chart/LineChart.vue";

export default {
  components: {
    LineChart,
  },
  data: () => ({
    title: "결과ㆍ통계",
    breadcrumbs: [
      { title: "진단ㆍ조사ㆍ시험", disabled: false },
      { title: "전공능력진단", disabled: true },
    ],
    list: history.state.list ?? null,
    chartLoaded: false,
  }),
  mounted: function () {
    const vm = this;
    setTimeout(() => {
      vm.chartLoaded = true;
    }, 1500);
  },
};
</script>
