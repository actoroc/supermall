<template>
  <nav-bar class="nav-bar"
    ><div slot="left" class="left">
      <div class="nav-cart">购物车</div>
      <div class="nav-count">共{{ count }}件宝贝</div>
    </div>
    <div slot="right" class="right">管理</div>
  </nav-bar>
</template>

<script>
import navBar from "components/common/navbar/navBar";
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    navBar,
  },
  computed: {
    ...mapGetters(["count"]),
  },
};
</script>

<style lang='less' scoped>
.nav-bar {
  z-index: 2;
  padding: 15px 15px 10px 15px;
  line-height: normal !important;
  background: #faf9f9;

}
.left {
  display: flex;
  flex-direction: column;
  width: 80px;
  .nav-cart {
    font-size: 1.4rem;
    font-weight: 600;
  }
  .nav-count {
    font-size: 0.8rem;
    color: #555;
    margin-top: 5px;
  }
}
.right{
  display: flex;
  flex-direction: row-reverse;
}
</style>
