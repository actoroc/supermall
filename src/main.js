import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//按需引入mint-ui 的轮播图功能
import { Swipe, SwipeItem } from 'mint-ui';
//解决移动端300ms延迟，引入fastclick
import fastclick from 'fastclick';
fastclick.attach(document.body);
//注册组件
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//自定义封装toast组件并注册
import toast from 'components/common/Toast/toast';
Vue.use(toast);

Vue.config.productionTip = false;

//注册事件总线，解决跨多个组件通信
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
