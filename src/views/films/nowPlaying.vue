<template>
    <section class="now-playing">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有电影咯~"
            @load="onLoad"
            >
            <van-cell
                v-for="item in filmsList"
                :key="item.filmId"
            >
                <van-card
                    @click="toFDetails(item)"
                    :thumb="item.poster"
                    >
                    <div slot="desc" class="cardRight">
                        <div>
                            <p class="title">{{item.name}}<span class="type">{{item.filmType.name}}</span></p>
                            <p v-if="item.grade">观众评分：<span>{{item.grade}}</span>分</p>
                            <div v-if="item.actors">
                                <p>主演：<span v-for="(actor,index) in item.actors" :key="index">{{actor.name}} </span></p>
                            </div>
                            <div>{{item.nation}} | {{item.runtime}}分钟</div>
                        </div>
                        <div>
                            <van-button size="mini">购票</van-button>
                        </div>
                    </div>
                </van-card>
            </van-cell>
        </van-list>
    </section>
</template>
<script>
import { nowPlaying } from "api";
export default {
  data() {
    return {
      filmsList: [],
      loading: false,
      finished: false
    };
  },

  methods: {
    async getNowPlaying(){
        const {data} = await nowPlaying()
        this.filmsList = data.films
        this.loading = false;
        if (this.filmsList.length >= 20) {
          this.finished = true;
        }
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
          this.getNowPlaying()
        /* for (let i = 0; i < 10; i++) {
          this.filmsList.push(this.filmsList.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.filmsList.length >= 40) {
          this.finished = true;
        } */
      }, 500);
    },
    toFDetails(item){
        this.$router.push('/films/fDetails')
    }
  }
}
</script>
<style lang="stylus" scoped>
.van-cell
    padding 15px 15px 15px 0
.van-card 
    padding 0
    background-color #fff
.cardRight
    display flex
    align-items center
    justify-content space-between
    .title
        color #191a1b
        font-size 16px
    .type
        margin-left 4px
        opacity .3
        background grey 
        color #d2d6dc
        font-size 9px
        padding 0 2px
        border-radius 2px

.van-button--default
    border 1px solid #ff5f16
    span
        color #ff5f16


</style>