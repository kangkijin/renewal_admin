<template>
  <BaseCard title="추가정보">
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
              <th scope="row" class="required">보고양식 첨부파일</th>
              <td>양식 첨부 파일이 들어갈 예정</td>
            </tr>
            <tr>
              <th scope="row" class="required">프로그램 목적 및 필요성</th>
              <td>
                <v-textarea :counter="2000" class="mt-3" :rules="rules"></v-textarea>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">주요 교육 내용</th>
              <td>
                <v-textarea :counter="2000" class="mt-3" :rules="rules"></v-textarea>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">기대효과</th>
              <td>
                <v-textarea :counter="2000" class="mt-3" :rules="rules"></v-textarea>
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
            to="/admin/extraCurricularProgram/profEcp/profPeriodMng"
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
    rules: [(v: any) => v.length <= 2000 || "2000자 이하로 입력하시오."],
  }),
};
</script>
