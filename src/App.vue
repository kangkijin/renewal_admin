<template>
  <router-view></router-view>

  <!-- loading 사이즈 :
    전체, 테이블리스트 102px
    대부분, 썸네일 72px
    파일첨부, 300px 이하 박스 34px
  -->
  <v-overlay class="overlay_main" persistent :model-value="isLoading">
    <img src="@/assets/images/base/loading.svg" alt="loading.." />
  </v-overlay>
</template>

<script lang="ts">
import { cmmnStore } from "@/store/cmmnStore";
export default {
  data: () => ({
    store: cmmnStore(),
  }),
  computed: {
    isLoading() {
      return this.store.getLoadingState;
    },
  },
};
</script>
