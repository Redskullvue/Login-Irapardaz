import { createWebHistory, createRouter } from "vue-router";
import YloginPage from "../Views/LoginPage.vue";
import YUserPanel from "../Views/UserPanel.vue";

const routes = [
  {
    path: "/",
    name: "YloginPage",
    component: YloginPage,
  },
  {
    path: "/panel",
    name: "YUserPanel",
    component:YUserPanel,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;