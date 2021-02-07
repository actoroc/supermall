<template>
  <div class="home">
    <nav-bar class="home-nav">
      <span slot="center">购物街</span>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control-faker"
      @tabClick="tabItemClick"
      @recordIndex="recordIndex"
      ref="tabcontrol1"
      v-show="tabcontrolShow"
    />
    <scroll
      class="wrapper"
      :pullUpLoad="true"
      @pullingUp="pullup"
      :probeType="3"
      ref="scroll"
      @scroll="isShowBackTopFun"
    >
      <swipe :banners="banners" @imgLoad="swiperLoad" />
      <recommend-view :recommends="recommends" />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabItemClick"
        @recordIndex="recordIndex"
        ref="tabcontrol2"
      />
      <goods-list
        :goods="goods[transmit].list"
        class="goods-list"
        ref="goodsList"
      />
    </scroll>
    <back-top @click.native="backtop" v-show="isShowBackTop" />
  </div>
</template>
<script>
import swipe from "./childitem/Swipe";
import recommendView from "./childitem/recommendView";

import navBar from "components/common/navbar/navBar";
import scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import { getHomeMultiData, getHomeGoods } from "network/home";
import { itemListenerMixin, backTopMixin, tabControlMixin } from "common/mixin";

export default {
  name: "home",
  components: {
    /*子视图组件*/
    swipe,
    recommendView,

    /*common组件*/
    navBar,
    scroll,

    /*content组件*/
    TabControl,
    GoodsList,
  },
  //混入
  mixins: [itemListenerMixin, backTopMixin, tabControlMixin],
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
      isLoaded: false,
      tabcontrolShow: false,
      tabOffsetTop: 0,
      saveLocation: 0,
      tabControlPosition: {
        pop: 0,
        new: 0,
        sell: 0,
      },
    };
  },
  created() {
    //请求数据
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

    //根据index 请求对应的数据
    tabItemClick(index) {
      this.tabClick(index);
      this.$refs.tabcontrol1.dindex = index;
      this.$refs.tabcontrol2.dindex = index;
    },
    //上拉加载更多
    pullup() {
      this.getHomeGoods(this.transmit);
    },
    //backTop是否显示
    isShowBackTopFun(position) {
      this.showBack(position);
      this.tabcontrolShow = -position.y > this.tabOffsetTop;
    },
    //轮播图加载监听
    swiperLoad() {
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
      // 把goodsListoffsetTop赋值给记录tabControl的变量，来回切换记录当前位置
      for (const key in this.tabControlPosition) {
        this.tabControlPosition[key] = -this.$refs.goodsList.$el.offsetTop;
      }
    },
    //watch 监听tabControl 值的变化并记录当前位置
    recordIndex(odlVal) {
      switch (odlVal) {
        case 0:
          this.oldTransmit = "pop";
          break;
        case 1:
          this.oldTransmit = "new";
          break;
        case 2:
          this.oldTransmit = "sell";
          break;
      }
      this.tabControlPosition[this.oldTransmit] = this.$refs.scroll.scroll.y;
    },
  },
  //回到离开前位置
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveLocation);
    this.$refs.scroll.refresh();
  },
  //记录离开的位置和注销事件总线
  deactivated() {
    this.saveLocation = this.$refs.scroll.scroll.y;
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
};
</script>
<style lang="less" scoped>
.home {
  padding-top: 44px;
  height: 100vh;
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
  position: relative;
  height: calc(100% - 49px);
}
.goods-list {
  background: #f2f2f2;
  z-index: 4;
}
</style>