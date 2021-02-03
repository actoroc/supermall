export default {
  //增加商品到购物车的代理方法
  async addCart({ state, commit }, pyload) {
    let oldProduct = state.cartList.find((item) => item.iid === pyload.iid);
    if (oldProduct) {
      commit('addCounter', oldProduct);
      return '数量+1.';
    } else {
      commit('addToCart', pyload);
      return '商品已加入到购物车。';
    }
  },
};
