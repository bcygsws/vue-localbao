<template>
  <div class="info_container layout">
    <better-scroll :data="listinfo">
      <div class="content">
        <!-- <h4>这是列表详情组件</h4> -->
        <h3>{{ listObj.title }}</h3>
        <div class="head_title">
          <span>时间：{{ listObj.add_time | dateFormat }}</span>
          <span>点击次数：{{ listObj.click }}</span>
        </div>
        <!--内容区-->
        <p v-html="listObj.content"></p>
        <comment :listId="id"></comment>
      </div>
    </better-scroll>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import comment from '../subComponents/Comment.vue';
import scroll from '../subComponents/Scroll.vue';
export default {
  data() {
    return {
      // 当前页面是id值为多少的条目的信息，从当前页面url地址中获取id,方便数据请求
      id: this.$route.params.id,
      // 存储内容详情的数组
      listinfo: [],
      // 存储内容详情的对象
      listObj: {}
    };
  },
  methods: {
    getNewsInfo() {
      this.$http.get('api/getnew/' + this.id).then(result => {
        if (result.status === 200) {
          console.log(result.body.message);
          this.listinfo = result.body.message;
          console.log(this.listinfo);
          this.listObj = this.listinfo[0];
        } else {
          Toast('列表详情加载失败……');
        }
      });
    }
  },
  created() {
    //  测试路由跳转至此页面时的当前id值
    // console.log(this);
    this.getNewsInfo();
  },
  components: {
    comment,
    'better-scroll': scroll
  }
};
</script>
<style lang="less" scoped>
.info_container {
  width: 100%;
  h3 {
    font-size: 16px;
    text-align: center;
    color: #e92312;
    padding: 10px 7px 0;
  }
  .head_title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 0 7px;
    > span {
      font-size: 12px;
      color: #007af0;
    }
  }
  p {
    text-indent: 0.8rem;
    /* 设置行间距为30px */
    line-height: 30px;
    padding: 10px 7px;
  }
}
</style>
