<template>
  <div class="main-tab-bar">
      <tab-bar>
        <tab-bar-item path="/home">
        <i class="fas fa-home icon" slot="icon"></i>
        <span slot="nav">首页</span>
      </tab-bar-item>
      <tab-bar-item path="/sort">
        <i class="fas fa-th-large" slot="icon"></i>
        <span slot="nav">分类</span>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <i class="fas fa-shopping-cart" slot="icon"></i>
        <span slot="nav">购物</span>
      </tab-bar-item>
      <tab-bar-item path="/file">
        <i class="fas fa-user" slot="icon"></i>
        <span slot="nav">我的</span>
      </tab-bar-item>
      </tab-bar>
  </div>
</template>

<script>
import tabBar from "components/common/TabBarMain/tabBar";
import tabBarItem from "components/common/TabBarMain/tabBarItem";

export default {
  components: {
    tabBar,
    tabBarItem,
  },
};
</script>
<style lang="less" scoped>

</style>