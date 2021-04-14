<template>
  <transition name="slide">
    <div class="player" v-if="music != null && lyric != null">
      <div class="player-scroll">
        <div class="player-content">
          <div class="left">
            <div class="play-bar-support">
              <img src="~assets/img/playmusic/play-bar-support.png" alt />
            </div>
            <div class="paly-bar" :class="{ bar: !isPlay }">
              <img
                src="~assets/img/playmusic/play-bar.png"
                class="paly-bar"
                alt
              />
            </div>
            <div class="music-pic" :class="{ rotate: isPlay }">
              <div class="img-warp">
                <img :src="music.pic" alt />
              </div>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <h2>
                <span>{{ music.title }}</span>
              </h2>
            </div>
            <div class="lyric">
              <Lyric :lyric="lyric"  ref="playerLyric"/>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="play-bottom">
          <Comment :commend-list="Commends" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Comment from "views/musicdetaillist/ChildrenCom/Comment";
import Lyric from "./Lyric";
import { getMusciComment } from "network/musicDetail";
export default {
  props: {
    music: {
      type: Object,
      default() {
        return {};
      },
    },
    lyric: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      isPlay: false,
      limit: 20,
      page: 1,
      Commends: [],
    };
  },
  methods: {
    musicCommend() {
      getMusciComment(this.music.id, this.limit * this.page).then((res) => {
        this.Commends = res.comments;
      });
    },
  },
  components: {
    Comment,
    Lyric,
  },
  created() {
    this.musicCommend();
  },
};
</script>

<style scoped>
.player {
  width: 100%;
  height: calc(100vh - 114px);
  position: absolute;
  top: 54px;
  background: linear-gradient(-45deg, #333540, #070708, #333540);
}
.player-scroll {
  position: relative;
  left: 250px;
  width: 80%;
  height: 100%;
  overflow-y: scroll;
  /* padding: 0 250px; */
}
.player-scroll::-webkit-scrollbar{
  display: none;
}
.player-content {
  width: 100%;
  height: 455px;
  position: relative;
  /* background: linear-gradient(-45deg, #333540, #070708, #333540); */
}
.play-bottom {
  width: 80%;
  height: 35%;
  padding: 0px 5%;
}
.left {
  width: 50%;
  height: 100%;
  float: left;
  position: relative;
  overflow: hidden;
}
.play-bar-support {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 0 3px #fff;
  position: absolute;
  z-index: 2;
  left: 0px;
  right: 0px;
  top: -8px;
  margin: auto;
}
.play-bar-support img {
  width: 100%;
}
.paly-bar {
  width: 80px;
  height: 127px;
  position: absolute;
  left: calc(50% - 22px);
  top: -5px;
  z-index: 1;
}
.bar {
  top: 10px;
  transform-origin: 0 0;
  transform: rotate(-25deg);
  transition: all 0.3s;
}
.music-pic {
  width: 270px;
  height: 270px;
  border: 40px solid #0e0e11;
  border-radius: 50%;
  box-shadow: 0 0 10px #fff;
  position: absolute;
  left: 0;
  right: 0;
  top: 70px;
  margin: auto;
}
.rotate {
  animation: rotate 20s linear infinite;
}
.img-warp {
  border: 5px solid #fff;
  border-radius: 50%;
}
.img-warp img {
  width: 100%;
  border-radius: 50%;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}
.right {
  width: 50%;
  height: 100%;
  float: left;
  /* border: 1px solid #fff; */
}
.clear {
  clear: both;
}
.top {
  color: #d5d5d6;
  font-weight: 300;
  padding: 10px 0px;
}
.top h2 span {
  margin-left: -8%;
}
.lyric {
  padding: 5px 0px;
  height: calc(100% - 55px);
  color: #5e6062;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
  transform: none;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}
</style>