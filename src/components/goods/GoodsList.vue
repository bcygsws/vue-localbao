<template>
  <div class="goods_container layout">
    <better-scroll
      :data="goodsData"
      :pullup="isPullUpLoad"
      @scrolltoend="pullUpHandle"
    >
      <div class="content">
        <!--<h3>这是商品列表页</h3>-->
        <div class="goodslist">
          <!--注意：item.id等于95的打印机图片显示异常，为数据接口的问题，使用v-if和v-else处理，用本地图片替代-->
          <!--a.声明式。本质：点击router-link时，内部实际上就是调用了router实例.push()方法实现的路由跳转，之前的路由改造方式-->
          <!--<router-link
    class="goodsitem"
    v-for="item in goodsData"
    :key="item.id"
    :to="'/home/goodsinfo/' + item.id"
    tag="div"
  >
    <img v-if="item.id != 95" :src="item.img_url" alt="" />
    <img v-else src="../../images/alt-print.jpg" alt="" />
    <h3>{{ item.title }}</h3>
    <dl>
      <dt class="price">
        <span>￥{{ item.sell_price }}</span>
        <span>{{ item.market_price }}</span>
      </dt>
      <dd class="sell">
        <span>热卖中</span>
        <span>剩余{{ item.stock_quantity }}件</span>
      </dd>
    </dl>
  </router-link>-->
          <!--b.编程式导航，路由改造方式-->
          <div
            class="goodsitem"
            v-for="item in goodsData"
            :key="item.id"
            @click="getDetail(item.id)"
          >
            <!--item.id等于95的打印机图片显示异常，为数据接口的问题，使用v-if和v-else处理，用本地图片替代-->
            <img v-if="item.id != 95" :src="item.img_url" alt="" />
            <img v-else src="../../assets/images/alt-print.jpg" alt="" />
            <h3>{{ item.title }}</h3>
            <dl>
              <dt class="price">
                <span>￥{{ item.sell_price }}</span>
                <span>{{ item.market_price }}</span>
              </dt>
              <dd class="sell">
                <span>热卖中</span>
                <span>剩余{{ item.stock_quantity }}件</span>
              </dd>
            </dl>
          </div>
        </div>
        <div class="pullup-tips">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt" ref="noMoreRef">加载更多</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">加载中...</span>
          </div>
        </div>
      </div>
    </better-scroll>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import scroll from '../subComponents/Scroll.vue';
import BScroll from 'better-scroll';
export default {
  data() {
    return {
      // 默认展示的商品列表页码为1
      pageindex: 1,
      // 商品列表数据
      goodsData: [],
      // 下拉加载状态码
      isPullUpLoad: false,
      // 即使请求的数据
      curData: []
    };
  },
  components: {
    'better-scroll': scroll
  },
  created() {
    this.getGoodsList();
    console.log(this); // 查看组件实例属性$router，$router原型中有push原型方法
    // this.pullUpHandle();
  },

  methods: {
    // 获取商品列表数据
    getGoodsList() {
      // 注意路由url和数据接口的区别：
      // 路由为：/home/goodslit
      // 数据接口和路由没有什么关系，只是有时数据接口会用到路由中的部分参数而已
      this.$http
        .get('api/getgoods?pageindex=' + this.pageindex)
        .then(result => {
          if (result.status === 200) {
            //  如果result.body.message为空数组了，表示数据已经加载完成了
            this.curData = result.body.message;
            console.log(result.body.message);
            this.goodsData = this.goodsData.concat(result.body.message);
          } else {
            Toast('加载商品列表失败……');
          }
        });
    },
    // 加载更多按钮
    // getMore() {
    //   this.pageindex++;
    //   // 加载更多显示的内容置于已经显示的后面，需要对getGoodsList()方法进行改造，成为”通式“
    //   this.getGoodsList();
    // },
    // 上拉加载
    pullUpHandle() {
      console.log('这个方法在执行吗？');
      // 1.当滚动条滚动到底部时，上拉将上拉加载状态置为true
      // this.isPullUpLoad = true;
      // 2.每触发一次上拉加载，页码变量(默认为1，从1开始)值+1
      this.pageindex++;
      this.getGoodsList();
    },
    // 编程式导航，直接使用div.goodsitem的点击事件来跳转到 商品详情页

    getDetail(id) {
      /* 编程式导航：对应原生的叫window.location.href
        文档 https://router.vuejs.org/zh/guide/essentials/navigation.html
        方法1: 字符串形式   this.$router.push('/home/goodsinfo/'+id);
        方法2；对象形式    this.$router.push({path:'/home/goodsinfo/'+id});
        方法3：带命名的路由(在router.js匹配规则中为某路由设置name属性) this.$router.push({name:'info',params:{id:id}})
        需要注意{id:id}中第一个id是路由匹配规则中参数名称，第二个id是getDetail(id)方法传入的值
        注意：方法2和方法3中参数不能混用，当参数对象中提供了path后，params参数将被忽略，原因是path已经包含了参数信息，错误实例：
        {path:'路由地址',params:{}},不推荐这样写，params会无效
     */
      this.$router.push({ name: 'info', params: { id: id } });
    }
  },
  // 监听isPullUpload的值，值为false,表示停止上拉加载
  watch: {
    curData(newVal) {
      // console.log(newVal);
      if (newVal.length) {
        // isPullUpLoad为false,子组件不再执行this.$emit来请求数据了
        // this.$nextTick(() => {
        //   this.isPullUpLoad = true;
        // });
        window.setTimeout(() => {
          this.isPullUpLoad = true;
        }, 150);
        // 给出提示，没有更多了
      } else {
        this.isPullUpLoad = false;
        // 必须使用$nextTick，等到DOM加载完成后，再设置innerText值，否则报错：innerText undefined错误
        this.$nextTick(() => {
          this.$refs.noMoreRef.innerText = '没有更多了……';
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.goods_container {
  width: 100%;
  padding: 7px 0;
  .goodslist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 7px;
    .goodsitem {
      width: 49%;
      margin: 3px 1px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      /* 和flex布局结合，保证每一行的两个goodsitem等高，且最小高度为293px */
      min-height: 293px;
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #ccc;
      img {
        /* 要设配各种不同设备，将具体宽高值改为百分比的形式 */
        width: 100%;
        vertical-align: bottom;
      }
      h3 {
        font-size: 13px;
        line-height: 20px;
      }
      dl {
        background-color: #eee;
        /* 去掉dl默认上下外边距 */
        margin: 0;
        dt {
          padding: 5px;
          & :first-child {
            font: normal 700 16px 'Arial';
            color: #e92312;
            padding: 5px;
          }
          & :last-child {
            font: normal 400 12px 'Arial';
            color: #666;
            text-decoration: line-through;
            padding: 5px;
            margin-left: 10px;
          }
        }
        dd {
          padding: 5px;
          margin-left: 0;
          display: flex;
          justify-content: space-between;
          > span {
            font-size: 14px;
          }
        }
      }
    }
  }
  /* 加载更多 */
  .mint-button {
    display: block;
    width: 96%;
    margin-left: 2%;
  }
  /* 上拉加载区域样式 */
  .pullup-tips {
    padding: 20px;
    text-align: center;
    color: #999;
  }
}
</style>
