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
            to="/admin/extraCurricularProgram/profEcp/profCurriMng"
            >취소</v-btn
          >
          <v-btn variant="flat" color="success" width="80">저장</v-btn>
        </div>
      </v-col>
    </v-row>
  </BaseCard>
</template>
<script lang="ts">
export default {};
</script>
