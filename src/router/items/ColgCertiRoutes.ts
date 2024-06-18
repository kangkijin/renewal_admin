// * 대학인증 라우트

const colgCertiRoutes = [
  {
    path: "/admin/colgCerti/mileage/scoreTableMng",
    component: () => import("@/views/admin/colgCerti/mileage/scoreTableMng/ScoreTableMngIndex.vue"),
  },
  {
    path: "/admin/colgCerti/mileage/mileageAcqState",
    component: () => import("@/views/admin/colgCerti/mileage/mileageAcqState/MileageAcqStateIndex.vue"),
  },
  {
    path: "/admin/colgCerti/grdtCertiSys/grdtStndrSetup",
    component: () => import("@/views/admin/colgCerti/grdtCertiSys/grdtStndrSetup/GrdtStndrSetupIndex.vue"),
  },
  {
    path: "/admin/colgCerti/grdtCertiSys/grdtAcqState",
    component: () => import("@/views/admin/colgCerti/grdtCertiSys/grdtAcqState/GrdtAcqStateIndex.vue"),
  },
  {
    path: "/admin/colgCerti/abilityCertiSys/abilityStndrSetup",
    component: () => import("@/views/admin/colgCerti/abilityCertiSys/abilityStndrSetup/AbilityStndrSetupIndex.vue"),
  },
  {
    path: "/admin/colgCerti/abilityCertiSys/abilityAcqState",
    component: () => import("@/views/admin/colgCerti/abilityCertiSys/abilityAcqState/AbilityAcqStateIndex.vue"),
  },
  {
    path: "/admin/colgCerti/sbjtCertiSys/microSbjtStnrdSetup",
    component: () => import("@/views/admin/colgCerti/sbjtCertiSys/microSbjtStnrdSetup/MicroSbjtStnrdSetupIndex.vue"),
  },
  {
    path: "/admin/colgCerti/sbjtCertiSys/microCertiState",
    component: () => import("@/views/admin/colgCerti/sbjtCertiSys/microCertiState/MicroCertiStateIndex.vue"),
  },
  {
    path: "/admin/colgCerti/sbjtCertiSys/nurseSbjtStnrdSetup",
    component: () => import("@/views/admin/colgCerti/sbjtCertiSys/nurseSbjtStnrdSetup/NurseSbjtStnrdSetupIndex.vue"),
  },
  {
    path: "/admin/colgCerti/sbjtCertiSys/nurseCertiState",
    component: () => import("@/views/admin/colgCerti/sbjtCertiSys/nurseCertiState/NurseCertiStateIndex.vue"),
  },
];

export default colgCertiRoutes;
