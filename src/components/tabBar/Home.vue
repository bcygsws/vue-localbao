<template>
  <div class="home_container">
    <!-- <h1>这是home组件</h1> -->
    <!-- 信息检索区 -->
    <mt-search
      v-model="serachVal"
      cancel-text="取消"
      placeholder="搜索"
    ></mt-search>

    <!-- home主页内的轮播图 -->
    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img src="../../images/menu1.png" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../images/menu1.png" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../images/menu1.png" />
      </mt-swipe-item>
    </mt-swipe> -->
    <swipe :swipeList="lunboList" :isFull="true"></swipe>
    <!-- 六宫格，又九宫格改造而来 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9 six_gird">
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <!-- 改造路由后，router-link定义后，自己会去找router-view,router-view放在了App中顶部栏和tabbar之间的区域 -->
        <router-link to="/home/newslist">
          <img src="../../assets/images/menu1.png" alt="" />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="/home/photolist">
          <img src="../../assets/images/menu2.png" alt="" />
          <div class="mui-media-body">生活趣图</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="/home/goodslist">
          <img src="../../assets/images/menu3.png" alt="" />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="/home/videolist">
          <img src="../../assets/images/menu5.png" alt="" />
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="/home/feedback">
          <img src="../../assets/images/menu4.png" alt="" />
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="/home/informus">
          <img src="../../assets/images/menu6.png" alt="" />
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import swipe from '../subComponents/Swipe.vue';
export default {
  data() {
    return {
      serachVal: '',
      lunboList: [
        { id: 1, img: '../../assets/images/lunbo-alt1.jpg', url: 'asdfaffa' },
        { id: 2, img: '../../assets/images/lunbo-alt2.jpg', url: 'asdfaffa' },
        { id: 3, img: '../../assets/images/lunbo-alt3.jpg', url: 'asdfaffa' }
      ]
    };
  },
  // 获取生命周期
  created() {
    this.getLunBo();
    // 打印路由对象
    console.log(this.$route);
  },
  methods: {
    getLunBo() {
      this.$http.get('api/getlunbo').then(result => {
        if (result.status === 200) {
          console.log(result.body.message);
          // this.lunboList = result.body.message;
        } else {
          // 请求失败---使用Toast组件提示加载失败
          Toast('加载图片失败……');
        }
      });
    }
  },
  components: {
    swipe
  }
};
</script>

<style lang="less" scoped>
.home_container {
  /* 搜索区样式 */
  /deep/ .mint-search {
    height: 44px;
    .mint-searchbar {
      background-color: #26a2ff;
      /* 取消按钮字体大小 */
      a.mint-searchbar-cancel {
        font-size: 14px;
        color: #ffffff;
      }
      .mint-searchbar-inner {
        i.mintui {
          font-size: 14px;
          &::before {
            color: #26a2ff;
          }
        }
        input[type='search'] {
          margin: 0;
          height: 28px;
          background-color: #fff;
          &::placeholder {
            font-size: 12px;
            color: #26a2ff;
          }
        }
      }
    }
    .mint-search-list {
      width: 100%;
      height: 100px;
    }
  }

  .six_gird.mui-grid-view {
    background-color: #fff;
    li.mui-media {
      background-color: #fff;
      border: 0;
      a {
        img {
          width: 60px;
          height: 60px;
          vertical-align: bottom;
        }
        .mui-media-body {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
