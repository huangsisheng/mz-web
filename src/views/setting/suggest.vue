<template>
    <section class="suggest">
        <van-nav-bar
            :title="$route.meta.title"
            left-arrow
            @click-left="onClickLeft"
        >
            <span @click="submitSuggest" v-if="$route.name === 'suggest'" slot="right">提交</span>
        </van-nav-bar>
        <div class="suggest-wrap">
            <textarea 
                class="text-area" 
                placeholder="请留下您的宝贵意见，我们将努力改进"
                v-model="suggest"
                maxlength="500"></textarea>
            <div class="text-total">{{suggest.length}}/500</div>
        </div>
    </section>
</template>
<script>
import { showToast } from "utils/toast";
import { suggest } from "api";
import { mapState } from "vuex";
export default {
    data () {
        return {
            suggest:''
        };
    },
    computed:{
        ...mapState({
            username: state => state.user.username
        })
    },
    methods:{
        onClickLeft(){
            this.$router.back()
        },
        async submitSuggest(){
            if(!this.suggest){
                showToast('请先填写意见')
            }else{
                let params = {
                    suggest:this.suggest,
                    username:this.username
                }
                const res = await suggest(params)
                showToast(res.msg)
                this.$router.back()
            }
        }
    },
}
</script>
<style lang="stylus" scoped>
.suggest
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background #f4f4f4
    z-index 1
    .suggest-wrap
        background #fff
        margin-top 10px
        h(250)
        padding 15px
        .text-area
            h(200)
            width 100%
            border 0
        .text-total
            text-align right
            color #bdc0c5
</style>