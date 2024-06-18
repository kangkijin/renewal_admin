import type { App } from "vue";
import pinia from "../store";
import { cmmnStore } from "../store/cmmnStore";
import Swal from "sweetalert2";
import type { SweetAlertIcon } from "sweetalert2";
import StringUtil from "./stringUtil";
import type { TableServerOption } from "@/types/dataTable/EasyDataTableConfig";
import type { AxiosResponse } from "axios";
import type { deptTypes, stfTypes } from "@/types/cmmnTypes";
import axios from "axios";

export default {
  install: (app: App) => {
    /**
     * 로딩 공통 메서드 $loading
     * App.vue에 로딩 관련된 부분이 구현되어있다.
     * @show() : 로딩을 보여준다
     * @hide() : 로딩을 숨겨준다.
     */
    const getCmmnStore = cmmnStore(pinia);
    const loading = {
      show() {
        getCmmnStore.setLoadingState(true);
      },
      hide() {
        getCmmnStore.setLoadingState(false);
      },
    };
    app.config.globalProperties.$loading = loading;

    /**
     * 시스템 alert 대체용 $alert
     * @param text
     * 알림창 내부에 들어갈 내용
     * @param title
     * 알림창 header 쪽에 들어갈 내용, 기본 값 : '알림'
     */
    const alert = (_text: string, _title?: string, callback?: () => void) => {
      Swal.fire({
        title: (_title ?? "") === "" ? "알림" : _title,
        html: _text,
        confirmButtonColor: "#5D87FF",
        reverseButtons: true,
        confirmButtonText: "확인",
      }).then(() => {
        if (callback && typeof callback === "function") {
          callback();
        }
      });
    };
    app.config.globalProperties.$alert = alert;

    /**
     * 시스템 confirm 대체용 $confirm
     * @param text
     * 알림창 내부에 들어갈 내용
     * @param title
     * 알림창 header 쪽에 들어갈 내용, 기본 값 : '알림'
     */
    app.config.globalProperties.$confirm = (_text: string, _title: string, callback: Function) => {
      Swal.fire({
        title: (_title ?? "") === "" ? "알림" : _title,
        html: _text,
        confirmButtonColor: "#5D87FF",
        showCancelButton: true,
        cancelButtonColor: "#fff",
        reverseButtons: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((res) => {
        if (callback && typeof callback === "function") {
          callback(res.isConfirmed);
        }
      });
    };

    /**
     * Toast alert
     * @param _title
     * @param _icon
     * "success" | "error" | "warning" | "info" | "question"
     */
    app.config.globalProperties.$toast = (_title: string, _icon: SweetAlertIcon) => {
      const swalToast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      swalToast.fire({
        icon: _icon ?? "success",
        title: _title,
      });
    };

    /**
     * 정적 파일 다운로드 (public 폴더 내)
     * @param _path
     * 파일 경로
     * @param _fileNm
     * 다운로드 될 파일 이름 (기본 값 : 엑셀_업로드_양식)
     */
    app.config.globalProperties.$staticFileDownload = (_path: string, _fileNm?: string) => {
      const link = document.createElement("a");
      link.href = _path;
      const fileNm = StringUtil.isEmpty(_fileNm) ? "엑셀_업로드_양식" : _fileNm;
      link.download = `${fileNm}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    /** String Utility */
    app.config.globalProperties.$StringUtil = StringUtil;

    /**
     * 페이징처리, 배열->문자열 변환
     * @param _obj
     */
    app.config.globalProperties.$serial = (options: TableServerOption) => {
      const _obj = options;
      _obj.sortBy = Array.isArray(options.sortBy) ? options.sortBy.join() : options.sortBy;
      _obj.sortType = Array.isArray(options.sortType) ? options.sortType.join() : options.sortType;
      return _obj;
    };

    /**
     * 부서 조회
     * @param _deptDiv
     * 부서구분코드(C:대학, L: 계열, H: 학과, N: 일반)
     * @param _upDeptCd
     * 상위 부서 코드
     */
    app.config.globalProperties.$fnGetDeptList = (_deptDiv: string, _upDeptCd?: string) => {
      const searchParam = { deptDiv: _deptDiv, upDeptCd: _upDeptCd };
      let rtnArr: deptTypes[] = [];
      return new Promise((resolve, reject) => {
        loading.show();
        axios
          .get("/api/cmmn/getDeptList", { params: searchParam })
          .then((res: AxiosResponse) => {
            rtnArr = res.data.data;
            resolve(rtnArr);
          })
          .catch((e: any) => {
            console.error(e);
            reject(new Error("부서 조회에 실패했습니다."));
          })
          .finally(() => {
            loading.hide();
            return rtnArr;
          });
      });
    };

    /**
     * 교직원 조회
     * @param _stfDivCd
     * 교직원 구분코드
     * @param _stfPstnCd
     * 교직원 직책코드
     * @param _deptCd
     * 교직원 부서코드
     */
    app.config.globalProperties.$fnGetStfList = (_stfDivCd?: string, _stfPstnCd?: string, _deptCd?: string) => {
      const searchParam = { stfDivCd: _stfDivCd, stfPstnCd: _stfPstnCd, deptCd: _deptCd };
      let rtnArr: stfTypes[] = [];
      return new Promise((resolve, reject) => {
        loading.show();
        axios
          .get("/api/cmmn/getStfList", { params: searchParam })
          .then((res: AxiosResponse) => {
            rtnArr = res.data.data;
            resolve(rtnArr);
          })
          .catch((e: any) => {
            console.error(e);
            reject(new Error("교직원 조회에 실패했습니다."));
          })
          .finally(() => {
            loading.hide();
            return rtnArr;
          });
      });
    };
  },
};
