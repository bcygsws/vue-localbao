<template>
  <div class="photoInfo_container layout">
    <better-scroll :data="thumbsList">
      <div class="content">
        <!-- <h4>这是图片列表详情组件</h4> -->
        <h3>{{ imgInfo.title }}</h3>
        <p class="time_click">
          <span>发表时间：{{ imgInfo.add_time | dateFormat }}</span>
          <span>点击次数：{{ imgInfo.click }}</span>
        </p>
        <hr />
        <!--缩略图区域  安裝vue-preview,在main.js中安装包vue-preview,并使用use方法注册到Vue中-->
        <!--使用步骤：
    1.插件已经更新，img这种标签已经不能使用了，使用vue-preview标签。参考：https://blog.csdn.net/qq_36742720/article/details/83270636
    2.除了为图片添加w、h属性外，还要添加msrc属性，item.msrc=item.src,
    ../lib/css/gloabal.css样式文件也需要书写，并导入main.js文件中
    -->
        <div class="thumbs">
          <vue-preview :slides="thumbsList"></vue-preview>
        </div>
        <div class="text" v-html="imgInfo.content"></div>
        <!--评论列表-->
        <cmt-box :listId="imgId"></cmt-box>
      </div>
    </better-scroll>
  </div>
</template>

<script>
import comment from '../subComponents/Comment.vue';
import scroll from '../subComponents/Scroll.vue';
export default {
  data() {
    return {
      // 图片评论列表id
      imgId: this.$route.params.id,
      // 存储缩略图图片信息的数组
      thumbsList: [],
      //   存储图片详情的对象
      imgInfo: {}
    };
  },
  created() {
    this.getImgInfo();
    this.getThumbImg();
  },
  methods: {
    // 获取图片内容详情方法-getImgInfo
    getImgInfo() {
      this.$http.get('img/' + this.imgId).then(result => {
        console.log(result);
        if (result.status === 200) {
          console.log(result.data.data);
          this.imgInfo = result.data.data[0];
        }
      });
    },
    // 获取缩略图数组
    getThumbImg() {
      this.$http.get('api/getthumimages/' + this.imgId).then(result => {
        if (result.status === 200) {
          console.log(result.body.message);
          result.body.message.forEach(item => {
            // 设置在vue-preview 全屏浏览时的宽和高
            item.w = 600;
            item.h = 400;
            item.msrc = item.src;
          });
          this.thumbsList = result.body.message;
        }
      });
    }
  },
  components: {
    // 注册评论子组件
    'cmt-box': comment,
    'better-scroll': scroll
  }
};
</script>

<style lang="less" scoped>
.photoInfo_container {
  h3 {
    width: 100%;
    padding: 10px 0;
    text-align: center;
    font-size: 14px;
    color: #007aff;
  }
  .time_click {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 0 7px;
    > span {
      font-size: 12px;
      color: #666;
    }
  }
  /* 内容详情文本 */
  .text {
    font-size: 13px;
    line-height: 25px;
    text-indent: 0.8rem;
    padding: 0 7px;
    > strong {
      text-indent: -0.8rem;
    }
  }
  /deep/ .thumbs {
    > div {
      width: 100%;
    }
    display: flex;
    .my-gallery {
      display: flex;
      /* 设置缩略图占满一行后，环绕：即图片缩略图换行排布 */
      flex-wrap: wrap;
      // position: absolute;
      /* 渲染后每一张图都是一个figure */
      figure {
        width: 30%;
        margin: 5px;
        img {
          /* width 100px是图片在默认缩略状态时的宽度 */
          width: 100px;
          /* 设置img和外层的盒子底部对齐，去除和其外层盒子的间隙 */
          vertical-align: middle;
          border-radius: 5px;
          box-shadow: 0 0 10px #cccccc;
        }
      }
    }
    .pswp {
      height: 577px;
      position: fixed;
      .pswp__item {
        .pswp__img {
          // height: 100%;
        }
      }
    }
  }
}
</style>
