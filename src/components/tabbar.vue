<template>
    <section class="">
        <van-tabbar
            route
            v-model="active"
            active-color="#ff5f16"
            inactive-color="#000"
            >
            <van-tabbar-item 
                v-for="(item,index) in links"
                :key="index"
                :to="item.toPath"
                :icon="item.toIcon"
                @click="selectItem(index)"
            >{{item.toName}}</van-tabbar-item>
        </van-tabbar>
    </section>
</template>
<script>
export default {
    data () {
        return {
            links:[
                {
                    toPath:'/films/nowPlaying',
                    toName:'电影',
                    toIcon:"video-o"
                },
                {
                    toPath:'/cinemas',
                    toName:'影院',
                    toIcon:"tv-o"
                },
                {
                    toPath:'/mz-act/active',
                    toName:'咨询',
                    toIcon:"comment-o"
                },
                {
                    toPath:'/center',
                    toName:'我的',
                    toIcon:"user-o"
                },
            ],
            active:0
        };
    },
    methods:{
        selectItem(index){
            this.active = index
            if(index === 0){
                this.$bus.$emit('changePage')
            }
        }
    },
}
</script>
<style lang="stylus" scoped>
</style>