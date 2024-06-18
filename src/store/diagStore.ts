// Common
import { defineStore } from "pinia";

export const diagStore = defineStore("diag", {
  state: () => ({
    /** 진단지 질문 입력 폼 */
    qusform: {
      title: "",
      subTitle: "",
      qusImg: "",
      qusScore: 0,
      ansScoreYn: false,
      blankYn: false,
      ansInfo: [
        { title: "", ansImg: "", ansScore: null },
        { title: "", ansImg: "", ansScore: null },
      ],
      ansAnswer: "",
      multiAnsYn: false,
    },
  }),
  actions: {},
  getters: {
    getQusformState(state) {
      return state.qusform;
    },
  },
});

// Store 타입 정의
type DiagStore = ReturnType<typeof diagStore>;

export function useDiagStore(): DiagStore {
  return diagStore();
}
