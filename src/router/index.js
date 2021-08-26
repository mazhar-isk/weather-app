import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import Detail from "../pages/Detail.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:id',
    name: 'Detail',
    component: Detail
  }
]

const router = new VueRouter({ routes })

export default router
