<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div><i class="fab fa-github-alt"></i><span class="text">客服</span></div>
      <div><i class="fas fa-store"></i><span class="text">店铺</span></div>
      <div><i class="far fa-star"></i><span class="text">收藏</span></div>
    </div>
    <div class="bar-item bar-right">
      <div class="before"></div>
      <div class="cart">加入购物车</div>
      <div class="buy">购买</div>
      <div class="after"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped>
.bottom-bar {
  background: #fff;
  height: 49px;
  display: flex;
  .bar-item {
    display: flex;
    align-items: center;

    div {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
  }
  .bar-left {
    flex-grow: 1;
    div {
      flex: 1;
      flex-direction: column;
    }
    i {
      color: #666;
    }
  }
}
.bar-right {
  flex-grow: 2;
  padding: 5px;
}
.cart {
  flex-grow: 1;
  background: #ffc478;
}
.buy {
  flex-grow: 1;
  color: #fff;
  background: #ec4646;
}
.fa-github-alt {
  color: #ec4646 !important;
}
.before,
.after {
  width: 18.5px;
}
.before {
  border-top-left-radius: 18.5px;
  border-bottom-left-radius: 18.5px;
  background: #ffc478;
}
.after {
  border-top-right-radius: 18.5px;
  border-bottom-right-radius: 18.5px;
  background: #ec4646;
}
</style>
