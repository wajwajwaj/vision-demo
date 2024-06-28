import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import axios from 'axios'
import './assets/css/global.less'

// 请求基准路径的配置（请求的前缀）
axios.defaults.baseURL = 'http://localhost:8888/api/'
// 将axios、echarts挂在到vue的实例上，通过this.$http 和 this.$echarts使用
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
