<template>
  <BaseCard title="과정 등록">
    <v-row>
      <v-col cols="12">
        <v-table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">역량</th>
              <td class="d-flex">
                <v-checkbox class="flex-0-0 mr-4" label="기본역량" />
                <v-checkbox class="flex-0-0 mr-4" label="준비역량" />
                <v-checkbox class="flex-0-0 mr-4" label="실행역량" />
                <v-checkbox class="flex-0-0 mr-4" label="평가역량" />
              </td>
            </tr>
            <tr>
              <th scope="row">보고양식 첨부파일</th>
              <td>
                <v-file-input chips counter :show-size="1000">></v-file-input>
                첨부파일 목록 들어갈 예정
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-divider />
        <div class="d-flex justify-end pt-4">
          <v-btn
            variant="tonal"
            color="error"
            width="80"
            class="mr-2"
            to="/admin/extraCurricularProgram/otsdrEcp/otsdrCurriMng"
            >취소</v-btn
          >
          <v-btn variant="flat" color="success" width="80">저장</v-btn>
        </div>
      </v-col>
    </v-row>
  </BaseCard>
</template>
<script lang="ts">
export default {
  data: () => ({
    selectOption1: {
      year: ["2024", "2023", "2022"],
      value: "2024",
      category: ["선택1", "선택2", "선택3"],
    },
    checkbox1: true,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    /** 역량 설정 */
    abilityInfo: [
      { code: "a001", text: "역량1", useYn: false, percent: 0, mileage: 0 },
      { code: "a002", text: "역량2", useYn: false, percent: 0, mileage: 0 },
      { code: "a003", text: "역량3", useYn: false, percent: 0, mileage: 0 },
      { code: "a004", text: "역량4", useYn: false, percent: 0, mileage: 0 },
      { code: "a005", text: "역량5", useYn: false, percent: 0, mileage: 0 },
      { code: "a006", text: "역량6", useYn: false, percent: 0, mileage: 0 },
    ],
  }),
};
</script>
