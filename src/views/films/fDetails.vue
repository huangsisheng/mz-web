<template>
    <section class="fd">
        <van-nav-bar title="中国机长">
            <span slot="left" class="location">z</span>
        </van-nav-bar>
        <van-tabbar>
            <van-tabbar-item>选座购票</van-tabbar-item>
        </van-tabbar>
    </section>
</template>
<script>
import { filmsDetails } from "api";
export default {
     components:{},
    data () {
        return {
            details:{}
        };
    },
    mounted(){
        this.getFilmsDetail()
    },
    methods:{
        async getFilmsDetail(){
            const { data } = await filmsDetails()
            this.details = data.film
        }
    },
}
</script>
<style lang="stylus" scoped>
.van-tabbar-item--active 
    background #ff5f16
    color #fff
.fd >>> .van-tabbar-item__text
    font-size 14px 

</style>