<template>
    <section style="height:90%;">
        <keep-alive>
            <map-container :mapId="mapId" />
        </keep-alive>
        <!-- 测试在自定义组件绑定数据 -->
        <div style="display:flex;">
            <test-v-model v-model="tval" :tval="tval"/>
            {{tval}}
            <!-- 1.父及作用域 -->
            <!-- <test-slot>是是是</test-slot> -->
            <!-- 2.具名插槽 -->
            <!-- <test-slot>
                <template v-slot:header>
                    <h1>我是具名插槽</h1>
                </template>
            </test-slot> -->
            <!-- 3.作用域插槽 -->
            <!-- <test-slot>
                <template v-slot:default="slotProp">
                    <span>{{slotProp.user.name}}</span>
                </template>
            </test-slot> -->
            <!-- 作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里 -->
            <!-- 4.解构插槽，缩写#，只在其有参数才起作用 -->
            <test-slot>
                <template #default="{user}">
                    <span>{{user.name}}</span>
                </template>
            </test-slot>
        </div>
    </section>
</template>

<script>
// import MapContainer from "components/map";
import TestVModel from "./testVModel";
import TestSlot from "./testSlot";
export default {
    components:{
        MapContainer: () => import ("components/map"), //异步组件
        TestVModel,
        TestSlot
    },
    data() {
        return {
            mapId:'map-container1',
            tval:''
        };
    },
    methosds:{
    }
};
</script>

<style scoped lang="">

</style>
