<template>
  <grid-view :cols="2" sMargin="10" class="grid-detail">
    <goods-list-item
      v-for="(item, index) in categoryDetail"
      :key="index"
      :goodsItem="item"
      class="goods-item"
    />
  </grid-view>
</template>

<script>
import GridView from "components/common/gridView/GridView";
import GoodsListItem from "components/content/goods/GoodsListItem";

export default {
  name: "TabContentDetail",
  components: {
    GridView,
    GoodsListItem,
  },
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped lang='less' >
.grid-detail {
 background: #f2f2f2;
 font-size: .4rem;
}
</style>
