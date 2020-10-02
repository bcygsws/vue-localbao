import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/tabBar/Home.vue';
import Member from '../components/tabBar/Member.vue';
import Shopping from '../components/tabBar/Shopping.vue';
import Setting from '../components/tabBar/Setting.vue';
import NewsInfo from '../components/news/NewsInfo.vue';
import NewsList from '../components/news/NewsList.vue';
import PhotoList from '../components/photos/PhotoList.vue';
import PhotoInfo from '../components/photos/PhotoInfo.vue';
import GoodsList from '../components/goods/GoodsList.vue';
import GoodsInfo from '../components/goods/GoodsInfo.vue';
import GoodsDesc from '../components/goods/GoodsDesc.vue';
import GoodsComment from '../components/goods/GoodsComment.vue';
import videoList from '../components/video/Video.vue';
import feedback from '../components/feedback/FeedBack.vue';
import informUs from '../components/informUs/InformUs.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: { title: '生活宝' }
  },
  {
    path: '/home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/member',
    component: Member,
    meta: { title: '会员' }
  },
  {
    path: '/shopping',
    component: Shopping,
    meta: { title: '购物' }
  },
  {
    path: '/setting',
    component: Setting,
    meta: { title: '设置' }
  },
  {
    path: '/home/newslist',
    component: NewsList,
    meta: { title: '新闻资讯' }
  },
  {
    path: '/home/newsinfo/:id',
    component: NewsInfo,
    meta: { title: '资讯详情' }
  },
  {
    path: '/home/photolist',
    component: PhotoList,
    meta: { title: '趣图' }
  },
  {
    path: '/home/photoinfo/:id',
    component: PhotoInfo,
    meta: { title: '趣图掠影' }
  },
  {
    path: '/home/goodslist',
    component: GoodsList,
    meta: { title: '商品列表' }
  },
  {
    name: 'info',
    path: '/home/goodsinfo/:id',
    component: GoodsInfo,
    meta: {
      title: '商品详情'
    }
  },
  {
    name: 'desc',
    path: '/home/goodsdesc/:id',
    component: GoodsDesc,
    meta: {
      title: '图文介绍'
    }
  },
  {
    name: 'comment',
    path: '/home/goodscomment/:id',
    component: GoodsComment,
    meta: {
      title: '商品评论'
    }
  },
  {
    path: '/home/videolist',
    component: videoList,
    meta: {
      title: '视频专区'
    }
  },
  {
    path: '/home/feedback',
    component: feedback,
    meta: {
      title: '留言反馈'
    }
  },
  {
    path: '/home/informus',
    component: informUs,
    meta: {
      title: '联系我们'
    }
  }
];

const router = new VueRouter({
  routes,
  // 在VueRouter对象中，和routes并列的属性，还有一个linkActiveClass。该属性不设置的时候，路由选中的时候，路由配置好将添加一个默认的排他的router-link-active属性。而一旦设置linkActiveClass为其他值，router-link-active将不复存在，取而代之的是设定值，本例中是mui-active
  linkActiveClass: 'mui-active'
});
// router变量要暴露出去，在main.js中引用，挂载到vue实例vm上
export default router;
