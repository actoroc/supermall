<template>
  <div class="home">
    <nav-bar class="home-nav">
      <span slot="center">购物街</span>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control-faker"
      @tabClick="tabItemClick"
      ref="tabcontrol1"
      v-show="tabcontrolShow"
    ></tab-control>
    <scroll
      class="wrapper"
      :pullUpLoad="true"
      @pullingUp="pullup"
      :probeType="3"
      ref="scroll"
      @scroll="isShowBackTopFun"
    >
      <swipe :banners="banners" @imgLoad="swiperLoad"></swipe>
      <recommend-view :recommends="recommends"></recommend-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabItemClick"
        ref="tabcontrol2"
      ></tab-control>
      <goods-list :goods="goods[transmit].list"></goods-list>
    </scroll>
    <back-top @click.native="backtop" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import swipe from "./childitem/Swipe";
import recommendView from "./childitem/recommendView";

import navBar from "components/common/navbar/navBar";
import scroll from "components/common/scroll/Scroll";
import backTop from "components/common/backtop/backTop";

import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import { getHomeMultiData, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "home",
  components: {
    /*子视图组件*/
    swipe,
    recommendView,

    /*common组件*/
    navBar,
    scroll,
    backTop,

    /*content组件*/
    TabControl,
    GoodsList,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
      },
      transmit: "pop",
      isLoaded: false,
      isShowBackTop: false,
      tabcontrolShow: false,
      tabOffsetTop: 0,
      saveLocation: 0,
    };
  },
  created() {
    this.getHomeMultiData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /*网络请求*/
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
    /*事件监听*/
    tabItemClick(index) {
      switch (index) {
        case 0:
          this.transmit = "pop";
          break;
        case 1:
          this.transmit = "new";
          break;
        case 2:
          this.transmit = "sell";
          break;
        default:
          break;
      }
      this.$refs.tabcontrol1.dindex = index;
      this.$refs.tabcontrol2.dindex = index;
    },
    pullup() {
      this.getHomeGoods(this.transmit);
    },
    backtop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    isShowBackTopFun(position) {
      this.isShowBackTop = -position.y > 800;
      this.tabcontrolShow = -position.y > this.tabOffsetTop;
    },
    swiperLoad() {
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
    },
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("itemImgLoad", () => {
      refresh();
    });
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveLocation);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveLocation = this.$refs.scroll.scroll.y;
  },
};
</script>
<style lang="less" scoped>
.home {
  // position: relative;
  padding-top: 44px;
}
.home-nav {
  background: #ee9595;
  font-size: 1.3rem;
  z-index: 2;
  color: #fff;
}
.tab-control-faker {
  position: relative;
  z-index: 2;
  background: #fff;
}
.wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0px;
  right: 0px;
}
</style>