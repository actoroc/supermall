<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tabBar",
};
</script>

<style scoped lang="less">
.tabbar {
  height: 49px;
  border-top: solid 1px #ddd;
  box-shadow: 0 -.1px 1px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: #fff;
  color: #888;
}
</style>
