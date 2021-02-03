<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div><i class="fab fa-github-alt"></i><span class="text">客服</span></div>
      <div><i class="fas fa-store"></i><span class="text">店铺</span></div>
      <div :class="{ active: isActive }" @click="collectClick">
        <i class="far fa-star"></i><span class="text">{{ collect }}</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="before"></div>
      <div class="cart" @click="cartClick">加入购物车</div>
      <div class="buy">立刻购买</div>
      <div class="after"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    //加入购物车
    cartClick() {
      this.$emit("cartClick");
    },
    //收藏按钮
    collectClick() {
      this.isActive = !this.isActive;
      this.$toast.show({
        text: "已收藏",
        position: "center",
      });
    },
  },
  computed: {
    //动态显示收藏
    collect() {
      return this.isActive ? "已收藏" : "收藏";
    },
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
    div {
      width: 42px;
      flex-direction: column;
    }
    i {
      color: #666;
    }
  }
}
.bar-right {
  flex: 1;
  padding: 5px;
}
.cart {
  flex-grow: 1;
  color: #fff;
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
.active {
  i,
  span {
    color: #ec4646 !important;
  }
}
</style>
