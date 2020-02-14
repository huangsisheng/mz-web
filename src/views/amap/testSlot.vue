<template>
    <section class="">
        <!-- 1.默认值 -->
        <!-- <button>
            <slot>默认值</slot>
        </button> -->
        <!-- <header>
            /name属性，默认default /
            <slot name="header"></slot>
        </header> -->
        <!-- 3.作用域插槽 -->
        <!-- 元素上的属性：插槽 prop -->
        <span>
            <slot v-bind:user="user"></slot>
        </span>
    </section>
</template>

<script>
export default {
    data() {
        return {
            user:{
                name:'张三'
            }
        };
    },
    methods: {

    },
};
</script>

<style scoped lang="">

</style>
