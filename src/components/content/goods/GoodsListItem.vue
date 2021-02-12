<template>
  <div class="goods-list-item">
    <div @click="itemLink">
      <img :src="showImages" alt="" @load="imgLoad" />
      <p class="title">{{ goodsItem.title }}</p>
    </div>
    <span class="price">￥{{ goodsItem.price }}</span>
    <span class="star" @click="starItem" :class="{ active: isActive }">
      <i class="far fa-star"></i
      ><span class="collect">{{ goodsItem.cfav }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      isActive: false,
    };
  },
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImages() {
      //组件复用，有可能路径不一，可以用短路运算符解决
      return (
        this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      );
    },
  },
  methods: {
    // 点击收藏样式
    starItem() {
      this.isActive = !this.isActive;
      if (this.isActive) {
        this.goodsItem.cfav = this.goodsItem.cfav * 1 + 1;
      } else {
        this.goodsItem.cfav = this.goodsItem.cfav * 1 - 1;
      }
    },
    //通过事件总线跨组件通讯
    imgLoad() {
      this.$bus.$emit("itemImgLoad");
    },
    //路由转跳到详情页
    itemLink() {
      this.$router.push(`detail/${this.goodsItem.iid}`);
    },
  },
};
</script>

<style lang='less' scoped>
.goods-list-item {
  text-align: center;
  background: #fff;
  overflow: hidden;
  border-radius: 5px;
  .title {
    // overflow: hidden;
    // white-space: nowrap;
    // text-overflow: ellipsis;
    // font-size: 0.7rem;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .fa-star {
    font-size: 0.9rem;
    padding-right: 2px;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    // border-radius: 5px;
  }
  .price {
    color: #eb596e;
    padding-right: 10px;
  }
}
.active {
  color: #eb596e;
}
</style>
