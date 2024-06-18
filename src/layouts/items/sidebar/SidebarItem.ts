export interface menu {
  key?: string;
  order?: number;
  text: string;
  path?: string;
  children?: menu[];
  chip?: string;
  chipColor?: string;
  chipBgColor?: string;
}

const sidebarItem: menu[] = [
  {
    key: "menu000001",
    order: 1,
    text: "UI Guide",
    path: "/",
    children: [
      {
        order: 1,
        key: "menu000021",
        text: "Overview",
        path: "/guide/home",
        chip: "new",
        chipColor: "accent",
      },
      {
        order: 2,
        key: "menu000022",
        text: "List",
        children: [
          { order: 1, key: "menu000023", path: "/guide/list", text: "ListBasic" },
          { order: 2, key: "menu000024", path: "/guide/list2", text: "ListSCR" },
          { order: 3, key: "menu000025", path: "/guide/list3", text: "ListTD" },
        ],
      },
      {
        order: 3,
        key: "menu000026",
        text: "Detail",
        children: [
          { order: 1, key: "menu000027", path: "/guide/detail", text: "DetailTab" },
          { order: 2, key: "menu000028", path: "/guide/detail2", text: "DetailDialog" },
          { order: 3, key: "menu000029", path: "/guide/detail3", text: "DetailTable" },
        ],
      },
      {
        order: 4,
        key: "menu0000030",
        text: "tree",
        children: [
          { order: 1, key: "menu0000031", path: "/guide/tree1", text: "roleByMenu" },
          { order: 2, key: "menu0000032", path: "/guide/tree2", text: "menuByRole" },
        ],
      },
      {
        order: 5,
        key: "menu0000000",
        text: "비교과 레이아웃",
        children: [{ order: 1, key: "menu0000000", path: "/guide/promoReg", text: "홍보이미지 등록" }],
      },
    ],
  },
  {
    key: "menu0000033",
    order: 2,
    text: "시스템관리",
    children: [
      {
        order: 1,
        key: "menu0000034",
        text: "관리자권한",
        children: [
          { order: 1, key: "menu0000035", path: "/admin/sysMng/adminPerm/clientMng", text: "사용자관리" },
          { order: 2, key: "menu0000036", path: "/admin/sysMng/adminPerm/permMng", text: "권한관리" },
        ],
      },
      {
        order: 2,
        key: "menu0000037",
        text: "이력조회",
        children: [
          { order: 1, key: "menu0000038", path: "/admin/sysMng/hisSrch/loginHisSrch", text: "로그인 기록조회" },
          { order: 2, key: "menu0000039", path: "/admin/sysMng/hisSrch/menuUseHisSrch", text: "메뉴 사용 기록조회" },
          { order: 3, key: "menu0000040", path: "/admin/sysMng/hisSrch/permGrntHisSrch", text: "권한 부여 이력조회" },
          { order: 4, key: "menu0000041", path: "/admin/sysMng/hisSrch/sqlLogHisSrch", text: "SQL 로그조회" },
        ],
      },
      {
        order: 3,
        key: "menu0000042",
        text: "외부인관리",
        children: [
          { order: 1, key: "menu0000043", path: "/admin/sysMng/otsdrMng/otsdrMemberMng", text: "외부인회원관리" },
        ],
      },
    ],
  },
  {
    key: "menu0000044",
    order: 3,
    text: "중도탈락방지",
    children: [
      {
        order: 1,
        key: "menu000189",
        text: "중도탈락기준관리",
        children: [
          {
            order: 1,
            key: "menu0000045",
            path: "/admin/prvntDrpt/prvntDrptStnrdMng/prvntDrptStnrdReg",
            text: "요인 및 기준 등록",
          },
        ],
      },
      {
        order: 2,
        key: "menu0000046",
        text: "중도탈락 통계",
        children: [
          { order: 1, key: "menu0000047", path: "/admin/prvntDrpt/prvntDrptStat/pstvFctrStat", text: "긍정요인 통계" },
          { order: 2, key: "menu0000048", path: "/admin/prvntDrpt/prvntDrptStat/ngtvFctrStat", text: "부정요인 통계" },
        ],
      },
    ],
  },

  {
    key: "menu0000049",
    order: 4,
    text: "진단·조사·시험",
    children: [
      {
        order: 1,
        key: "menu000190",
        text: "역량 코드 관리",
        children: [
          {
            order: 1,
            key: "menu0000050",
            path: "/admin/diagRschExam/abilityCdMng/coreAblitiyCdReg",
            text: "핵심역량코드",
          },
          {
            order: 2,
            key: "menu0000051",
            path: "/admin/diagRschExam/abilityCdMng/majorAblitiyCdReg",
            text: "전공능력코드",
          },
          {
            order: 3,
            key: "menu0000052",
            path: "/admin/diagRschExam/abilityCdMng/profAblitiyCdReg",
            text: "교수역량코드",
          },
        ],
      },
      {
        order: 3,
        key: "menu0000055",
        text: "핵심역량진단",
        children: [
          {
            order: 0,
            key: "menu0000057",
            path: "/admin/diagRschExam/coreAbilityDiag/coreDiagPaperReg",
            text: "문항등록ㆍ진단지생성",
          },
          {
            order: 1,
            key: "menu0000058",
            path: "/admin/diagRschExam/coreAbilityDiag/coreDiagPlan",
            text: "실시계획수립",
          },
          {
            order: 2,
            key: "menu0000059",
            path: "/admin/diagRschExam/coreAbilityDiag/coreDiagStat",
            text: "결과 · 통계",
          },
        ],
      },
      {
        order: 4,
        key: "menu0000060",
        text: "전공능력진단",
        path: "/",
        children: [
          {
            order: 0,
            key: "menu0000061",
            path: "/admin/diagRschExam/majorAbilityDiag/majorDiagPaperReg",
            text: "문항등록ㆍ진단지생성",
          },
          {
            order: 1,
            key: "menu0000063",
            path: "/admin/diagRschExam/majorAbilityDiag/majorDiagPlan",
            text: "실시계획수립",
          },
          {
            order: 2,
            key: "menu0000064",
            path: "/admin/diagRschExam/majorAbilityDiag/majorDiagStat",
            text: "결과 · 통계",
          },
        ],
      },
      {
        order: 5,
        key: "menu0000065",
        text: "교수역량진단",
        children: [
          {
            order: 0,
            key: "menu0000067",
            path: "/admin/diagRschExam/profAbilityDiag/profDiagPaperReg",
            text: "문항등록ㆍ진단지생성",
          },
          {
            order: 1,
            key: "menu0000068",
            path: "/admin/diagRschExam/profAbilityDiag/profDiagPlan",
            text: "실시계획수립",
          },
          {
            order: 2,
            key: "menu0000069",
            path: "/admin/diagRschExam/profAbilityDiag/profDiagStat",
            text: "결과 · 통계",
          },
        ],
      },
      {
        order: 6,
        key: "menu0000070",
        text: "설문조사",
        children: [
          {
            order: 0,
            key: "menu0000071",
            path: "/admin/diagRschExam/surveyRsch/surveyRschPaperReg",
            text: "문항등록ㆍ조사지생성",
          },
          { order: 1, key: "menu0000073", path: "/admin/diagRschExam/surveyRsch/surveyRschPlan", text: "실시계획수립" },
          { order: 2, key: "menu0000074", path: "/admin/diagRschExam/surveyRsch/surveyRschStat", text: "결과 · 통계" },
        ],
      },
      {
        order: 7,
        key: "menu0000075",
        text: "만족도조사",
        children: [
          {
            order: 0,
            key: "menu0000076",
            path: "/admin/diagRschExam/satisRsch/satisRschPaperReg",
            text: "문항등록ㆍ조사지생성",
          },
          { order: 1, key: "menu0000078", path: "/admin/diagRschExam/satisRsch/satisRschPlan", text: "실시계획수립" },
          { order: 2, key: "menu0000079", path: "/admin/diagRschExam/satisRsch/satisRschStat", text: "결과 · 통계" },
        ],
      },
      {
        order: 8,
        key: "menu0000080",
        text: "시험",
        children: [
          {
            order: 0,
            key: "menu0000081",
            path: "/admin/diagRschExam/examination/examDiagPaperReg",
            text: "문항등록ㆍ시험지생성",
          },
          { order: 1, key: "menu0000083", path: "/admin/diagRschExam/examination/examDiagPlan", text: "실시계획수립" },
          { order: 2, key: "menu0000084", path: "/admin/diagRschExam/examination/examDiagStat", text: "결과 · 통계" },
        ],
      },
    ],
  },
  {
    key: "menu0000191",
    order: 4.5,
    text: "전문상담",
    children: [
      {
        order: 1,
        key: "menu0000192",
        text: "상담사관리",
        children: [
          { order: 1, key: "menu0000193", path: "/admin/prfsnCnsl/cnslrMng/psychCnsl/psychCnsl", text: "심리상담" },
          { order: 2, key: "menu0000194", path: "/admin/prfsnCnsl/cnslrMng/employCnsl/employCnsl", text: "취업상담" },
          { order: 3, key: "menu0000195", path: "/admin/prfsnCnsl/cnslrMng/learnCsnl/learnCsnl", text: "학습상담" },
          { order: 4, key: "menu0000196", path: "/admin/prfsnCnsl/cnslrMng/writeCnsl/writeCnsl", text: "글쓰기상담" },
        ],
      },
      {
        order: 2,
        key: "menu0000197",
        text: "상담통계관리",
        children: [
          {
            order: 1,
            key: "menu0000198",
            path: "/admin/prfsnCnsl/cnslStatMng/temp/temp",
            text: "상담구분별 상담사별 통계",
          },
        ],
      },
    ],
  },
  {
    key: "menu0000085",
    order: 5,
    text: "비교과프로그램",
    path: "/",
    children: [
      {
        order: 1,
        key: "menu000191",
        text: "홍보프로그램 관리",
        path: "/",
        children: [
          {
            order: 1,
            key: "menu0000086",
            path: "/admin/extraCurricularProgram/promoProgMng/promoProgSetup",
            text: "홍보프로그램 설정",
          },
          {
            order: 2,
            key: "menu0000087",
            path: "/admin/extraCurricularProgram/promoProgMng/promoImgReg",
            text: "홍보이미지 등록",
          },
        ],
      },
      {
        order: 2,
        key: "menu0000088",
        text: "지도교수 설정",
        children: [
          {
            order: 1,
            key: "menu0000089",
            path: "/admin/extraCurricularProgram/guideProfSetup/guideProfSetupMng",
            text: "지도교수 설정관리",
          },
        ],
      },
      {
        order: 3,
        key: "menu0000098",
        text: "비교과 프로그램(학생)",
        children: [
          {
            order: 1,
            key: "menu0000099",
            path: "/admin/extraCurricularProgram/userEcp/userCategoryMng",
            text: "카테고리 관리",
          },
          {
            order: 2,
            key: "menu0000100",
            path: "/admin/extraCurricularProgram/userEcp/userCurriMng",
            text: "과정 관리",
          },
          {
            order: 3,
            key: "menu0000101",
            path: "/admin/extraCurricularProgram/userEcp/userPeriodMng",
            text: "차수 관리",
          },
          {
            order: 4,
            key: "menu0000102",
            path: "/admin/extraCurricularProgram/userEcp/userPeriodAprv",
            text: "차수 승인",
          },
          {
            order: 5,
            key: "menu0000103",
            path: "/admin/extraCurricularProgram/userEcp/userPeriodOprt",
            text: "차수 운영",
          },
          {
            order: 6,
            key: "menu0000104",
            path: "/admin/extraCurricularProgram/userEcp/userCurriCqi",
            text: "과정 CQI",
          },
          { order: 7, key: "menu0000105", path: "/admin/extraCurricularProgram/userEcp/userDeptCqi", text: "부서 CQI" },
          {
            order: 8,
            key: "menu0000106",
            path: "/admin/extraCurricularProgram/userEcp/userColgHqCqi",
            text: "대학본부 CQI",
          },
        ],
      },
      {
        order: 4,
        key: "menu0000107",
        text: "비교과 프로그램(교수)",
        children: [
          {
            order: 1,
            key: "menu0000108",
            path: "/admin/extraCurricularProgram/profEcp/profCategoryMng",
            text: "카테고리 관리",
          },
          {
            order: 2,
            key: "menu0000109",
            path: "/admin/extraCurricularProgram/profEcp/profCurriMng",
            text: "과정 관리",
          },
          {
            order: 3,
            key: "menu0000110",
            path: "/admin/extraCurricularProgram/profEcp/profPeriodMng",
            text: "차수 관리",
          },
          {
            order: 4,
            key: "menu0000111",
            path: "/admin/extraCurricularProgram/profEcp/profPeriodAprv",
            text: "차수 승인",
          },
          {
            order: 5,
            key: "menu0000112",
            path: "/admin/extraCurricularProgram/profEcp/profPeriodOprt",
            text: "차수 운영",
          },
          {
            order: 6,
            key: "menu0000113",
            path: "/admin/extraCurricularProgram/profEcp/profCurriCqi",
            text: "과정 CQI",
          },
          { order: 7, key: "menu0000114", path: "/admin/extraCurricularProgram/profEcp/profDeptCqi", text: "부서 CQI" },
          {
            order: 8,
            key: "menu0000115",
            path: "/admin/extraCurricularProgram/profEcp/profColgHqCqi",
            text: "대학본부 CQI",
          },
        ],
      },
      {
        order: 5,
        key: "menu0000116",
        text: "비교과 프로그램(직원)",
        children: [
          {
            order: 1,
            key: "menu0000117",
            path: "/admin/extraCurricularProgram/stfEcp/stfCategoryMng",
            text: "카테고리 관리",
          },
          { order: 2, key: "menu0000118", path: "/admin/extraCurricularProgram/stfEcp/stfCurriMng", text: "과정 관리" },
          {
            order: 3,
            key: "menu0000119",
            path: "/admin/extraCurricularProgram/stfEcp/stfPeriodMng",
            text: "차수 관리",
          },
          {
            order: 4,
            key: "menu0000120",
            path: "/admin/extraCurricularProgram/stfEcp/stfPeriodAprv",
            text: "차수 승인",
          },
          {
            order: 5,
            key: "menu0000121",
            path: "/admin/extraCurricularProgram/stfEcp/stfPeriodOprt",
            text: "차수 운영",
          },
          { order: 6, key: "menu0000122", path: "/admin/extraCurricularProgram/stfEcp/stfCurriCqi", text: "과정 CQI" },
          { order: 7, key: "menu0000123", path: "/admin/extraCurricularProgram/stfEcp/stfDeptCqi", text: "부서 CQI" },
          {
            order: 8,
            key: "menu0000124",
            path: "/admin/extraCurricularProgram/stfEcp/stfColgHqCqi",
            text: "대학본부 CQI",
          },
        ],
      },
      {
        order: 6,
        key: "menu0000125",
        text: "비교과 프로그램(외부인)",
        children: [
          {
            order: 1,
            key: "menu0000126",
            path: "/admin/extraCurricularProgram/otsdrEcp/otsdrCategoryMng",
            text: "카테고리 관리",
          },
          {
            order: 2,
            key: "menu0000127",
            path: "/admin/extraCurricularProgram/otsdrEcp/otsdrCurriMng",
            text: "과정 관리",
          },
          {
            order: 3,
            key: "menu0000128",
            path: "/admin/extraCurricularProgram/otsdrEcp/otsdrPeriodMng",
            text: "차수 관리",
          },
          {
            order: 4,
            key: "menu0000129",
            path: "/admin/extraCurricularProgram/otsdrEcp/otsdrPeriodAprv",
            text: "차수 승인",
          },
          {
            order: 5,
            key: "menu0000130",
            path: "/admin/extraCurricularProgram/otsdrEcp/otsdrPeriodOprt",
            text: "차수 운영",
          },
          {
            order: 6,
            key: "menu0000131",
            path: "/admin/extraCurricularProgram/otsdrEcp/otsdrCurriCqi",
            text: "과정 CQI",
          },
          {
            order: 7,
            key: "menu0000132",
            path: "/admin/extraCurricularProgram/otsdrEcp/otsdrDeptCqi",
            text: "부서 CQI",
          },
          {
            order: 8,
            key: "menu0000133",
            path: "/admin/extraCurricularProgram/otsdrEcp/otsdrColgHqCqi",
            text: "대학본부 CQI",
          },
        ],
      },
    ],
  },
  {
    key: "menu0000134",
    order: 6,
    text: "진로 · 취업",
    children: [
      {
        order: 1,
        key: "menu0000135",
        text: "진로설계",
        children: [
          {
            order: 1,
            key: "menu0000136",
            path: "/admin/careerEmploy/careerDesign/hakguaCareerDesign",
            text: "학과별 진로설계",
          },
        ],
      },
      {
        order: 2,
        key: "menu0000137",
        text: "취업스펙",
        children: [
          {
            order: 1,
            key: "menu0000138",
            path: "/admin/careerEmploy/employSpec/employUserInfoReg",
            text: "취업생 정보 등록",
          },
          {
            order: 2,
            key: "menu0000139",
            path: "/admin/careerEmploy/employSpec/userRegInfoSrch",
            text: "재학생 등록정보 조회",
          },
        ],
      },
      {
        order: 3,
        key: "menu0000139",
        text: "취업정보",
        children: [
          { order: 1, key: "menu0000140", path: "/admin/careerEmploy/employInfo/rcmdRecrt", text: "추천 채용" },
          { order: 2, key: "menu0000141", path: "/admin/careerEmploy/employInfo/outsideRecrt", text: "교외 채용" },
          { order: 3, key: "menu0000142", path: "/admin/careerEmploy/employInfo/insideRecrt", text: "교내 채용" },
          {
            order: 4,
            key: "menu0000143",
            path: "/admin/careerEmploy/employInfo/foreignWorker",
            text: "Foreign Worker",
          },
        ],
      },
      {
        order: 4,
        key: "menu0000144",
        text: "대학취업률 관리",
        children: [
          {
            order: 1,
            key: "menu0000145",
            path: "/admin/careerEmploy/colgEmployRatioMng/hakguaNmHisMng",
            text: "학과명 이력 관리",
          },
          {
            order: 2,
            key: "menu0000146",
            path: "/admin/careerEmploy/colgEmployRatioMng/goalEmployRatioMng",
            text: "목표 취업률 관리",
          },
          {
            order: 3,
            key: "menu0000147",
            path: "/admin/careerEmploy/colgEmployRatioMng/corpInfoMng",
            text: "기업정보 관리",
          },
          {
            order: 4,
            key: "menu0000148",
            path: "/admin/careerEmploy/colgEmployRatioMng/grdtEmployMng",
            text: "졸업생 취업 관리",
          },
          {
            order: 5,
            key: "menu0000149",
            path: "/admin/careerEmploy/colgEmployRatioMng/grdtEmployCorpMng",
            text: "졸업생 취업처 관리",
          },
        ],
      },
      {
        order: 5,
        key: "menu0000150",
        text: "KEDI 취업통계 조회",
        children: [
          {
            order: 1,
            key: "menu0000151",
            path: "/admin/careerEmploy/kediEmployStatSrch/danguaEmployRatio",
            text: "단과대학별 취업률",
          },
          {
            order: 2,
            key: "menu0000152",
            path: "/admin/careerEmploy/kediEmployStatSrch/hakguaEmployRatio",
            text: "학과별 취업률",
          },
          {
            order: 3,
            key: "menu0000153",
            path: "/admin/careerEmploy/kediEmployStatSrch/categoryEmployRatio",
            text: "항목별 취업률",
          },
          {
            order: 4,
            key: "menu0000154",
            path: "/admin/careerEmploy/kediEmployStatSrch/totalEmployRatio",
            text: "전체 취업률",
          },
        ],
      },
      {
        order: 6,
        key: "menu0000155",
        text: "정보공시 취업통계",
        children: [
          {
            order: 1,
            key: "menu0000156",
            path: "/admin/careerEmploy/dsclsEmployStat/yearEmployStat",
            text: "연도별 취업통계",
          },
          {
            order: 2,
            key: "menu0000157",
            path: "/admin/careerEmploy/dsclsEmployStat/grdtEmployStat",
            text: "졸업생 취업통계",
          },
          {
            order: 3,
            key: "menu0000158",
            path: "/admin/careerEmploy/dsclsEmployStat/comptColgEmployRatio",
            text: "경쟁 대학별 취업률",
          },
        ],
      },
    ],
  },
  {
    key: "menu0000159",
    order: 7,
    text: "대학인증",
    children: [
      {
        order: 1,
        key: "menu0000160",
        text: "마일리지",
        children: [
          { order: 1, key: "menu0000161", path: "/admin/colgCerti/mileage/scoreTableMng", text: "배점표 관리" },
          {
            order: 2,
            key: "menu0000162",
            path: "/admin/colgCerti/mileage/mileageAcqState",
            text: "마일리지 취득 현황(학생별)",
          },
        ],
      },
      {
        order: 2,
        key: "menu0000163",
        text: "졸업 인증제",
        children: [
          { order: 1, key: "menu0000164", path: "/admin/colgCerti/grdtCertiSys/grdtStndrSetup", text: "기준 설정" },
          { order: 2, key: "menu0000165", path: "/admin/colgCerti/grdtCertiSys/grdtAcqState", text: "취득 현황" },
        ],
      },
      {
        order: 3,
        key: "menu0000166",
        text: "역량 인증제",
        children: [
          {
            order: 1,
            key: "menu0000167",
            path: "/admin/colgCerti/abilityCertiSys/abilityStndrSetup",
            text: "기준 설정",
          },
          { order: 2, key: "menu0000168", path: "/admin/colgCerti/abilityCertiSys/abilityAcqState", text: "취득 현황" },
        ],
      },
      {
        order: 4,
        key: "menu0000169",
        text: "교과 인증제",
        children: [
          {
            order: 1,
            key: "menu0000170",
            path: "/admin/colgCerti/sbjtCertiSys/microSbjtStnrdSetup",
            text: "교과 및 기준 설정(마이크로디그리)",
          },
          {
            order: 2,
            key: "menu0000171",
            path: "/admin/colgCerti/sbjtCertiSys/microCertiState",
            text: "인증 현황(마이크로디그리)",
          },
          {
            order: 3,
            key: "menu0000172",
            path: "/admin/colgCerti/sbjtCertiSys/nurseSbjtStnrdSetup",
            text: "교과 및 기준 설정(간호PO)",
          },
          {
            order: 4,
            key: "menu0000173",
            path: "/admin/colgCerti/sbjtCertiSys/nurseCertiState",
            text: "인증 현황(간호PO)",
          },
        ],
      },
    ],
  },
  {
    key: "menu0000174",
    order: 8,
    text: "커뮤니케이션",
    children: [
      {
        order: 1,
        key: "menu0000175",
        text: "공지사항",
        children: [
          { order: 1, key: "menu0000176", path: "/admin/communication/notice/noticeMng", text: "공지사항 관리" },
        ],
      },
      {
        order: 2,
        key: "menu0000177",
        text: "FAQ",
        children: [{ order: 1, key: "menu0000178", path: "/admin/communication/faq/faqMng", text: "FAQ 관리" }],
      },
      {
        order: 3,
        key: "menu0000179",
        text: "알림",
        children: [{ order: 1, key: "menu0000180", path: "/admin/communication/alarm/alarmMng", text: "알림 관리" }],
      },
    ],
  },
  {
    key: "menu0000181",
    order: 9,
    text: "통계관리",
    children: [
      {
        order: 1,
        key: "menu0000182",
        text: "대시보드",
        children: [
          { order: 1, key: "menu0000183", path: "/admin/statMng/dashboard/ecpDashboard", text: "비교과 대시보드" },
          {
            order: 2,
            key: "menu0000184",
            path: "/admin/statMng/dashboard/coreAbilityDashboard",
            text: "핵심역량 대시보드",
          },
        ],
      },
      {
        order: 2,
        key: "menu0000185",
        text: "업무 통계",
        children: [
          {
            order: 1,
            key: "menu0000186",
            path: "/admin/statMng/workStat/diagRschExamStat",
            text: "진단 · 조사 · 시험 통계",
          },
          { order: 2, key: "menu0000187", path: "/admin/statMng/workStat/rcmdEmployStat", text: "추천 채용 통계" },
          { order: 3, key: "menu0000188", path: "/admin/statMng/workStat/colgCertiStat", text: "대학인증 통계" },
        ],
      },
    ],
  },
];
export default sidebarItem;
