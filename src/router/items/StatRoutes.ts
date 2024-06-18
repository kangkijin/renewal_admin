// * 통계관리 라우트

const statRoutes = [
  {
    path: "/admin/statMng/dashboard/ecpDashboard",
    component: () => import("@/views/admin/statMng/dashboard/ecpDashboard/EcpDashboardIndex.vue"),
  },
  {
    path: "/admin/statMng/dashboard/coreAbilityDashboard",
    component: () => import("@/views/admin/statMng/dashboard/coreAbilityDashboard/CoreAbilityDashboardIndex.vue"),
  },
  {
    path: "/admin/statMng/workStat/diagRschExamStat",
    component: () => import("@/views/admin/statMng/workStat/diagRschExamStat/DiagRschExamStatIndex.vue"),
  },
  {
    path: "/admin/statMng/workStat/rcmdEmployStat",
    component: () => import("@/views/admin/statMng/workStat/rcmdEmployStat/RcmdEmployStatIndex.vue"),
  },
  {
    path: "/admin/statMng/workStat/colgCertiStat",
    component: () => import("@/views/admin/statMng/workStat/colgCertiStat/ColgCertiStatIndex.vue"),
  },
];

export default statRoutes;
