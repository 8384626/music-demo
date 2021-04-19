<template>
  <div class="search-list">
    <div class="search-scroll">
      <div class="title" v-if="this.key != '' && this.musiclist.length != 0">
        搜索
        <span>"{{ key }}"</span>,找到 <span>{{ this.musiclist.length }}</span
        >首单曲
      </div>
      <div class="bar">
        <div
          class="bar-item"
          v-for="(item, index) in list"
          :class="{ action: currentIndex == index }"
          :key="index"
          @click="barClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <music-item :musiclist="musiclist" @musicItemClick="musicItemClick" v-show="isShow=='music'" />
    <artist-item :artistslist="artistslist" v-show="isShow=='artist'" />
  </div>
</template>

<script>
import { getSearch } from 'network/search'
import { getSongDetail, songDetail} from 'network/musicDetail'

import { distinct } from '../../common/tool'

import MusicItem from "views/musicdetaillist/ChildrenCom/SongDetailList";
import ArtistItem from "./childComps/ArtistItem";

export default {
  data() {
    return {
      key: "",
      artistslist: [],
      mlist: [],
      musiclist: [],
      list: ["单曲", "歌手"],
      currentIndex: 0,
      isShow: "music",
    };
  },
  methods: {
    barClick(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.isShow = "music";
          break;
        case 1:
          this.isShow = "artist";
          break;
      }
    },
  },
  components:{
    MusicItem,
    ArtistItem
  },
  activated(){
    this.key = this.$route.params.key;
    console.log(this.key);
    if (this.key != null && this.key != "") {
      getSearch(this.key).then(res => {

        let list = res.result.songs;
        for (let i in list) {
          this.artistslist.push(list[i].artists[0]);
          this.mlist.push(list[i].id);
          if (i == list.length - 1) {
            for (let i of this.mlist) {
              getSongDetail(i).then(res => {
                let song = new songDetail(res.songs);
                this.musiclist.push(song);
              });
            }
            this.artistslist = distinct(this.artistslist);
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.search-list {
  width: 100%;
  height: 100%;
  padding: 10px 40px;
}
.search-scroll {
  height: calc(100vh - 230px);
  padding: 20px 200px;
  overflow-y: scroll;
}
.search-scroll::-webkit-scrollbar {
  display: none;
}
.title {
  font-size: 14px;
  padding: 20px 0px;
}
.title span {
  color: #2e6bb0;
  padding: 0px 10px;
}
.bar {
  width: 100%;
  height: 49px;
  line-height: 49px;
  display: flex;
  border-bottom: 1px solid #1c1e23;
  margin-bottom: 15px;
}
.bar-item {
  padding: 0px 20px;
}
.action {
  color: #b82525;
  border-bottom: 3px solid #b82525;
}
</style>