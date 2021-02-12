<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>

    <div v-for="(item, index) in detailInfo.detailImage" :key="index">
      <div class="info-key">{{ item.key }}</div>
      <div class="info-list">
        <img v-for="(item, indey) in item.list" :key="indey" :src="item" @load="imgload"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    //监听图片加载
    imgload(){
      this.$emit('imagesLoad')
    }
  },
};
</script>

<style lang='less' scoped>

.start {
  width: 20%;
  padding: 10px;
  border-top: solid 2px #ddd;
  align-self: flex-start;
  position: relative;
}
.end {
  width: 20%;
  border-bottom: solid 2px #ddd;
  padding: 10px;
  align-self: flex-end;
  position: relative;
}
.start::before {
  content: "";
  width: 5px;
  height: 5px;
  background: #000;
  position: absolute;
  top: -3.5px;
  left: -2.5px;
}
.end::after {
  content: "";
  width: 5px;
  height: 5px;
  background: #000;
  position: absolute;
  bottom: -2.5px;
  right: -2.5px;
}
.info-desc {
  display: flex;
  flex-direction: column;
  padding: 20px 10px 20px 10px;
  color: #444;
  font-size: .9rem;
  line-height: 1.5rem;
}
.info-key{
  padding: 10px;
  font-size: 1.1rem;
  font-weight: 600;
}
.info-list {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
