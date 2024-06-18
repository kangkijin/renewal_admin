<template>
  <v-row>
    <v-col cols="12">
      <div class="mb-2 text-subtitle-1 font-weight-bold text-center">메인 배너 이미지</div>
      <div class="program_thumbbox big mx-auto">
        <!-- 이미지 첨부해야할때 -->
        <p :class="mainImgClass">
          <input type="file" @change="fnGetStafFileName($event, 0, 'mainStafImg')" class="d-none" id="uptStafImage" />
          <label for="uptStafImage"> 메인 배너 홍보이미지를 등록해주세요 </label>
        </p>
        <div class="img_wrap">
          <img id="mainStafImg0" :src="mainImg" alt="대학 로고이미지 예시" />
          <div>
            <v-btn
              icon
              size="small"
              variant="tonal"
              @click="deleteSrc('mainStaf', 0)"
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
              @change="fnGetStafFileName($event, index, 'subStafImg')"
              class="d-none"
              :id="`upStafSubImg${index}`"
            />
            <label v-if="subImgClass[index] == ''" :for="`upStafSubImg${index}`"></label>
            <label v-else :for="`upStafSubImg${index}`">서브 배너 홍보이미지를 등록해주세요</label>
          </p>
          <div class="img_wrap">
            <img :src="subImg[index]" :id="`subStafImg${index}`" />
            <v-btn
              icon
              size="small"
              variant="tonal"
              @click="deleteSrc('subStaf', index)"
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
      },
      //서브 이미지 타이틀
      subImgContent: {
        title: ["", "", "", ""],
        ability: ["", "", "", ""],
        regDate: ["", "", "", ""],
        orptDate: ["", "", "", ""],
        target: ["", "", "", ""],
      },
    };
  },
  mounted() {
    this.fnCallMount();
    // axios.get("http://localhost:3001/type", { params: { name, stfNm } }).then((res: string) => {
    //   console.log(res);
    //   vm.list = res;
    // });
  },
  methods: {
    //이미지 등록
    //함수는 메인에서 관리
    fnGetStafFileName(event: Event, num: number, menuType: string) {
      const target = event.target as HTMLInputElement;
      if (target && target.files?.length) {
        const files = target.files;
        this.fileName = files[0];

        this.base64(this.fileName, num, menuType);
        this.uploadImg(files, num);
        if (menuType == "mainStafImg") {
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
    deleteSrc(type: string, num: number) {
      if (type === `mainStaf`) {
        let mainId: any = document.getElementById(`mainStafImg0`);
        mainId.src = "/assets/images/program/img_program_thumbnail.png";
        this.mainImgClass = "attach_img";
      } else {
        let subImg: any = document.getElementById(`subStafImg${num}`);
        subImg.src = "";
        this.subImgClass[num] = "attach_img";
      }
    },
    fnCallMount() {
      //진입시 조회해서 데이터를 넣는다고 생각 ---;
      this.mainImg = "/src/assets/images/program/img_program_thumbnail4.png";
      this.mainImgClass = "";
      this.subImgClass = ["", "", "", ""];
      this.subImg = [
        "/src/assets/images/program/img_program_thumbnail4.png",
        "/src/assets/images/program/img_program_thumbnail3.png",
        "/src/assets/images/program/img_program_thumbnail2.png",
        "/src/assets/images/program/img_program_thumbnail1.png",
      ];
      this.mainImgContent = {
        title: "메인 이미지 타이틀 예시입니다(직원)",
        regDate: "2024-01-02 ~ 2024-01-31(직원)",
        orptDate: "2024-02-02 ~ 2024-02-31(직원)",
        ability: "종합적 사고력ㆍ대인관계0(직원)",
        target: "재학생(직원)",
      };
      this.subImgContent = {
        title: [
          "서브 이미지 타이틀 예시입니다(직원)1",
          "서브 이미지 타이틀 예시입니다(직원)2",
          "서브 이미지 타이틀 예시입니다(직원)3",
          "서브 이미지 타이틀 예시입니다(직원)4",
        ],
        ability: [
          "종합적 사고력ㆍ대인관계1(직원)",
          "종합적 사고력ㆍ대인관계2(직원)",
          "종합적 사고력ㆍ대인관계3(직원)",
          "종합적 사고력ㆍ대인관계4(직원)",
        ],
        regDate: [
          "2024-01-12 ~ 2024-01-31(직원)",
          "2024-01-02 ~ 2024-01-31(직원)",
          "2024-03-02 ~ 2024-03-31(직원)",
          "2024-04-02 ~ 2024-04-31(직원)",
        ],
        orptDate: [
          "2024-02-12 ~ 2024-02-31(직원)",
          "2024-03-02 ~ 2024-03-31(직원)",
          "2024-04-02 ~ 2024-04-31(직원)",
          "2024-05-02 ~ 2024-05-31(직원)",
        ],
        target: ["재학생(직원)1", "재학생2(직원)", "재학생3(직원)", "재학생4(직원)"],
      };
    },
  },
};
</script>
