<template>
  <div id="app">
    <van-skeleton v-if="loading" title avatar :row="22" />
    <div v-else>
      <transition :name="transitionName">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view class="child-view" />
        </keep-alive>
        <router-view v-else class="child-view" />
      </transition>
      <tab-bar v-if="show"></tab-bar>
    </div>
  </div>
</template>
<script>
import TabBar from "components/tabbar";
export default {
  components: { TabBar },
    //   注入 方法/数据
  provide:{
      bigp:`it's bigp`
  },
  data() {
    return {
      transitionName: "slide-left",
      loading: true
    };
  },
  computed: {
    show() {
      return this.$route.meta.showtabbar;
    }
  },
  watch: {
    $route(to, from) {
      if (to.path === "/") {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  },
  mounted() {
    this.loading = false;
  }
};
</script>
<style lang="stylus">
.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate3d(30px, 0, 0);
  transform: translate3d(30px, 0, 0);
}

.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate3d(-30px, 0, 0);
  transform: translate3d(-30px, 0, 0);
}
#app /deep/ .van-skeleton__avatar {
    background-color: pink;
}
#app /deep/ .van-skeleton__row, .van-skeleton__title {
    background-color: pink;
}
</style>
