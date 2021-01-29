<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">
      <span class="title-icon">流行</span>{{ goods.title }}
    </div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span
      ><span class="o-price">{{ goods.oldPrice }}</span
      ><span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other" v-if="goods.columns">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-services">
      <span
        class="info-services-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailBaseInfo",
  data() {
    return {};
  },
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang='less' scoped>
.info-title {
  font-size: 1.13rem;
  font-weight: 600;
  padding: 10px 5px;
  .title-icon {
    background: #ec4646;
    font-size: 0.5rem;
    padding: 2px;
    color: #fff;
    border-radius: 4px;
    margin-right: 5px;
    font-weight: none;
    position: relative;
    top: -2px;
  }
}
.info-price {
  padding: 0 5px 20px 5px;
  .n-price {
    font-size: 2rem;
    color: #eb596e;
    margin-right: 5px;
  }
  .o-price {
    font-size: 1.1rem;
    color: #777;
    text-decoration: line-through;
    margin-right: 5px;
  }
  .discount {
    background: #ff577f;
    font-size: 0.5rem;
    padding: 3px;
    color: #fff;
    border-radius: 4px;
    position: relative;
    top: -4px;
  }
}
.info-other {
  display: flex;
  padding: 0 10px 15px 10px;
  border-bottom: solid 4px #ddd;
  justify-content: space-between;
  color: #777;
}
.info-services {
  img {
    width: 15px;
    position: relative;
    top:2px;
    margin-right: 4px;
  }
  display: flex;
  padding: 10px 10px 10px 10px;
  border-bottom: solid 4px #ddd;
  justify-content: space-between;
}
</style>
