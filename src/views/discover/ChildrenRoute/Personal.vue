<template>
  <div class="person">
    <div class="person-content">
      <top-swiper :banners="banners" class="top-swiper"></top-swiper>
      <div class="recommend-music">
        <span class="per-title">推荐歌单</span>
        <img
          class="person-rightAllows"
          src="~assets/img/discover/right-arrows.svg"
        />
        <music-list :musicList="recMusicList"></music-list>
      </div>
      <div class="exclusive-broadcast">
        <span class="per-title">独家放送</span>
        <img
          class="person-rightAllows"
          src="~assets/img/discover/right-arrows.svg"
        />
        <exclusive-broadcast :broadcastList="broadcastList"></exclusive-broadcast>
      </div>
      <div class="new-song">
        <span class="per-title">最新音乐</span>
        <img
          class="person-rightAllows"
          src="~assets/img/discover/right-arrows.svg"
        />
        <new-song-list :newsongList="newsongList"></new-song-list>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBannerSwiper,
  getRecMusicList,
  getExcBroadcast,
  getNewSong
} from "network/discover";
import TopSwiper from "../ChildrenCom/TopSwiper.vue";
import MusicList from "../ChildrenCom/MusicList";
import ExclusiveBroadcast from "../ChildrenCom/ExclusiveBroadcast.vue";
import NewSongList from '../ChildrenCom/NewSongList.vue';

export default {
  name: "",
  data() {
    return {
      banners: [],
      recMusicList: [],
      broadcastList: [],
      newsongList:[]
    };
  },
  methods: {
    // 获取banners
    getBanner() {
      getBannerSwiper().then((res) => {
        if (res.code !== 200) return this.$message.error("当前网络不良");
        this.banners = res.banners;
      });
    },
    // 当页面再此页面的时候改变ConrtrolTabCurrentId
    setControlTabCurrentId() {
      this.$store.commit("setConrtrolTabCurrentId", 1);
    },
    // 获取推荐歌单的数据
    getRecMusic() {
      getRecMusicList().then((res) => {
        if (res.code !== 200) return this.$message.error("当前网络不良");
        this.recMusicList = res.result;
      });
    },
    // 获取独家放送的列表数据
    getExcBroadcast() {
      getExcBroadcast().then((res) => {
        if (res.code !== 200) return this.$message.error("当前网络不良");
        this.broadcastList = res.result;
      });
    },
    // 获取最新音乐
    getNewSong(){
      getNewSong().then(res=>{
        if (res.code !== 200) return this.$message.error("当前网络不良");
        this.newsongList = res.result
      })
    }
  },
  components: {
    TopSwiper,
    MusicList,
    ExclusiveBroadcast,
    NewSongList,
  },
  created() {
    this.getBanner();
    this.getRecMusic();
    this.getExcBroadcast();
    this.getNewSong()
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setControlTabCurrentId();
    });
  },
};
</script>

<style scoped>
.person-content {
  height: calc(100vh - 190px);
  padding: 0 200px;
  overflow-y: scroll;
}
.person-content::-webkit-scrollbar {
  display: none;
}
.top-swiper {
  width: 90%;
  margin: 40px auto;
}

/* 每个模块的单独设置 */
.exclusive-broadcast{
  margin: 10px 0 0 0;
}
/* 模块的字体和右箭头 */
.per-title {
  font-size: 20px;
  color: #f1f1f1;
}
.person-rightAllows {
  margin-left: 10px;
  width: 10px;
  height: 10px;
}
</style>