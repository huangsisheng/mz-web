<template>
    <section class="avatar">
        <div class="nick-avatar">
            <van-image
            width="1.8rem"
            height="1.8rem"
            round
            fit="cover"
            :src="require('../../assets/images/avatar.png')"
            />
            <div class="nick-name">立即登录</div>
        </div>
        <van-grid>
            <van-grid-item v-for="item in orderLinks" :key="item.key">
                <van-image :src="item.imgSrc" />
                <span>{{item.title}}</span>
            </van-grid-item>
        </van-grid>

        <van-cell-group>
            <van-cell v-for="(item,index) in userLinks" :title="item.title" :key="index" icon="shop-o" :value="item.value ? '￥'+ item.value : ''" is-link :to="item.toPage">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <!-- <van-icon
                    slot="right-icon"
                    name="search"
                    style="line-height: inherit;"
                /> -->
            </van-cell>
        </van-cell-group>
    </section>
</template>
<script>
export default {
    data () {
        return {
            orderLinks:[
                {
                    key:'films',
                    title:'电影订单',
                    imgSrc: require('../../assets/images/films-order.png')
                },
                {
                    key:'goods',
                    title:'商品订单',
                    imgSrc: require('../../assets/images/goods-order.png')
                }
            ],
            userLinks:[
                {
                    title:'卖座券',
                    toPage:'',
                    icon:''
                },
                {
                    title:'组合红包',
                    toPage:'',
                    icon:''
                },
                {
                    title:'余额',
                    toPage:'',
                    icon:'',
                    value:'0'
                },
                {
                    title:'设置',
                    toPage:'',
                    icon:''
                },
            ]
        };
    },
    methods:{},
}
</script>
<style lang="stylus" scoped>
.nick-avatar
    h(140)
    background-image url('https://assets.maizuo.com/h5/v5/public/app/img/bg.6837f67.png') 
    background-size cover
    background-position center
    display flex
    align-items center
    padding-left 20px
    color #fff
.nick-name
    font-size 16px
    margin-left 20px

.avatar >>> .van-grid-item
    flex-basis 50% !important
    color #797d82
.avatar >>> .van-image
    wh(26,26)

.van-cell-group
    margin-top 10px

.van-cell__right-icon 
    opacity .5
    font-size 12px

</style>