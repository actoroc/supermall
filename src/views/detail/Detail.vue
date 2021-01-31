<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav" />
    <scroll
      class="wrapper"
      :pullUpLoad="true"
      :probeType="3"
      ref="scroll"
      @scroll="positionShow"
    >
      <swipe :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imagesLoad="imagesLoad" />
      <detail-param-info :itemParams="itemParams" ref="param" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list :goods="recommendInfo" ref="goods" />
    </scroll>
    <detail-bottom-bar class="bottom-bar" />
    <back-top @click.native="backtop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import detailNavBar from "./childitem/detailNavBar";
import swipe from "./childitem/detailSwipe";
import detailBaseInfo from "./childitem/detailBaseInfo";
import detailShopInfo from "./childitem/detailShopInfo";
import detailGoodsInfo from "./childitem/detailGoodsInfo";
import detailParamInfo from "./childitem/detailParamInfo";
import detailCommentInfo from "./childitem/detailCommentInfo";
import detailBottomBar from "./childitem/detailBottomBar";

import { debounce } from "common/utils";
import { getDetail, Goods, Shop, getRecommend } from "network/detail";
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Detail",
  components: {
    scroll,
    GoodsList,

    detailNavBar,
    swipe,
    detailBaseInfo,
    detailShopInfo,
    detailGoodsInfo,
    detailParamInfo,
    detailCommentInfo,
    detailBottomBar,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommendInfo: [],
      themeTopYs: [],
      teemeTopYsFun: null,
      currentIndex: 0,
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.itemParams = data.itemParams;
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      getRecommend().then((res) => {
        this.recommendInfo = res.data.list;
      });
      this.teemeTopYsFun = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.goods.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
      }, 50);
    });
  },

  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    imagesLoad() {
      this.newRefresh();
      this.teemeTopYsFun();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]);
    },
    positionShow(position) {
      this.showBack(position);
      let length = this.themeTopYs.length;
      let y = -position.y;
      for (let index = 0; index < length; index++) {
        if (
          this.currentIndex !== index &&
          y >= this.themeTopYs[index] &&
          y < this.themeTopYs[index + 1]
        ) {
          this.currentIndex = index;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
  },
};
</script>

<style lang='less' scoped>
.detail {
  padding-top: 44px;
  position: relative;
  background: #fff;
  z-index: 1;
  height: 100vh;
}
.detail-nav-bar {
  z-index: 2;
  background: #fff;
}

.wrapper {
  position: relative;
  height: calc(100% - 49px);
  background: #fff;
}
.bottom-bar {
  position: relative;
}
</style>
