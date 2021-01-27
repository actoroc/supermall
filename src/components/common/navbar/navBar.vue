<template>
  <div class="navbar">
    <div id="left">
      <slot name="left"></slot>
    </div>
    <div id="center">
      <slot name="center"></slot>
    </div>
    <div id="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.navbar {
  line-height: 44px;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  // padding-bottom: 44px;
  #left,
  #right {
    width: 60px;
  }
  #center {
    text-align: center;
    flex: 1;
    color: white;
  }
}
</style>