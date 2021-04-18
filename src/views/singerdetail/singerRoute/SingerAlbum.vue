<template>
  <div class="artist-album">
    <singer-hot :musiclist="musiclist" />
    <singer-album-list v-for="(item,index) in albumlist" :key="index" :album="item" />
  </div>
</template>

<script>
import SingerHot from "../singerCom/SingerHot";
import SingerAlbumList from '../singerCom/SingerAlbumList';

import { getSingerHot50,getSingerAlbum } from "network/singer";
import { getSongDetail, songDetail } from "network/musicDetail";
export default {
  data() {
    return {
      artist: null,
      musiclist: [],
      albumlist:[]
    };
  },
  methods: {
    getMusicList() {
      getSingerHot50(this.artist.id).then((res) => {
        let songs = res.songs;
        for (let i in songs) {
          getSongDetail(songs[i].id).then((res) => {
            let song = new songDetail(res.songs);
            this.musiclist.push(song);
          });
        }
      });
    },
    getAlbumList(){
      getSingerAlbum(this.artist.id).then(res =>{
        this.albumlist = res.hotAlbums;
      })
    }
  },
  components: {
    SingerHot,
    SingerAlbumList,
  },
  created() {
      this.artist = this.$route.query.artist || this.$store.state.artist;
      if (this.artist !== null) {
        this.getMusicList();
        this.getAlbumList()
      }
  },
  activated() {
      this.artist = this.$route.query.artist || this.$store.state.artist;
      if (this.artist !== null) {
        this.getMusicList();
        this.getAlbumList();
      }
  },
  deactivated() {
    this.musiclist = [];
  },
  watch: {
    artist(newValue, oldValue) {
      this.getMusicList();
    },
  },
};
</script>

<style scoped>
</style>