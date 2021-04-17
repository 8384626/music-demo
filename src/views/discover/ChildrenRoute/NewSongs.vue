<template>
  <div class="newsongs">
    <div class="type">
      <div
        class="type-item"
        v-for="(item, index) in typeList"
        :key="index"
        @click="typeClick(index)"
        :class="{ action: typeIndex === index }"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="songs-scroll">
      <div class="content"  @click="musicItemClick(0)">
        <div class="play-all-music">
          <img src="~assets/img/newsongs/paly-all-music.svg" alt />
          <span>播放全部</span>
        </div>
        <div class="music" v-infinite-scroll="load" infinite-scroll-delay="500">
          <table>
            <tbody>
              <tr v-for="(item, index) in musiclist" :key="index" :class="{backColor:setBackColor(index)}" @click="musicItemClick(index)">
                <td>{{ getterIndex(index) }}</td>
                <td>
                  <div class="bagc">
                    <img :src="item.pic" alt />
                    <div class="icon">
                      <img src="~assets/img/newsongs/play-music-icon.svg" alt />
                    </div>
                  </div>
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.album }}</td>
                <td>{{ item.time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongsId } from "network/newsongs";
import { getMusicDetail, musicDetail } from "network/ranklist";

import { indexMixin } from "views/musicdetaillist/indexMixin";

export default {
  data() {
    return {
      typeList: [
        { value: 0, name: "全部" },
        { value: 7, name: "华语" },
        { value: 96, name: "欧美" },
        { value: 16, name: "韩国" },
        { value: 8, name: "日本" },
      ],
      typeIndex: 0,
      page: 1,
      list: [],
      musiclist: [],
    };
  },
  methods: {
    typeClick(index) {
      this.typeIndex = index;
      this.getSongsList(this.page,true)
    },
    getSongsList(page = this.page,clear=false) {
      if(clear) this.musiclist=[]
      getSongsId(this.typeList[this.typeIndex].value).then((res) => {
        this.list = res.data.slice(0, page * 30);
        for (let i of this.list) {
          getMusicDetail(i.id).then((res) => {
            let song = new musicDetail(res.songs);
            this.musiclist.push(song);
          });
        }
      });
    },
    load(){
      this.getSongsList(this.page ++)
    },
    getterIndex(index){
      return index+1 < 10? '0'+(index+1):index
    },
    setBackColor(index){
      if ((index+1) % 2 === 0) return true
      return false
    },
    setControlTabCurrentId(){
      this.$store.commit("setConrtrolTabCurrentId", 5);
    },
    musicItemClick(index) {
      this.PlayMusic(index);
    }
  },
  mixins: [indexMixin],
  created() {
    this.getSongsList();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setControlTabCurrentId();
    });
  },
};
</script>

<style scoped>
.newsongs {
  height: 100%;
  width: 100%;
  padding: 30px 150px;
  box-sizing: border-box;
}
.type {
  display: flex;
  border-bottom: 1px solid #25272b;
  padding: 10px 0;
}
.type-item {
  padding: 10px 10px;
}
.action {
  color: #b82525;
  border-bottom: 2px solid #686a6e;
}
.songs-scroll {
  height: calc(100vh - 270px);
  overflow-y: scroll;
}
.songs-scroll::-webkit-scrollbar {
  display: none;
}
.play-all-music{
  margin: 10px 0;
  display: flex;
  align-items: center;
}
.play-all-music img{
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.music table {
  width: 100%;
  border: 1px solid #2c2e32;
}
.music thead {
  color: #828385;
  font-size: 12px;
}
.music tr {
  height: 50px;
  text-align: left;
}
.music tr:hover {
  background-color: #2c2e32;
  color: #fff;
}
.music tr td {
  border: 1px solid #23262c;
  position: relative;
}
.music tbody {
  font-size: 13px;
  color: #575757;
}
.music tr td:nth-child(1) {
  width: 50px;
  text-align: center;
}
.music tr td:nth-child(2) {
  width: 80px;
}
.music tr td:nth-child(2) img {
  width: 50px;
}
.music tbody tr td:nth-child(3) {
  color: #dcdde4;
}
.music tr td .live {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.music tr td .xiazai {
  margin-left: 26px;
}
.music tr td:nth-child(6) {
  width: 180px;
}
.music tbody tr td {
  border: none;
}
.backColor {
  background: #1a1c20;
}
.bagc {
  position: relative;
  width: 50px;
  height: 50px;
}
.bagc img {
  width: 100%;
}
.icon {
  background: rgba(00, 0, 0, 0.3);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.icon img {
  width: 24px !important;
  border-radius: 50%;
}
.backColor {
  background: #1a1c20;
}
</style>