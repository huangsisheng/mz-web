<script>
export default {
    /* 根据组件化思想，当有很多类似的按钮（具体例子而已），模板渲染就会产生大量相同的代码
     所以可以使用render函数来优化重复代码量*/
    props:{
        btnType:{
            type:String,
            default:'success'
        },
        text:String
    },
    name:'mybtn',
    // jsx语法/react
    render(){
        return(
            <button
                class={{
                    success:this.btnType === 'success',
                    warning:this.btnType === 'warning',
                    danger:this.btnType === 'danger',
                    fail:this.btnType === 'fail'
                }}
                onClick={this.handleClick}
            >{this.text}</button>
        ) 
    },
    /* render(h){
        // creatElement函数参数：
         
        //第一个参数（必要参数）：主要用于提供DOM的html内容，类型可以是字符串、对象或函数
        //第二个参数（类型是对象，可选）：用于设置这个DOM的一些样式、属性、传的组件的参数、绑定事件之类
        //第三个参数（类型是数组，数组元素类型是VNode，可选）：主要是指该结点下还有其他结点，用于设置分发的内容，包括新增的其他组件。注意，组件树中的所有VNode必须是唯一的
        return(
            h('button',{
                class:{
                    success:this.btnType === 'success',
                    warning:this.btnType === 'warning',
                    danger:this.btnType === 'danger',
                    fail:this.btnType === 'fail'
                },
                domProps:{
                    innerText:this.text
                },
                // 事件监听器
                on:{
                    click:this.handleClick
                }
            })
        )
    }, */
    
    methods:{
        handleClick(){
            console.log(this.btnType)
        }
    }
}
</script>
<style lang="stylus">
    button
        border-radius 5px
        wh(50,30)
        color #fff
    .success
        background green
    .fail
        background #000
    .warning
        background #999
    .danger
        background red
</style>