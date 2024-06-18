// * 비교과 라우트

const ecpRoutes = [
  {
    path: "/admin/extraCurricularProgram/promoProgMng/promoProgSetup",
    component: () => import("@/views/admin/extraCurricularProgram/promoProgMng/promoProgSetup/PromoProgSetupIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/promoProgMng/promoImgReg",
    component: () => import("@/views/admin/extraCurricularProgram/promoProgMng/promoImgReg/PromoImgRegIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/guideProfSetup/guideProfSetupMng",
    component: () =>
      import("@/views/admin/extraCurricularProgram/guideProfSetup/guideProfSetupMng/GuideProfSetupMngIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/userEcp/userCategoryMng",
    component: () => import("@/views/admin/extraCurricularProgram/userEcp/userCategoryMng/UserCategoryMngIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/userEcp/userCurriMng",
    component: () => import("@/views/admin/extraCurricularProgram/userEcp/userCurriMng/UserCurriMngIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/userEcp/userCurriReg",
    component: () => import("@/views/admin/extraCurricularProgram/userEcp/userCurriMng/UserCurriReg.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/userEcp/userCurriDetail",
    component: () => import("@/views/admin/extraCurricularProgram/userEcp/userCurriMng/UserCurriDetail.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/userEcp/userCurriModify",
    component: () => import("@/views/admin/extraCurricularProgram/userEcp/userCurriMng/UserCurriModify.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/userEcp/userPeriodMng",
    component: () => import("@/views/admin/extraCurricularProgram/userEcp/userPeriodMng/UserPeriodMngIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/userEcp/userPeriodReg",
    component: () => import("@/views/admin/extraCurricularProgram/userEcp/userPeriodMng/UserPeriodReg.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/userEcp/userPeriodModify",
    component: () => import("@/views/admin/extraCurricularProgram/userEcp/userPeriodMng/UserPeriodModify.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/userEcp/userPeriodDetail",
    component: () => import("@/views/admin/extraCurricularProgram/userEcp/userPeriodMng/UserPeriodDetail.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/userEcp/userPeriodAprv",
    component: () => import("@/views/admin/extraCurricularProgram/userEcp/userPeriodAprv/UserPeriodAprvIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/userEcp/userPeriodOprt",
    component: () => import("@/views/admin/extraCurricularProgram/userEcp/userPeriodOprt/UserPeriodOprtIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/userEcp/userCurriCqi",
    component: () => import("@/views/admin/extraCurricularProgram/userEcp/userCurriCqi/UserCurriCqiIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/userEcp/userDeptCqi",
    component: () => import("@/views/admin/extraCurricularProgram/userEcp/userDeptCqi/UserDeptCqiIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/userEcp/userColgHqCqi",
    component: () => import("@/views/admin/extraCurricularProgram/userEcp/userColgHqCqi/UserColgHqCqiIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/profEcp/profCategoryMng",
    component: () => import("@/views/admin/extraCurricularProgram/profEcp/profCategoryMng/ProfCategoryMngIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/profEcp/profCurriMng",
    component: () => import("@/views/admin/extraCurricularProgram/profEcp/profCurriMng/ProfCurriMngIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/profEcp/profCurriModify",
    component: () => import("@/views/admin/extraCurricularProgram/profEcp/profCurriMng/ProfCurriModify.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/profEcp/profCurriDetail",
    component: () => import("@/views/admin/extraCurricularProgram/profEcp/profCurriMng/ProfCurriDetail.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/profEcp/profCurriReg",
    component: () => import("@/views/admin/extraCurricularProgram/profEcp/profCurriMng/ProfCurriReg.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/profEcp/profPeriodMng",
    component: () => import("@/views/admin/extraCurricularProgram/profEcp/profPeriodMng/ProfPeriodMngIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/profEcp/profPeriodReg",
    component: () => import("@/views/admin/extraCurricularProgram/profEcp/profPeriodMng/ProfPeriodReg.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/profEcp/profPeriodModify",
    component: () => import("@/views/admin/extraCurricularProgram/profEcp/profPeriodMng/ProfPeriodModify.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/profEcp/profPeriodDetail",
    component: () => import("@/views/admin/extraCurricularProgram/profEcp/profPeriodMng/ProfPeriodDetail.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/profEcp/profPeriodAprv",
    component: () => import("@/views/admin/extraCurricularProgram/profEcp/profPeriodAprv/ProfPeriodAprvIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/profEcp/profPeriodOprt",
    component: () => import("@/views/admin/extraCurricularProgram/profEcp/profPeriodOprt/ProfPeriodOprtIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/profEcp/profCurriCqi",
    component: () => import("@/views/admin/extraCurricularProgram/profEcp/profCurriCqi/ProfCurriCqiIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/profEcp/profDeptCqi",
    component: () => import("@/views/admin/extraCurricularProgram/profEcp/profDeptCqi/ProfDeptCqiIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/profEcp/profColgHqCqi",
    component: () => import("@/views/admin/extraCurricularProgram/profEcp/profColgHqCqi/ProfColgHqCqiIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/stfEcp/stfCategoryMng",
    component: () => import("@/views/admin/extraCurricularProgram/stfEcp/stfCategoryMng/StfCategoryMngIndxe.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/stfEcp/stfCurriMng",
    component: () => import("@/views/admin/extraCurricularProgram/stfEcp/stfCurriMng/StfCurriMngIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/stfEcp/stfCurriReg",
    component: () => import("@/views/admin/extraCurricularProgram/stfEcp/stfCurriMng/StfCurriReg.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/stfEcp/stfPeriodMng",
    component: () => import("@/views/admin/extraCurricularProgram/stfEcp/stfPeriodMng/StfPeriodMngIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/stfEcp/stfPeriodReg",
    component: () => import("@/views/admin/extraCurricularProgram/stfEcp/stfPeriodMng/StfPeriodReg.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/stfEcp/stfPeriodAprv",
    component: () => import("@/views/admin/extraCurricularProgram/stfEcp/stfPeriodAprv/StfPeriodAprvIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/stfEcp/stfPeriodOprt",
    component: () => import("@/views/admin/extraCurricularProgram/stfEcp/stfPeriodOprt/StfPeriodOprtIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/stfEcp/stfCurriCqi",
    component: () => import("@/views/admin/extraCurricularProgram/stfEcp/stfCurriCqi/StfCurriCqiIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/stfEcp/stfDeptCqi",
    component: () => import("@/views/admin/extraCurricularProgram/stfEcp/stfDeptCqi/StfDeptCqiIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/stfEcp/stfColgHqCqi",
    component: () => import("@/views/admin/extraCurricularProgram/stfEcp/stfColgHqCqi/StfColgHqCqiIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/otsdrEcp/otsdrCategoryMng",
    component: () => import("@/views/admin/extraCurricularProgram/otsdrEcp/otsdrCategoryMng/OtsdrCategoryMngIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/otsdrEcp/otsdrCurriMng",
    component: () => import("@/views/admin/extraCurricularProgram/otsdrEcp/otsdrCurriMng/OtsdrCurriMngIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/otsdrEcp/otsdrCurriReg",
    component: () => import("@/views/admin/extraCurricularProgram/otsdrEcp/otsdrCurriMng/OtsdrCurriReg.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/otsdrEcp/otsdrPeriodMng",
    component: () => import("@/views/admin/extraCurricularProgram/otsdrEcp/otsdrPeriodMng/OtsdrPeriodMngIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/otsdrEcp/otsdrPeriodReg",
    component: () => import("@/views/admin/extraCurricularProgram/otsdrEcp/otsdrPeriodMng/OtsdrPeriodReg.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/otsdrEcp/otsdrPeriodAprv",
    component: () => import("@/views/admin/extraCurricularProgram/otsdrEcp/otsdrPeriodAprv/OtsdrPeriodAprvIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/otsdrEcp/otsdrPeriodOprt",
    component: () => import("@/views/admin/extraCurricularProgram/otsdrEcp/otsdrPeriodOprt/OtsdrPeriodOprtIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/otsdrEcp/otsdrCurriCqi",
    component: () => import("@/views/admin/extraCurricularProgram/otsdrEcp/otsdrCurriCqi/OtsdrCurriCqiIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/otsdrEcp/otsdrDeptCqi",
    component: () => import("@/views/admin/extraCurricularProgram/otsdrEcp/otsdrDeptCqi/OtsdrDeptCqiIndex.vue"),
  },
  {
    path: "/admin/extraCurricularProgram/otsdrEcp/otsdrColgHqCqi",
    component: () => import("@/views/admin/extraCurricularProgram/otsdrEcp/otsdrColgHqCqi/OtsdrColgHqCqiIndex.vue"),
  },
];

export default ecpRoutes;
