<template>
  <div class="artist-album" v-if="musiclist.length !== 0">
    <div class="hot">
      <p class="hot-title">热门50首</p>
      <div class="left">
        <div class="icon">
          <img :src="musiclist[0].pic" alt />
        </div>
      </div>
      <div class="right">
        <div class="music" :class="{ fold: fold }">
          <table>
            <tbody>
              <tr
                v-for="(item, index) in musiclist"
                :key="index"
                :class="{ backColor: getterBgColor(index) }"
                @click="PlayMusic(index)"
              >
                <td :class="{ curFont: playIndex == index }">
                  <span v-show="playIndex !== index">{{ getterIndex(index) }}</span>
                  <div class="curPlay" v-show="playIndex === index">
                    <img src="~assets/img/musicDetailList/trm-music.svg" alt />
                  </div>
                </td>
                <td>
                  <img src="~assets/img/musicDetailList/heartbeat.svg" alt />
                  <img src="~assets/img/musicDetailList/detail-download.svg" alt />
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.album }}</td>
                <td>{{ item.time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="toggle-fold" @click="fold = !fold">
          <span v-if="fold">查看全部50首></span>
          <span v-if="!fold">收起</span>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import { indexMixin } from "views/musicdetaillist/indexMixin";

export default {
  props: {
    musiclist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      fold: true,
      playIndex: .5,
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
  },
  created() {
    this.$bus.$on("Playing", (index, path) => {
      if (this.$route.path == path) {
        this.playIndex = index;
      }
    });
  },
};
</script>

<style scoped>
.artist-album {
  width: 100%;
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
  color: #e5e5e5;
}
.clear {
  clear: both;
}
.fold {
  height: 320px;
  overflow: hidden;
}
.toggle-fold {
  position: absolute;
  bottom: -30px;
  color: #828385;
}
.toggle-fold:hover {
  color: whitesmoke;
}
</style>