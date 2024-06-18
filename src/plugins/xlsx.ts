// https://github.com/exceljs/exceljs
import ExcelJs from "exceljs";

type Header = {
  /** 엑셀 헤더 명 */
  header: string;
  /** 헤더와 데이터가 매핑될 키 */
  key: string;
  /** 엑셀 너비 */
  width?: number;
  /** 데이터 필수값 여부 */
  required?: boolean;
  /** 데이터 유효범위 (required = true 일때만 동작한다.) */
  chkEnum?: string[];
};
type Item = Record<string, any>;

// TODO excel download history 쌓기
/**
 * 엑셀 다운로드
 */
const excelDown = (headers: Header[], item: Item[], fileNm: string) => {
  const wb = new ExcelJs.Workbook();
  const ws = wb.addWorksheet("sheet1");
  ws.columns = headers;
  ws.insertRows(2, item);

  // Header style 설정
  ws.getRow(1).font = { bold: true };
  ws.getRow(1).alignment = { vertical: "middle", horizontal: "center" };
  ws.getRow(1).eachCell({ includeEmpty: false }, (cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "e6f0fe" },
    };
  });

  wb.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data]);
    let url = window.URL.createObjectURL(blob);

    let elem = document.createElement("a");
    elem.href = url;
    elem.download = `${fileNm}.xlsx`;
    elem.click();
    elem.remove();
  });
};

export { excelDown };
export type { Header, Item };
