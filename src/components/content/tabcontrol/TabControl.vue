<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles"
      :key="index"
      :class="{ active: dindex === index }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dindex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
      this.dindex = index;
      this.$emit('tabClick',index)
    },
  },
};
</script>
<style lang="less" scoped>
.tab-control {
  display: flex;
  line-height: 40px;
  background: #fff;
}
.tab-control-item {
  flex: 1;
  text-align: center;
  color: #555;
  & span {
    padding: 10px 5px 5px 5px;
  }
}
.active {
  color: #ee9595;
  span {
    border-bottom: solid 2px #ee9595;
  }
}
</style>