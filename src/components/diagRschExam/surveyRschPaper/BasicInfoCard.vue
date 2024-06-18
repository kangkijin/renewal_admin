<template>
  <BaseCard title="기본정보">
    <v-row>
      <v-col cols="12">
        <v-table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">조사지명</th>
              <td>
                <div class="d-flex align-center">
                  <v-text-field
                    placeholder="조사지명을 입력해주세요."
                    :rules="[(v: any) => !!v && v.length <= 30]"
                    v-model="dspTitle"
                  />
                  <span class="mx-1" :class="dspTitle.length > maxLength ? 'text-error' : ''">
                    {{ dspTitle.length }}
                  </span>
                  /<span class="text-deepgray ml-1">{{ maxLength }}</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">조사안내</th>
              <td>
                <v-textarea
                  counter="200"
                  :rules="[(v: any) => v.length <= 200 || '200자 이내로 입력해주세요.']"
                  v-model="dspGuide"
                  persistent-counter
                  placeholder="사유 및 설명을 입력해주세요."
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">사용여부</th>
              <td>
                <v-radio-group v-model="useYn" :rules="[(v: any) => v == 'Y']" inline>
                  <v-radio label="사용" value="Y"></v-radio>
                  <v-radio label="미사용" value="N"></v-radio>
                </v-radio-group>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-divider />
      </v-col>
    </v-row>
  </BaseCard>
</template>
<script setup lang="ts">
const dspTitle = defineModel("dspTitle", { type: String, required: true });
const dspGuide = defineModel("dspGuide", { type: String, required: true });
const useYn = defineModel("useYn", { type: String, required: true });

const maxLength = 30;
</script>
