<template>
  <div class="bscroll" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import Bscroll from 'better-scroll';
export default {
  props: {
    probeType: {
      // 可选值：1、2、3当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
      // 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，
      // 而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件
      type: Number,
      default: 2
    },
    click: {
      // better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event
      // 参数加一个私有属性 _constructed，值为 true,如果better-scroll里面的标签不能点击触发默认事件，需要在标签标签中添加class='needsclick'
      type: Boolean,
      default: true
    },
    data: {
      // 存储数据
      type: Array,
      default: () => []
    },
    listenScroll: {
      // 是否监听滚动，返回的滚动的位置
      type: Boolean,
      default: true
    },
    // 用于派发是否滚动到底部事件，用于上拉加载
    pullup: {
      type: Boolean,
      default: false
    },
    pulldown: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    console.log(this.pullup);
    // 延迟20ms执行，保证页面加载完成,因为大多浏览器每17ms刷新一次
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    _initScroll() {
      // 初始化better-scroll
      if (!this.$refs.wrapper) {
        return;
      }
      // 没有初始化滚动条时执行
      if (!this.scroll) {
        this.$nextTick(() => {
          this.scroll = new Bscroll(this.$refs.wrapper, {
            probeType: this.probeType,
            click: this.click,
            scrollY: true,
            // 必须设置，否则滚动条不显示
            scrollbar: true,
            // 下面三项需要设置，方便测试滚动条的滚动效果
            // 开启鼠标拖动
            disableMouse: false,
            // 启用手指触摸
            disableTouch: false,
            // 开启鼠标滚轮
            mouseWheel: true,
            // 开启上拉加载
            pullUpLoad: true
          });
          // 是否派发滚动到底部事件，用于上拉加载
          this.scroll.on('scrollEnd', pos => {
            // 滚动到底部
            if (this.pullup && pos.y <= this.scroll.maxScrollY + 50) {
              this.$emit('scrolltoend');
            }
            this.scroll.finishPullUp();
            this.scroll.refresh();
          });
        });
      }
      // 用于派发顶部下拉事件，下拉刷新
      // if (this.pulldown) {
      //   this.scroll.on('touchend', pos => {
      //     // 下拉动作
      //     if (pos.y > 50) {
      //       this.$emit('pulldown');
      //     }
      //   });
      // }
      // const _this = this;
      // if (this.listenScroll) {
      //   // 如果有监听滚动事件，就向外派发一个滚动事件，返回的是滚动的位置的数值
      //   this.scroll.on('scroll', pos => {
      //     // 由于在滚动事件中，$emit前面的this指向会改变，为此需要保存该指向
      //     _this.$emit('scrollPos', pos);
      //   });
      // }
    },
    enable() {
      // 启用 better-scroll, 默认 开启。
      this.scroll && this.scroll.enable();
    },
    disable() {
      // 禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。
      this.scroll && this.scroll.disable();
    },
    refresh() {
      // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      // better-scroll滚动到指定数值的位置
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      // better-scroll滚动到指定元素位置
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  watch: {
    data() {
      // 监听传入的data的数据变化时，重新计算 better-scroll，确保滚动的效果正常。
      setTimeout(() => {
        // 调用methods中refresh方法，当数据一旦发生变化，重新计算BScroll
        this.refresh();
      }, 20);
    }
  }
};
</script>

<style scoped lang="less">
.bscroll {
  position: relative;
  z-index: 4;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  /deep/ div.bscroll-vertical-scrollbar {
    width: 5px !important;
    right: 0 !important;
  }
}
</style>
