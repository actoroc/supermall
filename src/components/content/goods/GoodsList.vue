<template>
  <div class="goods-list">
    <waterfall :col="2" :data="goods" @finish="finish">
      <template>
        <goods-list-item
          v-for="(item, index) in goods"
          :key="index"
          :goodsItem="item"
          class="home-goods"
          :offsetWidth="offsetWidth"
        ></goods-list-item>
      </template>
    </waterfall>
  </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem";
export default {
  name: "",
  components: {
    GoodsListItem,
  },
  data() {
    return {
      offsetWidth: 0,
    };
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {
    this.offsetWidth = this.$el.offsetWidth - 20;
  },
  methods: {
    finish() {
      this.$emit("finish");
    },
  },
};
</script>

<style lang='less' scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 2px;
  flex-direction: column;
}
.home-goods {
  margin: 0 4px 8px 4px;
  display: inline-block;
}
</style>
