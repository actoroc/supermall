<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link"
        ><img :src="item.image" alt="" /></a
      >
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  width: 100%;
  .recommend-item{
      padding-bottom: 15px;
      text-align: center;
     & img{
        width:100% ;
        padding: 15px 8px 6px 8px;
      }
      & span{
          color: #aaa;
      }
  }
}
</style>

