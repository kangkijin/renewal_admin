<template>
  <v-row>
    <v-col cols="12">
      <div class="mb-2 text-subtitle-1 font-weight-bold text-center">메인 배너 이미지</div>
      <div class="program_thumbbox big mx-auto">
        <!-- 이미지 첨부해야할때 -->
        <p :class="mainImgClass">
          <input type="file" @change="fnGetUserFileName($event, 0, 'mainUserImg')" class="d-none" id="uptUserImg" />
          <label for="uptUserImg"> 메인 배너 홍보이미지를 등록해주세요 </label>
        </p>
        <div class="img_wrap">
          <img id="mainUserImg0" :src="mainImg" alt="" />
          <div>
            <v-btn
              icon
              size="small"
              variant="tonal"
              @click="onClickDeleteSrc('mainUser', 0)"
              class="attach_delete"
              color="bgTransparency"
              ><v-icon>mdi-window-close</v-icon></v-btn
            >
          </div>
        </div>
        <div class="program_contents">
          <div>
            <ul class="label">
              <li class="mileage">{{ mainImgContent.mileage }}</li>
              <li class="likes">{{ mainImgContent.eliWaitCnt }}</li>
              <li class="apply">{{ mainImgContent.eliRecrtCnt }}</li>
              <li class="waiting">{{ mainImgContent.eliWaitCnt }}</li>
            </ul>
            <span class="team_label">Team</span>
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
              @change="fnGetUserFileName($event, index, 'subUserImg')"
              class="d-none"
              :id="`upSubImg${index}`"
            />
            <label v-if="subImgClass[index] == ''" :for="`upSubImg${index}`"></label>
            <label v-else :for="`upSubImg${index}`">서브 배너 홍보이미지를 등록해주세요</label>
          </p>
          <div class="img_wrap">
            <img :src="subImg[index]" :id="`subUserImg${index}`" />
            <v-btn
              icon
              size="small"
              variant="tonal"
              @click="onClickDeleteSrc('subUser', index)"
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
                <li class="mileage">{{ subImgContent.mileage[index] }}</li>
                <li class="likes">{{ subImgContent.eliWaitCnt[index] }}</li>
                <li class="apply">{{ subImgContent.eliRecrtCnt[index] }}</li>
                <li class="waiting">{{ subImgContent.eliWaitCnt[index] }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script lang="ts">
export default {
  props: {
    prevVal: {
      type: String,
    },
  },
  data() {
    return {
      title: "홍보이미지 등록",
      breadcrumbs: [
        { title: "비교과 프로그램", disabled: false },
        { title: "홍보이미지 등록", disabled: true },
      ],
      dialog: false,
      tab: null,
      //메인이미지 소스
      mainImg: "",
      //서브이미지 소스
      subImg: ["1", "2", "3", "4"] as string[],
      //메인이미지 클래스
      mainImgClass: "attach_img",
      //서브이미지 클래스
      subImgClass: ["attach_img", "attach_img", "attach_img", "attach_img"],
      //메인 이미지 타이틀/ 내용;
      mainImgContent: {
        title: "",
        regDate: "",
        ability: "",
        orptDate: "",
        target: "",
        mileage: "",
        likes: "",
        eliRecrtCnt: "",
        eliWaitCnt: "",
      },
      //서브 이미지 타이틀
      subImgContent: {
        title: ["", "", "", ""],
        ability: ["", "", "", ""],
        regDate: ["", "", "", ""],
        orptDate: ["", "", "", ""],
        target: ["", "", "", ""],
        mileage: ["", "", "", ""],
        likes: ["", "", "", ""],
        eliRecrtCnt: ["", "", "", ""],
        eliWaitCnt: ["", "", "", ""],
      },
    };
  },
  mounted() {
    this.fnCallMount();
  },
  methods: {
    //이미지 등록
    fnGetUserFileName(event: Event, num: number, menuType: string) {
      const target = event.target as HTMLInputElement;
      if (target && target.files?.length) {
        const files = target.files;
        this.fileName = files[0];

        this.base64(this.fileName, num, menuType);
        this.uploadImg(files, num);
        if (menuType == "mainUserImg") {
          this.mainImgClass = "";
        } else {
          this.subImgClass[num] = "";
        }
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
    //이미지 업로드
    uploadImg(files: any, type: String) {
      console.log(`${files} 파일을 전송할겁니다. 아마도.${type}으로다가여`);
    },
    //이미지 삭제
    onClickDeleteSrc(type: string, num: number) {
      if (type === `mainUser`) {
        let mainId: any = document.getElementById(`mainUserImg0`);
        mainId.src = "";
        this.mainImgClass = "attach_img";
      } else {
        let subImg: any = document.getElementById(`subUserImg${num}`);
        subImg.src = "";
        this.subImgClass[num] = "attach_img";
      }
    },
    /* 임시로 데이터 삽입로직*/
    async fnCallMount() {
      //진입시 조회해서 데이터를 넣는다고 생각 ---;
      this.mainImg = "/src/assets/images/program/img_program_thumbnail.png";
      this.mainImgClass = "";
      this.subImgClass = ["", "", "", ""];
      this.subImg = [
        "/src/assets/images/program/img_program_thumbnail2.png",
        "/src/assets/images/program/img_program_thumbnail3.png",
        "/src/assets/images/program/img_program_thumbnail4.png",
        "/src/assets/images/program/img_program_thumbnail5.png",
      ];
      //통신으로 값 가져오기
      let vm = this;
      let resData = await vm.$axios.get("http://localhost:3000/api/v1/ecpPromotionImgs", {
        params: { epmType: "STD" },
      });
      let res = resData.data.data;
      //2/22 추가 5개 이상 안될시 데이터 표출 안함.
      if (res.length > 4) {
        //매번 0일경우 mainPage값임
        this.mainImgContent = {
          title: res[0].eliTitle,
          regDate: res[0].eliReqStrDate,
          orptDate: res[0].eliOprtStrDate,
          ability: res[0].eliPartiCd,
          target: res[0].eliTitle,
          mileage: res[0].mileage,
          like: res[0].eliWaitCnt,
          eliRecrtCnt: res[0].eliRecrtCnt,
          eliWaitCnt: res[0].eliWaitCnt,
        };
        var subList = res.slice(1);
        console.log(subList);
        this.subImgContent = {
          //모든 항목에 대해 항목의 갯수가 4개가 안된다면, 4개가 될때까지 데이터를 삽입
          //인덱스가 있을경우 기 데이터를, 없을경우 문자열을 삽입
          title: Array.from({ length: Math.max(subList.length, 4) }, (x, index) =>
            index < subList.length ? subList[index].eliTitle : "정보를 입력해주세요",
          ),
          ability: Array.from({ length: Math.max(subList.length, 4) }, (x, index) =>
            index < subList.length ? subList[index].eliPartiCd : "정보를 입력해주세요",
          ),
          regDate: Array.from({ length: Math.max(subList.length, 4) }, (x, index) =>
            index < subList.length ? subList[index].eliReqStrDate : "정보를 입력해주세요",
          ),
          orptDate: Array.from({ length: Math.max(subList.length, 4) }, (x, index) =>
            index < subList.length ? subList[index].eliOprtStrDate : "정보를 입력해주세요",
          ),
          target: Array.from({ length: Math.max(subList.length, 4) }, (x, index) =>
            index < subList.length ? subList[index].eliTitle : "정보를 입력해주세요",
          ),
          mileage: Array.from({ length: Math.max(subList.length, 4) }, (x, index) =>
            index < subList.length ? subList[index].mileage : "정보를 입력해주세요",
          ),
          likes: Array.from({ length: Math.max(subList.length, 4) }, (x, index) =>
            index < subList.length ? subList[index].likes : "정보를 입력해주세요",
          ),
          eliRecrtCnt: Array.from({ length: Math.max(subList.length, 4) }, (x, index) =>
            index < subList.length ? subList[index].eliRecrtCnt : "정보를 입력해주세요",
          ),
          eliWaitCnt: Array.from({ length: Math.max(subList.length, 4) }, (x, index) =>
            index < subList.length ? subList[index].eliWaitCnt : "정보를 입력해주세요",
          ),
        };
      }
      console.log(this.subImgContent);
    },
  },
};
</script>
