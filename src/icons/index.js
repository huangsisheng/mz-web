
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

// 全局引入SvgIcon组件
Vue.component('svg-icon', SvgIcon)

// svg自动加载
// require.context：引入svg上下文  false:不会再有嵌套层级
const req = require.context('./svg', false, /\.svg$/)
// [qq.svg,weixin/svg]
req.keys().map(req)