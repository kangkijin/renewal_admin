<template>
  <v-menu :close-on-content-click="false" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon variant="text" color="primary" v-bind="props">
        <v-avatar size="22">
          <img
            v-if="$i18n.locale === 'ko'"
            :src="flagKR"
            :alt="$i18n.locale"
            width="22"
            height="22"
            class="obj-cover"
          />
          <img
            v-else-if="$i18n.locale === 'en'"
            :src="flagEN"
            :alt="$i18n.locale"
            width="22"
            height="22"
            class="obj-cover"
          />
          <img
            v-else-if="$i18n.locale === 'zh'"
            :src="flagZH"
            :alt="$i18n.locale"
            width="22"
            height="22"
            class="obj-cover"
          />
          <img
            v-else-if="$i18n.locale === 'vi'"
            :src="flagVN"
            :alt="$i18n.locale"
            width="22"
            height="22"
            class="obj-cover"
          />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="200" elevation="10">
      <v-list class="theme-list">
        <v-list-item
          v-for="(item, index) in languageInfo"
          :key="index"
          :active="$i18n.locale == item.value"
          class="d-flex align-center"
          @click="() => ($i18n.locale = item.value)"
        >
          <template v-slot:prepend>
            <v-avatar class="mr-2" size="22">
              <img :src="item.img" :alt="item.img" width="22" height="22" class="obj-cover" />
            </v-avatar>
          </template>
          <v-list-item-title class="text-subtitle-1 font-weight-regular">
            {{ item.title }}
            <span class="text-disabled text-subtitle-1 pl-2">({{ item.subTitle }})</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-menu>
</template>

<script setup lang="ts">
import flagKR from "@/assets/images/flag/icon-flag-kr.svg";
import flagEN from "@/assets/images/flag/icon-flag-en.svg";
import flagZH from "@/assets/images/flag/icon-flag-zh.svg";
import flagVN from "@/assets/images/flag/icon-flag-vn.svg";

import type { languageType } from "@/types/layoutTypes/HeaderTypes";
const languageInfo: languageType[] = [
  { title: "한국어", subTitle: "Korean", value: "ko", img: flagKR },
  { title: "English", subTitle: "UK", value: "en", img: flagEN },
  { title: "中国人", subTitle: "Chinese", value: "zh", img: flagZH },
  { title: "Tiếng Việt", subTitle: "Vietnamese", value: "vi", img: flagVN },
];
</script>
