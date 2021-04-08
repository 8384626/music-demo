<template>
  <div class="rank-list-item" v-if="musicDetailList !== null && rankId !== 0">
    <div
      class="rank-item-top"
      :style="{
        background:
          'linear-gradient(to right,' + bgColor[0] + ',' + bgColor[1] + ')',
      }"
    >
      <div class="left">
        <div class="left-itemF">
          <i>{{ title[0] }}</i>
        </div>
        <div class="set">
          <div class="left-item">
            <i>{{ title[1] }}</i>
          </div>
          <div class="left-item">
            <i>{{ title[2] }}</i>
          </div>
          <div class="update">{{ getUpdateTime }}</div>
        </div>
        <div class="right">
          <img src="~assets/img/ranklist/ranklist-play.svg" alt />
        </div>
      </div>
    </div>
    <div class="center">
      <table cellspacing="0px">
        <tr
          v-for="(item, index) in musicList"
          :key="index"
          :class="{ backColor: setBackColor(index) }"
        >
          <td>0{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.song }}</td>
          <td>{{ item.time }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { getMusicName, getMusicDetail, musicDetail } from "network/ranklist";
import { formatDate } from "../../../common/tool";
export default {
  props: {
    rankId: {
      type: Number,
      default: 0,
    },
    bgColor: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      musicDetailList: null,
      musicList:[]
    };
  },
  methods:{
    setBackColor(index) {
      if (index % 2 != 0) {
        return true;
      }
      return false;
    },
  },
  computed: {
    getUpdateTime() {
      let time = this.musicDetailList.playlist.updateTime;
      return formatDate(new Date(time), "MM月dd日");
    },
  },
  mounted() {
    if (this.rankId !== 0) {
      getMusicName({ id: this.rankId }).then((res) => {
        if (res.code !== 200) return this.$message.error("当前网络不佳,请稍后重试");
        this.musicDetailList = res
         /**遍历查询歌单所有歌曲详情 */
        for (let i of this.musicDetailList.playlist.trackIds.slice(0, 9)) {
          getMusicDetail(i.id).then(res => {

            let song = new musicDetail(res.songs);
            this.musicList.push(song);
          });
        }
        // console.log(this.musicList);
      });
    }
  },
};
</script>

<style scoped>
.rank-list-item {
  cursor: pointer;
  width: 300px;
  height: 500px;
  margin-right: 20px;
}
.rank-item-top {
  width: 100%;
  height: 100px;
  position: relative;
}
.rank-item-top .left {
  width: 200px;
  padding: 0px 25px;
  display: flex;
  align-items: center;
  padding-top: 10px;
}
.left-itemF {
  font-size: 54px;
  margin-right: 10px;
}
.set {
  display: flex;
  position: relative;
}
.update {
  width: 100px;
  position: absolute;
  left: 5px;
  top: 15px;
}
.left-item {
  font-size: 26px;
  margin-top: -20px;
}
.right {
  width: 50px;
  height: 50px;
  position: absolute;
  right: 20px;
  top: 0px;
  bottom: 0px;
  margin: auto;
}
.right img {
  width: 100%;
}
.center {
  width: 100%;
}
.center table {
  width: 100%;
  font-size: 13px;
  color: #575757;
}
.center tr {
  width: 100%;
  height: 40px;
  text-align: left;
}
.center tr:nth-child(1) td:nth-child(1),
.center tr:nth-child(2) td:nth-child(1),
.center tr:nth-child(3) td:nth-child(1) {
  color: #b82525;
}
.center tr:hover {
  background-color: #2c2e32;
  color: #fff;
}
.center tr td {
  border: none;
  position: relative;
}
.center tr td:nth-child(2) {
  color: #dcdde4;
}

.backColor {
  background: #1a1c20;
}
</style>