<template>
  <div class="goods-list-item">
    <div @click="itemLink">
      <img :src="showImages" alt="" @load="imgLoad" />
      <p class="title">{{ goodsItem.title }}</p>
    </div>
    <span class="price">{{ goodsItem.price }}</span>
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
  computed: {
    showImages() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    starItem() {
      this.isActive = !this.isActive;
      if (this.isActive) {
        this.goodsItem.cfav = this.goodsItem.cfav * 1 + 1;
      } else {
        this.goodsItem.cfav = this.goodsItem.cfav * 1 - 1;
      }
    },
    imgLoad() {
      this.$bus.$emit("itemImgLoad");
    },
    itemLink() {
      this.$router.push(`detail/${this.goodsItem.iid}`);
    },
  },
};
</script>

<style lang='less' scoped>
.goods-list-item {
  text-align: center;
  width: 46%;
  height: 319px;
  padding-bottom: 5px;
  .title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.7rem;
  }
  .fa-star {
    font-size: 0.9rem;
    padding-right: 2px;
  }
  img {
    width: 100%;
    height: 256px;
    border-radius: 5px;
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
