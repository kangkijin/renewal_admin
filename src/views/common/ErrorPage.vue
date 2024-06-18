<template>
  <!-- <div class="d-flex justify-center align-center text-center h-100">
    <div>
      <img src="@/assets/images/base/errorimg.svg" width="500" alt="404" />
      <h1 class="text-h1 pt-3">Opps!!!</h1>
      <h4 class="text-h4 my-8">This page you are looking for could not be found.</h4>
      <v-btn flat color="primary" class="mb-4" to="/">Go Back to Home</v-btn>
    </div>
  </div> -->

  <div class="error_wrap">
    <div class="error_box">
      <p class="title">ERROR</p>
      <strong>요청하신 페이지를 찾을 수 없습니다.</strong>
      <p class="txt">
        사이트 이용에 불편을 드려 죄송합니다.<br />
        새로고침 &#40;F5&#41;키를 누르거나, 잠시 후에 다시 이용해 주십시오.
      </p>
      <router-link to="/">메인화면</router-link>
    </div>
  </div>
</template>
