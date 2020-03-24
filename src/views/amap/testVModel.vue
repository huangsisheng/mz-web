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
    props:{
        'tval':String,
        testVal:Function
    },
    data() {
        return {
            // tval:'1213'
        };
    },
    created(){
        console.log(this)
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
