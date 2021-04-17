<template>
  <div class="singer-detail">
    <div class="singer-detail-content">
      <singer-base-info
        class="singer-base-info"
        :desc="artistDesc"
        :base-info="getArtist"
      ></singer-base-info>
      <singer-bar ref="artistBar" :list="barlist"></singer-bar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SingerBaseInfo from "./singerCom/SingerBaseInfo";
import SingerBar from './singerCom/SingerBar.vue';

import { getSingerDesc } from "network/singer";

export default {
  data() {
    return {
      artist: null,
      artistDesc: null,
      barlist: ["专辑","MV", "歌手详情", "相似歌手"],
    };
  },
  computed: {
    getArtist() {
      this.artist = this.$store.state.artist;
      return this.artist;
    },
  },
  watch: {
    artist(to, form) {
      this.$refs.artistBar.currentClick(0);
      if (to.id !== null) {
        getSingerDesc(to.id).then((res) => {
          this.artistDesc = res.briefDesc;
        });
      }
    },
  },
  components: {
    SingerBaseInfo,
    SingerBar
  },
  created() {
    this.artist = this.$store.state.artist;
  },
};
</script>

<style scoped>
.singer-detail {
  width: 100%;
  height: 100%;
}
.singer-detail-content {
  height: calc(100vh - 190px);
  padding: 30px 100px 0;
  overflow-y: scroll;
}
.singer-detail-content::-webkit-scrollbar {
  display: none;
}
</style>