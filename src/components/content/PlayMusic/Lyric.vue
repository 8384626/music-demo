<template>
  <div class="lyric" v-if="lyric != ''">
    <div class="lyric-scroll">
      <ul>
        <li
          v-for="(item, index) in lyricArray"
          :key="index"
          :class="{ action: index == lyricIndex }"
        >
          {{ item.lyric }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {lyricItem} from "./playList"
export default {
  props: {
    lyric: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      lyricArray: [],
      lyricIndex: -1,
      maxIndex: 0,
      length: 0,
    };
  },
  methods: {
    parseLyric(lyric) {
      let RegExp = /\[(\d*:\d*\.\d*)\]/;
      let arr = [];
      let timeArr = [];
      let lyricArr = [];
      let mergeArr = [];

      arr = lyric.split("\n");

      for (let i of arr) {
        let lrc = i.split("]")[1];
        if (lrc == "" || lrc == undefined) continue;
        lyricArr.push(lrc);

        let resTime = RegExp.exec(i)[1];
        let resTime2 = resTime.split(":");
        let min = parseInt(resTime2[0]) * 60;
        let sec = parseFloat(resTime2[1]);
        let time = parseFloat(Number(min + sec).toFixed(2)); //toFixed返回值是String
        timeArr.push(time);
      }
      for (let i = 0, length = timeArr.length; i < length; i++) {
        let obj = new lyricItem(timeArr[i], lyricArr[i]);
        mergeArr.push(obj);
      }
      this.lyricArray = mergeArr.sort((a, b) => {
        return a.time - b.time;
      });
      this.length = this.lyricArray.length;
    },
    scrollLyric(time = 0) {
      if (this.lyricIndex > this.length - 2) return;
      if (time >= this.lyricArray[this.lyricIndex + 1].time) {
        this.lyricIndex++;
        this.$refs.scroll.scrollTo(0, -30 * this.lyricIndex, 2000);
      }
    },
    maxScroll(time = 0) {
      if (this.lyricIndex > this.length - 2) return;
      if (time >= this.lyricArray[this.lyricIndex + 1].time) {
        this.lyricIndex++;
        if (
          this.lyricIndex < 5 ||
          this.lyricIndex >= this.lyricArray.length - 5
        )
          return;
        this.maxIndex++;
        this.$refs.scroll.scrollTo(0, -30 * this.maxIndex, 2000);
      }
    },
  },
};
</script>

<style scoped>
.lyric-scroll {
  height: 100%;
  overflow-y: scroll;
}
.lyric-scroll::-webkit-scrollbar {
  display: none;
}
.lyric ul {
  text-align: center;
  list-style-type: none;
}
.lyric ul li {
  height: 30px;
  padding: 5px 0px;
}
.action {
  font-size: 18px;
  color: #6a96e6;
}
</style>