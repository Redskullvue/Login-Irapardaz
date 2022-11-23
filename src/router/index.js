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
    meta : {requiresAuth : true}
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

});
//to in the beforEach method is the path the users wanna get in 

router.beforeEach((to, from, next) => {
  // let authCheck = false;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if(localStorage.getItem("loggedInToken")){
      //user is authed
      next()
    }else {
      //not auth
      router.replace("/")
    }
    
  } else { 
    next()
  }
})


export default router;