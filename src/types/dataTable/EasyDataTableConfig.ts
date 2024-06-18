interface RowPerPageItem {
  title: string;
  value: number;
}

export type TableConfigProps = {
  emptyMessage: string;
  rowsPerPage: RowPerPageItem;
  rowsItems: RowPerPageItem[];
  hideRowsPerPage: boolean;
  headerTextDirection: string;
  bodyTextDirection: string;
  buttonsPagination: boolean;
  borderCell: boolean;
  themeColor?: string;
};

export interface TableServerOption {
  page: number;
  rowsPerPage: number;
  sortBy: string[] | string;
  sortType: string[] | string;
  totalCount: number;
}

import { BLUE_THEME } from "@/theme/LightTheme";

const tableConfig: TableConfigProps = {
  emptyMessage: "내용이 없습니다",
  rowsPerPage: { title: "10개씩 보기", value: 10 }, // rowsItems[0]
  rowsItems: [
    { title: "10개씩 보기", value: 10 },
    { title: "50개씩 보기", value: 50 },
    { title: "100개씩 보기", value: 100 },
  ],
  hideRowsPerPage: true,
  headerTextDirection: "center",
  bodyTextDirection: "center",
  buttonsPagination: true,
  borderCell: true,
  themeColor: BLUE_THEME.colors.info,
};

export default tableConfig;
