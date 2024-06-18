// * 시스템관리 라우트

const sysRoutes = [
  {
    path: "/admin/sysMng/adminPerm/clientMng",
    component: () => import("@/views/admin/sysMng/adminPerm/clientMng/ClientMngIndex.vue"),
  },
  {
    path: "/admin/sysMng/adminPerm/permMng",
    component: () => import("@/views/admin/sysMng/adminPerm/permMng/PermMngIndex.vue"),
  },
  {
    path: "/admin/sysMng/hisSrch/loginHisSrch",
    component: () => import("@/views/admin/sysMng/hisSrch/loginHisSrch/LoginHisSrchIndex.vue"),
  },
  {
    path: "/admin/sysMng/hisSrch/menuUseHisSrch",
    component: () => import("@/views/admin/sysMng/hisSrch/menuUseHisSrch/MenuUseHisSrchIndex.vue"),
  },
  {
    path: "/admin/sysMng/hisSrch/permGrntHisSrch",
    component: () => import("@/views/admin/sysMng/hisSrch/permGrntHisSrch/PermGrntHisSrchIndex.vue"),
  },
  {
    path: "/admin/sysMng/hisSrch/sqlLogHisSrch",
    component: () => import("@/views/admin/sysMng/hisSrch/sqlLogHisSrch/SqlLogHisSrchIndex.vue"),
  },
  {
    path: "/admin/sysMng/otsdrMng/otsdrMemberMng",
    component: () => import("@/views/admin/sysMng/otsdrMng/otsdrMemberMng/OtsdrMemberMngIndex.vue"),
  },
];

export default sysRoutes;
