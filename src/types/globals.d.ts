import { SweetAlertIcon } from "sweetalert2";
import axios from "axios";
import type { TableServerOption } from "./dataTable/EasyDataTableConfig";
import type { deptTypes, stfTypes } from "@/types/cmmnTypes";


declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: typeof axios;

    $loading: {
      show(): void;
      hide(): void;
    };

    $alert: (_text: string, _title?: string, callback?: () => void) => void;

    $confirm: (_text: string, _title: string, callback: (confirmed: boolean) => void) => void;

    $toast: (_title: string, _icon: SweetAlertIcon) => void;

    $format: {
      numberWithComma(value: number): string;
    };

    $staticFileDownload: (_path: string, _fileNm?: string) => void;

    $StringUtil: {
      isEmpty(item?: string): boolean;
      r2StringToJsonArr: (r2String: string[][], mapper: string[]) => Array<Record<string, string>>;
    };

    $serial: (options: TableServerOption) => TableServerOption;

    $fnGetDeptList: (_deptDiv: string, _upDeptCd?: string) => deptTypes[];

    $fnGetStfList: (_stfDivCd: string, _stfPstnCd?: string, _deptCd?: string) => stfTypes[];
  }
}

declare global {
  type ynTypes = "Y" | "N" | null;
}
