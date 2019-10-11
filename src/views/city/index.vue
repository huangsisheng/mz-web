<template>
  <section>
    <section class="c-nav">
      <van-nav-bar title="当前城市-" @click-left="onClickLeft">
        <van-icon name="cross" slot="left" />
      </van-nav-bar>
      <form action="/">
        <van-search v-model="cityName" placeholder="输入城市名或拼音" show-action @input="onInput" @blur="onBlur">
          <div slot="action" @click="onCancel">取消</div>
        </van-search>
      </form>
    </section>
    <section v-if="!searchResult" class="c-list">
      <div class="recommend-city">
        <dl class="r-city gps-city">
          <dt class="r-title">GPS定位您所在城市</dt>
          <dd>定位失败</dd>
        </dl>
        <dl class="r-city hot-city">
          <dt class="r-title">热门城市</dt>
          <dd v-for="(item,index) in hotCity" :key="index">{{item.name}}</dd>
        </dl>
      </div>
      <van-index-bar>
        <div v-for="(item,index) in city" :key="index">
          <van-index-anchor :index="item.initial" />
          <van-cell v-for="(city,cndex) in item.citys" :key="cndex" :title="city.name" />
        </div>
      </van-index-bar>
    </section>
    <!-- 搜索后的列表 -->
    <section v-if="searchResult" class="c-list result-list">
      <van-cell v-for="item in resultList" :key="item.cityId" :value="item.name" />
      <div v-if="!resultList.length" class="empty-result">
        <img src="../../assets/images/not_city.png" alt />
        <p>没有找到匹配的城市</p>
      </div>
    </section>
  </section>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      cityName: "",
      searchResult: false,
      resultList: []
    };
  },
  watch: {
    cityName(newVal) {
      this.resultList = [];
      this.allcitys.forEach(item => {
        if (item.pinyin.includes(newVal) || item.name.includes(newVal)) {
          this.resultList.push(item);
        }
      });
      if (!newVal) {
        this.resultList = [];
      }
    }
  },
  computed: {
    ...mapState({
      city: state => state.city.city,
      hotCity: state => state.city.hotCity,
      allcitys: state => state.city.allcitys
    })
  },
  mounted() {
    if (!this.city.length) {
      this.$store.dispatch("gateway");
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onInput() {        
        this.searchResult = true;
    },
    onCancel() {
      this.searchResult = false;
    },
    onBlur(){
        this.searchResult = false;
    }  
  }
};
</script>
<style lang="stylus" scoped>
.c-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.c-list {
  margin-top: 100px;
}

.van-nav-bar .van-icon {
  font-size: 19px;
  color: #191a1b;
}

.van-search--show-action {
  background: #f4f4f4 !important;
}

.van-search__content {
  background-color: #fff;
}

.recommend-city {
  background-color: #fff;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.r-title {
  font-size: 13px;
  color: #797d82;
  margin-bottom: 10px;
}

.r-city dd {
  width: calc(((100vw - 66px) / 3));
  display: inline-block;
  height: 30px;
  background-color: #f4f4f4;
  line-height: 30px;
  border-radius: 3px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0 7.5px;
  margin-bottom: 7.5px;
  text-align: center;
  font-size: 12px;
  color: #191a1b;
}

.c-list >>> .van-index-bar__sidebar {
  z-index: 999 !important;
  top: 60%;
}

.result-list {
  height: calc(100vh - 100px);
  background: #fff;
  overflow-y: scroll;
}

.empty-result {
  padding-top: 67px;
  width: 100%;
  text-align: center;

  img {
    wh(90, 90);
  }

  p {
    font-size: 14px;
    color: $bfColor;
  }
}
</style>