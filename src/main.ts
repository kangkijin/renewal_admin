import App from "./App.vue";
import { createApp } from "vue";

import vuetify from "@/plugins/vuetify";
import dainAxios from "@/plugins/axios";
import pinia from "@/store";
import router from "@/router";
import global from "./plugins/global";

import "@/scss/components/_Sweetalert.scss";

import { createI18n } from "vue-i18n";
import messages from "@/i18n/messages";
import PerfectScrollbar from "vue3-perfect-scrollbar";

const i18n = createI18n({
  locale: "ko", // default locale
  messages: messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
});

import CKEditor from "@ckeditor/ckeditor5-vue";

import BaseBreadcrumb from "@/components/base/BaseBreadcrumb.vue";
import BaseCard from "@/components/base/BaseCard.vue";
import BaseTableConfig from "./components/base/BaseTableConfig.vue";

import VDateInput from "@/components/common/VDateInput.vue";
import VTimeInput from "@/components/common/VTimeInput.vue";
import easyDataTable from "@/plugins/easyDataTable";

import "@/scss/style.scss";

// eslint-disable-next-line prettier/prettier
createApp(App).use(vuetify).use(dainAxios).use(pinia).use(router).use(global).use(PerfectScrollbar).use(i18n).use(CKEditor).component("VEasyTable",easyDataTable).component("BaseBreadcrumb", BaseBreadcrumb).component("BaseCard", BaseCard).component("BaseTableConfig", BaseTableConfig).component("VDateInput", VDateInput).component("VTimeInput", VTimeInput).mount("#app");
