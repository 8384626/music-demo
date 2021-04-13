<template>
  <div class="play-music">
    <!-- 上部展示歌曲大概详情 -->
    <div class="detail-top">
      <div
        class="music-top-icon"
        v-if="playList[currentIndex] != null"
        @mouseenter="isShade = true"
        @mouseleave="isShade = false"
      >
        <img :src="playList[currentIndex].pic" alt />
        <div class="music-max" v-show="isShade">
          <img src="~assets/img/playmusic/magnify-detail.svg" alt />
        </div>
      </div>
      <div class="music-top-center" v-if="playList[currentIndex] != null">
        <div class="music-title">{{ playList[currentIndex].title }}</div>
        <div class="music-artist">{{ playList[currentIndex].artist }}</div>
      </div>
    </div>
    <div class="music-control">
      <!-- 下部播放音乐上一首/播放（暂停）/下一首 -->
      <div class="player-music-left">
        <div class="pre">
          <img src="~assets/img/playmusic/previous.svg" alt />
        </div>
        <div class="play" @click="toggle">
          <img src="~assets/img/playmusic/play.svg" v-show="!isPlay" />
          <img src="~assets/img/playmusic/pause.svg" v-show="isPlay" />
        </div>
        <div class="next">
          <img src="~assets/img/playmusic/next.svg" alt />
        </div>
      </div>
      <div class="play-music-right">
        <audio
          :src="playList[currentIndex].src"
          autoplay
          ref="audio"
          @timeupdate="audioTimeUpdate"
          @pause="musicPause"
          @ended="musicEnded"
          @playing="musicPlaying"
          @error="musicErr"
        ></audio>

        <div class="music-pro">
          <div class="currentTime">{{ currentTime }}</div>
          <music-progress
            class="music-pro-progress"
            ref="music_pro"
            @childclick="setMusicCurrent"
          />
          <div class="totalTime">{{ duration }}</div>
        </div>
        <div class="volumn">
          <div class="volumn-icon" @click="toggleVolumn">
            <img
              src="~assets/img/playmusic/open-voice.svg"
              v-show="!isVolumn"
              alt
            />
            <img
              src="~assets/img/playmusic/cut-voice.svg"
              class="vol-img"
              v-show="isVolumn"
              alt
            />
          </div>
          <volumn-progress ref="volume_pro" @childclick="setVolume" />
        </div>
        <div class="icon">
          <div class="schema" @click="toggleSchema()">
            <a href="#" title="顺序播放" v-show="schemaIndex == 0">
              <img src="~assets/img/playmusic/order-play.svg" />
            </a>
            <a href="#" title="随机播放" v-show="schemaIndex == 1">
              <img src="~assets/img/playmusic/random-play.svg" />
            </a>
            <a href="#" title="单曲循环" v-show="schemaIndex == 2">
              <img src="~assets/img/playmusic/single-play.svg" />
            </a>
          </div>
          <div class="music-lyric" @click="toggleLyric()">
          <a href="#" title="歌词">
            <img src="~assets/img/playmusic/init-lyric.svg" v-show="!isLyric" />
          </a>
          <a href="#" title="歌词">
            <img src="~assets/img/playmusic/click-lyric.svg" v-show="isLyric" />
          </a>
        </div>
          <div class="music-list" @click="toggleMusicList()">
            <a href="#" title="歌单">
              <img src="~assets/img/playmusic/song-list.svg" alt />
            </a>
          </div>
        </div>
      </div>
    </div>
    <play-music-list class="paly-music-list" v-show="isMusicList" :music-list="musicList"></play-music-list>
    <Lyric class="play-music-lyric" ref="lyric" :lyric="lyric" v-show="isLyric"></Lyric>
  </div>
</template>

<script>
import { formatDate } from "../.././../common/tool";
import MusicProgress from "components/common/progress/Progress";
import VolumnProgress from "components/common/progress/Progress";
import PlayMusicList from "./PlayMusicList";
import Lyric from './Lyric'

// 网络请求相关
import { getLyric } from 'network/musicDetail'

export default {
  data() {
    return {
      isShade: false,
      currentIndex: 0,
      isPlay: false,
      playList: [
        {
          title: "爱存在（抖音版）（翻自 魏奇奇）",
          artist: "如懿",
          index: "0",
          lrc: "",
          src:
            "http://m8.music.126.net/20200708181541/dc873a2b4b00f9a2713fced8afe9cd72/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2839783247/945a/f45b/fa89/87264bf976128116dd2394e5f97c807a.mp3",
          pic:
            "https://p1.music.126.net/Y3MgpdL1iMno2g0yDnfMXQ==/109951165054657451.jpg",
        },
        {
          title: "爱存在（抖音版）（翻自 魏奇奇）",
          artist: "如懿",
          index: "0",
          lrc: "",
          src:
            "http://m8.music.126.net/20200708181541/dc873a2b4b00f9a2713fced8afe9cd72/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2839783247/945a/f45b/fa89/87264bf976128116dd2394e5f97c807a.mp3",
          pic:
            "https://p1.music.126.net/Y3MgpdL1iMno2g0yDnfMXQ==/109951165054657451.jpg",
        },
      ],
      currentTime: "00:00",
      duration: "00:00",
      // 记录播放是否结束
      schemaIndex: 0,
      path: "",
      // 声音图标
      isVolumn: true,
      // 控制播放模式
      schemaIndex: 2,
      isMusicList: false,
      // 歌曲列表
      musicList: [],
      isLyric:false,
      // 歌词
      lyric:''
    };
  },
  methods: {
    toggle() {
      return (this.isPlay = !this.isPlay);
    },
    // 播放位置改变的事件
    audioTimeUpdate() {
      if (this.$refs.audio != null) {
        this.currentTime = formatDate(
          new Date(this.$refs.audio.currentTime * 1000),
          "mm:ss"
        );
        this.duration = formatDate(
          new Date(this.$refs.audio.duration * 1000),
          "mm:ss"
        );
        let scale = this.$refs.audio.currentTime / this.$refs.audio.duration;
        this.$refs.music_pro.setProgress(scale);

        if (this.$refs.audio.currentTime !== null) {
          this.$refs.lyric.scrollLyric(this.$refs.audio.currentTime);
          this.$refs.player.$refs.playerLyric.maxScroll(
            this.$refs.audio.currentTime
          );
        }
      }
    },
    // 暂停播放的事件
    musicPause() {
      this.isPlay = false;
      // if (this.$refs.player != null) this.$refs.player.isPlay = false;
    },
    // 播放结束后的事件
    musicEnded() {
      switch (this.schemaIndex) {
        case 0:
          this.currentIndex >= this.playList.length - 1
            ? 0
            : this.currentIndex++;
          break;
        case 1:
          this.currentIndex = Math.floor(Math.random() * this.playList.length);
          break;
        case 3:
          break;
      }
    },
    // 播放的时候的事件
    playLoad() {
      getLyric(this.playList[this.currentIndex].id).then(res => {
        this.lyric = res.lrc.lyric;
      });
    },
    // 暂停的时候触发
    musicPlaying() {
      this.isPlay = true;
      this.bus.$emit(
        "Playing",
        this.playList[this.currentIndex].index,
        this.path
      );
      if (this.$refs.player != null) this.$refs.player.isPlay = true;
    },
    musicErr() {
      this.currentIndex++;
    },
    // 计算当前播放的位置
    setMusicCurrent(scale) {
      this.$refs.audio.currentTime = scale * this.$refs.audio.duration;
    },
    toggleVolumn() {
      console.log("@@@");
      this.isVolumn = !this.isVolumn;
      if (this.isVolumn) {
        this.$refs.audio.volumn = 0.0;
      } else {
        this.$refs.audio.volumn = 0.8;
        this.$refs.volume_pro && this.$refs.volume_pro.setProgress(0.8);
      }
    },
    // 控制声音大小
    setVolume(scale) {
      this.$refs.audio.volume = scale;
    },
    // 控制播放模式
    toggleSchema() {
      if (this.schemaIndex >= 2) this.schemaIndex = 0;
      else this.schemaIndex++;
    },
    toggleMusicList() {
      this.isMusicList = !this.isMusicList;
    },
    toggleLyric() {
      this.isLyric = !this.isLyric;
    },
  },
  components: {
    MusicProgress,
    VolumnProgress,
    PlayMusicList,
    Lyric
  },
  mounted() {
    this.$bus.$on("playMusic", (list, index, path, musicList) => {
      this.playList = [];
      this.path = path;
      this.playList = list;
      this.musicList = musicList;

      this.playList = this.playList.sort((a, b) => {
        return a.index - b.index;
      });

      this.setCurrentIndex(index);
    });

    this.$bus.$on("PlayMusicListItem", (index) => {
      this.setCurrentIndex(index);
    });
  },
};
</script>

<style scoped>
.paly-music {
  width: 100%;
  height: 59px;
  background-color: red;
  position: relative;
  z-index: 3;
  bottom: 0;
}
.detail-top {
  width: 12%;
  height: 80px;
  position: absolute;
  left: 0px;
  bottom: 60px;
  display: flex;
  background: #181818;
}
.music-top-icon {
  height: 80px;
  width: 80x;
}
.music-top-icon img {
  height: 100%;
}
.music-max {
  position: relative;
  bottom: 85px;
  z-index: 4;
  width: 80px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.music-max img {
  opacity: 0.5;
}
.music-top-center {
  width: 100px;
  font-size: 13px;
  position: relative;
  left: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.music-title {
  position: absolute;
  top: 0px;
}
.music-artist {
  position: absolute;
  bottom: 0px;
}
.music-control {
  display: flex;
  align-items: center;
  height: 60px;
  background-color: #212124;
}
.player-music-left {
  display: flex;
  float: left;
  width: 15%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
}
.player-music-left div {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border: 1px solid #999;
  border-radius: 50%;
}
.player-music-left .pre img {
  width: 20px;
  height: 20px;
}
.player-music-left .play img:nth-child(1) {
  width: 14px;
  height: 14px;
}
.player-music-left .play img:nth-child(2) {
  width: 32px;
  height: 32px;
}
.player-music-left .next img {
  width: 18px;
  height: 18px;
}

.play-music-right {
  width: 85%;
  height: 100%;
  float: right;
}
.play-music-right .music-pro {
  width: 70%;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
  text-align: center;
}
.music-pro .currentTime,
.music-pro .totalTime {
  width: 60px;
}
.play-music-right .volumn {
  width: 10%;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
}
.volumn-icon img {
  width: 15px;
  margin-right: 10px;
}
.vol-img {
  width: 21px !important;
}
.play-music-right .icon {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 0 50px;
}
.icon .schema {
  width: 30px;
}
.icon .schema img {
  width: 20px;
  height: 20px;
}
.icon .schema img:nth-child(2) {
  width: 18px;
  height: 18px;
}
.music-lyric {
  width: 20px;
}
.music-lyric img {
  width: 100%;
}
.music-list {
  width: 20px;
}
.music-list img {
  width: 100%;
}
.paly-music-list {
  position: absolute;
  right: 0px;
  bottom: 59px;
  z-index: 1001;
}
.play-music-lyric {
  width: 460px;
  height: 30px;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 59px;
  z-index: 999;
  margin: auto;
}
</style>