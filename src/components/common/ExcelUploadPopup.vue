<template>
  <v-card>
    <!-- dialog title -->
    <v-card-title class="bg-primary">파일 업로드</v-card-title>
    <v-divider></v-divider>
    <!-- dialog content -->
    <v-card-text>
      <v-row class="px-2 py-2">
        <v-col cols="12">
          <v-row>
            <v-col>
              <slot name="title"></slot>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex">
              <v-file-input
                accept=".xlsx, .csv"
                prepend-icon=""
                prepend-inner-icon="mdi-microsoft-excel"
                show-size
                counter
                v-model="fileList"
                @update:modelValue="onUpdateFile"
              >
                <template #append-inner><v-btn size="small" variant="tonal">Click</v-btn></template>
              </v-file-input>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="infomation_box" v-if="!isUpload">
        <div>
          <v-icon icon="mdi-file-question" size="x-large"></v-icon>
          첨부파일을 업로드해주세요.
          <span class="mt-2 ml-12">xlsx, csv 확장자만 사용 가능합니다.</span>
        </div>
      </div>
      <VEasyTable v-else :headers="tableHeader" :items="item" :loading="!loaded">
        <template v-for="n in tableHeader.length" :key="n" #[`item-${n}`]="item">
          <span v-html="item[n.toString()]"></span>
        </template>
      </VEasyTable>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-end">
      <v-btn variant="outlined" color="error" size="default" @click="onClickClosePopup">취소</v-btn>
      <v-btn
        variant="flat"
        :disabled="!isUpload || errorList.length > 0"
        color="primary"
        size="default"
        @click="onClickUploadData"
        >업로드</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import * as XLSX from "xlsx";
import { computed, getCurrentInstance, ref } from "vue";
import type { Header } from "@/plugins/xlsx";

/** 팝업 활성화 여부 */
const model = defineModel({ type: Boolean, required: true });
/** 헤더 검증용 (양식에 맞는 헤더인지 검증) */
const props = defineProps({
  header: { type: Array<Header>, required: true },
});
/** 업로드 버튼 클릭 시 emit될 list */
const emits = defineEmits(["upload:list"]);

const instance = getCurrentInstance();
if (!instance) {
  throw new Error("getCurrentInstance returned null");
}
const vm = instance.appContext.config.globalProperties;

/** 팝업 닫기 버튼 */
const onClickClosePopup = () => {
  vm.$confirm("파일 업로드를 취소하시겠습니까?", "알림", (isConfirm) => {
    if (isConfirm) {
      model.value = false;
    }
  });
};

const list = ref([] as string[][]);

const errorList = ref([] as string[][]);
const fileList = ref([] as File[]);

const isUpload = ref(false); // 파일 업로드 상태
const loaded = ref(false); // 데이터 테이블 로딩

/** 파일, 미리보기 테이블 관련 데이터 초기화 */
const clearData = () => {
  fileList.value = [];
  list.value = [];
  isUpload.value = false;
  loaded.value = false;
};

/**
 * 엑셀 파일 변경 시 실행 메서드
 * @param files
 */
const onUpdateFile = (files: File[]) => {
  // 파일 clear 시
  if (files.length === 0) {
    clearData();
    return false;
  }

  if (!fnAllowCheck(files[0])) return false; // 허용 확장자 확인

  isUpload.value = true;
  const reader = new FileReader();
  reader.readAsArrayBuffer(fileList.value[0]);
  reader.onload = () => {
    const wb = XLSX.read(reader.result, { type: "binary" });
    wb.SheetNames.forEach((sheet: string) => {
      const data: string[][] = XLSX.utils.sheet_to_json(wb.Sheets[sheet], { header: 1 });

      const result = excelValidation(data);
      if (!result.sts) {
        // 데이터 오류
        if (errorList.value.length > 0) {
          vm.$alert(result.msg, "알림", () => {
            loaded.value = true;
            list.value = errorList.value;
          });
        }

        // 헤더 오류
        else {
          clearData();
          vm.$alert(result.msg, "알림");
        }
        return false;
      }

      list.value = data;
      loaded.value = true;
    });
  };
};

/** 엑셀 데이터 검증 */
const excelValidation = (excelData: string[][]) => {
  errorList.value = []; // 초기화

  const result = {
    sts: true,
    msg: "성공",
  };

  for (var i = 0; i < excelData.length; i++) {
    if (!result.sts) break;

    const row = excelData[i];
    for (var j = 0; j < row.length; j++) {
      if (!result.sts) break;

      const cell = row[j];
      // 헤더 row
      if (i === 0) {
        // 1. 비어있는 헤더 값이 있다면 오류
        if (vm.$StringUtil.isEmpty(cell)) {
          result.sts = false;
          result.msg = "헤더의 값이 비어있습니다.";
          break;
        }
        // 2. 한글을 비교하는 것이니 스페이스바는 제거하고 비교하는 것이 비교적 안전하다고 판단하여 공백 제거 비교
        else if (cell.replaceAll(" ", "") != props.header[j].header.replaceAll(" ", "")) {
          result.sts = false;
          result.msg = "엑셀 헤더 데이터가 양식과 다릅니다.";
          break;
        }
      }
      // 데이터 row
      else {
        if (props.header[j].required) {
          // 1. 필수 값이 비어있는 경우
          if (vm.$StringUtil.isEmpty(cell)) {
            // 오류 리스트 헤더 push
            if (errorList.value.length === 0) {
              const temp = props.header.map((item) => {
                return item.header;
              });
              errorList.value.push(["No", ...temp]);
            }
            // 오류 리스트 데이터 push
            row[j] = "<span style='color: red;'>필수 값 입니다</span>";
            errorList.value.push([i.toString(), ...row]);
            break;
          }

          // 2. 값을 제한하는 경우
          else if (props.header[j].chkEnum) {
            const chkEnum = props.header[j].chkEnum;
            if (!chkEnum?.includes(cell)) {
              // 오류 리스트 헤더 push
              if (errorList.value.length === 0) {
                const temp = props.header.map((item) => {
                  return item.header;
                });
                errorList.value.push(["No", ...temp]);
              }

              row[j] = `${row[j]} <span style='color: red;'>(유효한 값이 아닙니다)</span>`;
              errorList.value.push([i.toString(), ...row]);
              break;
            }
          }
        }
      }
    }
  }

  if (errorList.value.length > 0) {
    result.sts = false;
    result.msg = "입력되지 않은 필수 값이 있습니다.<br />오류 리스트를 불러옵니다.";
  }

  return result;
};

/**
 * 허용 확장자 확인 메서드
 * @param file
 */
const fnAllowCheck = (file: File) => {
  const allowFileType = [".xlsx", ".csv"];
  const fileType = file.name.substring(file.name.lastIndexOf("."));
  const isAllowed = allowFileType.includes(fileType);

  if (!isAllowed) {
    fileList.value = [];
    vm.$alert("엑셀업로드는 xlsx, csv 확장자만 가능합니다.", "");
  }
  return isAllowed;
};

/**
 * 업로드 버튼
 */
const onClickUploadData = () => {
  vm.$confirm("해당 리스트를 업로드 하시겠습니까?", "확인", (isConfirm: Boolean) => {
    if (isConfirm) {
      const key = props.header.map((item) => {
        return item.key;
      });

      // idx 0 로우는 헤더명이 들어가있다.
      const jsonArr = vm.$StringUtil.r2StringToJsonArr(list.value.slice(1), key);

      emits("upload:list", jsonArr);
      vm.$alert("업로드 되었습니다.", "알림", () => {
        model.value = false;
      });
    }
  });
};

/**
 * 데이터 테이블 엑셀 업로드 파일 미리보기
 */
import type { Header as tableHeaders, Item } from "vue3-easy-data-table";
const tableHeader = computed(() => {
  const headerRow: string[] = list.value[0] ?? [];

  const formatted: tableHeaders[] = [];
  for (let i = 0; i < headerRow.length; i++) {
    formatted.push({ text: headerRow[i], value: i.toString() });
  }
  return formatted;
});

const item = computed(() => {
  const rows: Item[] = [];

  for (let i = 1; i < list.value.length; i++) {
    const row = list.value[i];

    const formatted: Item = {};
    for (let j = 0; j < row.length; j++) {
      formatted[j.toString()] = row[j];
    }
    rows.push(formatted);
  }
  return rows;
});
</script>
