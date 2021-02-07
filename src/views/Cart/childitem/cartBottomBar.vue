<template>
  <div class="bottom-bar">
    <div class="bottom-left">
      <div class="check" @click="checkAll">
        <div class="circle">
          <i class="fas fa-check-circle" v-show="Allcheck"></i>
        </div>
      </div>
      <span>全选</span>
    </div>
    <div class="bottom-right">
      <div class="total">
        <span>合计:</span><span class="text">{{ total }}</span>
      </div>
      <div class="buy">
        <div class="before"></div>
        <div class="content">结算</div>
        <div class="after"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "cartBottomBar",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList"]),
    // 购物车总价
    total() {
      return (
        "￥" +
        this.cartList
          .filter((item) => item.check)
          .reduce((total, item) => {
            return (total += item.price * item.count);
          }, 0)
          .toFixed(2)
      );
    },
    //购物车商品全选按钮是否被选
    Allcheck() {
      if (this.cartList.length === 0) {
        return false;
      }
      return !this.cartList.find((item) => !item.check);
    },
  },
  methods: {
    //购物车全选方法按钮
    checkAll() {
      this.$bus.$emit("checkAll");
      let test = this.cartList.every((item) => item.check);
      if (test) {
        for (const item of this.cartList) {
          item.check = !item.check;
        }
      } else {
        for (const item of this.cartList) {
          if (!item.check) {
            item.check = !item.check;
          }
        }
      }
    },
  },
};
</script>

<style lang='less' scoped>
.bottom-bar {
  height: 44px;
  background: #fff;
  position: fixed;
  display: flex;
  bottom: 49px;
  left: 0;
  right: 0;
  .bottom-left {
    display: flex;
    height: 100%;
    padding: 10px;
    align-items: center;
    font-size: 0.9rem;
    color: #444;
    .check {
      width: 30px;
      .circle {
        width: 20px;
        height: 20px;
        border: solid 1px #eee;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          color: #ec4646;
          font-size: 20px;
        }
      }
    }
  }
  .bottom-right {
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: flex-end;
    flex: 1;
    .text {
      font-size: 0.7rem;
      color: #ec4646;
    }
    .buy {
      margin-left: 20px;
      display: flex;
      height: 30px;
      .before {
        width: 15px;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        background: #ec4646;
      }
      .content {
        width: 50px;
        height: 100%;
        line-height: 30px;
        text-align: center;
        background: #ec4646;
        color: #fff;
      }
      .after {
        width: 15px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        background: #ec4646;
      }
    }
  }
}
</style>
