<template>
  <div class="app_container">
    <!-- 在当前组件中this.$route就可以获取router.js中配置的路由对象 -->
    <mt-header :title="$route.meta.title" fixed class="header_fixed">
      <!-- slot="left"表示左边显示元素 -->
      <span v-show="flag" @click="goBack" slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <!-- 这是tabbar按钮 -->
    <nav class="mui-bar mui-bar-tab">
      <!-- 在router.js中也自定义一个mui-active后，必须删除其中默认的类样式mui-active,否则会出现同时选中home和其他三个之一共两个按钮显示选中蓝色的情况 -->
      <router-link class="mui-tab-item2" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item2" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item2" to="/shopping">
        <span class="mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">
            {{ $store.getters.getAllGoodsCount }}
          </span>
        </span>
        <!-- <span class="mui-icon-extra mui-icon-extra-cart"></span> -->
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item2" to="/setting">
        <span class="mui-icon mui-icon-gear"></span>
        <span class="mui-tab-label">设置</span>
      </router-link>
    </nav>
    <div class="app_layout">
      <div class="outer">
        <transition>
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 返回按钮的标志位，主页App.vue是最前面的页面，默认将“返回”隐藏
      flag: false
    };
  },
  /* 注意：
  1.任何一个页面刷新 App组件中created mounted生命周期都会重新执行
  2.watch属性监控路由地址的变化，以确定【返回】按钮的显示或隐藏，当路由地址为："/home"表示在home主页，【返回】按钮应隐藏
  在其他非"/home"路由时，按钮都应该隐藏 */
  created() {
    // eslint中不准许使用三元表达式
    // this.flag = this.$route.path === '/home' ? false : true;
    this.initFlag();
  },
  // 路由切换时执行updated,不执行mounted
  methods: {
    // initBScroll() {
    //   // 经验值：每个tick约为17ms,换成setTimeOut(f,20)也是无感知的
    //   // this.$nextTick(() => {
    //   // BUG:当前滚动条由于惯性还在滚动时，突然切换路由，新页面会出现白板？
    //   // 滚动条滑块原生对象
    //   setTimeout(() => {
    //     if (!this.bscroll) {
    //       this.bscroll = new BScroll(this.$refs.wrapper, {
    //         scrollY: true,
    //         scrollbar: true,
    //         click: true,
    //         tap: true,
    //         // 不允许触顶或者触底的弹跳
    //         bounce: false,
    //         // 启用手指触摸
    //         disableTouch: false
    //       });
    //       console.log(this.bscroll);
    //     } else {
    //       this.bscroll.refresh();
    //     }
    //   }, 20);
    //   // });
    // },
    // 封装刷新页面后，flag变量销毁，回到默认值，在页面渲染出来之前。改变其值，在'/home'路径，flag为false,反之，为true
    initFlag() {
      if (this.$route.path === '/home') {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    goBack() {
      // 点击一次页面中“后退”按钮，返回到上一次，即：go(-1)
      this.$router.go(-1);
    }
  },
  watch: {
    // 路由切换时，虚拟DOM会进行运算，只会重绘router-view那一部分内容。通过watch侦听当前路由的值是否为/home,以决定是否隐藏返回按钮。
    // bug：然而当前页面如果处于非/home页面，一旦点了“刷新”该页面，flag变量值将被销毁，而回到默认值false,返回按钮在非/home页也将隐藏。为此，
    // 需要在created生命周期钩子中提前判断该页面是否为/home,非/home页，flag就为true，要保持返回按钮的显示状态。反之，则flag为false,隐藏
    // 返回按钮
    '$route.path': function(newVal) {
      if (newVal === '/home') {
        this.flag = false;
        // this.reloadHomePage();
      } else {
        this.flag = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.app_container {
  /* 限制界面x方向的滚动，避免出现横向滚动条；只允许纵向的滚动条 */
  /* overflow-x: hidden; */
  /* 图片列表页向上卷曲时，由于该页面中顶部滑动栏也采用了定位，而且是在顶部固定栏header后面定义的，会压在header上面，因此需手动提高
     header的层级 */
  header.header_fixed {
    /* 提高z-index值，使得顶部固定栏在顶层，app_layout盒子使用了绝对定位 */
    z-index: 99;
    height: 40px;
  }
  div.app_layout {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    padding-top: 40px;
    padding-bottom: 50px;
    z-index: 1;
    /* 以下代码可以使Android端显示滚动条 */
    .outer {
      position: relative;
      z-index: 2;
      /* 本父级元素不能设置height:100%,否则hasVerticalScroll为false */
      height: 100%;
      background-color: #fff;
      overflow: hidden;
      /* 针对安卓端滚动条不显示的情况，添加以下伪元素，重写滚动条样式 */
      /* 定义滚动条的宽高及圆角 */
      &::-webkit-scrollbar {
        /* 兼容：设置display:none;ios端可以实现，开始滚动条隐藏，滚动屏幕，滚动条开始显示。一段时间不操作后，
        滚动条消失。 安卓端：自己设定滚动条
        webkit内核的浏览器；其中谷歌chrome和苹果safari都是webkit内核浏览器，因此伪元素webkit-scrollbar在苹果手机
        和安卓手机都生效*/
        display: none;
        /*  width: 2px;
        height: 13px;
        -webkit-border-radius: 1px;
        -moz-border-radius: 1px;
        border-radius: 1px; */
      }
      /* 滚动条没有滑块的滚动部分 */
      /* 都等于#ffffff白色 */
      /* &::-webkit-scrollbar-track-piece {
        background-color: rgba(0, 0, 0, 0);
        border-left: 1px solid rgba(0, 0, 0, 0);
      } */
      /* 滚动条上的滑动滑块-同时设置background-color改变滚动条滑块的颜色 */
      /*  &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.3); */
      /* padding-box背景绘制在衬距方框内,content-box裁剪在内容方框内，border-box默认值，没有裁剪 */
      /*  background-clip: padding-box;
        -webkit-border-radius: 1px;
        -moz-border-radius: 1px;
        border-radius: 1px;
        min-height: 28px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.3);
        -webkit-border-radius: 1px;
        -moz-border-radius: 1px;
        border-radius: 1px;
      } */
    }
  }
}
.mui-bar .mui-icon-extra {
  font-size: 24px;
  position: relative;
  z-index: 20;
  padding-top: 10px;
  padding-bottom: 10px;
}
.mui-bar-tab .mui-tab-item2 .mui-icon-extra {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item2 .mui-icon-extra ~ .mui-tab-label[data-v-7ba5bd90] {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 徽章badge */
.mui-icon-extra .mui-badge {
  font-size: 10px;
  line-height: 1.4;
  position: absolute;
  top: -2px;
  left: 100%;
  margin-left: -10px;
  padding: 1px 5px;
  color: #fff;
  background: red;
}
/* mui-active在router文件中设定，和routes是同级属性。来设置一个选中路由时的类名，在router.js中已经定义了
    linkActiveClass:'mui-active',此处自定义了mui-active,同时也是对App.vue（覆盖后删掉第一个router-link标签中的
    mui-active类样式，否则会出现选择非home按钮时，出现两个按钮选中蓝色的情况）中默认的mui-active进行覆盖
     */
.mui-bar-tab .mui-tab-item2.mui-active {
  color: #007aff;
}
/* 六宫格实现后，出现bug。tabbar按钮的路由不能切换了，仅仅实现了点击某个按钮，显示蓝色背景，url地址栏路由不能随点击按钮切换，
  而始终停留在/home。解决办法是：将mui-tab-item类样式置换掉，改为mui-tab-item2。如此一来，原来的和mui-tab-item有关系的
  样式全部置换成mui-tab-item2
*/
/* a链接 */
.mui-bar-tab .mui-tab-item2 {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
/* 第一个span */
.mui-bar-tab .mui-tab-item2 .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
/* 第二个span */
.mui-bar-tab .mui-tab-item2 .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 实现功能：设定即将进入的页面从右往左进入当前页面，即将离开的页面从当前页面向左逐渐消失
1.为router-view加上父级标签transition
2.两组类样式的设定
BUG:切换页面时，组件垂直方向有弹跳现象：页面先从界面中部附近垂直上升，然后才按照设定的动画切换，解决：给.v-leave-to类样式添加一个绝对定位
 */
/* 进入动画起点 */
.v-enter {
  opacity: 0;
  transform: translateX(100%);
  position: absolute;
}
/* 离开动画终点 */
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  /* 解决切换组件弹跳的问题 */
  position: absolute;
}
/* 过渡时间和方式 */
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
/*购物车原本样式*/
/* 去掉mui-icon之前相关的样式，和mui-icon-extra现有样式对比*/
/* .mui-icon {
        font-family: Muiicons;
        font-size: 24px;
        font-weight: 400;
        font-style: normal;
        line-height: 1;
        display: inline-block;
        text-decoration: none;
        -webkit-font-smoothing: antialiased;
    }
    .mui-bar .mui-icon {
        font-size: 24px;
        position: relative;
        z-index: 20;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .mui-bar-tab .mui-tab-item .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item .mui-icon ~ .mui-tab-label[data-v-7ba5bd90] {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .mui-icon .mui-badge {
        font-size: 10px;
        line-height: 1.4;
        position: absolute;
        top: -2px;
        left: 100%;
        margin-left: -10px;
        padding: 1px 5px;
        color: #fff;
        background: red;
    } */
</style>
