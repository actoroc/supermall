<template>
    <nav-bar>
      <div slot="left" class="left" @click="backClick">
        <i class="fas fa-chevron-left"></i>
      </div>
      <div slot="center" class="center">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="center-item"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
</template>

<script>
import navBar from "components/common/navbar/navBar";
export default {
  name: "",
  components: {
    navBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style lang='less' scoped>
.center {
  display: flex;
}
.center-item {
  flex: 1;
  font-size: 0.9rem;
}
.active {
  color: #ee9595;
}
.left {
  font-size: 1.5rem;
  text-align: center;
  color: #888;
}
</style>
