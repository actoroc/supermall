<template>
  <div class="home">
    <nav-bar class="home-nav">
      <span slot="center">购物街</span>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control-faker"
      @tabClick="tabItemClick2"
      @recordIndex="recordIndex"
      ref="tabcontrol1"
      v-show="tabcontrolShow"
    />
    <scroll
      class="wrapper"
      :pullUpLoad="true"
      @pullingUp="pullup"
      :probeType="0"
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
        @finish="finish"
      />
      <div class="refresh" v-show="isShowRefresh">
        <mt-spinner type="snake"></mt-spinner>正在加载更多！
      </div>
    </scroll>
    <back-top @click.native="backtop" v-show="isShowBackTop" />
    <shade :show="isShade" />
  </div>
</template>
<script>
import swipe from "./childitem/Swipe";
import recommendView from "./childitem/recommendView";

import navBar from "components/common/navbar/navBar";
import scroll from "components/common/scroll/Scroll";
import Shade from "components/common/shade/Shade";

import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import { getHomeMultiData, getHomeGoods } from "network/home";
import { backTopMixin, tabControlMixin } from "common/mixin";

export default {
  name: "home",
  components: {
    /*子视图组件*/
    swipe,
    recommendView,

    /*common组件*/
    navBar,
    scroll,
    Shade,

    /*content组件*/
    TabControl,
    GoodsList,
  },
  //混入
  mixins: [backTopMixin, tabControlMixin],
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
      isShowRefresh: false,
      tabcontrolShow: false,
      tabOffsetTop: 0,
      saveLocation: 0,
      isShade: true,
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
        setTimeout(() => {
          this.$refs.scroll.finishPullUp();
        }, 2000);
      });
    },
    /*事件监听*/

    //上拉加载更多
    pullup() {
      this.getHomeGoods(this.transmit);
      this.isShowRefresh = true;
  
    },
    //backTop是否显示
    isShowBackTopFun(position) {
      this.showBack(position);
      this.tabcontrolShow = -position.y >= this.tabOffsetTop;
    },
    //轮播图加载监听
    swiperLoad() {
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
      // 把goodsListoffsetTop赋值给记录tabControl的变量，来回切换记录当前位置
      for (const key in this.tabControlPosition) {
        this.tabControlPosition[key] = -this.tabOffsetTop;
      }
    },
    finish() {
      this.$refs.scroll.refresh();
      this.isShade = false;
      this.isShowRefresh = false;
    },
    //根据index 请求对应的数据
    tabItemClick(index) {
      this.tabClick(index);
      this.$refs.tabcontrol1.dindex = index;
      this.$refs.tabcontrol2.dindex = index;
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
    tabItemClick2(index) {
      switch (index) {
        case 0:
          this.transmit = "pop";
          if (this.tabControlPosition) {
            setTimeout(() => {
              this.$refs.scroll.scrollTo(0, this.tabControlPosition["pop"]);
              this.$refs.scroll.refresh();
            }, 20);
          }
          break;
        case 1:
          this.transmit = "new";
          if (this.tabControlPosition) {
            setTimeout(() => {
              this.$refs.scroll.scrollTo(0, this.tabControlPosition["new"]);
              this.$refs.scroll.refresh();
            }, 20);
          }
          break;
        case 2:
          this.transmit = "sell";
          if (this.tabControlPosition) {
            setTimeout(() => {
              this.$refs.scroll.scrollTo(0, this.tabControlPosition["sell"]);
              this.$refs.scroll.refresh();
            }, 20);
          }
          break;
      }
      this.$refs.tabcontrol1.dindex = index;
      this.$refs.tabcontrol2.dindex = index;
    },
  },
  mounted() {},
  //回到离开前位置
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveLocation);
  },
  //记录离开的位置和注销事件总线
  deactivated() {
    this.saveLocation = this.$refs.scroll.scroll.y;
  },
};
</script>
<style lang="less" scoped>
.home {
  padding-top: 44px;
  height: 100vh;
}
.shade {
  width: 100vw;
  height: calc(100% - 49px - 44px);
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 4;
}
.home-nav {
  background: #ee9595;
  font-size: 1.3rem;
  z-index: 2;
  color: #fff;
}
.tab-control-faker {
  z-index: 2;
  background: #fff;
  position: absolute;
  width: 100%;
}
.wrapper {
  position: relative;
  height: calc(100% - 49px);
}
.goods-list {
  background: #f2f2f2;
  z-index: 4;
}
.refresh {
  position: relative;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f2f2f2;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>