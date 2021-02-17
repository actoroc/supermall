<template>
  <div class="cart">
    <cart-nav-bar />
   
    <cart-product ref="product"/>
    <cart-bottom-bar />
  </div>
</template>

<script>
import cartNavBar from "./childitem/cartNavBar";
import cartProduct from "./childitem/cartProduct";
import cartBottomBar from "./childitem/cartBottomBar";
export default {
  components: {
    cartNavBar,
    cartProduct,
    cartBottomBar,
  },
 
};
</script>
<style lang="less" scoped>
.left {
  width: 80px;
}
.cart {
  background: #f2f2f2;
  padding-top: 75px;
  height: 100vh;
}
</style>
