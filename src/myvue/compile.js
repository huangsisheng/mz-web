/* 
    compile 遍历模板，将里面的插值表达式处理
    遇到k-xx,以及@xx做特殊处理
*/
class Compile{
    constructor(el,vm){
        this.$vm = vm
        // 宿主元素
        this.$el = document.querySelector(el)
        if (this.$el){
            // 1.将$el中的内容搬家到一个fragment(碎片,分片)，提高操作效率
            this.$fragment = this.node2Fragment(this.$el)
            // console.log(this.$fragment)
            // 2.编译fragment
            this.compile(this.$fragment)
            // console.log(this.$fragment)

            // 3.将编译结果追加到宿主
            this.$el.appendChild(this.$fragment)
        }
    }
// 遍历el，把里面的内容搬到新创建的fragment
    node2Fragment(el){
        const fragment = document.createDocumentFragment()
        let child 
        while ((child = el.firstChild)) {
            // 由于appdendChild是移动操作， 老大走了，老二变老大，老三变老二...
            fragment.appendChild(child)
        }
        return fragment
    }
// 把动态值替换，将指令和事件做处理
    compile(el){
        //遍历el 
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if (this.isElement(node)){
                // 如果是元素节点，需要处理指令k-xx、事件@xx
                this.compileElement(node)
            } else if (this.isInterPolation(node)){ //插值表达式
                this.compileText(node)
            }

            // 递归子元素
            if(node.childNodes && node.childNodes.length > 0){
                this.compile(node)
            }
        })

    }
    isElement(node){
        return node.nodeType === 1
    }
    // 是否是插值表达式
    isInterPolation(node){
        // 满足 {{xxx}}  文本
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    compileElement(node){
        // 查看node属性里有没有 k-xx、@xx
        const nodeAttr = node.attributes
        Array.from(nodeAttr).forEach(attr => {
            //k-text="aaa"
            const attrName = attr.name  //k-text
            const exp = attr.value  // aaa
            // 指令
            if(attrName.indexOf('k-') === 0){
                const dir = attrName.substring(2)
                this[dir] && this[dir](node,this.$vm,exp)
            }else if(attrName.indexOf('@') === 0){ //注册事件
                const eventName = attrName.substring(1)
                // exp -> 方法名
                this.handleEvent(node,this.$vm,exp,eventName)
            }
            
        })
    }
    text(node, vm, exp){
        this.update(node, vm, exp,'text')
    }
    handleEvent(node, vm, exp, eventName){
        // 因此methods是一个对象
        const fn = vm.$options.methods && vm.$options.methods[exp]
        if (eventName && fn){
            node.addEventListener(eventName,fn.bind(vm))
        }
    }

//  双向数据绑定
    model(node, vm, exp){
        // 数据变了该界面
        this.update(node, vm, exp, 'model')
        // 界面变了该数据
        node.addEventListener('input',e => {
            vm[exp] = e.target.value
        })
    }
    modelUpdator(node,value){
        node.value = value
    }

    html(node, vm, exp){
        this.update(node, vm, exp, 'html')
    }

    htmlUpdator(node, value){
        node.innerHTML = value
    }
// 把插值表达式替换为实际内容
    compileText(node){
        // {{xxx}}  
        // RegExp.$1是匹配分组部分
        // console.log(RegExp.$1)
        const exp = RegExp.$1
        this.update(node, this.$vm, exp,'text')
    }

// 编写update函数，它可复用 exp是表达式，dir是具体操作 text model html...
    update(node,vm,exp,dir){
        const fn = this[dir + 'Updator']
        fn && fn(node,vm[exp])
        
        
        /* new Vue({
            data:{
                xxx:'aaa'
            }
        })
        exp就是xxx */
        // 创建Watcher
        new Watcher(vm,exp,function () {
            fn && fn(node, vm[exp])
        })
    }
    textUpdator(node, value){
        node.textContent = value
    }
}

















