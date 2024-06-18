<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <BaseCard>
    <v-table>
      <colgroup>
        <col style="width: 25%" />
        <col style="width: auto" />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row" class="required">채용공고명</th>
          <td>
            <v-text-field
              v-model="recrtInfo.recrtTitle"
              :counter="30"
              :rules="rule1"
              :hide-details="false"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th scope="row" class="required">접수마감</th>
          <td>
            <v-radio-group inline v-model="recrtInfo.recrtCloseTypeCd">
              <v-radio label="채용시 마감" class="mr-4" value="REC_CLOSE_TYPE01"></v-radio>
              <v-radio label="종료일 마감" class="mr-4" value="REC_CLOSE_TYPE02"></v-radio>
            </v-radio-group>
          </td>
        </tr>
        <tr>
          <th scope="row" class="required">접수기간</th>
          <td>
            <div class="d-flex mt-2 justify-start align-center">
              <VDateInput v-model="recrtInfo.recrtApplyStrDate" />
              <span class="mx-1">~</span>
              <VDateInput v-model="recrtInfo.recrtApplyEndDate" />
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row" class="required">회사명</th>
          <td>
            <v-text-field
              v-model="recrtInfo.recrtCorpNm"
              :counter="30"
              :rules="rule1"
              :hide-details="false"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th scope="row" class="required">근무지</th>
          <td><v-text-field v-model="recrtInfo.recrtCorpAddr"></v-text-field></td>
        </tr>
        <tr>
          <th scope="row" class="required">고용형태</th>
          <td>
            <v-radio-group inline v-model="recrtInfo.recrtEmployTypeCd">
              <v-radio label="정규직" class="mr-4" value="REC_EMPLOY_TYPE01"></v-radio>
              <v-radio label="계약직" class="mr-4" value="REC_EMPLOY_TYPE02"></v-radio>
              <v-radio label="파견직" class="mr-4" value="REC_EMPLOY_TYPE03"></v-radio>
              <v-radio label="인턴직" class="mr-4" value="REC_EMPLOY_TYPE04"></v-radio>
              <v-radio label="기타" class="mr-4" value="REC_EMPLOY_TYPE05"></v-radio>
            </v-radio-group>
          </td>
        </tr>
        <tr>
          <th scope="row" class="required">모집분야</th>
          <td>
            <v-text-field
              v-model="recrtInfo.recrtField"
              :counter="30"
              :rules="rule1"
              :hide-details="false"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th scope="row" class="required">모집인원</th>
          <td><v-text-field v-model="recrtInfo.recrtCnt"></v-text-field></td>
        </tr>
        <tr>
          <th scope="row" class="required">관련전공</th>
          <td>
            <v-text-field
              v-model="recrtInfo.recrtRelationMajor"
              :counter="30"
              :rules="rule1"
              :hide-details="false"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th scope="row" class="">내용</th>
          <td>
            <ckeditor
              :editor="editor"
              v-model="recrtInfo.recrtCont"
              :config="editorConfig"
              style="min-height: 200px"
            ></ckeditor>
          </td>
        </tr>
        <tr>
          <th scope="row">첨부파일</th>
          <td>
            <v-file-input hide-details></v-file-input>
            <p class="text-error mt-1">* 파일갯수최대1개,개당20MB이하문서파일hwp,doc,ppt,pdf등록가능합니다.</p>
          </td>
        </tr>
        <tr>
          <th scope="row" class="required">채용기업 CI</th>
          <td>
            <div class="program_thumbbox">
              <p :class="mainImgClass">
                <input type="file" @change="fnGetUserFileName($event, 0, 'recrtImg')" class="d-none" id="recrtImg" />
                <label for="recrtImg"> 채용기업 CI 이미지를 등록해주세요 </label>
              </p>
              <div class="img_wrap">
                <img id="recrtImg0" :src="mainImg" alt="" />
                <div>
                  <v-btn
                    icon
                    size="small"
                    variant="tonal"
                    @click="onClickDeleteSrc('recrt')"
                    class="attach_delete"
                    color="bgTransparency"
                    ><v-icon>mdi-window-close</v-icon></v-btn
                  >
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div class="d-flex justify-end pt-4">
      <v-btn variant="tonal" color="error" width="80" class="mr-2" @click="onClickCancel()">취소</v-btn>
      <v-btn variant="flat" color="success" width="80" @click="onClickSave()">{{ saveButtonText }}</v-btn>
    </div>
  </BaseCard>
</template>

<script lang="ts">
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import type { AxiosResponse } from "axios";

export default {
  data: () => ({
    fnGetUserFileName(event: Event, num: number, menuType: string) {
      const target = event.target as HTMLInputElement;
      if (target && target.files?.length) {
        const files = target.files;
        this.fileName = files[0];

        this.base64(this.fileName, num, menuType);
        this.uploadImg(files, num);
        if (menuType == "recrtImg") {
          this.mainImgClass = "";
        } else {
          this.subImgClass[num] = "";
        }
      }
    },
    onClickDeleteSrc(type: string) {
      if (type === `recrt`) {
        let mainId: any = document.getElementById(`recrtImg0`);
        mainId.src = "";
        this.mainImgClass = "attach_img";
      }
    },
    base64(file: File, number: number, menuType: string) {
      // 비동기 처리를 위해 promise 처리를함
      return new Promise((resolve) => {
        // 파일리더 생성
        const reader = new FileReader();
        // 파일을 읽었을때 이벤트 생성
        reader.onload = (e) => {
          // 성공처리
          if (e.target != null) {
            resolve(e.target.result);
          }
          //파일정보 삽입
          const prevImg = document.getElementById(`${menuType}${number}`) as HTMLImageElement;
          if (prevImg) {
            prevImg.src = e.target?.result as string;
          }
        };
        //파일리더에서 경로 데이터를 다시 읽게함
        reader.readAsDataURL(file);
      });
    },
    uploadImg(files: any, type: String) {
      console.log(`${files} 파일을 전송할겁니다. 아마도.${type}으로다가여`);
    },
    breadcrumbs: [
      { title: "진로ㆍ취업", disabled: false },
      { title: "취업정보", disabled: false },
      { title: "교내 채용", disabled: true },
    ],
    /** ck에디터 */
    editor: ClassicEditor,
    editorData: "",
    editorConfig: {
      placeholder: "",
    },
    recrtId: history.state.recrtId,
    viewType: history.state.viewType,
    recrtInfo: {
      recrtTitle: "",
      recrtCloseTypeCd: "REC_CLOSE_TYPE01",
      recrtApplyStrDate: "",
      recrtApplyEndDate: "",
      recrtCorpNm: "",
      recrtCorpAddr: "",
      recrtEmployTypeCd: "REC_EMPLOY_TYPE01",
      recrtField: "",
      recrtCnt: "",
      recrtRelationMajor: "",
      recrtCont: "",
      recrtTypeCd: "REC_TYPE03",
    },
    mainImgClass: "attach_img",
    mainImg: "",
    rule1: [(v: any) => v.length <= 30 || "30자 이상 제한합니다."],
  }),
  computed: {
    title() {
      const vm = this;
      return `교내 채용 ${vm.viewType === "MODIFY" ? "수정" : "등록"}`;
    },
    saveButtonText() {
      return this.viewType === "MODIFY" ? "수정" : "저장";
    },
  },
  created() {
    const vm = this;
    if (vm.viewType == "MODIFY") {
      vm.getRecrtDetail();
    }
  },
  methods: {
    getRecrtDetail() {
      const vm = this;
      vm.$loading.show();
      const param = {
        recrtId: vm.recrtId,
      };
      vm.$axios
        .get("/api/career/admin/recrtInfo/getRecrtInfoDetail", { params: param })
        .then((res: AxiosResponse) => {
          vm.recrtInfo = res.data.data;
        })
        .catch((e: Error) => {
          console.error(e);
        })
        .finally(() => {
          vm.$loading.hide();
        });
    },
    onClickSave() {
      const vm = this;
      let status = false;
      let msg = "";
      let text = vm.viewType === "MODIFY" ? "수정" : "저장";
      if (vm.$StringUtil.isEmpty(vm.recrtInfo.recrtTitle)) {
        msg = "채용공고명을 입력해주세요.";
      } else if (vm.$StringUtil.isEmpty(vm.recrtInfo.recrtApplyStrDate)) {
        msg = "접수기간 시작일을 선택해주세요.";
      } else if (vm.$StringUtil.isEmpty(vm.recrtInfo.recrtApplyEndDate)) {
        msg = "접수기간 종료일을 선택해주세요.";
      } else if (vm.$StringUtil.isEmpty(vm.recrtInfo.recrtCorpNm)) {
        msg = "업체명을 입력해주세요. ";
      } else if (vm.$StringUtil.isEmpty(vm.recrtInfo.recrtCorpAddr)) {
        msg = "근무지를 입력해주세요.";
      } else if (vm.$StringUtil.isEmpty(vm.recrtInfo.recrtField)) {
        msg = "모집분야를 입력해주세요. ";
      } else if (vm.$StringUtil.isEmpty(vm.recrtInfo.recrtCnt)) {
        msg = "모집인원을 입력해주세요.";
      } else if (vm.$StringUtil.isEmpty(vm.recrtInfo.recrtRelationMajor)) {
        msg = "관련정공을 입력해주세요.";
      } else if (vm.recrtInfo.recrtApplyStrDate > vm.recrtInfo.recrtApplyEndDate) {
        msg = "시작일이 종료일보다 더 클 수 없습니다.";
      } else {
        status = true;
      }
      if (!status) {
        vm.$toast(msg, "error");
      } else {
        vm.$confirm(text + "하시겠습니까?", "확인", (isConfirm: Boolean) => {
          if (isConfirm) {
            vm.$loading.show();
            let _url = "/api/career/admin/recrtInfo/createRecrtInfo";
            vm.recrtInfo.recrtId = vm.recrtId;
            vm.recrtInfo.viewType = vm.viewType;
            vm.$axios
              .post(_url, JSON.stringify(vm.recrtInfo))
              .then((res: AxiosResponse) => {
                let code = res.data.code;
                if (code === "200") {
                  vm.$alert(text + "되었습니다.", "알림", () => {
                    vm.$router.push("/admin/careerEmploy/employInfo/insideRecrt");
                  });
                }
              })
              .catch((e: any) => {
                console.error(e);
                vm.$alert(
                  text + "처리에 실패했습니다.<br />새로고침 후 증상이 반복되면 관리자에게 문의해주세요.",
                  "알림",
                );
              })
              .finally(() => {
                vm.$loading.hide();
              });
          }
        });
      }
    },
    onClickCancel() {
      const vm = this;
      vm.$router.push({
        path: "/admin/careerEmploy/employInfo/insideRecrt",
      });
    },
  },
};
</script>
