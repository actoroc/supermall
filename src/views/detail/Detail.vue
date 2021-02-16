<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav" />
    <scroll class="wrapper" :probeType="3" ref="scroll" @scroll="positionShow">
      <swipe :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imagesLoad="imagesLoad" />
      <detail-param-info :itemParams="itemParams" ref="param" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list
        :goods="recommendInfo"
        ref="goods"
        class="detail-goods"
        @finish="finish"
        :offsetWidth="offsetWidth"
      />
    </scroll>
    <detail-bottom-bar class="bottom-bar" @cartClick="cartClick" />
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
//自己封装的防抖函数
import { debounce } from "common/utils";
import { getDetail, Goods, Shop, getRecommend } from "network/detail";
import { backTopMixin } from "common/mixin";

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
      promotions: "",
      offsetWidth:0,
    };
  },
  //混入backTop组件和图片加载重新计算scroll的可滚动高度
  mixins: [backTopMixin],
  created() {
    //1.根据iid异步请求数据
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      //用data代理
      const data = res.result;
      //有优惠数据再赋值，
      if (data.promotions) {
        this.promotions = data.promotions.list[data.promotions.list.length - 1];
      }
      //2.分离
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.分离商店信息
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.itemParams = data.itemParams;
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      //4.推荐信息
      getRecommend().then((res) => {
        this.recommendInfo = res.data.list;
      });
      //5.themeTopYs记录对应标题的滚动高度
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
  mounted() {
    this.offsetWidth = this.$el.offsetWidth;
  },
  //组件摧毁注销事件总线，防止组件复用相互影响

  methods: {
    //监听图片是否加载完
    imagesLoad() {
      //加载完刷新可滚动高度
      //图片加载完可滚动高度正确，所以高度对应标题在这调用
      this.teemeTopYsFun();
    },
    finish() {
      this.$refs.scroll.refresh();
    },
    //点击顶部标题滚动到对应的高度
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]);
    },
    //监听滚动，滚动对应高度top标题相应高亮
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
    //加入购物车
    cartClick() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.price = this.goods.realPrice;
      product.name = this.shop.name;
      product.iid = this.iid;
      product.promotions = this.promotions;
      this.$store.dispatch("addCart", product).then((res) => {
        this.$toast.show({
          text: res,
          position: "center",
          time: 1500,
        });
      });
    },
  },
};
</script>

<style lang='less' scoped>
.detail-goods {
  background: #f2f2f2;
}
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
