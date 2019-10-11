<template>
    <section class="movie-cinemas">
        <van-nav-bar :title="$route.meta.title">
            <span slot="left" @click="toCityPage" class="location">{{city ? city.name : '成都'}}</span>
            <van-icon v-if="$route.name === 'cinemas'" name="search" slot="right" />
        </van-nav-bar>
    </section>
</template>
<script>
import { mapState } from "vuex";
export default {
    data () {
        return {
            cityName:{
                name:''
            }
        };
    },
    computed:{
        ...mapState({
            city: state => state.city.selectCityObj
        })
    },
    methods:{
        toCityPage(){
            this.$router.push({
                path:'/city'
            })
        }
    },
}
</script>
<style lang="stylus" scoped>
.movie-cinemas >>> .location::after
    content ''
    display inline-block
    width 3px
    height 3px
    border-left 1px solid 
    border-bottom 1px solid
    margin-left 4px 
    margin-bottom 4px 
    transform rotate(-45deg)

.van-nav-bar .van-icon
    color #111
    wh(18,18)
</style>