<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="main-content">
      <tab-menu
        :categories="categories"
        @selectItem="selectItem"
        class="tab-menu"
      />
      <scroll class="wrapper" ref="scroll">
        <!-- :data="[categoryData]" -->
        <tab-content-category :subcategories="showSubcategory" />
        <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick" />
        <tab-content-detail
          :category-detail="showCategoryDetail"
          ref="contentDetail"
          @finish="finish"
        />
      </scroll>
      <shade :show="isShade" />
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/navBar";
import TabMenu from "./childComps/TabMenu";
import TabControl from "components/content/tabcontrol/TabControl";
import Scroll from "components/common/scroll/Scroll";
import Shade from "components/common/shade/Shade";
import TabContentCategory from "./childComps/TabContentCategory";
import TabContentDetail from "./childComps/TabContentDetail";
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
import { tabControlMixin } from "common/mixin";
export default {
  name: "Sort",
  components: {
    NavBar,
    TabMenu,
    TabControl,
    Scroll,
    Shade,
    TabContentCategory,
    TabContentDetail,
  },
  mixins: [tabControlMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      newRefresh: null,
      isShade: true,
    };
  },
  created() {
    // 1.请求分类数据
    this._getCategory();
  },

  activated() {
    this.$refs.scroll.refresh();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[this.transmit];
    },
  },
  methods: {
    finish() {
      this.$refs.scroll.refresh();
      this.isShade = false;
    },
    _getCategory() {
      getCategory().then((res) => {
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail("pop");
        this._getCategoryDetail("sell");
        this._getCategoryDetail("new");
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategories(index);
      this.$refs.scroll.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped lang='less'>
#category {
  height: 100vh;
}
.nav-bar {
  background-color: #ee9595;
  z-index: 2;
  font-weight: 700;
  color: #fff;
}
.main-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
}
.wrapper {
  flex: 1;
  height: 100%;
}
</style>