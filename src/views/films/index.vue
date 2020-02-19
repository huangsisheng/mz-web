<template>
  <section class="movie">
      <div>
        <Nav></Nav>
        <van-swipe style="height: 250px;" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in bannerList" :key="item.bannerId">
                <img :src="item.imgUrl" alt="">
            </van-swipe-item>
        </van-swipe>
        <van-tabs sticky v-model="active" swipeable @click="togglePage">
            <van-tab v-for="item in links" :key="item.toName" :title="item.title">
                <router-view></router-view>
            </van-tab>
        </van-tabs>
      </div>
      <go-top v-scroll-show:150="showObj" v-to-top :isShow="showObj.value"></go-top>
  </section>
</template>
<script>
import Nav from "components/nav";
import GoTop from "directive/goTop";
import { banner } from "api";
export default {
  components:{Nav,GoTop},
  data() {
    return {
      active: 0,
      links: [
        {
          title: "正在热映",
          toName: "nowPlaying"
        },
        {
          title: "即将上映",
          toName: "comingSoon"
        }
      ],
      defaultScroll:150,
      showObj:{
          value:false
      },
      bannerList:[] 
    };
  },
  mounted() {
    this.banner()
    this.$bus.$on("changePage", () => {
      if (this.active === 1) {
        this.active = 0;
      } else {
        if (this.$route.name === "nowPlaying") {
          this.active = 0;
          return;
        }
        this.active = 1;
      }
    });
  },
  beforeUpdate(to,from,next){  //响应路由变化
      console.log('gigigg')
  },
  methods: {
    togglePage() {
      if (this.$route.name === "nowPlaying") {
        this.$router.push("comingSoon");
      } else {
        this.$router.push("nowPlaying");
      }
    },
    async banner(){
        const {data} = await banner()
        this.bannerList = data
    }
  }
};
</script>
<style lang="stylus" scoped>
.movie >>> .van-tabs__line {
  background-color: #ff5f16;
}

.movie >>> .van-tabs__content {
  margin-bottom: 1.333333rem;
}
</style>