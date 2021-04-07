<template>
  <div class="person">
    <div class="person-content">
      <top-swiper :banners="banners" class="top-swiper"></top-swiper>
      <div class="recommend-music">
        <span class="rec-title">推荐歌单</span>
        <music-list :recMusicList="recMusicList"></music-list>
      </div>
    </div>
  </div>
</template>

<script>
import { getBannerSwiper, getRecMusicList } from "network/discover";
import TopSwiper from "../ChildrenCom/TopSwiper.vue";
import MusicList from "../ChildrenCom/MusicList";

export default {
  name: "",
  data() {
    return {
      banners: [],
      recMusicList: [],
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
    // 获取推荐歌单的数据
    getRecMusic() {
      getRecMusicList().then((res) => {
        if (res.code !== 200) return this.$message.error("当前网络不良");
        this.recMusicList = res.result;
        console.log(this.recMusicList);
      });
    },
  },
  components: { TopSwiper, MusicList },
  created() {
    this.getBanner();
    this.getRecMusic();
  },
};
</script>

<style scoped>
.person-content {
  height: calc(100vh - 100px);
  padding: 0 200px;
  overflow-y: scroll;
}
.person-content::-webkit-scrollbar{
  display: none;
}
.top-swiper {
  width: 90%;
  margin: 40px auto;
}
/* .recommend-music{
  margin: auto;
} */
.rec-title {
  color: #f1f1f1;
}
</style>