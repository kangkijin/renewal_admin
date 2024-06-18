// * 중도탈락방지 라우트

const prvtDrptRoutes = [
  {
    path: "/admin/prvntDrpt/prvntDrptStnrdMng/prvntDrptStnrdReg",
    component: () => import("@/views/admin/prvntDrpt/prvntDrptStnrdMng/prvntDrptStnrdReg/PrvntDrptStnrdRegIndex.vue"),
  },
  {
    path: "/admin/prvntDrpt/prvntDrptStat/pstvFctrStat",
    component: () => import("@/views/admin/prvntDrpt/prvntDrptStat/pstvFctrStat/PstvFctrStatIndex.vue"),
  },
  {
    path: "/admin/prvntDrpt/prvntDrptStat/ngtvFctrStat",
    component: () => import("@/views/admin/prvntDrpt/prvntDrptStat/ngtvFctrStat/NgtvFctrStatIndex.vue"),
  },
];

export default prvtDrptRoutes;
