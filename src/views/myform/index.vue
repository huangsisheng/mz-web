<template>
    <section class="">
        <h1 style="text-align:center;">表单组件</h1>
        <hr>
        <my-form :mode="mode" :rules="rules" ref="loginForm">
            <my-form-item label="用户名" prop="username">
                <my-input v-model="mode.username"/>
            </my-form-item>
            <my-form-item label="密码" prop="password">
                <my-input v-model="mode.password"/>
            </my-form-item>
            <my-form-item>
                <button @click="submitForm('loginForm')">提交</button>
            </my-form-item>
        </my-form>
    </section>
</template>

<script>
import Notice from "components/notice";

export default {
    components:{
        MyForm: () => import('./Form'),
        MyFormItem: () => import('./FormItem'),
        MyInput: () => import('./Input')
    },
    data() {
        return {
            mode:{username:'',password:''},
            rules:{
                username:[{reuired:true,message:'用户名不能为空'}],
                password:[{reuired:true,message:'密码不能为空'}]
            }
        };
    },
    beforeRouteLeave (to,from,next){
        if(!this.mode.username){
            alert('请输入用户名')
            next(false)
        }else{
            next()
        }
    },
    methods: {
        submitForm(form) {
            this.$refs[form].validate(valid => {
                console.log(valid)
                const notice = this.$create(Notice, {
                title: "社会你杨哥喊你来搬砖",
                message: valid ? "请求登录!" : "校验失败!",
                duration: 1000
                });
                notice.show();
            });
        }
    }
};
</script>

<style scoped lang="stylus">

</style>
