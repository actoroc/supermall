<template>
  <div class="product-item">
    <div class="product-top">
      {{ product.name }}
      <img
        src="https://img.alicdn.com/tfs/TB1uSOhKIfpK1RjSZFOXXa6nFXa-11-18.png_24x24q90_.webp"
        class="icon"
      />
    </div>
    <div class="product-content">
      <div class="product-left">
        <div class="check" @click="check">
          <div class="circle">
            <i class="fas fa-check-circle" v-show="product.check"></i>
          </div>
        </div>
        <img :src="product.image" />
      </div>
      <div class="product-right">
        <span class="title">{{ product.title }}</span>
        <div class="product-price">
          <div class="price">
            <span>￥{{ product.price }}</span>
          </div>
          <div class="AddSub">
            <div class="count">×{{ product.count }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="promotions" v-if="product.promotions" v-show="product.check">
      <div class="activity">本店活动</div>
      {{ product.promotions }}
    </div>
  </div>
</template>

<script>
export default {
  name: "cartProductItem",
  data() {
    return {};
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    //商品选中
    check() {
      this.product.check = !this.product.check;
      this.$emit('itemClick');
    },
  },
};
</script>

<style lang='less' scoped>
.product-item {
  margin:  10px;
  background: #fff;
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  .product-top {
    padding-bottom: 10px;
    padding-left: 30px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .icon {
      width: 7px;
    }
  }
  .product-content {
    display: flex;
  }
  .product-left {
    width: 120px;
    height: 90px;
    overflow: hidden;
    display: flex;
    align-items: center;
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
    img {
      width: 90px;
    }
  }
  .product-right {
    flex: 1;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .product-price {
      display: flex;
      justify-content: space-between;
      .price {
        color: #ec4646;
      }
      .count {
        border: solid 0.1px #666;
        border-radius: 6px;
        padding: 1px;
        // transform: scaleY(0.5);
      }
    }
  }
}
.promotions{
  margin-left: 30px;
  padding-top: 10px;
  display: flex;
  align-items: center;
  .activity{
    font-size: .1rem;
    border: solid 1px #ec4646;
    color: #ec4646;
    border-radius: 3px;
    padding: 0 4px;
    margin-right: 8px;
  }
}
</style>
