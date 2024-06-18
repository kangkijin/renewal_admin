import { createVuetify } from "vuetify";

import "@mdi/font/css/materialdesignicons.css";
import * as directives from "vuetify/directives";

import { BLUE_THEME } from "@/theme/LightTheme";
import { DARK_BLUE_THEME } from "@/theme/DarkTheme";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  directives,
  theme: {
    defaultTheme: "BLUE_THEME",
    themes: {
      BLUE_THEME,
      DARK_BLUE_THEME,
    },
  },
  defaults: {
    VCard: {
      rounded: "md",
    },
    VTextField: {
      variant: "outlined",
      density: "compact",
      color: "primary",
      hideDetails: "true",
      // 공통으로 hideSpinBUttons를 활성화 할 시 type="number"가 아닌 모든 곳에서 warning 발생
      // hideSpinButtons: "true",
    },
    VTextarea: {
      variant: "outlined",
      density: "comfortable",
      color: "primary",
    },
    VSelect: {
      variant: "outlined",
      density: "compact",
      color: "primary",
      hideDetails: "true",
    },
    VListItem: {
      minHeight: "45px",
    },
    VTooltip: {
      location: "top",
      activator: "parent",
    },
    VBtn: {
      variant: "outlined",
    },
    VAutocomplete: {
      variant: "outlined",
      density: "compact",
      hideDetails: "true",
      noDataText: "입력하신 내용이 없습니다.",
    },
    VCombobox: {
      variant: "outlined",
      density: "compact",
      hideDetails: "true",
      bgColor: "default",
    },
    VDivider: {
      class: "border-opacity-100",
    },
    VCheckbox: {
      color: "primary",
      hideDetails: "true",
      density: "compact",
    },
    VRadio: {
      color: "primary",
      hideDetails: "true",
      density: "compact",
    },
    VRadioGroup: {
      color: "primary",
      hideDetails: "true",
    },
    VSnackbar: {
      timeout: "2000",
      location: "top",
      minHeight: "80",
    },
    VTabs: {
      color: "white",
    },
    VSwitch: {
      hideDetails: "true",
      inset: "true",
      class: "toggle_switch",
    },
    VFileInput: {
      density: "compact",
      variant: "outlined",
    },
    VDialog: {
      scrollable: "true",
    },
  },
});
