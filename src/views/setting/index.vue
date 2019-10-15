<template>
    <section class="">
        <van-nav-bar
            title="标题"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-cell-group>
            <van-cell title="账号ID" value="117309564" />
        </van-cell-group>
        <van-cell-group>
            <van-cell title="登录密码" is-link value="修改" />
            <van-cell title="安全密码" is-link value="未设置" />
        </van-cell-group>
        <van-cell-group>
            <van-cell title="软件版本" is-link />
            <van-cell title="意见反馈" is-link />
        </van-cell-group>
        <van-cell-group>
            <van-cell @click="showClear" title="清楚缓存" value="0.1KB" />
        </van-cell-group>
        <van-tabbar>
            <van-tabbar-item @click="showQuit">退出登录</van-tabbar-item>
        </van-tabbar>
        <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '20%',background:'#f4f4f4' }"
        >
            <ul class="pop-top">
                <li>{{isQuite ? '是否退出卖座网' :'是否确认清除缓存'}}</li>
                <li @click="quitAndclear">{{isQuite ? '退出' :'清除'}}</li>
            </ul>
            <div class="pop-bottom" @click="cancel">取消</div>
        </van-popup>
    </section>
</template>
<script>
import { logout, mapActions } from "vuex";
import { removeToken } from "utils/auth";
export default {
    components:{},
    data () {
        return {
            show:false,
            isQuite:true
        };
    },
    methods:{
        ...mapActions(['logout']),
        onClickLeft(){
            this.$router.back()
        },
        showPopup(){
            this.show = true
        },
        cancel(){
            this.show = false
        },
        showQuit(){
            this.showPopup()
            this.isQuite = true
        },
        showClear(){
            this.showPopup()
            this.isQuite = false
        },
        quitAndclear(){
            if(this.isQuite){
                this.logout()
                
            }else{

            }
        }
    },
}
</script>
<style lang="stylus" scoped>
.van-cell-group
    margin-top 10px
.pop-top,
.pop-bottom
    text-align center
    background #fff
.pop-top 
    margin-bottom 5px
    > li:first-child
        height 30px
        line-height 30px
        color #bdc0c5
        font-size 13px
        border-bottom 1px solid #ededed
    > li:last-child
        height 50px
        line-height 50px
        color #ff5f16
        font-size 14px
.pop-bottom
    height 49px
    line-height 49px
    font-size 14px
</style>