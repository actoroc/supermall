<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 0,
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否开启横向滚动
     */
    timeout: {
      type: Number,
      default: 2000,
    },
    // PullUp:{
    //   type: Boolean,
    //   dafault: true,
    // }
    pullUpLoad: {
      type: Boolean,
      dafault: false,
    },
  },
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pullUpLoad: this.pullUpLoad,
      });

      // 是否监听浏览器滚动
      if (this.probeType == 3 || this.probeType == 2) {
        this.scroll.on("scroll", (position) => {
          this.$emit("scroll", position);
        });
      }

      //是否启动上拉事件
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
        });
      }
    },

    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.finishPullUp();
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
  },
};
</script>