import Vue from 'vue';
import VueRouter from 'vue-router';

const home = () => import('views/Home/Home.vue');
const sort = () => import('views/Sort/Sort.vue');
const cart = () => import('views/Cart/Cart.vue');
const file = () => import('views/File/File.vue');
const detail = () => import('views/detail/Detail.vue');

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: home,
  },
  {
    path: '/sort',
    name: 'sort',
    component: sort,
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart,
  },
  {
    path: '/file/:id',
    name: 'file',
    component: file,
  },
  {
    path: '/detail/:iid',
    name: 'detail',
    component: detail,
  },

];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
