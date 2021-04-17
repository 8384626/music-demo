<template>
  <div class="song-detail-list" v-if="musiclist.length > 0">
    <table cellspacing="0">
      <thead class="header">
        <tr>
          <td>#</td>
          <td>操作</td>
          <td>音乐标题</td>
          <td>歌手</td>
          <td>专辑</td>
          <td>时长</td>
        </tr>
      </thead>
      <tbody class="body">
        <tr
          v-for="(item, i) in musiclist"
          :key="i"
          :class="{ bgchange: getterColor(i) }"
          @click="currentClick(i)"
        >
          <td :class="{ curFont: playIndex == index }">
            <span v-show="playIndex !== i">{{ getterIndex(i) }}</span>
            <div class="curPlay" v-show="playIndex === i">
              <img src="~assets/img/musicDetailList/trm-music.svg" alt />
            </div>
          </td>
          <td>
            <img src="~assets/img/musicDetailList/heartbeat.svg" alt />
            <img src="~assets/img/musicDetailList/detail-download.svg" alt />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.song }}</td>
          <td>{{ item.album }}</td>
          <td>{{ item.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
      playIndex: 0.5,
    };
  },
  methods: {
    getterColor(i) {
      if (i % 2 != 0) {
        return true;
      }
    },
    getterIndex(i) {
      let currentIndex = i + 1;
      return currentIndex < 10 ? "0" + currentIndex : currentIndex;
    },
    currentClick(i) {
      this.playIndex = i;
      if (this.$parent.$el.className.indexOf("play-music-list") != -1) {
        this.$bus.$emit("PlayMusicListItem", i);
        return;
      }
      this.$emit("songItemClick", i);
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
.song-detail-list {
  width: 100%;
}
.song-detail-list table {
  width: 100%;
}
.song-detail-list thead {
  color: #828385;
}
.song-detail-list tr {
  height: 30px;
  text-align: left;
}
.header td {
  position: relative;
  border: 1px solid #23262c;
  text-align: center;
}
.header td:nth-child(1) {
  width: 20px;
}
.header td:nth-child(2) {
  width: 80px;
}
.header td:nth-child(4),
.header td:nth-child(5) {
  width: 120px;
}
.header td:nth-child(6) {
  width: 60px;
}
.body {
  font-size: 13px;
  color: #575757;
}
.body tr:hover {
  background-color: #2c2e32;
  color: #f1f1f1;
}
.curPlay img {
  width: 16px;
  height: 16px;
}
.body td:nth-child(2) img {
  margin: 0 5px;
}
.body td:nth-child(3) {
  color: #f1f1f1;
}

.bgchange {
  background: #1a1c20;
}
</style>