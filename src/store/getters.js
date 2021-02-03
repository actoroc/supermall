export default {
  //购物车商品数量
  count(state) {
    return state.cartList.length;
  },
  //购物车商品数组
  cartList(state) {
    return state.cartList;
  },
};
