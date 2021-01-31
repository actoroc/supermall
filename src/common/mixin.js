import { debounce } from './utils';
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null,
    };
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      this.newRefresh();
    };
    this.$bus.$on('itemImgLoad', this.itemImgListener);
  },
};
import backTop from 'components/common/backtop/backTop';
export const backTopMixin = {
  components: {
    backTop,
  },
  data() {
    return {
      isShowBackTop: false,
    };
  },
  methods: {
    backtop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    showBack(position) {
      this.isShowBackTop = -position.y > 800;
    },
  },
};
