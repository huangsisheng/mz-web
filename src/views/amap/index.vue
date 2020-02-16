<template>
  <section style="height:60%;">
    <keep-alive>
      <map-container :mapId="mapId" />
    </keep-alive>
    <!-- 测试在自定义组件绑定数据 -->
    <div id="wrap" style="display:flex;">
      <input v-focus type="text" value="自定义指令获得焦点" />
      <test-v-model v-model="tval" :tval="tval" />
      <transition name="fade" :duration="5000">
        <span v-if="tval">接受：{{tval}}</span>
      </transition>
      <!-- 1.父及作用域 -->
      <!-- <test-slot>是是是</test-slot> -->
      <!-- 2.具名插槽 -->
      <!-- <test-slot>
                <template v-slot:header>
                    <h1>我是具名插槽</h1>
                </template>
      </test-slot>-->
      <!-- 3.作用域插槽 -->
      <!-- <test-slot>
                <template v-slot:default="slotProp">
                    <span>{{slotProp.user.name}}</span>
                </template>
      </test-slot>-->
      <!-- 作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里 -->
      <!-- 4.解构插槽，缩写#，只在其有参数才起作用 -->
      <test-slot>
        <template #default="{user}">
          <span>{{user.name}}</span>
        </template>
      </test-slot>
    </div>
    <div v-for="item in btnList" :key="item.type">
        <my-button :btnType="item.type" :text="item.text"/>
    </div>
  </section>
</template>

<script>
// import MapContainer from "components/map";
import TestVModel from "./testVModel";
import TestSlot from "./testSlot";
var mixin = {
  data() {
    return {
      mi: "混入儿子",
      aa: "aa"
    };
  },
  created() {
    console.log("儿子: " + this.mi);
    console.log("儿子: " + this.aa);
  },
  methods: {
    foo: function() {
      console.log("foo");
    },
    conflicting: function() {
      console.log("from mixin");
    }
  }
};
export default {
  // 混入
  /* 生命周期都会调用
        1.先调用混入的生命周期钩子；
        2.当data数据同名时以组件中的为准；
        3.methods会合并成一个对象，当函数同名时以组件中的为准
    */
  //   当多个组件有同样的结构时可以使用混入
  mixins: [mixin],
  components: {
    MapContainer: () => import("components/map"), //异步组件
    MyButton: () => import("components/mybutton"), //异步组件
    TestVModel,
    TestSlot
  },
  // 依赖祖先注入的方法/数据
  inject: ["bigp"],
  /* 
  实例创建之后，可以通过 vm.$data 访问原始数据对象。
  Vue 实例也代理了 data 对象上所有的属性，因此访问 vm.a 等价于访问 vm.$data.a。
   */
  data() {
    return {
      mapId: "map-container1",
      tval: "",
      tMixn: "测试混入爸爸",
      aa: "bb",
      btnList:[
          {type:'success',text:'成功'},
          {type:'fail',text:'失败'},
          {type:'warning',text:'警告'},
          {type:'danger',text:'危险'},
      ]
    };
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  created() {
    console.log(this.$data.mapId);
    console.log(this.bigp);
    console.log("爸爸 :" + this.tMixn);
    console.log("爸爸 :" + this.aa);
  },
  methosds: {}
};
</script>

<style>
.fade-enter-active,
.fade-leave-to {
  opacity: 1;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
