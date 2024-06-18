import { createRouter, createWebHistory } from "vue-router";
// import { navigationGuard } from "./functions/navigationGuard";

import cmmnRoutes from "./items/CmmnRoutes";
import guideRoutes from "./items/_GUIDE/GuideRoutes";

import sysRoutes from "./items/SysRoutes";
import prvtDrptRoutes from "./items/PrvtDrptRoutes";
import diagRoutes from "./items/DiagRoutes";
import ecpRoutes from "./items/EcpRoutes";
import careerEmployRoutes from "./items/CareerEmployRoutes";
import colgCertiRoutes from "./items/ColgCertiRoutes";
import cmnctRoutes from "./items/CmnctRoutes";
import statRoutes from "./items/StatRoutes";
import CnslRoutes from "./items/CnslRoutes";

const routes = [
  {
    path: "/",
    redirect: "/admin/diagRschExam/abilityCdMng/coreAblitiyCdReg",
    component: () => import("@/layouts/AdminTemplate.vue"),
    children: [
      ...guideRoutes,
      ...sysRoutes,
      ...prvtDrptRoutes,
      ...diagRoutes,
      ...ecpRoutes,
      ...careerEmployRoutes,
      ...colgCertiRoutes,
      ...cmnctRoutes,
      ...statRoutes,
      ...CnslRoutes,
    ],
  },
  ...cmmnRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// navigationGuard(router);
export default router;
