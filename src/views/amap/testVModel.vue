<template>
    <section class="">
        <input type="text" :value="tval" @input="inputVal($event)">
    </section>
</template>

<script>
export default {
    model: {
        prop: 'tval',
        event: 'inputV'
    },
    props:{'tval':String},
    data() {
        return {
            // tval:'1213'
        };
    },
    methods: {
        inputVal(e){
            console.log(e.target.value)
            this.$emit('inputV',e.target.value)
        }
    },
};
</script>

<style scoped lang="">

</style>
