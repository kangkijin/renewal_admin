<template>
  <v-card>
    <!-- dialog title -->
    <v-card-title class="bg-primary">진단 미리보기</v-card-title>

    <!-- dialog content -->
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <div class="intro_wrapper">
            <div class="intro_list">
              <ul>
                <li>
                  <strong>진단명</strong>
                  <p>핵심역량진단</p>
                </li>
                <li>
                  <strong>문항수</strong>
                  <p>76</p>
                </li>
                <li>
                  <strong>응시기간</strong>
                  <p>
                    2018-09-10 12:00 ~<br />
                    2024.02.01 12:00
                  </p>
                </li>
              </ul>
            </div>
            <div class="intro_cnt">
              <div class="wrap">
                <div class="title"><span>1회차</span> 사전 테스트</div>
                <div class="cnt">
                  <div class="editor_area">드론정비과정 프로그램 상세내용을 확인하고 시험을 풀어주세요.</div>
                </div>
              </div>
              <!-- <a href="javascript:void(0);" class="view_ans">정답보기</a> -->
            </div>
          </div>
          <div class="diag_wrapper">
            <v-expansion-panels class="diag_timer_wrap" v-model="panel">
              <v-expansion-panel elevation="0" class="diag_timer">
                <v-expansion-panel-title class="timer_header">
                  <p class="timer">12 : 10</p>
                  <p class="qus_counter"><span>60</span> / 100</p>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="timer_quslist">
                    <!-- [pp] 체크 : checked / 미체크 : disabled -->
                    <!-- [pp] 정답 : correct / 오답 : wrong -->
                    <li class="qus_item checked">
                      <p>1</p>
                      <strong>체크됨</strong>
                    </li>
                    <li class="qus_item disabled">
                      <p>2</p>
                      <strong>미체크</strong>
                    </li>
                    <li class="qus_item checked">
                      <p>3</p>
                      <strong>체크됨</strong>
                    </li>
                    <li class="qus_item correct">
                      <p>4</p>
                      <strong>정답</strong>
                    </li>
                    <li class="qus_item wrong">
                      <p>5</p>
                      <strong>오답</strong>
                    </li>
                    <li class="qus_item checked">
                      <p>6</p>
                      <strong>체크됨</strong>
                    </li>
                  </ul>
                </v-expansion-panel-text>
                <div class="d-flex justify-center mt-6">
                  <v-btn variant="outlined" class="mr-2 flex-1-0">임시저장</v-btn>
                  <v-btn variant="flat" class="flex-1-0" color="success">시험 제출하기</v-btn>
                </div>
              </v-expansion-panel>
            </v-expansion-panels>
            <div class="diag_qus_wrap">
              <div class="diag_qus">
                <div class="qus_header">
                  <strong class="qus_num">01.</strong>
                  <p class="qus_tit">
                    Which one of the five is least like the other four? 객관식 문항입니다.
                    <strong class="qus_score">20점</strong>
                  </p>
                </div>
                <!-- [pp] 힌트 -->
                <div class="hint_wrap"><strong>Hint</strong>시험 힌트 25자까지 제공</div>
                <!-- [pp] Case 1: 객관식 문항-->
                <div class="qus_cnt">
                  <v-radio-group>
                    <v-radio label="1. 첫번째 답변입니다" class="mr-4" value="one"></v-radio>
                    <v-radio label="2. 두번째 답변입니다" class="mr-4" value="two"></v-radio>
                    <v-radio label="3. 세번째 답변입니다" value="three"></v-radio>
                  </v-radio-group>
                </div>
              </div>
              <div class="diag_qus">
                <div class="qus_header">
                  <strong class="qus_num">02.</strong>
                  <p class="qus_tit">
                    Which one of the five is least like the other four? 선다형 문항입니다.
                    <strong class="qus_score">20점</strong>
                  </p>
                </div>
                <!-- [pp] 힌트 -->
                <div class="hint_wrap"><strong>Hint</strong>시험 힌트 25자까지 제공</div>
                <!-- [pp] Case 2: 선다형 문항-->
                <div class="qus_cnt">
                  <v-checkbox label="1. AAA" />
                  <v-checkbox label="2. BBB" />
                  <v-checkbox label="3. CCC" />
                  <v-checkbox label="4. DDD" />
                </div>
              </div>
              <div class="diag_qus">
                <div class="qus_header">
                  <strong class="qus_num">03.</strong>
                  <p class="qus_tit">
                    Which one of the five is least like the other four? 주관식 문항입니다.
                    <strong class="qus_score">20점</strong>
                  </p>
                </div>
                <!-- [pp] Case 3: 주관식 문항-->
                <div class="qus_cnt">
                  <v-text-field placeholder="입력해주세요"></v-text-field>
                </div>
              </div>
              <div class="diag_qus">
                <div class="qus_header">
                  <strong class="qus_num">04.</strong>
                  <p class="qus_tit">
                    Which one of the five is least like the other four? <br />
                    문제에 이미지가 제공되는 문항입니다. <strong class="qus_score">20점</strong>
                  </p>
                </div>
                <!-- [pp] Case 4: 이미지 제공 문항-->
                <div class="qus_cnt">
                  <div class="qusimg_wrap">
                    <img src="@/assets/images/program/img_program_thumbnail.png" alt="이미지" />
                  </div>
                  <v-radio-group>
                    <v-radio label="1. 첫번째 답변입니다" class="mr-4" value="one"></v-radio>
                    <v-radio label="2. 두번째 답변입니다" class="mr-4" value="two"></v-radio>
                    <v-radio label="3. 세번째 답변입니다" value="three"></v-radio>
                  </v-radio-group>
                </div>
              </div>
              <div class="diag_qus">
                <div class="qus_header">
                  <strong class="qus_num">05.</strong>
                  <p class="qus_tit">
                    Which one of the five is least like the other four? 각 문항에 이미지가 제공되는 객관식입니다.
                    <strong class="qus_score">20점</strong>
                  </p>
                </div>
                <!-- [pp] Case 5: 각 문항에 이미지가 제공되는 객관식 -->
                <div class="qus_cnt">
                  <v-radio-group>
                    <v-radio label="1. 첫번째 답변입니다" class="mr-4" value="one"> </v-radio>
                    <div class="qus_img">
                      <img src="@/assets/images/program/img_ex1.png" alt="이미지" />
                    </div>
                    <v-radio label="2. 두번째 답변입니다" class="mr-4" value="two"></v-radio>
                    <div class="qus_img">
                      <img src="@/assets/images/program/img_ex2.png" alt="이미지" />
                    </div>
                    <v-radio label="3. 세번째 답변입니다" value="three"></v-radio>
                    <div class="qus_img">
                      <img src="@/assets/images/program/img_ex3.png" alt="이미지" />
                    </div>
                    <v-radio label="4. 네번째 답변입니다" value="four"></v-radio>
                    <div class="qus_img">
                      <img src="@/assets/images/program/img_ex4.png" alt="이미지" />
                    </div>
                  </v-radio-group>
                </div>
              </div>
              <div class="diag_qus">
                <div class="qus_header">
                  <strong class="qus_num">06.</strong>
                  <p class="qus_tit">
                    Which one of the five is least like the other four? 각 문항에 이미지가 제공되는 선다형입니다.
                    <strong class="qus_score">20점</strong>
                  </p>
                </div>
                <!-- [pp] Case 6: 각 문항에 이미지가 제공되는 선다형-->
                <div class="qus_cnt">
                  <v-checkbox label="1. AAA" />
                  <div class="qus_img">
                    <img src="@/assets/images/program/img_ex1.png" alt="이미지" />
                  </div>
                  <v-checkbox label="2. BBB" />
                  <div class="qus_img">
                    <img src="@/assets/images/program/img_ex2.png" alt="이미지" />
                  </div>
                  <v-checkbox label="3. CCC" />
                  <div class="qus_img">
                    <img src="@/assets/images/program/img_ex3.png" alt="이미지" />
                  </div>
                  <v-checkbox label="4. DDD" />
                  <div class="qus_img">
                    <img src="@/assets/images/program/img_ex4.png" alt="이미지" />
                  </div>
                </div>
              </div>
              <div class="diag_qus">
                <div class="qus_header">
                  <strong class="qus_num">07.</strong>
                  <p class="qus_tit">
                    Which one of the five is least like the other four? 이미지가 첨부된 주관식 문항입니다.
                    <strong class="qus_score">20점</strong>
                  </p>
                </div>
                <!-- [pp] Case 7: 주관식 + 이미지제공 문항-->
                <div class="qus_cnt">
                  <div class="qusimg_wrap">
                    <img src="@/assets/images/program/img_program_thumbnail.png" alt="이미지" />
                  </div>
                  <v-text-field placeholder="입력해주세요"></v-text-field>
                </div>
              </div>
            </div>
          </div>
          <div class="diag_paging">
            <button type="button" class="prev" disabled>이전</button>
            <button type="button" class="next">다음</button>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>

    <!-- dialog button -->
    <v-card-actions class="justify-end">
      <v-btn variant="outlined" @click="diaglog = false">닫기</v-btn>
      <v-btn variant="flat" color="success" @click="diaglog = false">확인</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

const diaglog = defineModel();

const panel = ref([0]);
</script>
