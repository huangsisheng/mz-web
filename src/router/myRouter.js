import Vue from "vue";
import Home from "@/views/routerSource/home";
import About from "@/views/routerSource/about";

// 实现router插件
/* 
    router的作用就是监听url的变化，解析路由的配置。通过router-view就可以解析到的组件渲染到对应位置
*/

class Myrouter {
    constructor(options){
        this.$options = options
        this.routerMap = {}

        // 路由响应
        // 通过这里可以看出vue-router 与react-router的区别在于vue-router使用了vue响应，所以他们是强绑定关系
        this.app = new Vue({
            data: { //data做了一层代理
                // 保存当前hash地址
                current: '/'
            }
        })
    }

    init(){
        // 实现监听url变化
        this.bindEvents()
        // 解析路由配置
        this.createRouterMap(this.$options) 
        // 实现两个组件
        this.initComponent()
    }
    bindEvents(){
        // 绑定this，否则this指向window
        // 初次加载或刷新后
        window.addEventListener('load', this.onHashChange.bind(this))
        // hash变化的时候
        window.addEventListener('hashchange', this.onHashChange.bind(this))
    }

    onHashChange(){
        // 捕捉当前当前页面的hash
        this.app.current = window.location.hash.slice(1) || '/'
    }

    createRouterMap(options){
        options.routes.forEach((item) => {
            // 路由映射
            this.routerMap[item.path] = item.component
        })
    }

    initComponent(){
        // 实现 router-link、router-view
        // 全局注册一个<router-lin>fff<router-lin />k标签
        Vue.component('router-link',{
            props:{to:String},
            // 不能使用模板，将来打包环境无法编译
            // h(tag,data,children)
            render(h){
               return h('a',{attrs:{href:'#'+this.to}},[
                    // 可能有多个children，标签中可能有文本信息
                    this.$slots.default
                ])
            }
        })

        Vue.component('router-view',{
            // 使用箭头函数是为了让this指向Myrouter,否则指向组件实例
            render: (h) => {
                const comp = this.routerMap[this.app.current]
                return h(comp)
            }
        })
    }
}
// install生成插件
Myrouter.install = function (Vue) {
    // 使用混入，开发高阶组件
    Vue.mixin({
        beforeCreate(){
            console.log(this)
            // this就是new Vue()实例，仅在根组件执行一次，所以main.js new Vue()时将其挂载到根组件，其他地方就都能使用了
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router
                this.$options.router.init()
            }
        }
    })
}

Vue.use(Myrouter)

export default new Myrouter({
    routes:[
        {
            component: Home,
            path:'/home'
        },
        {
            component: About,
            path:'/about'
        }
    ]
})
