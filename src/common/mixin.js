import { debounce } from './utils';

//图片加载后better-scroll重新计算可滚动高度refresh
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
//返回顶部
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
export const tabControlMixin = {
  data: function() {
    return {
      transmit: 'pop',
      oldTransmit: '',
    };
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.transmit = 'pop';
          if (this.tabControlPosition) {
            setTimeout(() => {
              this.$refs.scroll.scrollTo(0, this.tabControlPosition['pop']);
            }, 200);
          }
          break;
        case 1:
          this.transmit = 'new';
          if (this.tabControlPosition) {
            setTimeout(() => {
              this.$refs.scroll.scrollTo(0, this.tabControlPosition['new']);
            }, 200);
          }
          break;
        case 2:
          this.transmit = 'sell';
          if (this.tabControlPosition) {
            setTimeout(() => {
              this.$refs.scroll.scrollTo(0, this.tabControlPosition['sell']);
            }, 200);
          }
          break;
      }
    },
  },
};
