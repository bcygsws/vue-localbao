import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/tabBar/Home.vue';
import Member from '../components/tabBar/Member.vue';
import Shopping from '../components/tabBar/Shopping.vue';
import Search from '../components/tabBar/Search.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/member',
    component: Member
  },
  {
    path: '/shopping',
    component: Shopping
  },
  {
    path: '/search',
    component: Search
  }
];

const router = new VueRouter({
  routes,
  // 在VueRouter对象中，和routes并列的属性，还有一个linkActiveClass。该属性不设置的时候，路由选中的时候，路由配置好将添加一个默认的排他的router-link-active属性。而一旦设置linkActiveClass为其他值，router-link-active将不复存在，取而代之的是设定值，本例中是mui-active
  linkActiveClass: 'mui-active'
});

export default router;
