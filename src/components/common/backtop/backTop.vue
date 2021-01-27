<template>
  <div class="backtop">
    <i class="fas fa-chevron-up"></i>
    <div>top</div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped>
.backtop {
  text-align: center;
  width: 40px;
  height: 40px;
//   border: solid 1px #ddd;
  border-radius: 50%;
  font-size: 0.8rem;
  color: #888;
  position: fixed;
  right: 20px;
  bottom: 59px;
  background: #fff;
  box-shadow:  0px 0px 40px 1px rgba(100,100,100,0.5);
  i {
    margin-top: 6px;
  }
  div {
    margin-top: -5px;
  }
}
</style>
