<template>
    <section class="">
        <input :value="value" @input="onInput">
    </section>
</template>

<script>
export default {
    inheritAttrs:false, //解除绑定到根元素的属性
    name:'MyInput',
    props:{
        value:String
    },
    data() {
        return {

        };
    },
    methods: {
        onInput(e){
            this.$emit('input',e.target.value)
            // prop验证
            this.$parent.$emit('validate')
        }
    },
};
</script>

<style scoped lang="stylus">

</style>
