import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import store from 'store'

// 引入全局样式
import "@/assets/css/index"

// 用于设置 rem 基准值
import 'amfe-flexible'

// 引入全局指令
import { directiveFun } from "directive"
directiveFun()

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
