<template>
  <div class="swipe">
    <mt-swipe :auto="4000" class="mt-swipe">
      <mt-swipe-item
        v-for="(item, index) in topImages"
        :key="index"
        class="swipe-item"
        ><img :src="item" alt="" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import "mint-ui/lib/style.css";
export default {
  data() {
    return {
      isLoad: false,
    };
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.swipe {
  height: 400px;
  overflow: hidden;
}
.swipe-item {
  img {
    width: 100%;
  }
}
</style>