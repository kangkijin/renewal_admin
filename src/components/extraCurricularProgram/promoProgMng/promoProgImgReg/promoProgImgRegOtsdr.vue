<template>
  <v-row>
    <v-col cols="12">
      <div class="mb-2 text-subtitle-1 font-weight-bold text-center">메인 배너 이미지</div>
      <div class="program_thumbbox big mx-auto">
        <!-- 이미지 첨부해야할때 -->
        <p :class="mainImgClass">
          <input type="file" @change="getOtsdrFileName($event, 0, 'mainOtsdrImg')" class="d-none" id="uptImgOtsdr" />
          <label for="uptImgOtsdr"> 메인 배너 홍보이미지를 등록해주세요 </label>
        </p>
        <div class="img_wrap">
          <img id="mainOtsdrImg0" :src="mainImg" alt="대학 로고이미지 예시" />
          <div>
            <v-btn
              icon
              size="small"
              variant="tonal"
              @click="onClickDeleteSrc('mainOtsdr', 0)"
              class="attach_delete"
              color="bgTransparency"
              ><v-icon>mdi-window-close</v-icon></v-btn
            >
          </div>
        </div>
        <div class="program_contents">
          <div>
            <ul class="label">
              <li class="mileage">100,000</li>
              <li class="likes">999+</li>
              <li class="apply">19/20</li>
              <li class="waiting">0/20</li>
            </ul>
            <span class="team_label">TEAM</span>
            <p class="title">{{ mainImgContent.title }}</p>
            <p class="capa">{{ mainImgContent.ability }}</p>
            <ul class="info">
              <li><strong>모집</strong>{{ mainImgContent.regDate }}</li>
              <li><strong>운영</strong>{{ mainImgContent.orptDate }}</li>
              <li><strong>대상</strong>{{ mainImgContent.target }}</li>
            </ul>
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="12" class="text-center">
      <div class="mb-2 text-subtitle-1 font-weight-bold text-center">서브 배너 이미지</div>
      <div class="program_grid mx-auto">
        <div class="program_thumbbox" v-for="(sub, index) in subImg" :key="index">
          <!-- 이미지 첨부해야할때 -->
          <p :class="subImgClass[index]">
            <input
              type="file"
              @change="getOtsdrFileName($event, index, 'subOtsdrImg')"
              class="d-none"
              :id="`upSubOtsdrImg${index}`"
            />
            <label v-if="subImgClass[index] == ''" :for="`upSubOtsdrImg${index}`"></label>
            <label v-else :for="`upSubOtsdrImg${index}`">서브 배너 홍보이미지를 등록해주세요</label>
          </p>
          <div class="img_wrap">
            <img :src="subImg[index]" :id="`subOtsdrImg${index}`" />
            <v-btn
              icon
              size="small"
              variant="tonal"
              @click="onClickDeleteSrc('subOtsdr', index)"
              class="attach_delete"
              color="bgTransparency"
              ><v-icon>mdi-window-close</v-icon></v-btn
            >
          </div>
          <div class="program_contents">
            <div>
              <span class="team_label">TEAM</span>
              <p class="title">{{ subImgContent.title[index] }}</p>
              <p class="capa">{{ subImgContent.ability[index] }}</p>
              <ul class="info">
                <li><strong>모집</strong>{{ subImgContent.regDate[index] }}</li>
                <li><strong>운영</strong>{{ subImgContent.orptDate[index] }}</li>
                <li><strong>대상</strong>{{ subImgContent.target[index] }}</li>
              </ul>
              <ul class="label">
                <li class="mileage">100,000</li>
                <li class="likes">999+</li>
                <li class="apply">19/20</li>
                <li class="waiting">0/20</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
/*변수 선언*/
const dialog = ref(false);
const tab = ref(null);
const mainImgClass = ref("attach_img");
const subImgClass = ref(["attach_img", "attach_img", "attach_img", "attach_img"]);
const mainImg = ref("");
const subImg = ref(["1", "2", "3", "4"]);
const mainImgContent = ref({
  title: "",
  regDate: "",
  ability: "",
  orptDate: "",
  target: "",
});
const subImgContent = ref({
  title: ["", "", "", ""],
  ability: ["", "", "", ""],
  regDate: ["", "", "", ""],
  orptDate: ["", "", "", ""],
  target: ["", "", "", ""],
});
/*prop선언*/
/*함수 선언*/

const getOtsdrFileName = function (event: Event, num: number, menuType: string) {
  const target = event.target as HTMLInputElement;
  if (target && target.files?.length) {
    const files = target.files;
    this.fileName = files[0];

    base64(this.fileName, num, menuType);
    uploadImg(files, num);

    if (menuType === "mainOtsdrImg") {
      this.mainImgClass = "";
    } else {
      this.subImgClass[num] = "";
    }
  }
};
const base64 = function (file: File, number: number, menuType: string) {
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
};
const uploadImg = function (files: any, type: number) {
  console.log(`${files} 파일을 전송할겁니다. 아마도.${type}으로다가여`);
};
const onClickDeleteSrc = function (type: string, num: number) {
  if (type === `mainOtsdr`) {
    let mainId: any = document.getElementById(`mainOtsdrImg0`);
    mainId.src = "/assets/images/program/img_program_thumbnail.png";
    mainImgClass.value = "attach_img";
  } else {
    let subImg: any = document.getElementById(`subOtsdrImg${num}`);
    subImg.src = "";
    subImgClass.value[num] = "attach_img";
  }
};
const fnCallMount = function () {
  //진입시 조회해서 데이터를 넣는다고 생각 ---;
  mainImg.value = "/src/assets/images/program/img_program_thumbnail3.png";
  mainImgClass.value = "";
  subImgClass.value = ["", "", "", ""];
  subImg.value = [
    "/src/assets/images/program/img_program_thumbnai2.png",
    "/src/assets/images/program/img_program_thumbnail3.png",
    "/src/assets/images/program/img_program_thumbnail1.png",
    "/src/assets/images/program/img_program_thumbnail4.png",
  ];
  mainImgContent.value = {
    title: "메인 이미지 타이틀 예시입니다(외부인)",
    regDate: "2024-01-02 ~ 2024-01-31(외부인)",
    orptDate: "2024-02-02 ~ 2024-02-31(외부인)",
    ability: "종합적 사고력ㆍ대인관계0(외부인)",
    target: "재학생(외부인)",
  };
  subImgContent.value = {
    title: [
      "서브 이미지 타이틀 예시입니다(외부인)1",
      "서브 이미지 타이틀 예시입니다(외부인)2",
      "서브 이미지 타이틀 예시입니다(외부인)3",
      "서브 이미지 타이틀 예시입니다(외부인)4",
    ],
    ability: [
      "종합적 사고력ㆍ대인관계1(외부인)",
      "종합적 사고력ㆍ대인관계2(외부인)",
      "종합적 사고력ㆍ대인관계3(외부인)",
      "종합적 사고력ㆍ대인관계4(외부인)",
    ],
    regDate: [
      "2024-01-12 ~ 2024-01-31(외부인)",
      "2024-01-02 ~ 2024-01-31(외부인)",
      "2024-03-02 ~ 2024-03-31(외부인)",
      "2024-04-02 ~ 2024-04-31(외부인)",
    ],
    orptDate: [
      "2024-02-12 ~ 2024-02-31(외부인)",
      "2024-03-02 ~ 2024-03-31(외부인)",
      "2024-04-02 ~ 2024-04-31(외부인)",
      "2024-05-02 ~ 2024-05-31(외부인)",
    ],
    target: ["재학생(외부인)1", "재학생2(외부인)", "재학생3(외부인)", "재학생4(외부인)"],
  };
};
/*hook 선언*/
onMounted(function () {
  console.log(dialog);
  console.log(tab);
  fnCallMount();
});
</script>
