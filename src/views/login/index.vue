<template>
    <section class="web-login">
        <div class="logo">
            <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png" alt="">
        </div>
        <div class="login-form">
            <van-cell-group>
                <van-field
                    type="tel"
                    v-model="user.phone"
                    left
                    clearable
                    placeholder="手机号"
                    @focus="onFocus"
                    @input="onInput(user.phone)"
                    maxlength="11"
                >
                    <!-- <span v-if="!timer" :class="{valiPass:valiPass}" class="vali-btn" slot="button" @click="getValidate">获取验证码</span> 
                    <span v-else class="vali-btn" slot="button">{{countTime}}S</span> -->
                </van-field>
                <span v-if="errorFlag" class="error-message">请输入11位正确的手机号码</span>
                <!-- <van-field
                    v-model="user.password"
                    placeholder="验证码"
                /> -->
                <van-field
                    v-model="user.password"
                    :type="eyeFlag ? 'text' : 'password'"
                    placeholder="密码"
                    :right-icon="eyeFlag ? 'eye-o' : 'closed-eye'"
                    @click-right-icon="eyeFlag = !eyeFlag"
                />
                <!-- closed-eye -->
            </van-cell-group>
            <div class="not-egister" @click="toRegister">还没注册？去注册</div>
            <div class="login-submit">
                <van-button :class="{passText:valiPass}" type="primary" size="large" @click="submit">登录</van-button>
            </div>
        </div>
    </section>
</template>
<script>
const REG = /^1(3|5|6|7|8|9)\d{9}/
import { mapActions } from "vuex";
export default {
    data () {
        return {
            user:{
                phone:'',
                password:''
            },
            valiPass:false,
            errorFlag:false,
            countTime:60,
            timer:null,
            eyeFlag:false
        };
    },
    watch:{
        countTime(newVAL){
            if(newVAL <= 0){
                this.countTime = 60
                clearInterval(this.timer)
                this.timer = null
            }
        }
    },
    methods:{
        ...mapActions(['login']),
        onFocus(){
            this.errorFlag = false
        },
        onInput(val){
            this.valiPass = REG.test(this.user.phone)
        },
        getValidate(){
            if(this.valiPass){
               this.timer =  setInterval(() => {
                    this.countTime--
                }, 1000)
            }
        },
        toRegister(){
            this.$router.push('register')
        },
        submit(){
            if(this.user.phone){
                this.errorFlag = !this.valiPass
                if(!this.errorFlag && this.user.password){
                    this.login(this.user)
                }
            }else{
                this.errorFlag = false
            }
        }
    },
}
</script>
<style lang="stylus" scoped>
.web-login
    background #fff
    .logo
        margin 79px auto 40px
        text-align center
        > img
            wh(60,60)

.login-submit
    padding 70px 0.426667rem 0
    .van-button--primary
        height 40px
        line-height 40px
        background #ff5f16
        border 1px solid #ff5f16
        .van-button__text
            font-size 14px
            opacity .3
.vali-btn
    color #bdc0c5
    display inline-block
    height 24px
    line-height 24px
    text-align right
.valiPass
    color #000

.error-message
    display inline-block
    padding-top 7px
    padding-left 0.426667rem
    font-size 11px
    color #ff5f16
.not-egister
    display inline-block
    padding-top 7px
    padding-left 0.426667rem
    font-size 11px
    color #bdc0c5

.passText >>> .van-button__text
    opacity 1 !important
</style>