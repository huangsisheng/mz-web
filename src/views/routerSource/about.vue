<template>
    <section class="">
        <div>我是：about</div>
        <router-link to="/home">去home</router-link>
        <div>扔雷：{{$store.getters.boom}}个</div>
        <div @click="clickHan">炸死你</div>
    </section>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    methods: {
        clickHan(){
            this.$store.dispatch('increamAsync')
        }
    },
};
</script>

<style scoped lang="">

</style>
