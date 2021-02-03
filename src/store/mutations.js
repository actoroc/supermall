export default {
  //商品数量加1
  addCounter(state, payload) {
    payload.count += 1;
  },
  //增加商品到购物车
  addToCart(state, payload) {
    payload.count = 1;
    payload.check = false;
    state.cartList.push(payload);
  },
};
