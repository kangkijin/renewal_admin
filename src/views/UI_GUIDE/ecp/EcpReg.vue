<template>
  <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-card elevation="10">
        <v-card-text>
          <v-tabs v-model="tab" bg-color="primary">
            <v-tab value="one">학생</v-tab>
            <v-tab value="two">교수</v-tab>
            <v-tab value="three">직원</v-tab>
            <v-tab value="four">외부인</v-tab>
          </v-tabs>
          <v-card-text class="bg-grey100 mt-4 rounded-md">
            <v-window v-model="tab">
              <v-window-item value="one">
                <v-row>
                  <v-col cols="12">
                    <div class="mb-2 text-subtitle-1 font-weight-bold text-center">메인 배너 이미지</div>
                    <div class="program_thumbbox big mx-auto">
                      <!-- 이미지 첨부해야할때 -->
                      <p class="attach_img">
                        <input type="file" id="input-file" />
                        <label for="input-file">메인 배너 홍보이미지를 등록해주세요</label>
                      </p>

                      <!-- 이미지 등록시 이곳 표출 :
                      <div class="img_wrap">
                        <img src="@/assets/images/program/img_program_thumbnail.png" alt="대학 로고이미지 예시" />
                        <v-btn icon size="small" variant="tonal" class="attach_delete" color="bgTransparency"
                          ><v-icon>mdi-window-close</v-icon></v-btn
                        >
                      </div>
                      -->

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
                          <p class="title">비교과 프로그램 안내 두줄까지</p>
                          <p class="capa">종합적 사고력ㆍ대인관계</p>
                          <ul class="info">
                            <li><strong>모집</strong>24/01/05 ~ 24/01/15</li>
                            <li><strong>운영</strong>24/01/05 ~ 24/01/15</li>
                            <li><strong>대상</strong>재학생 · 휴학생</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" class="text-center">
                    <div class="mb-2 text-subtitle-1 font-weight-bold text-center">서브 배너 이미지</div>
                    <div class="program_grid mx-auto">
                      <div class="program_thumbbox">
                        <div class="img_wrap">
                          <img src="@/assets/images/program/img_program_thumbnail2.png" alt="비교과 이미지" />
                          <v-btn icon size="small" variant="tonal" class="attach_delete" color="bgTransparency"
                            ><v-icon>mdi-window-close</v-icon></v-btn
                          >
                        </div>
                        <p class="btn_like">
                          <input type="checkbox" id="programlike2" name="programlike" disabled />
                          <label for="programlike2">좋아요</label>
                        </p>
                        <div class="program_contents">
                          <div>
                            <span class="team_label">TEAM</span>
                            <p class="title">비교과 프로그램 안내 두줄까지</p>
                            <p class="capa">종합적 사고력ㆍ대인관계 내용 길어지면 말줄임표</p>
                            <ul class="info">
                              <li><strong>모집</strong>24/01/05 ~ 24/01/15 내용 길어지면 말줄임표</li>
                              <li><strong>운영</strong>24/01/05 ~ 24/01/15 내용 길어지면 말줄임표</li>
                              <li><strong>대상</strong>재학생 · 휴학생 내용 길어지면 말줄임표</li>
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
                      <div class="program_thumbbox">
                        <!-- 이미지 첨부해야할때 -->
                        <p class="attach_img">
                          <input type="file" id="input-file" />
                          <label for="input-file">서브 배너 홍보이미지를 등록해주세요</label>
                        </p>
                        <!-- 이미지 등록시 이곳 표출 :
                        <div class="img_wrap">
                          <img src="@/assets/images/program/img_program_thumbnail.png" alt="대학 로고이미지 예시" />
                          <v-btn icon size="small" variant="tonal" class="attach_delete" color="bgTransparency"
                            ><v-icon>mdi-window-close</v-icon></v-btn
                          >
                        </div>
                        -->
                        <p class="btn_like">
                          <input type="checkbox" id="programlike2" name="programlike" disabled />
                          <label for="programlike2">좋아요</label>
                        </p>
                        <div class="program_contents">
                          <div>
                            <span class="team_label">TEAM</span>
                            <p class="title">비교과 프로그램 안내 두줄까지</p>
                            <p class="capa">종합적 사고력ㆍ대인관계 내용 길어지면 말줄임표</p>
                            <ul class="info">
                              <li><strong>모집</strong>24/01/05 ~ 24/01/15 내용 길어지면 말줄임표</li>
                              <li><strong>운영</strong>24/01/05 ~ 24/01/15 내용 길어지면 말줄임표</li>
                              <li><strong>대상</strong>재학생 · 휴학생 내용 길어지면 말줄임표</li>
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
                      <div class="program_thumbbox">
                        <!-- 이미지 첨부해야할때 -->
                        <p class="attach_img">
                          <input type="file" id="input-file" />
                          <label for="input-file">서브 배너 홍보이미지를 등록해주세요</label>
                        </p>
                        <!-- 이미지 등록시 이곳 표출 :
                        <div class="img_wrap">
                          <img src="@/assets/images/program/img_program_thumbnail.png" alt="대학 로고이미지 예시" />
                          <v-btn icon size="small" variant="tonal" class="attach_delete" color="bgTransparency"
                            ><v-icon>mdi-window-close</v-icon></v-btn
                          >
                        </div>
                        -->
                        <p class="btn_like">
                          <input type="checkbox" id="programlike2" name="programlike" disabled />
                          <label for="programlike2">좋아요</label>
                        </p>
                        <div class="program_contents">
                          <div>
                            <span class="team_label">TEAM</span>
                            <p class="title">비교과 프로그램 안내 두줄까지</p>
                            <p class="capa">종합적 사고력ㆍ대인관계 내용 길어지면 말줄임표</p>
                            <ul class="info">
                              <li><strong>모집</strong>24/01/05 ~ 24/01/15 내용 길어지면 말줄임표</li>
                              <li><strong>운영</strong>24/01/05 ~ 24/01/15 내용 길어지면 말줄임표</li>
                              <li><strong>대상</strong>재학생 · 휴학생 내용 길어지면 말줄임표</li>
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
                      <div class="program_thumbbox">
                        <!-- 이미지 첨부해야할때 -->
                        <p class="attach_img">
                          <input type="file" id="input-file" />
                          <label for="input-file">서브 배너 홍보이미지를 등록해주세요</label>
                        </p>
                        <!-- 이미지 등록시 이곳 표출 :
                        <div class="img_wrap">
                          <img src="@/assets/images/program/img_program_thumbnail.png" alt="대학 로고이미지 예시" />
                          <v-btn icon size="small" variant="tonal" class="attach_delete" color="bgTransparency"
                            ><v-icon>mdi-window-close</v-icon></v-btn
                          >
                        </div>
                        -->
                        <p class="btn_like">
                          <input type="checkbox" id="programlike2" name="programlike" disabled />
                          <label for="programlike2">좋아요</label>
                        </p>
                        <div class="program_contents">
                          <div>
                            <span class="team_label">TEAM</span>
                            <p class="title">비교과 프로그램 안내 두줄까지</p>
                            <p class="capa">종합적 사고력ㆍ대인관계 내용 길어지면 말줄임표</p>
                            <ul class="info">
                              <li><strong>모집</strong>24/01/05 ~ 24/01/15 내용 길어지면 말줄임표</li>
                              <li><strong>운영</strong>24/01/05 ~ 24/01/15 내용 길어지면 말줄임표</li>
                              <li><strong>대상</strong>재학생 · 휴학생 내용 길어지면 말줄임표</li>
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
                <div class="d-flex justify-center pt-6">
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
                                  <img
                                    src="@/assets/images/program/img_program_thumbnail.png"
                                    alt="대학 로고이미지 예시"
                                  />
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
                                    <p class="title">비교과 프로그램 안내 두줄까지</p>
                                    <p class="capa">종합적 사고력ㆍ대인관계</p>
                                    <ul class="info">
                                      <li><strong>모집</strong>24/01/05 ~ 24/01/15</li>
                                      <li><strong>운영</strong>24/01/05 ~ 24/01/15</li>
                                      <li><strong>대상</strong>재학생 · 휴학생</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div class="program_thumbbox">
                                <div class="img_wrap">
                                  <img src="@/assets/images/program/img_program_thumbnail2.png" alt="비교과 이미지" />
                                </div>
                                <p class="btn_like">
                                  <input type="checkbox" id="programlike2" name="programlike" disabled />
                                  <label for="programlike2">좋아요</label>
                                </p>
                                <div class="program_contents">
                                  <div>
                                    <span class="team_label">TEAM</span>
                                    <p class="title">비교과 프로그램 안내 두줄까지</p>
                                    <p class="capa">종합적 사고력ㆍ대인관계 내용 길어지면 말줄임표</p>
                                    <ul class="info">
                                      <li><strong>모집</strong>24/01/05 ~ 24/01/15 내용 길어지면 말줄임표</li>
                                      <li><strong>운영</strong>24/01/05 ~ 24/01/15 내용 길어지면 말줄임표</li>
                                      <li><strong>대상</strong>재학생 · 휴학생 내용 길어지면 말줄임표</li>
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
                              <div class="program_thumbbox">
                                <div class="img_wrap">
                                  <img src="@/assets/images/program/img_program_thumbnail3.png" alt="비교과 이미지" />
                                </div>
                                <p class="btn_like">
                                  <input type="checkbox" id="programlike3" name="programlike" disabled />
                                  <label for="programlike3">좋아요</label>
                                </p>
                                <div class="program_contents">
                                  <div>
                                    <p class="title">
                                      비교과 프로그램 안내 두줄까지 비교과 프로그램 안내 두줄까지 길어지면 두줄까지
                                    </p>
                                    <p class="capa">종합적 사고력ㆍ대인관계</p>
                                    <ul class="info">
                                      <li><strong>모집</strong>24/01/05 ~ 24/01/15</li>
                                      <li><strong>운영</strong>24/01/05 ~ 24/01/15</li>
                                      <li><strong>대상</strong>재학생 · 휴학생</li>
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
                              <div class="program_thumbbox">
                                <div class="img_wrap">
                                  <img src="@/assets/images/program/img_program_thumbnail4.png" alt="비교과 이미지" />
                                </div>
                                <p class="btn_like">
                                  <input type="checkbox" id="programlike4" name="programlike" disabled />
                                  <label for="programlike4">좋아요</label>
                                </p>
                                <div class="program_contents">
                                  <div>
                                    <p class="title">비교과 프로그램 안내 두줄까지</p>
                                    <p class="capa">종합적 사고력ㆍ대인관계</p>
                                    <ul class="info">
                                      <li><strong>모집</strong>24/01/05 ~ 24/01/15</li>
                                      <li><strong>운영</strong>24/01/05 ~ 24/01/15</li>
                                      <li><strong>대상</strong>재학생 · 휴학생</li>
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
                              <div class="program_thumbbox">
                                <div class="img_wrap">
                                  <img src="@/assets/images/program/img_program_thumbnail5.png" alt="비교과 이미지" />
                                </div>
                                <p class="btn_like">
                                  <input type="checkbox" id="programlike4" name="programlike" disabled />
                                  <label for="programlike4">좋아요</label>
                                </p>
                                <div class="program_contents">
                                  <div>
                                    <p class="title">비교과 프로그램 안내 두줄까지</p>
                                    <p class="capa">종합적 사고력ㆍ대인관계</p>
                                    <ul class="info">
                                      <li><strong>모집</strong>24/01/05 ~ 24/01/15</li>
                                      <li><strong>운영</strong>24/01/05 ~ 24/01/15</li>
                                      <li><strong>대상</strong>재학생 · 휴학생</li>
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
                </div>
              </v-window-item>
              <v-window-item value="two">222</v-window-item>
              <v-window-item value="three">33333</v-window-item>
              <v-window-item value="four">44444</v-window-item>
            </v-window>
          </v-card-text>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  data: () => ({
    tab: null,
    dialog: false,
    title: "홍보이미지 등록",
    breadcrumbs: [
      { title: "비교과프로그램", disabled: false },
      { title: "홍보이미지 등록", disabled: false },
    ],
  }),
};
</script>
