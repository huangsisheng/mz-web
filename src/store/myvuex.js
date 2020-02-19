// 需要实现vuex、store
// state、mutations、actions、getters
let Vue
class Store {
    constructor(options){
        // 使用vue响应
        this.state = new Vue({
            data: options.state
        })

        this.mutations = options.mutations

        this.actions = options.actions

        options.getters && this.handleGetters(options.getters)
    }
    commit = (type,arg) => {
        // console.log(this)
        // 使用箭头函数：可以获取到state，所以平时使用mutations里的方法时，第一个参数state就这样来的
        // 调用mutations中的方法
        this.mutations[type](this.state,arg)
    }

    // 所以actions本质上并不是异步函数，只是可以自己在里面声明异步函数去调用mutations来更改state
    dispatch(type,arg){
        // console.log(this)
        this.actions[type]({
            commit: this.commit,
            state: this.state
        },arg)
    }

    // 类似于vue计算属性，所以是响应式
    handleGetters(gettersArg){
        this.getters = {}
        // 因为getters是一个对象
        Object.keys(gettersArg).forEach((key) => {
            // this.getters定义若干属性，这些属性是只读的
            Object.defineProperty(this.getters,key,{
                get: () => {
                    return gettersArg[key](this.state)
                }
            })
        })
    }
}

function install (_Vue){
    // 使用传递进来的vue而不是导入的，可以减小打包时的体积
    Vue = _Vue
    // 实现高阶组件的另一种方式
    Vue.mixin({
        beforeCreate(){
            // this指向组件实例
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default { Store, install }