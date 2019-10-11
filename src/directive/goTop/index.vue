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
@import '../../assets/css/index'
    .fade-enter-active,
    .fade-leave
        opacity 1
        transition all 0.5s liner cubic-bezier(1.0, 0.5, 0.8, 1.0)
    .fade-enter,
    .fade-leave-active
        opacity 0
        transition all 0.5s liner cubic-bezier(1.0, 0.5, 0.8, 1.0)

    .btn
        wh(40,40)
        position fixed
        bottom 50px
        right 10px
        >img
            width 100%
            height 100%
</style>