<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <BaseCard title="테이블 조회">
        <v-table>
          <thead>
            <tr>
              <th scope="col">카테고리명</th>
              <th scope="col">과정명</th>
              <th scope="col">입과인원</th>
              <th scope="col">이수인원</th>
              <th scope="col">이수율</th>
              <th scope="col">교육시간</th>
              <th scope="col">만족도조사<br />(평균)</th>
              <th scope="col">사전진단<br />(평균)</th>
              <th scope="col">사후조사<br />(평균)</th>
              <th scope="col">예산 제원</th>
              <th scope="col">집행 금액<br />(등록금)</th>
              <th scope="col">집행 금액<br />(등록금)</th>
              <th scope="col">집행 금액<br />(등록금)</th>
              <th scope="col">집행 금액<br />(사업비)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">취업</td>
              <td class="text-center">취업성공 로드맵</td>
              <td class="text-center">60</td>
              <td class="text-center">45</td>
              <td class="text-center">75.0%</td>
              <td class="text-center">60</td>
              <td class="text-center">4.48</td>
              <td class="text-center">4.28</td>
              <td class="text-center">4.48</td>
              <td class="text-center">등록금 + 장학금</td>
              <td class="text-center">600,000</td>
              <td class="text-center">-</td>
              <td class="text-center">-</td>
              <td class="text-center">-</td>
            </tr>
            <tr>
              <td class="text-center">취업</td>
              <td class="text-center">취업성공 로드맵</td>
              <td class="text-center">60</td>
              <td class="text-center">45</td>
              <td class="text-center">75.0%</td>
              <td class="text-center">60</td>
              <td class="text-center">4.48</td>
              <td class="text-center">4.28</td>
              <td class="text-center">4.48</td>
              <td class="text-center">등록금 + 장학금</td>
              <td class="text-center">600,000</td>
              <td class="text-center">-</td>
              <td class="text-center">-</td>
              <td class="text-center">-</td>
            </tr>
            <tr>
              <td class="text-center bg-white100" colspan="2">합계 및 평균</td>
              <td class="text-center">60</td>
              <td class="text-center">45</td>
              <td class="text-center">75.0%</td>
              <td class="text-center">60</td>
              <td class="text-center">4.48</td>
              <td class="text-center">4.28</td>
              <td class="text-center">4.48</td>
              <td class="text-center">등록금 + 장학금</td>
              <td class="text-center">600,000</td>
              <td class="text-center">-</td>
              <td class="text-center">-</td>
              <td class="text-center">-</td>
            </tr>
          </tbody>
          <tbody></tbody>
        </v-table>
      </BaseCard>
    </v-col>
    <v-col cols="12">
      <BaseCard title="답변 조회">
        <v-table>
          <colgroup>
            <col style="width: 8%" />
            <col style="width: 11%" />
            <col style="width: 35%" />
            <col style="width: 11%" />
            <col style="width: 35%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" rowspan="2" style="border-right: 1px solid rgba(var(--v-theme-borderColor))">1</th>
              <th>과정명 CQI</th>
              <td>(과정명)</td>
              <th>요청항목</th>
              <td>
                <v-combobox :items="selectOption1.list" placeholder="선택" />
              </td>
            </tr>
            <tr>
              <th scope="row">요청사항</th>
              <td colspan="3">
                <v-textarea placeholder="입력해주세요." hide-details no-resize />
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                rowspan="2"
                style="border-right: 1px solid rgba(var(--v-theme-borderColor)); border-bottom: none !important"
              >
                답변
              </th>
              <th>답변부서</th>
              <td>
                <v-text-field disabled />
              </td>
              <th>답변일</th>
              <td>
                <v-text-field />
              </td>
            </tr>
            <tr>
              <th scope="row">요청사항</th>
              <td colspan="3">
                <v-textarea placeholder="입력해주세요." disabled hide-details no-resize />
              </td>
            </tr>
          </tbody>
          <tbody></tbody>
        </v-table>
      </BaseCard>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  data: () => ({
    /** theme breadcrumb */
    title: "Guide - Detail3",
    breadcrumbs: [
      { title: "Guide - 1depth", disabled: false },
      { title: "Guide - 2depth", disabled: true },
    ],
    /** combobox */
    selectOption1: {
      list: ["선택1", "선택2", "선택3"],
    },
  }),
};
</script>
