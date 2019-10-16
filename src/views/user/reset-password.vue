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
                    maxlength="11"
                    disabled
                >
                </van-field>
                <van-field
                    v-model="user.newPassword"
                    :type="eyeFlag ? 'text' : 'password'"
                    :right-icon="eyeFlag ? 'eye-o' : 'closed-eye'"
                    @click-right-icon="eyeFlag = !eyeFlag"
                    placeholder="新密码"
                />
                <van-field
                    v-model="user.againPassword"
                    type="password"
                    placeholder="确认密码"
                />
            </van-cell-group>
            <div class="login-submit">
                <van-button type="primary" size="large" @click="submit">重置密码</van-button>
            </div>
        </div>
    </section>
</template>
<script>
import { mapActions } from "vuex";
import storage from "utils/storage";
import { showToast } from "utils/toast";
export default {
    data () {
        return {
            user:{
                phone:storage.get('user'),
                newPassword:'',
                againPassword:''
            },
            eyeFlag:false,
        };
    },
    methods:{
        ...mapActions(['resetPass']),
        submit(){
            if(this.user.newPassword !== this.user.againPassword){
                showToast('两次输入密码不一致')
            }else{
                this.resetPass(this.user)
            }
        }
    },
}
</script>
<style lang="stylus" scoped>
.web-login
    position fixed
    top 0
    bottom 0
    left 0
    right 0
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
.vali-btn
    color #bdc0c5
    display inline-block
    height 24px
    line-height 24px
    text-align right

.error-message
    display inline-block
    padding-top 7px
    padding-left 0.426667rem
    font-size 11px
    color #ff5f16

.passText >>> .van-button__text
    opacity 1 !important

.login-form >>> .van-hairline--top-bottom::after
    border 0
</style>