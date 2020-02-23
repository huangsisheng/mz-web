// 实现这种效果new MVue({})

class MVue{
    constructor(options){
        console.log(options)
        // $私有化
        this.$options = options
        this.$data = options.data
        
        // 响应化
        this.observe(this.$data)

        new Watcher(this, 'test')
        this.test;

        new Compile(options.el,this)

        if (options.created){
            options.created()
        }
    }
    // 递归遍历，使传递进来的对象响应化
    observe(value){
        // 通常要处理对象时是用对象的遍历方法
        if(!value || typeof value !== 'object'){
            return;
        }
        // 因为形成闭包所以对象里的值才得以一直能够访问
        Object.keys(value).forEach(key => {
            // 对key做响应式处理
            this.defineReactive(value, key, value[key])
            this.proxyData(key)
        })
    }
    defineReactive(obj, key, val){
        // 递归，data中的对象有深层次的嵌套
        this.observe(val)
        //创建dep实例，dep和key是一一对应
        const dep = new Dep() 
        
        // 响应式原理
        Object.defineProperty(obj, key, {
            get() {
                // Dep.target指向Watcher实例加入到Dep中
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set(newVal){
                if (newVal !== val){
                    val = newVal
                    dep.notify()

                    // console.log(`${key}属性更新了！`)
                }
            }
        })
    }
    // 对vue根上定义属性 代理data中的数据。实现this.xxx访问数据的效果
    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key];
            },
     
            set(newVal) {
                this.$data[key] = newVal;
            }
        });
    }
}
/* 
    为何存在watcher
    使用vue时,一个data中的数据可能对应多个{{xxx}},以及一份数据虽然改变了但未将它渲染到
    视图，所以不需要响应视图。
    因此watcher作用就是：
    1.将数据响应到虚拟dom
    2.依赖收集数据然后更新数据
*/
// Dep管理若干watcher,与key一一对应
class Dep{
    constructor(){
        this.deps = []
    }
    
    addDep(watcher){
        this.deps.push(watcher)
    }
    
    notify(){
        // dep通知watcher更新
        this.deps.forEach(watcher => {
            console.log(watcher)

            watcher.update()
        })
    }
}

// 保存ui中依赖，实现update函数更新之
class Watcher{
    constructor(vm,key,cb){
        this.vm = vm
        this.key = key
        this.cb = cb
        // 将当前实例指向Dep.target
        Dep.target = this
        this.vm[this.key] //读一次key触发一次getter
        Dep.target = null //清空
    }
    
    // 做dom操作
    update(){

        // 需要指向当前实例
        this.cb.call(this.vm, this.vm[this.key])
        // console.log(`${this.key}：属性更新啦啦啦！！！`)
    }

}
















