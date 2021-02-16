<template>
  <waterfall :col="2" :data="categoryDetail" @finish="finish">
    <template>
      <goods-list-item
        v-for="(item, index) in categoryDetail"
        :key="index"
        :goodsItem="item"
        class="goods-item"
        :offsetWidth="offsetWidth"
      />
    </template>
  </waterfall>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem";

export default {
  name: "TabContentDetail",
  components: {
    GoodsListItem,
  },
  data() {
    return {
      offsetWidth: 0,
    };
  },
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    finish() {
      this.$emit("finish");
    },
  },
  mounted() {
    this.offsetWidth = this.$el.offsetWidth;
  },
};
</script>

<style scoped lang='less' >
.goods-item {
  background: #f2f2f2;
  font-size: 0.4rem;
  margin: 0 4px 6px 4px;
}
</style>
