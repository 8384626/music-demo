<template>
  <div class="rec-mv">
    <div class="scroll-content">
      <div class="new-mv">
        <div class="title">
          最新MV
          <div class="right">
            <span>更多</span>
            <img src="~assets/img/recmv/rec-mv-right-arrow.svg" alt />
          </div>
        </div>
        <mv-item :mv-list="mvList" />
      </div>
      <div class="rankList">
        <div class="title">
          MV排行榜
          <div class="right">
            <span>更多</span>
            <img src="~assets/img/recmv/rec-mv-right-arrow.svg" alt />
          </div>
        </div>
        <mv-rank-list :top-mv="topMv" />
      </div>
    </div>
  </div>
</template>

<script>
import { getFirstMv, MV, getTopMv } from "network/recmv";
import MvItem from "../ChildrenCom/MvItem";
import MvRankList from "../ChildrenCom/MvRankList";
export default {
  data() {
    return {
      mvList: [],
      topMv: [],
    };
  },
  methods: {
    getMv() {
      getFirstMv().then((res) => {
        if (res.code !== 200)
          return this.$message.error("当前网络不佳,请稍后重试");
        for (let i of res.data) {
          let mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount);
          this.mvList.push(mv);
        }
        getTopMv().then((res) => {
          for (let i of res.data) {
            let mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount);
            this.topMv.push(mv);
          }
        });
        console.log(this.mvList);
        console.log(this.topMv);
      });
    },
    setControlTabCurrentId(){
      this.$store.commit("setConrtrolTabCurrentId", 6);
    }
  },
  components: {
    MvItem,
    MvRankList
  },
  created() {
    this.getMv();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setControlTabCurrentId();
    });
  },
};
</script>

<style scoped>
.rec-mv {
  width: 100%;
  height: 100%;
}
.scroll-content{
  height: calc(100vh - 180px);
  overflow-y: scroll;
  padding: 0 200px;
}
.scroll-content::-webkit-scrollbar {
  display: none;
}
.title {
  font-size: 20px;
  color: #dcdde4;
  padding: 5px 0px;
}
.title .right {
  cursor: pointer;
  height: 20px;
  font-size: 13px;
  color: var(--color-text-an);
  float: right;
}
.right :hover {
  color: #fff;
}
.right span {
  font-size: 16px;
  vertical-align: 5px;
  margin-right: 5px;
}
.right img {
  width: 12px;
  height: 12px;
  height: 100%;
}
.rankList {
  margin-top: 20px;
}
</style>