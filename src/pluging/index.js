import MapManage from "./map/mapManage";
export default {
    install(Vue, store) {
        // 1. 添加全局方法或属性
        Vue.prototype.$MapManage = MapManage
        Vue.prototype.$bus = new Vue()
        window.MapManage = MapManage
    }
}

