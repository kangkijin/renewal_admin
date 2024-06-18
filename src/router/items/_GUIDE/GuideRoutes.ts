// * 가이드 관련 라우트
const guideRoutes = [
  {
    path: "/guide/home",
    component: () => import("@/views/UI_GUIDE/GuideHome.vue"),
  },
  {
    path: "/guide/list",
    component: () => import("@/views/UI_GUIDE/list/ListView.vue"),
  },
  {
    path: "/guide/list2",
    component: () => import("@/views/UI_GUIDE/list/ListView2.vue"),
  },
  {
    path: "/guide/list3",
    component: () => import("@/views/UI_GUIDE/list/ListView3.vue"),
  },
  {
    path: "/guide/detail",
    component: () => import("@/views/UI_GUIDE/detail/DetailView.vue"),
  },
  {
    path: "/guide/detail2",
    component: () => import("@/views/UI_GUIDE/detail/DetailView2.vue"),
  },
  {
    path: "/guide/detail3",
    component: () => import("@/views/UI_GUIDE/detail/DetailView3.vue"),
  },
  {
    path: "/guide/tree1",
    component: () => import("@/views/UI_GUIDE/tree/TreeView1.vue"),
  },
  {
    path: "/guide/tree2",
    component: () => import("@/views/UI_GUIDE/tree/TreeView2.vue"),
  },
  {
    path: "/guide/promoReg",
    component: () => import("@/views/UI_GUIDE/ecp/EcpReg.vue"),
  },
];

export default guideRoutes;
