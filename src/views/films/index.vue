<template>
    <section class="">
        <van-tabs v-model="active" @click="togglePage">
            <van-tab v-for="item in links" :key="item.toName" :title="item.title">
                <router-view></router-view>
            </van-tab>
        </van-tabs>

    </section>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      links:[
          {
              title:'正在热映',
              toName:'nowPlaying'
          },
          {
              title:'即将上映',
              toName:'comingSoon'
          }
      ]
    };
  },

  methods: {
    togglePage(){
        if(this.$route.name === 'nowPlaying'){
            this.$router.push('comingSoon')
        }else{
            this.$router.push('nowPlaying')
        }
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>