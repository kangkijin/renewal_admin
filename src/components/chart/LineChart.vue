<template>
  <div id="chart" class="col_chart">
    <VueApexCharts type="line" class="col_chart" :options="chartOptions" :series="series"></VueApexCharts>
  </div>
</template>
<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";

const series = [
  {
    name: "1학년_ 24",
    type: "line",
    data: [
      4.1, 2.5, 1.1, 5.3, 3.7, 4.1, 2.5, 1.1, 5.3, 3.7, 4.1, 2.5, 1.1, 5.3, 3.7, 4.1, 2.5, 1.1, 5.3, 3.7, 2.2, 5.6,
    ],
  },
  {
    name: "2학년_ 24",
    type: "line",
    data: [
      5.6, 3.5, 4.1, 2.3, 1.7, 5.6, 3.5, 4.1, 2.3, 1.7, 5.6, 3.5, 4.1, 2.3, 1.7, 5.6, 3.5, 4.1, 2.3, 1.7, 6.5, 4.8,
    ],
  },
  {
    name: "3학년_ 24",
    type: "line",
    data: [
      1.6, 3.8, 2.3, 8.1, 2.3, 1.6, 3.8, 2.3, 8.1, 2.3, 1.6, 3.8, 2.3, 8.1, 2.3, 1.6, 3.8, 2.3, 8.1, 2.3, 8.4, 3.4,
    ],
  },
  {
    name: "4학년_ 24",
    type: "line",
    data: [
      5.6, 4.5, 3.1, 9.3, 3.7, 5.6, 4.5, 3.1, 9.3, 3.7, 5.6, 4.5, 3.1, 9.3, 3.7, 5.6, 4.5, 3.1, 9.3, 3.7, 3.5, 5.8,
    ],
  },
  {
    name: "1학년_ 23",
    type: "line",
    data: [
      4.9, 3.9, 2.9, 8.9, 2.9, 4.9, 3.9, 2.9, 8.9, 2.9, 4.9, 3.9, 2.9, 8.9, 2.9, 4.9, 3.9, 2.9, 8.9, 2.9, 2.5, 6.7,
    ],
  },
  {
    name: "2학년_ 23",
    type: "line",
    data: [
      4.6, 3.5, 2.1, 8.3, 2.7, 4.6, 3.5, 2.1, 8.3, 2.7, 4.6, 3.5, 2.1, 8.3, 2.7, 4.6, 3.5, 2.1, 8.3, 2.7, 6.4, 4.1,
    ],
  },
  {
    name: "3학년_ 23",
    type: "line",
    data: [
      4.3, 3.1, 1.8, 7.3, 1.7, 4.3, 3.1, 1.8, 7.3, 1.7, 4.3, 3.1, 1.8, 7.3, 1.7, 4.3, 3.1, 1.8, 7.3, 1.7, 1.5, 5.4,
    ],
  },
  {
    name: "4학년_ 23",
    type: "line",
    data: [
      3.3, 2.1, 1.3, 6.8, 1.3, 3.3, 2.1, 1.3, 6.8, 1.3, 3.3, 2.1, 1.3, 6.8, 1.3, 3.3, 2.1, 1.3, 6.8, 1.3, 3.5, 1.0,
    ],
  },
];
const chartOptions = {
  chart: {
    id: "LineGraph1",
    type: "line",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  colors: ["#F2D7D5", "#F5EEF8", "#A2D9CE", "#5175BE", "#F7DC6F", "#F0B27A", "#99A3A4", "#D7BDE2"],
  legend: {
    position: "bottom",
    horizontalAlign: "center",
    fontSize: "12px",
    labels: {
      colors: "#222",
    },
    markers: {
      width: 8,
      height: 8,
      radius: 0,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "70%",
    },
  },
  stroke: {
    curve: "straight",
  },
  xaxis: {
    categories: [
      "분석적 능력",
      "추론적 능력",
      "평가적 능력",
      "창의적 능력",
      "정보 및 기술수립능력",
      "정보 및 기술분석활용능력",
      "전문지식기술이해 및 활용",
      "자기주도적 학습능력",
      "계획수립 및 실행능력",
      "정서적 자기조절능력",
      "독해능력",
      "경청능력",
      "기술능력",
      "상호신뢰 및 유대",
      "개방성",
      "협력",
      "공감능력",
      "배려",
      "외국어능력",
      "다문화수용 및 적용능력",
      "글로벌사회적응 및 주도능력",
      "지역사회역량",
    ],
    labels: {
      style: {
        colors: "#898D9C",
        fontSize: "12px",
        fontWeight: 500,
      },
    },
  },
  yaxis: {
    min: 0,
    max: 10,
    stepSize: 2,
    tickAmount: 5,
    labels: {
      style: {
        colors: "#898D9C",
        fontSize: "12px",
        fontWeight: 500,
      },
    },
  },
};
</script>
