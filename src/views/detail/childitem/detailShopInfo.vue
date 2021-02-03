<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" />
      <span class="title">{{ shop.name }}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sell">
          <div class="sell-count">
            {{ shop.sells | sellCountFilter }}
          </div>
          <div class="sell-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{ shop.goodsCount }}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'score-more': item.isBetter }">
              {{ item.isBetter ? "高" : "低" }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailShopInfo",
  data() {
    return {};
  },
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    //过滤值超过1w用万代替
    sellCountFilter(value) {
      if (value < 10000) {
        return value;
      } else {
        return (value / 10000).toFixed(1) + "万";
      }
    },
  },
};
</script>

<style lang='less' scoped>
.shop-top {
  padding: 20px 0px 20px 15px;
  display: flex;
  align-items: center;
  img {
    margin-right: 10px;
    border: solid 1px #ddd;
    padding: 4px;
    border-radius: 50%;
    width: 50px;
  }
  .title {
    font-size: 1.1rem;
    font-weight: 600;
  }
}
.shop-middle {
  display: flex;
  .shop-middle-item {
    flex: 1;
  }
  .shop-middle-left {
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: solid 1px #ddd;
    .info-sell {
      margin-right: 15px;
      .sell-count {
        padding-bottom: 8px;
        font-size: 1.3rem;
        text-align: center;
      }
      .sell-text {
        font-size: 0.5rem;
      }
    }
    .info-goods {
      .goods-text {
        font-size: 0.4rem;
      }
      .goods-count {
        padding-bottom: 8px;
        font-size: 1.3rem;
        text-align: center;
      }
    }
  }
}
.shop-middle-right {
  table{
   border-spacing: 20px 10px;
  }
  .score {
    color: #16c79a;
  }
  .better {
    background: #16c79a;
    color: #fff;
    padding: 1px;
    border-radius: 3px;
  }
  display: flex;
  justify-content: center;
  font-size: 0.9rem;
  .score-better {
  color: #eb596e;
}
.score-more {
  background: #eb596e;
  color: #fff;
  padding: 1px;
  border-radius: 3px;
}

}
.shop-info{
  display: flex;
  flex-direction: column;
  border-bottom: solid 3px #ddd;
  padding-bottom: 25px;
}
.shop-bottom {
  margin-top: 20px;
  padding:4px 0 ;
  width: 33%;
  border-radius: 8px;
  background: #f6f5f5;
  align-self: center;
  text-align: center;
}
.enter-shop{
  font-size: 1.1rem;
  color: #555;
}
</style>
