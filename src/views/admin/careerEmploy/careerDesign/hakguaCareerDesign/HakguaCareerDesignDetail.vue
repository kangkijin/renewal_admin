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
          <th scope="row" class="required">학과정보</th>
          <td class="">
            <div class="d-flex">
              <v-autocomplete
                v-model="careerDesignInfo.colgCd"
                :items="selectOption.colgList"
                class="mr-2"
                item-title="deptKorNm"
                item-value="deptCd"
                placeholder="선택"
                @update:modelValue="fnGetChangeSelectBox($event, 'C')"
              ></v-autocomplete>
              <v-autocomplete
                v-model="careerDesignInfo.hakguaCd"
                :items="selectOption.hakguaList"
                class="mr-2"
                item-title="deptKorNm"
                item-value="deptCd"
                placeholder="선택"
                @update:modelValue="fnGetChangeSelectBox($event, 'H')"
              ></v-autocomplete>
              <v-autocomplete
                v-model="careerDesignInfo.profId"
                :items="selectOption.profList"
                item-title="korNm"
                item-value="stfId"
                placeholder="선택"
              ></v-autocomplete>
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row" class="required">전공능력선택</th>
          <td>
            <v-checkbox
              class="d-inline-flex mr-2"
              v-for="obj in selectOption.abilityCdM"
              :key="obj.cdId"
              :label="obj.cdNm"
              :value="obj.cdId"
              v-model="careerDesignInfo.selectedAbilityCdM"
            />
          </td>
        </tr>
        <tr>
          <th scope="row" class="required">핵심역량선택</th>
          <td>
            <v-checkbox
              class="d-inline-flex mr-2"
              v-for="obj in selectOption.abilityCdC"
              :key="obj.cdId"
              :label="obj.cdNm"
              :value="obj.cdId"
              v-model="careerDesignInfo.selectedAbilityCdC"
            />
          </td>
        </tr>
        <tr>
          <th scope="row" class="required">진출분야명</th>
          <td>
            <v-text-field
              v-model="careerDesignInfo.advTitle"
              :rules="rule1"
              :counter="30"
              :hide-details="false"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th scope="row" class="required">진출분야설명</th>
          <td>
            <v-textarea :counter="1000" v-model="careerDesignInfo.advCont" :rules="rule2"></v-textarea>
          </td>
        </tr>
        <tr>
          <th scope="row" class="required">사용여부</th>
          <td>
            <v-radio-group inline v-model="careerDesignInfo.useYn">
              <v-radio label="사용" class="mr-4" value="Y"></v-radio>
              <v-radio label="미사용" class="mr-4" value="N"></v-radio>
            </v-radio-group>
          </td>
        </tr>
        <tr>
          <th scope="row" class="required">대표이미지</th>
          <td>
            <div class="program_thumbbox">
              <p :class="mainImgClass">
                <input
                  type="file"
                  @change="fnGetUserFileName($event, 0, 'careerDesignImg')"
                  class="d-none"
                  id="careerDesignImg"
                />
                <label for="careerDesignImg"> 대표 이미지를 등록해주세요 </label>
              </p>
              <div class="img_wrap">
                <img id="careerDesignImg0" :src="mainImg" alt="" />
                <div>
                  <v-btn
                    icon
                    size="small"
                    variant="tonal"
                    @click="onClickDeleteSrc('careerDesign')"
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
import type { AxiosResponse } from "axios";
import type { AbilityTypes } from "@/types/diagTypes/AbilityTypes";
import type { deptTypes, stfTypes } from "@/types/cmmnTypes";
export default {
  data: () => ({
    breadcrumbs: [
      { title: "진로ㆍ취업", disabled: false },
      { title: "진로설계", disabled: false },
      { title: "학과별 진로설계", disabled: true },
    ],
    careerDesignInfo: {
      colgCd: null,
      hakguaCd: null,
      profId: null,
      advTitle: "",
      advCont: "",
      useYn: "Y",
      selectedAbilityCdM: [],
      selectedAbilityCdC: [],
    },
    selectOption: {
      colgList: [] as deptTypes[],
      hakguaList: [] as deptTypes[],
      profList: [] as stfTypes[],
      abilityCdM: [] as AbilityTypes[],
      abilityCdC: [] as AbilityTypes[],
    },
    rule1: [(v: any) => v.length <= 30 || "30자 이상 제한합니다."],
    rule2: [(v: any) => v.length <= 1000 || "1000자 이상 제한합니다."],
    mainImgClass: "attach_img",
    mainImg: "",
    careerDesignId: history.state.careerDesignId,
    viewType: history.state.viewType,
    result: "Y" as ynTypes,
  }),
  computed: {
    title() {
      const vm = this;
      return `학과별 진로설계 ${vm.viewType === "MODIFY" ? "수정" : "등록"}`;
    },
    saveButtonText() {
      return this.viewType === "MODIFY" ? "수정" : "저장";
    },
  },
  created() {
    this.fnOnInit();
    if (this.viewType == "MODIFY") {
      this.getCareerDesignDetail();
    }
  },
  methods: {
    async fnOnInit() {
      const vm = this;
      vm.fnGetAbilityCd();
      vm.selectOption.colgList = await vm.$fnGetDeptList("C", "");
      vm.selectOption.hakguaList = await vm.$fnGetDeptList("H", "");
      vm.selectOption.profList = await vm.$fnGetStfList("", "", "");
    },
    async fnGetChangeSelectBox(_selectedItem: any, _type: string) {
      const vm = this;
      const selectedCd = _selectedItem;
      if (_type === "C") {
        vm.careerDesignInfo.hakguaCd = null;
        vm.careerDesignInfo.profId = null;
        vm.selectOption.hakguaList = await vm.$fnGetDeptList("H", selectedCd);
      } else {
        vm.careerDesignInfo.profId = null;
        vm.selectOption.profList = await vm.$fnGetStfList("", "", selectedCd);
      }
    },
    fnGetUserFileName(event: Event, num: number, menuType: string) {
      const target = event.target as HTMLInputElement;
      if (target && target.files?.length) {
        const files = target.files;
        this.fileName = files[0];

        this.base64(this.fileName, num, menuType);
        this.uploadImg(files, num);
        if (menuType == "careerDesignImg") {
          this.mainImgClass = "";
        } else {
          this.subImgClass[num] = "";
        }
      }
    },
    onClickDeleteSrc(type: string) {
      if (type === "careerDesign") {
        let mainId: any = document.getElementById(`careerDesignImg0`);
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
    fnGetAbilityCd() {
      const vm = this;
      vm.$loading.show();
      vm.$axios
        .get("/api/career/admin/careerDesign/getAbilityList")
        .then((res: AxiosResponse) => {
          vm.selectOption.abilityCdC = [];
          vm.selectOption.abilityCdM = [];
          vm.selectOption.abilityCdC.push(...res.data.data.abilityCList);
          vm.selectOption.abilityCdM.push(...res.data.data.abilityMList);
        })
        .catch((e: any) => {
          console.error(e);
        })
        .finally(() => {
          vm.$loading.hide();
        });
    },
    getCareerDesignDetail() {
      const vm = this;
      const param = {
        careerDesignId: vm.careerDesignId,
      };
      vm.$loading.show();
      vm.$axios
        .get("/api/career/admin/careerDesign/getCareerDesignDetail", { params: param })
        .then((res: AxiosResponse) => {
          vm.careerDesignInfo = res.data.data;
          vm.careerDesignInfo.selectedAbilityCdC = [];
          vm.careerDesignInfo.selectedAbilityCdM = [];
          res.data.data.selectedAbilityList.forEach((item: any) => {
            if (item.cdDiv === "C") {
              vm.careerDesignInfo.selectedAbilityCdC.push(item.cdId);
            } else {
              vm.careerDesignInfo.selectedAbilityCdM.push(item.cdId);
            }
          });
        })
        .catch((e: any) => {
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
      if (vm.$StringUtil.isEmpty(vm.careerDesignInfo.colgCd)) {
        msg = "학과정보-대학을 선택해주세요.";
      } else if (vm.$StringUtil.isEmpty(vm.careerDesignInfo.hakguaCd)) {
        msg = "학과정보-학과를 선택해주세요.";
      } else if (vm.$StringUtil.isEmpty(vm.careerDesignInfo.profId)) {
        msg = "학과정보-교수를 선택해주세요.";
      } else if (vm.$StringUtil.isEmpty(vm.careerDesignInfo.advTitle)) {
        msg = "진출분야명을 입력해주세요. ";
      } else if (vm.$StringUtil.isEmpty(vm.careerDesignInfo.advCont)) {
        msg = "진출분야설명을 입력해주세요.";
      } else if (vm.careerDesignInfo.selectedAbilityCdM.length === 0) {
        msg = "1개이상 전공능력을 선택해주세요.";
      } else if (vm.careerDesignInfo.selectedAbilityCdC.length === 0) {
        msg = "1개이상 핵심역량을 선택해주세요.";
      } else {
        status = true;
      }
      // else if (vm.$StringUtil.isEmpty(vm.careerDesignInfo.?????)) {
      //   msg = "대표이미지를 등록해주세요.";
      // }
      if (!status) {
        vm.$toast(msg, "error");
      } else {
        vm.$confirm(text + "하시겠습니까?", "확인", (isConfirm: Boolean) => {
          if (isConfirm) {
            vm.$loading.show();
            let _url = "/api/career/admin/careerDesign/createCareerDesign";
            vm.careerDesignInfo.careerDesignId = vm.careerDesignId;
            vm.careerDesignInfo.viewType = vm.viewType;
            vm.$axios
              .post(_url, JSON.stringify(vm.careerDesignInfo))
              .then((res: AxiosResponse) => {
                const code = res.data.code;
                if (code === "200") {
                  vm.$alert(text + "되었습니다.", "알림", () => {
                    vm.$router.push("/admin/careerEmploy/careerDesign/hakguaCareerDesign");
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
        path: "/admin/careerEmploy/careerDesign/hakguaCareerDesign",
      });
    },
  },
};
</script>
