import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import axios from 'axios'
import VueAxios from 'vue-axios'
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

Vue.use(VueAxios, axios)
Vue.config.productionTip = false


import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);
let vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
