<template>
    <section class="">
        <div>我是：about</div>
        <router-link to="/home">去home</router-link>
        <svg-icon icon-class="qq"></svg-icon>
        <div>扔雷：{{$store.getters.boom}}个</div>
        <div @click="clickHan">炸死你</div>
        <c-com :val='val' v-model="val">
            {{val}}
        </c-com>
    </section>
</template>

<script>
import CCom from "./cCom";
export default {
    components:{CCom},
    data() {
        return {
            val:''
        };
    },
    methods: {
        clickHan(){
            this.$store.dispatch('increamAsync')
            console.log(this.val)
        }
    },
};
</script>

<style scoped lang="">

</style>
