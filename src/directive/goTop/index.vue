<template>
    <div id="toTop">
        <transition name="fade">
            <div class="btn" v-show="isShow">
                <img src="../../assets/icons/BackToTop.png" alt="">
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    props:{
        isShow:{
            type:Boolean,
            default:false
        }
    }
}
</script>
<style lang="stylus" scoped>
    .fade-enter-active,
    .fade-leave
        opacity 1
        transition all 0.8s liner cubic-bezier(1.0, 0.5, 0.8, 1.0)
    .fade-enter,
    .fade-leave-active
        opacity 0
        transition all 0.8s liner cubic-bezier(1.0, 0.5, 0.8, 1.0)

    .btn
        wh(30,30)
        position fixed
        bottom 100px
        right 10px
        >img
            width 100%
            height 100%
</style>