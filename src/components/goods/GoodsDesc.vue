<template>
  <div class="goodsdesc_container layout">
    <better-scroll :data="goodsDescList">
      <div class="content">
        <!-- <h3>这是图文详情组件</h3> -->
        <!-- 图文详情 -->
        <h3>{{ goodsDescInfo.title }}</h3>
        <hr />
        <div class="text" v-html="goodsDescInfo.content"></div>
      </div>
    </better-scroll>
  </div>
</template>

<script>
import Toast from 'mint-ui';
import scroll from '../subComponents/Scroll.vue';
export default {
  data() {
    return {
      // 当前商品id
      goodsId: this.$route.params.id,
      // 商品图文详情列表数组
      goodsDescList: [],
      // 商品图文详情列表对象
      goodsDescInfo: {}
    };
  },
  created() {
    this.getGoodsDesc();
  },
  components: {
    'better-scroll': scroll
  },
  methods: {
    // 获取商品图文详情数据
    getGoodsDesc() {
      this.$http.get(`api/goods/getdesc/${this.goodsId}`).then(result => {
        console.log(result);
        if (result.body.status !== 0) {
          return Toast('获取图文详情数据失败');
        } else {
          this.goodsDescList = result.body.message;
          // 必须在此处拿到goodsDescInfo对象，不能直接在data方法中直接通过this.goodsDescList[0]来拿，否则该对象的所有属性都将报undefined的错误
          this.goodsDescInfo = this.goodsDescList[0];
          console.log(this.goodsDescInfo);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.goodsdesc_container {
  h3 {
    color: #26a2ff;
    line-height: 25px;
    font-size: 16px;
    text-align: center;
  }
  /* 样式不生效，使用/deep/,而且不会污染使用相同组件的公共样式 */
  /deep/ .text {
    > p {
      text-indent: 0.8rem;
      line-height: 20px;
      padding: 0 7px;
    }
    > p[align='center'] {
      margin: 0;
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
