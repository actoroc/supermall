<template>
  <scroll class="wrapper" :pullUpLoad="true" :probeType="3" ref="scroll">
    <cart-product-item
      v-for="(item, index) in cartList"
      :key="index"
      :product="item"
    ></cart-product-item>
  </scroll>
</template>

<script>
import scroll from "components/common/scroll/Scroll";
import cartProductItem from "./cartProductItem";
import { mapGetters } from "vuex";

export default {
  name: "cartProduct",
  data() {
    return {};
  },
  components: {
    cartProductItem,
    scroll,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  //由于keep-alive生命周期函数不回调，对应的用activated方法重新计算better-scroll的可滚动高度
   activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style lang='less' scoped>
.wrapper {
  position: relative;
  height: calc(100% - 49px - 44px);
}
</style>
