<template>
    <section style="height:90%;">
        <map-container :mapId="mapId"></map-container>
    </section>
</template>

<script>
import MapContainer from "components/map";
export default {
    components:{MapContainer},
    data() {
        return {
            mapId:'map-container1'
        };
    }
};
</script>

<style scoped lang="">

</style>
