<template>
    <section class="">
        <Nav :city='cityName'></Nav>
        <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
            <van-dropdown-item v-model="value2" :options="option2" />
            <van-dropdown-item v-model="value2" :options="option3" />
        </van-dropdown-menu>
        <van-cell-group>
            <van-cell 
                v-for="cinema in cinemasList" 
                :key="cinema.cinemaId" 
                :title="cinema.name" 
                :label="cinema.address" >
                <div>
                    <p>￥{{(cinema.lowPrice / 100).toFixed(2)}}起</p>
                    <p>距离未知</p>
                </div>
            </van-cell>
        </van-cell-group>
    </section>
</template>
<script>
import Nav from "components/nav";
import { cinemas } from "api";
export default {
    components:{Nav},
    data () {
        return {
            cityName:{
                name:''
            },
            value1: 0,
            value2: 'a',
            option1: [
                { text: '全城', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 }
            ],
            option2: [
                { text: 'APP订票', value: 'a' },
                { text: '好评排序', value: 'b' },
                { text: '销量排序', value: 'c' },
            ],
            option3: [
                { text: '最近去过', value: 'a' },
                { text: '好评排序', value: 'b' },
                { text: '销量排序', value: 'c' },
            ],
            cinemasList:[]
        }
    },
    created(){
        this.getCinemas()
        this.$bus.$on('selectCity',(res) => {
            this.$set(this.cityName,'name',res.city.name)
            console.log(this.cityName)
        })
    },
    methods:{
        async getCinemas(){
            const {data} = await cinemas()
            this.cinemasList = data.cinemas

        }
    },
}
</script>
<style lang="stylus" scoped>
</style>