// * 커뮤니케이션 라우트

const cmnctRoutes = [
  {
    path: "/admin/communication/notice/noticeMng",
    component: () => import("@/views/admin/communication/notice/noticeMng/NoticeMngIndex.vue"),
  },
  {
    path: "/admin/communication/faq/faqMng",
    component: () => import("@/views/admin/communication/faq/faqMng/FaqMngIndex.vue"),
  },
  {
    path: "/admin/communication/alarm/alarmMng",
    component: () => import("@/views/admin/communication/alarm/alarmMng/AlarmMngIndex.vue"),
  },
];

export default cmnctRoutes;
