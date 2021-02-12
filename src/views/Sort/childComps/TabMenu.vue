<template>
  <scroll class="menu-wrapper" ref="scroll">
    <div class="menu-list">
      <div
        class="menu-list-item"
        :class="{ active: index === currentIndex }"
        v-for="(item, index) in categories"
        :key="index"
        @click="itemClick(index)"
        ref="itemList"
      >
        {{ item.title }}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "TabMenu",
  components: {
    Scroll,
  },
  props: {
    categories: Array,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  mounted() {},
  updated() {
    this.autoLayout();
    this.$refs.scroll.refresh();
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("selectItem", index);
    },
    //自适应高度
    autoLayout() {
      let height = this.$refs.scroll.$el.clientHeight;
      let itemHeight = height / 10;
      let itemList = this.$refs.itemList;
      for (let item of itemList) {
        item.style.height = itemHeight + "px";
        item.style.lineHeight = itemHeight + "px";
      }
      this.$refs.scroll.refresh();
    },
  },
};
</script>

<style scoped>
.menu-wrapper {
  background-color: #f6f6f6;
  height: 100%;
  width: 25%;
  box-sizing: border-box;
}

.menu-list-item {
  height: 10%;
  /* line-height: 45px; */
  text-align: center;
}
.menu-list {
  height: 100%;
}
.menu-list-item.active {
  font-weight: 700;
  color: #ee9595;
  background-color: #e0e0e0;
  border-left: 3px solid red;
}
</style>
