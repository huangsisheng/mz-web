<template>
    <section class="container" :id="mapId"></section>
</template>

<script>
export default {
    name:'mapContainer',
    props:{
        mapId:{
            type:String,
            default:'container'
        }
    },
    mounted() {
        let props = {
            id:this.mapId
        }
        this.mapManage = new this.$MapManage(props)
    }
};
</script>

<style scoped lang="stylus">
.container
    width 100%
    height 100%
</style>
