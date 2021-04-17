<template>
  <div class="ranklist">
    <div class="rank-scroll" v-if="musicList.length !== 0">
      <div class="ranktop">
        <ify-rank-item
          :rank-id="musicList[0].id"
          :title="['飙', '升', '榜']"
          :bg-color="['#56a1e3', '#5a8beb']"
        />
        <ify-rank-item
          :rank-id="musicList[1].id"
          :title="['新', '歌', '榜']"
          :bg-color="['#34aabe', '#56c2cd']"
        />
        <ify-rank-item
          :rank-id="musicList[2].id"
          :title="['原', '创', '榜']"
          :bg-color="['#d53d6a', '#eb638d']"
        />
        <ify-rank-item
          :rank-id="musicList[3].id"
          :title="['热', '歌', '榜']"
          :bg-color="['#c7523c', '#cc7455']"
        />
        <ify-rank-item
          :rank-id="musicList[4].id"
          :title="['歌', '手', '榜']"
          :bg-color="['#9455ce', '#9946c9']"
        />
      </div>
      <h2>全球榜</h2>
      <music-list :musicList="musicList.slice(4)" />
    </div>
  </div>
</template>

<script>
import { getAllMusicList } from "network/ranklist";
import ifyRankItem from "../ChildrenCom/RankListItem";
import MusicList from "../ChildrenCom/MusicList";

export default {
  data() {
    return {
      musicList: [],
    };
  },
  methods: {
    allMusicList() {
      getAllMusicList().then((res) => {
        if (res.code !== 200) return this.$message.error("当前网络不佳,请稍后重试");
        this.musicList = res.list;
      });
    },
    setControlTabCurrentId(){
      this.$store.commit("setConrtrolTabCurrentId", 3);
    }
  },
  components: {
    ifyRankItem,
    MusicList
  },
  created() {
    this.allMusicList();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setControlTabCurrentId();
    });
  },
};
</script>

<style scoped>
.ranklist {
  height: calc(100vh - 230px);
  padding: 20px 200px;
  overflow-y: scroll;
}
.ranklist::-webkit-scrollbar {
  display: none;
}
.rank-scroll {
  height: 100%;
}
.ranktop {
  display: flex;
  flex-wrap: wrap;
}
h2 {
  font-weight: 300;
  margin-bottom: 20px;
}
</style>