<template>
  <div class="swipe">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in banners" :key="index"
        ><a :href="item.link"
          ><img :src="item.image" alt="" @load="imgload" /></a
      ></mt-swipe-item>
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
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    //监听图片加载
    imgload() {
      if (!this.isLoad) {
        this.$emit("imgLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .mint-swipe {
  height: 200px;
  /deep/ .mint-swipe-items-wrap {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>