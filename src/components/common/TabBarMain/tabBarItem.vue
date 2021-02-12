<template>
  <div class="item" :style="isActiveColor" @click="itemFun">
    <slot name="icon"></slot>
    <slot name="nav"></slot>
  </div>
</template>


<script>
export default {
  name: "item",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "pink",
    },
  },
  computed: {
    isActive() {
      //如果当前组件传进来的path和当前路由的路径一致就返回true；

      return this.$route.path.indexOf(this.path) !== -1;
    },
    isActiveColor() {
      //根据isActive（）返回的结果给template对应的el动态赋值style
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemFun() {
      //点击转到相应的路由，路径是file则带上id
      this.path !== "/file"
        ? this.$router.replace(this.path)
        : this.$router.replace(`${this.path}/zhangsan`);
    },
  },
};
</script> 


<style scoped lang="less">
.item {
  height: 49px;
  // border-right: solid 1px #ddd;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & i {
    margin-bottom: 5px;
  }
  & span {
    font-size: 10px;
  }
}
</style>