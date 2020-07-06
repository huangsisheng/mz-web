<template>
    <section class="">
        <input
            type="text"
            v-bind:value="val"
            v-on:input="$emit('input', $event.target.value)"
        />
        <slot></slot>
    </section>
</template>

<script>
export default {
    /* mode:{
        prop:'checked',
        event:'change'
    }, */
    props:{
        val:String
    }
};
</script>

<style scoped lang="">

</style>
