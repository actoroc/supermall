<template>
  <div class="goods-list">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goodsItem="item"
    ></goods-list-item>
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
    return {};
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang='less' scoped>
.goods-list{
    padding-top:5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 2px;
}
</style>
