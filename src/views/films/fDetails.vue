<template>
    <section class="fd">
        <van-nav-bar :class="{whiteNav:scrollFlag}" :title="scrollFlag ? details.name : ''">
            <img class="arrow-left" slot="left" src="../../assets/images/arrow-left.png" alt="">
        </van-nav-bar>
        <div class="fd-banner">
            <img :src="details.poster" alt="">
        </div>
        <section class="fd-info">
            <div class="col">
                <div class="name">{{details.name}}<span>{{details.filmType.name}}</span></div>
                <div class="grade"><i>{{details.grade}}</i>分</div>
            </div>
            <div class="film-category grey-text">{{details.category}}</div>
            <div class="film-premiere-time grey-text">{{details.premiereAt}}上映</div>
            <div class="film-premiere-time grey-text">{{details.nation}} | {{details.runtime}}分钟</div>
            <div class="film-synopsis grey-text hidde">{{details.synopsis}}</div>
            <div class="toggle">
                <span class="arrow"></span>
            </div>
        </section>
        <section class="fd-actors">
            <div class="title">演职人员</div>
            <div class="fd-names">
                <ul class="list">
                    <li class="item" v-for="(actor,index) in details.actors" :key="index">
                        <img :src="actor.avatarAddress" alt="">
                        <p>{{actor.name}}</p>
                        <p>{{actor.role}}</p>
                    </li>
                </ul>
            </div>
        </section>

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
            scrollFlag:false,
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


.van-nav-bar
    position fixed
    background transparent
.whiteNav
    background #fff

.van-hairline--bottom::after
    border 0

.arrow-left
    wh(30,30)
    vertical-align middle

.fd-banner
    position relative
    // top -1.226667rem
    h(220)
    > img
        width 100%
        height 100%

.fd-info
    background #fff
    padding 15px

.fd-actors
    background #fff
    margin-top 10px
    .title
        padding 15px
    .fd-names
        overflow-y scroll
        padding 0 15px
        .list
            float left
            display flex
            .item
                >img
                    wh(85,85)
                >p
                    text-align center


</style>