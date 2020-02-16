import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import store from 'store'
import VueAMap from 'vue-amap';
import myPlugin from "./pluging";

// 引入全局样式
import "@/assets/css/index"

// 用于设置 rem 基准值
import 'amfe-flexible'

// 引入全局指令
import globalDirective from "directive"
globalDirective()

// 引入全局过滤器
import globalFilter from "filter"
globalFilter()

/* const VueEventBus = require('vue-event-bus')
Vue.use(VueEventBus) */


import Vant from 'vant'
import 'vant/lib/index.css'
import create from "@/pluging/create";



import dayjs from 'dayjs' //全局引用dayjs
window.dayjs = dayjs

Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// import vConsole from "utils/vconsole";

VueAMap.initAMapApiLoader({
    // 高德的key
    key: '8120b756a0a5a0cc9a543412fc5b2613',
    // 插件集合
    plugin: ['AMap.Geocoder', 'AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    uiVersion: '1.0', // ui库版本版本
    v: '1.4.15'  //扩展更多高德原生方法
});
Vue.use(Vant)
Vue.use(VueAMap);
Vue.prototype.$create = create;
Vue.use(myPlugin, {
    store
})
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
