// * 진로취업 라우트

const careerEmployRoutes = [
  {
    path: "/admin/careerEmploy/careerDesign/hakguaCareerDesign",
    component: () => import("@/views/admin/careerEmploy/careerDesign/hakguaCareerDesign/HakguaCareerDesignIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/careerDesign/hakguaCareerDesignDetail",
    component: () => import("@/views/admin/careerEmploy/careerDesign/hakguaCareerDesign/HakguaCareerDesignDetail.vue"),
  },
  {
    path: "/admin/careerEmploy/employSpec/employUserInfoReg",
    component: () => import("@/views/admin/careerEmploy/employSpec/employUserInfoReg/EmployUserInfoRegIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/employSpec/userRegInfoSrch",
    component: () => import("@/views/admin/careerEmploy/employSpec/userRegInfoSrch/UserRegInfoSrchIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/employInfo/rcmdRecrt",
    component: () => import("@/views/admin/careerEmploy/employInfo/rcmdRecrt/RcmdRecrtIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/employInfo/rcmdRecrtDetail",
    component: () => import("@/views/admin/careerEmploy/employInfo/rcmdRecrt/RcmdRecrtDetail.vue"),
  },
  {
    path: "/admin/careerEmploy/employInfo/rcmdRecrtApply",
    component: () => import("@/views/admin/careerEmploy/employInfo/rcmdRecrt/RcmdRecrtApplyIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/employInfo/outsideRecrt",
    component: () => import("@/views/admin/careerEmploy/employInfo/outsideRecrt/OutsideRecrtIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/employInfo/outsideRecrtDetail",
    component: () => import("@/views/admin/careerEmploy/employInfo/outsideRecrt/OutsideRecrtDetail.vue"),
  },
  {
    path: "/admin/careerEmploy/employInfo/outsideRecrtApply",
    component: () => import("@/views/admin/careerEmploy/employInfo/outsideRecrt/OutsideRecrtApplyIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/employInfo/insideRecrt",
    component: () => import("@/views/admin/careerEmploy/employInfo/insideRecrt/InsideRecrtIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/employInfo/insideRecrtDetail",
    component: () => import("@/views/admin/careerEmploy/employInfo/insideRecrt/InsideRecrtDetail.vue"),
  },
  {
    path: "/admin/careerEmploy/employInfo/insideRecrtApply",
    component: () => import("@/views/admin/careerEmploy/employInfo/insideRecrt/InsideRecrtApplyIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/employInfo/foreignWorker",
    component: () => import("@/views/admin/careerEmploy/employInfo/foreignWorker/ForeignWorkerIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/employInfo/foreignWorkerDetail",
    component: () => import("@/views/admin/careerEmploy/employInfo/foreignWorker/ForeignWorkerDetail.vue"),
  },
  {
    path: "/admin/careerEmploy/employInfo/foreignWorkerApply",
    component: () => import("@/views/admin/careerEmploy/employInfo/foreignWorker/ForeignWorkerApplyIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/colgEmployRatioMng/hakguaNmHisMng",
    component: () => import("@/views/admin/careerEmploy/colgEmployRatioMng/hakguaNmHisMng/HakguaNmHisMngIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/colgEmployRatioMng/goalEmployRatioMng",
    component: () =>
      import("@/views/admin/careerEmploy/colgEmployRatioMng/goalEmployRatioMng/GoalEmployRatioMngIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/colgEmployRatioMng/corpInfoMng",
    component: () => import("@/views/admin/careerEmploy/colgEmployRatioMng/corpInfoMng/CorpInfoMngIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/colgEmployRatioMng/grdtEmployMng",
    component: () => import("@/views/admin/careerEmploy/colgEmployRatioMng/grdtEmployMng/GrdtEmployMngIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/colgEmployRatioMng/grdtEmployCorpMng",
    component: () =>
      import("@/views/admin/careerEmploy/colgEmployRatioMng/grdtEmployCorpMng/GrdtEmployCorpMngIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/kediEmployStatSrch/danguaEmployRatio",
    component: () =>
      import("@/views/admin/careerEmploy/kediEmployStatSrch/danguaEmployRatio/DanguaEmployRatioIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/kediEmployStatSrch/hakguaEmployRatio",
    component: () =>
      import("@/views/admin/careerEmploy/kediEmployStatSrch/hakguaEmployRatio/HakguaEmployRatioIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/kediEmployStatSrch/categoryEmployRatio",
    component: () =>
      import("@/views/admin/careerEmploy/kediEmployStatSrch/categoryEmployRatio/CategoryEmployRatioIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/kediEmployStatSrch/totalEmployRatio",
    component: () => import("@/views/admin/careerEmploy/kediEmployStatSrch/totalEmployRatio/TotalEmployRatioIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/dsclsEmployStat/yearEmployStat",
    component: () => import("@/views/admin/careerEmploy/dsclsEmployStat/yearEmployStat/YearEmployStatIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/dsclsEmployStat/grdtEmployStat",
    component: () => import("@/views/admin/careerEmploy/dsclsEmployStat/grdtEmployStat/GrdtEmployStatIndex.vue"),
  },
  {
    path: "/admin/careerEmploy/dsclsEmployStat/comptColgEmployRatio",
    component: () =>
      import("@/views/admin/careerEmploy/dsclsEmployStat/comptColgEmployRatio/ComptColgEmployRatioIndex.vue"),
  },
];

export default careerEmployRoutes;
