const cnslRoute = [
  {
    path: "/admin/prfsnCnsl/cnslrMng/psychCnsl/psychCnsl",
    component: () => import("@/views/admin/prfsnCnsl/cnslrMng/psychCnsl/PsychCnslIndex.vue"),
  },
  {
    path: "/admin/prfsnCnsl/cnslrMng/psychCnsl/psychCnslDetail",
    component: () => import("@/views/admin/prfsnCnsl/cnslrMng/psychCnsl/PsychCnslDetail.vue"),
  },
  {
    path: "/admin/prfsnCnsl/cnslrMng/employCnsl/employCnsl",
    component: () => import("@/views/admin/prfsnCnsl/cnslrMng/employCnsl/EmployCnslIndex.vue"),
  },
  {
    path: "/admin/prfsnCnsl/cnslrMng/employCnsl/employCnslDetail",
    component: () => import("@/views/admin/prfsnCnsl/cnslrMng/employCnsl/EmployCnslDetail.vue"),
  },
  {
    path: "/admin/prfsnCnsl/cnslrMng/learnCsnl/learnCsnl",
    component: () => import("@/views/admin/prfsnCnsl/cnslrMng/learnCsnl/LearnCnslIndex.vue"),
  },
  {
    path: "/admin/prfsnCnsl/cnslrMng/learnCsnl/learnCsnlDetail",
    component: () => import("@/views/admin/prfsnCnsl/cnslrMng/learnCsnl/LearnCnslDetail.vue"),
  },
  {
    path: "/admin/prfsnCnsl/cnslrMng/writeCnsl/writeCnsl",
    component: () => import("@/views/admin/prfsnCnsl/cnslrMng/writeCnsl/WriteCnslIndex.vue"),
  },
  {
    path: "/admin/prfsnCnsl/cnslrMng/writeCnsl/writeCnslDetail",
    component: () => import("@/views/admin/prfsnCnsl/cnslrMng/writeCnsl/WriteCnslDetail.vue"),
  },
  {
    path: "/admin/prfsnCnsl/cnslStatMng/temp/temp",
    component: () => import("@/views/admin/prfsnCnsl/cnslStatMng/temp/TempIndex.vue"),
  },
];

export default cnslRoute;
