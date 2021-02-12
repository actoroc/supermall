
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
          break;
        case 1:
          this.transmit = 'new';
          break;
        case 2:
          this.transmit = 'sell';
          break;
      }
    },
  },
};
