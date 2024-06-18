<template>
  <!-- 홍보 배너 이미지 미리보기 -->
  <v-dialog v-model="dialog" persistent width="1300">
    <!-- dialog button -->
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" variant="flat" color="primary" width="80">미리보기</v-btn>
    </template>
    <!-- dialog inner -->
    <v-card>
      <!-- dialog title -->
      <v-card-title class="bg-primary">홍보이미지 미리보기</v-card-title>

      <!-- dialog content -->
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <div class="program_biggrid">
              <div class="program_thumbbox">
                <div class="img_wrap">
                  <!-- [pp] 이미지 없을때 -->
                  <img :src="mainImg" alt="대학 로고이미지 예시" />
                </div>
                <p class="btn_like">
                  <input type="checkbox" id="programlike1" name="programlike" disabled />
                  <label for="programlike1">좋아요</label>
                </p>
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
              <div class="program_thumbbox" v-for="(sub, index) in subImg" :key="index">
                <div class="img_wrap">
                  <img :src="subImg[index]" :id="`subUserImg${index}`" />
                </div>
                <p class="btn_like">
                  <input type="checkbox" id="programlike2" name="programlike" disabled />
                  <label for="programlike2">좋아요</label>
                </p>
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
      </v-card-text>
      <v-divider></v-divider>

      <!-- dialog button -->
      <v-card-actions class="justify-end">
        <v-btn variant="outlined" @click="dialog = false">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
// import axios from "axios";
export default {
  components: {},
  props: {
    indexToPrev: {
      type: String,
    },
  },
  data: () => ({
    dialog: false,
    //메인이미지 소스
    mainImg: "",
    //서브이미지 소스
    subImg: ["1", "2", "3", "4"] as string[],
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
  }),
  watch: {
    indexToPrev(newVal: String) {
      this.changeTabs(newVal);
    },
  },
  methods: {
    changeTabs(newVal: string) {
      //조회해서 데이터를 넣는다고 생각 ---;
      this.mainImg = "/src/assets/images/program/img_program_thumbnail2.png";
      this.subImg = [
        "/src/assets/images/program/img_program_thumbnail2.png",
        "/src/assets/images/program/img_program_thumbnail3.png",
        "/src/assets/images/program/img_program_thumbnail4.png",
        "/src/assets/images/program/img_program_thumbnail5.png",
      ];
      this.mainImgContent = {
        title: `${newVal}메인 이미지 타이틀 예시입니다`,
        regDate: `${newVal}2024-01-02 ~ 2024-01-31`,
        orptDate: `${newVal}2024-02-02 ~ 2024-02-31`,
        ability: `${newVal}종합적 사고력ㆍ대인관계0`,
        target: `${newVal}재학생`,
      };
      this.subImgContent = {
        title: [
          `${newVal}서브 이미지 타이틀 예시입니다1`,
          `${newVal}서브 이미지 타이틀 예시입니다2`,
          `${newVal}서브 이미지 타이틀 예시입니다3`,
          `${newVal}서브 이미지 타이틀 예시입니다4`,
        ],
        ability: [
          `${newVal}종합적 사고력ㆍ대인관계1`,
          `${newVal}종합적 사고력ㆍ대인관계2`,
          `${newVal}종합적 사고력ㆍ대인관계3`,
          `${newVal}종합적 사고력ㆍ대인관계4`,
        ],
        regDate: [
          `${newVal}2024-01-12 ~ 2024-01-31`,
          `${newVal}2024-01-02 ~ 2024-01-31`,
          `${newVal}${newVal}2024-03-02 ~ 2024-03-31`,
          `${newVal}2024-04-02 ~ 2024-04-31`,
        ],
        orptDate: [
          `${newVal}2024-02-12 ~ 2024-02-31`,
          `${newVal}2024-03-02 ~ 2024-03-31`,
          `${newVal}2024-04-02 ~ 2024-04-31`,
          `${newVal}2024-05-02 ~ 2024-05-31`,
        ],
        target: [`${newVal}재학생1`, `${newVal}재학생2`, `${newVal}재학생3`, `${newVal}재학생4`],
      };
    },
  },
};
</script>
