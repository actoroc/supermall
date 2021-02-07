<template>
  <scroll class="wrapper" ref="scroll">
    <cart-product-item
      v-for="(item, index) in cartList"
      :key="index"
      :product="item"
      @itemClick="itemClick"
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
    this.newrefresh();
  },
  methods: {
    itemClick() {
      this.newrefresh();
    },
    newrefresh() {
      setTimeout(() => {
        this.$refs.scroll.refresh();
      }, 0);
    },
  },
  beforeUpdate() {
    
    this.$bus.$on("checkAll", this.newrefresh);
  },
};
</script>

<style lang='less' scoped>
.wrapper {
  position: relative;
  height: calc(100% - 49px - 44px - 10px);
}
</style>
