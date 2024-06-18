// * 진단, 조사, 시험 라우트
const diagRoutes = [
  {
    path: "/admin/diagRschExam/abilityCdMng/coreAblitiyCdReg",
    component: () => import("@/views/admin/diagRschExam/abilityCdMng/coreAblitiyCdReg/CoreAblitiyCdRegIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/abilityCdMng/majorAblitiyCdReg",
    component: () => import("@/views/admin/diagRschExam/abilityCdMng/majorAblitiyCdReg/MajorAblitiyCdRegIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/abilityCdMng/profAblitiyCdReg",
    component: () => import("@/views/admin/diagRschExam/abilityCdMng/profAblitiyCdReg/ProfAblitiyCdRegIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/coreAbilityDiag/coreDiagPaperReg",
    component: () => import("@/views/admin/diagRschExam/coreAbilityDiag/coreDiagPaperReg/CoreDiagPaperRegIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/coreAbilityDiag/coreDiagPaperReg/coreDiagPaperRegDetail",
    component: () => import("@/views/admin/diagRschExam/coreAbilityDiag/coreDiagPaperReg/CoreDiagPaperRegDetail.vue"),
  },
  {
    path: "/admin/diagRschExam/coreAbilityDiag/coreDiagPlan",
    component: () => import("@/views/admin/diagRschExam/coreAbilityDiag/coreDiagPlan/CoreDiagPlanIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/coreAbilityDiag/coreDiagPlan/coreDiagPlanDetail",
    component: () => import("@/views/admin/diagRschExam/coreAbilityDiag/coreDiagPlan/CoreDiagPlanDetail.vue"),
  },
  {
    path: "/admin/diagRschExam/coreAbilityDiag/coreDiagStat",
    component: () => import("@/views/admin/diagRschExam/coreAbilityDiag/coreDiagStat/CoreDiagStatIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/coreAbilityDiag/coreDiagStat/coreDiagStatMng",
    component: () => import("@/views/admin/diagRschExam/coreAbilityDiag/coreDiagStat/CoreDiagStatMng.vue"),
  },
  {
    path: "/admin/diagRschExam/majorAbilityDiag/majorDiagPaperReg",
    component: () => import("@/views/admin/diagRschExam/majorAbilityDiag/majorDiagPaperReg/MajorDiagPaperRegIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/majorAbilityDiag/majorDiagPaperReg/majorDiagPaperRegDetail",
    component: () =>
      import("@/views/admin/diagRschExam/majorAbilityDiag/majorDiagPaperReg/MajorDiagPaperRegDetail.vue"),
  },
  {
    path: "/admin/diagRschExam/majorAbilityDiag/majorDiagPlan",
    component: () => import("@/views/admin/diagRschExam/majorAbilityDiag/majorDiagPlan/MajorDiagPlanIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/majorAbilityDiag/majorDiagPlan/majorDiagPlanDetail",
    component: () => import("@/views/admin/diagRschExam/majorAbilityDiag/majorDiagPlan/MajorDiagPlanDetail.vue"),
  },
  {
    path: "/admin/diagRschExam/majorAbilityDiag/majorDiagStat",
    component: () => import("@/views/admin/diagRschExam/majorAbilityDiag/majorDiagStat/MajorDiagStatIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/majorAbilityDiag/majorDiagStat/majorDiagStatMng",
    component: () => import("@/views/admin/diagRschExam/majorAbilityDiag/majorDiagStat/MajorDiagStatMng.vue"),
  },
  {
    path: "/admin/diagRschExam/profAbilityDiag/profDiagPaperReg",
    component: () => import("@/views/admin/diagRschExam/profAbilityDiag/profDiagPaperReg/ProfDiagPaperRegIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/profAbilityDiag/profDiagPaperReg/profDiagPaperRegDetail",
    component: () => import("@/views/admin/diagRschExam/profAbilityDiag/profDiagPaperReg/ProfDiagPaperRegDetail.vue"),
  },
  {
    path: "/admin/diagRschExam/profAbilityDiag/profDiagPlan",
    component: () => import("@/views/admin/diagRschExam/profAbilityDiag/profDiagPlan/ProfDiagPlanIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/profAbilityDiag/profDiagPlan/profDiagPlanDetail",
    component: () => import("@/views/admin/diagRschExam/profAbilityDiag/profDiagPlan/ProfDiagPlanDetail.vue"),
    props: true,
  },
  {
    path: "/admin/diagRschExam/profAbilityDiag/profDiagStat",
    component: () => import("@/views/admin/diagRschExam/profAbilityDiag/profDiagStat/ProfDiagStatIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/profAbilityDiag/profDiagStat/profDiagStatMng",
    component: () => import("@/views/admin/diagRschExam/profAbilityDiag/profDiagStat/ProfDiagStatMng.vue"),
  },
  {
    path: "/admin/diagRschExam/surveyRsch/surveyRschPaperReg",
    component: () => import("@/views/admin/diagRschExam/surveyRsch/surveyRschPaperReg/SurveyRschPaperRegIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/surveyRsch/surveyRschPaperReg/surveyRschPaperRegDetail",
    component: () => import("@/views/admin/diagRschExam/surveyRsch/surveyRschPaperReg/SurveyRschPaperRegDetail.vue"),
  },
  {
    path: "/admin/diagRschExam/surveyRsch/surveyRschPlan",
    component: () => import("@/views/admin/diagRschExam/surveyRsch/surveyRschPlan/SurveyRschPlanIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/surveyRsch/surveyRschPlan/surveyRschPlanDetail",
    component: () => import("@/views/admin/diagRschExam/surveyRsch/surveyRschPlan/SurveyRschPlanDetail.vue"),
  },
  {
    path: "/admin/diagRschExam/surveyRsch/surveyRschStat",
    component: () => import("@/views/admin/diagRschExam/surveyRsch/surveyRschStat/SurveyRschStatIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/satisRsch/satisRschPaperReg",
    component: () => import("@/views/admin/diagRschExam/satisRsch/satisRschPaperReg/SatisRschPaperRegIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/satisRsch/satisRschPaperReg/satisRschPaperRegDetail",
    component: () => import("@/views/admin/diagRschExam/satisRsch/satisRschPaperReg/SatisRschPaperRegDetail.vue"),
  },
  {
    path: "/admin/diagRschExam/satisRsch/satisRschPlan",
    component: () => import("@/views/admin/diagRschExam/satisRsch/satisRschPlan/SatisRschPlanIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/satisRsch/satisRschPlan/satisRschPlanDetail",
    component: () => import("@/views/admin/diagRschExam/satisRsch/satisRschPlan/SatisRschPlanDetail.vue"),
  },
  {
    path: "/admin/diagRschExam/satisRsch/satisRschStat",
    component: () => import("@/views/admin/diagRschExam/satisRsch/satisRschStat/SatisRschStatIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/examination/examDiagPaperReg",
    component: () => import("@/views/admin/diagRschExam/examination/examDiagPaperReg/ExamDiagPaperRegIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/examination/examDiagPaperReg/examDiagPaperRegDetail",
    component: () => import("@/views/admin/diagRschExam/examination/examDiagPaperReg/ExamDiagPaperRegDetail.vue"),
  },
  {
    path: "/admin/diagRschExam/examination/examDiagPlan",
    component: () => import("@/views/admin/diagRschExam/examination/examDiagPlan/ExamDiagPlanIndex.vue"),
  },
  {
    path: "/admin/diagRschExam/examination/examDiagPlan/examDiagPlanDetail",
    component: () => import("@/views/admin/diagRschExam/examination/examDiagPlan/ExamDiagPlanDetail.vue"),
  },
  {
    path: "/admin/diagRschExam/examination/examDiagStat",
    component: () => import("@/views/admin/diagRschExam/examination/examDiagStat/ExamDiagStatIndex.vue"),
  },
];

export default diagRoutes;
