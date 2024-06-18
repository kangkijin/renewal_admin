import EasyDataTable from "vue3-easy-data-table";
import "@/assets/css/easy_data_table/style.css";
import tableConfig from "@/types/dataTable/EasyDataTableConfig";

/**
 * DOCS: https://hc200ok.github.io/vue3-easy-data-table-doc/getting-started.html
 * EasyDataTable Default 세팅
 *
 * 해당 default 값을 config에 따로 설정해서 가져오는 이유는
 * 각 페이지 컴포넌트의 테이블 ref에서 꺼내오는 시점이 onMounted 시점이다.
 * 페이지를 구성할 땐 데이터가 존재하지 않기 때문에 불러와지지 않는다.
 * 따라서 따로 config를 지정하여 거기서 기본 값은 꺼내온다.
 */

EasyDataTable.props.rowsPerPageMessage.default = "개 씩 보기";
EasyDataTable.props.emptyMessage.default = tableConfig.emptyMessage;
EasyDataTable.props.rowsPerPage.default = tableConfig.rowsPerPage.value;
EasyDataTable.props.rowsItems.default = tableConfig.rowsItems.map((item) => item.value);
EasyDataTable.props.hideRowsPerPage.default = tableConfig.hideRowsPerPage;
EasyDataTable.props.headerTextDirection.default = tableConfig.headerTextDirection;
EasyDataTable.props.bodyTextDirection.default = tableConfig.bodyTextDirection;
EasyDataTable.props.buttonsPagination.default = tableConfig.buttonsPagination;
EasyDataTable.props.borderCell.default = tableConfig.borderCell;
EasyDataTable.props.themeColor.default = tableConfig.themeColor;

export default EasyDataTable;
