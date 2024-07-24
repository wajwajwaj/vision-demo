import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.less'
import chalkTheme from '../public/static/theme/chalk.json'
import vintageTheme from '../public/static/theme/vintage.json'

Vue.use(ElementUI)

// 请求基准路径的配置（请求的前缀）
axios.defaults.baseURL = 'http://localhost:8888/api/'
// 将axios、echarts挂在到vue的实例上，通过this.$http 和 this.$echarts使用
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
echarts.registerTheme('vintage', vintageTheme)
echarts.registerTheme('chalk', chalkTheme)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
