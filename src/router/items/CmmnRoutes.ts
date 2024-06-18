// * 공통 라우트
const cmmnRoutes = [
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/common/ErrorPage.vue"),
  },
];

export default cmmnRoutes;
