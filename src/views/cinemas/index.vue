<template>
    <section class="">
        <Nav :city='cityName'></Nav>
    </section>
</template>
<script>
import Nav from "components/nav";
export default {
    components:{Nav},
    data () {
        return {
            cityName:{
                name:''
            }
        };
    },
    created(){
        this.$bus.$on('selectCity',(res) => {
            this.$set(this.cityName,'name',res.city.name)
            console.log(this.cityName)
        })
    },
    methods:{},
}
</script>
<style lang="stylus" scoped>
</style>