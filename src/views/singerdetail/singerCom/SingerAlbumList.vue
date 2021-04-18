<template>
  <div class="album-list">
    <div class="hot50">
      <p>{{ album.name }}</p>
      <div class="left">
        <div class="icon">
          <img :src="album.picUrl" alt />
        </div>
      </div>
      <div class="right">
        <div class="music">
          <table>
            <tbody>
              <tr
                v-for="(item, index) in musiclist"
                :key="index"
                :class="{ backColor: getterBgColor(index) }"
                @click="albumClick(index)"
              >
                <td :class="{ curFont: playIndex == index }">
                  <span v-show="playIndex !== index">{{
                    getterIndex(index)
                  }}</span>
                  <div class="curPlay" v-show="playIndex === index">
                    <img src="~assets/img/musicDetailList/trm-music.svg" alt />
                  </div>
                </td>
                <td>
                  <img src="~assets/img/musicDetailList/heartbeat.svg" alt />
                  <img
                    src="~assets/img/musicDetailList/detail-download.svg"
                    alt
                  />
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import { getAlbum } from "network/singer";
import { getSongDetail, songDetail } from "network/musicDetail";

import { indexMixin } from "views/musicdetaillist/indexMixin";
export default {
  props: {
    album: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      musiclist: [],
      playIndex: 0.5,
    };
  },
  mixins: [indexMixin],
  methods: {
    getterBgColor(index) {
      if (index % 2 !== 0) return true;
      return false;
    },
    getterIndex(index) {
      let currentIndex = index + 1;
      return currentIndex < 10 ? "0" + currentIndex : currentIndex;
    },
    albumClick(index) {
      this.PlayMusic(index);
    },
  },
  created() {
    if (this.album != null) {
      getAlbum(this.album.id).then((res) => {
        console.log(res);
        for (let i of res.songs) {
          getSongDetail(i.id).then((res) => {
            let song = new songDetail(res.songs);
            this.musiclist.push(song);
          });
        }
        console.log('##',this.musiclist);
      });
      this.$bus.$on("Playing", (index, path) => {
        if (this.$route.path == path) {
          this.playIndex = index;
        }
      });
    }
  },
};
</script>

<style scoped>
.album-list {
  width: 100%;
  margin-top: 50px;
}
.left {
  width: 20%;
  float: left;
}
.icon {
  width: 100%;
}
.icon img {
  width: 60%;
}
.right {
  width: 75%;
  float: left;
  position: relative;
}
.hot50 {
  width: 100%;
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
  height: 30px;
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
  width: 20px;
  opacity: 0.6;
}
.music tbody tr td:nth-child(3) {
  color: #dcdde4;
}
.music tbody tr td:nth-child(4) {
  text-align: right;
  padding-right: 20px;
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
.curPlay img {
  width: 16px;
  height: 16px;
}
p {
  font-size: 14px;
  padding-left: 20%;
  color: #dcdde4;
}
.clear {
  clear: both;
}
</style>