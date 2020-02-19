<template>
    <section class="fd" @touchmove="movePage">
        <van-nav-bar :class="{whiteNav:scrollFlag}" :title="scrollFlag ? details.name : ''">
            <img @click="goBack" class="arrow-left" slot="left" src="../../assets/images/arrow-left.png" alt="">
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
            <div class="film-premiere-time grey-text">{{details.premiereAt * 1000 | formatDate}}上映</div>
            <div class="film-premiere-time grey-text">{{details.nation}} | {{details.runtime}}分钟</div>
            <div class="film-synopsis grey-text" :class="{hidde:spreadFlag}">{{details.synopsis}}</div>
            <div class="toggle" @click="spreadFilmDesc">
                <van-icon v-if="!spreadFlag" name="arrow-up" />
                <van-icon v-else name="arrow-down" />
            </div>
        </section>

        <section class="fd-actors">
            <div class="title">演职人员</div>
            <div class="fd-names">
                <ul class="list">
                    <li class="item" v-for="(actor,index) in details.actors" :key="index">
                        <img :src="actor.avatarAddress" alt="">
                        <p class="ac-name">{{actor.name}}</p>
                        <p class="ac-role">{{actor.role}}</p>
                    </li>
                </ul>
            </div>
        </section>

        <section class="fd-photos">
            <van-cell title="剧照" is-link @click.native="allPhotosFlag = true">
                <span>全部({{details.photos.length}})</span>
            </van-cell>
            <div class="photos-list">
                <div class="list-item">
                    <van-image
                        v-for="(photo,index) in details.photos"
                        :key="index"
                        :src="photo"
                        @click="previewPhoto(index)"
                    />
                </div>
            </div>
        </section>

        <van-tabbar>
            <van-tabbar-item>选座购票</van-tabbar-item>
        </van-tabbar>

        <section v-if="allPhotosFlag" class="album-zone">
            <van-nav-bar>
                <span slot="title">剧照（{{details.photos.length}}）</span>
                <img @click="onClickLeft" class="arrow-left" slot="left" src="../../assets/images/arrow-left.png" alt="">
            </van-nav-bar>
            <van-grid :gutter="10">
                <div
                    v-for="(value,index) in details.photos"
                    :key="index"
                    @click="previewPhoto(index)"
                >
                    <img class="photo" :src="value">
                </div>
            </van-grid>
        </section>
    </section>
</template>
<script>
import { filmsDetails } from "api";
import { ImagePreview } from 'vant'
export default {
    name:"filmDetail",
    data () {
        return {
            scrollFlag:false,
            spreadFlag:true,
            allPhotosFlag:false,
            details:{}
        };
    },
    created(){
        console.log(this.$route.params)
        this.getFilmsDetail()
    },
    methods:{
        async getFilmsDetail(){
            const { data } = await filmsDetails()
            this.details = data.film
        },
        goBack(){
            this.$router.back()
        },
        spreadFilmDesc(){
            this.spreadFlag = !this.spreadFlag
        },
        previewPhoto(index){
            ImagePreview({
                images: this.details.photos,
                startPosition: index,
                onClose() {
                    // do something
                }
            });
        },
        movePage(){
            window.addEventListener('scroll',() => {
                setTimeout(() => {
                    this.scrollFlag = window.scrollY > 100 ? true : false
                }, 100);
            })
        },
        onClickLeft(){
            this.allPhotosFlag = false
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
    transition all 0.3s ease
.van-nav-bar__left 
    left 0.1rem
.whiteNav
    width 100%
    background #fff
    transition all 0.3s ease
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
    .col
        display flex
        justify-content space-between
        .name
            color #191a1b
            font-size 18px
            >span 
                display inline-block
                padding 0 2px
                vertical-align middle
                margin-left 7px
                background-color #d2d6dc
                border-radius 2px
                color #fff
                font-size 9px
        .grade
            color #ffb232
            >i
                font-size 18px
                font-style italic
    .grey-text 
        font-size 13px
        color #797d82
        margin-top 4px
    .film-synopsis
        margin-top 12px
        margin-bottom 6px
        height 74px
        transition height .5s ease
    .hidde
        height 37px !important
        overflow hidden
        transition height .5s ease
    .toggle
        text-align center




.fd-actors
    background #fff
    margin-top 10px
    .title
        padding 15px
        font-size 16px
    .fd-names
        overflow-x scroll
        padding 0 15px
        padding-bottom 10px
        .list
            display flex
            .item
                margin-right 10px
                >img
                    wh(85,85)
                >p
                    text-align center
                .ac-name
                    padding-top 10px
                    font-size 12px
                .ac-role
                    color #797d82
                    font-size 10px

.fd-photos
    margin-top 10px
    margin-bottom 1.8rem
    background #fff
    >>> .van-cell__title > span
        font-size 16px
    >>> .van-cell__right-icon
            margin-left 0
    .van-image
        margin-right 15px
    >>> .van-image__img
        wh(150,100)
    .photos-list
        overflow-x scroll
        padding 0 15px
        padding-bottom 10px
        .list-item
            display flex

.album-zone 
    position fixed
    z-index 1
    top 0
    left 0
    right 0
    bottom 0
    overflow-y auto
    background-color #fff
    >>> .van-nav-bar
        position relative
    >>> .van-nav-bar__title > span
        font-size 17px
    .photo
        width calc((100vw - 3px)/3)
        height calc((100vw - 3px)/3)
    >>> .van-grid
        padding 0 !important
        justify-content space-between
</style>