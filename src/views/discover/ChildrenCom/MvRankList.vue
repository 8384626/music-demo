<template>
  <div class="mv-rank" v-if="topMv.length !== 0">
    <div class="rank-item" v-for="index in topMv.length" :key="index">
      <div class="warp" v-if="index % 2 == 0">
        <div class="left">
          <div class="number">{{ leftIndex(index) }}</div>
          <div class="mv"><rank-item :item="topMv[index - 2]" /></div>
        </div>
        <div class="right">
          <div class="number">{{ rightIndex(index) }}</div>
          <div class="mv"><rank-item :item="topMv[index - 1]" /></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RankItem from "./RankItem";
export default {
  name: "MVRankList",
  props: {
    topMv: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods:{
    leftIndex(index){
      return (index-1) < 10? '0'+(index-1):(index-1)
    },
    rightIndex(index){
      return index < 10? '0'+index:index;
    }
  },
  components: {
    RankItem,
  },
};
</script>
<style scoped>
.mv-rank {
  width: 100%;
}
.rank-item {
  width: 100%;
  margin-top: 10px;
}
.warp {
  width: 100%;
  display: flex;
  align-items: center;
}
.warp .left:hover,
.warp .right:hover{
  background-color: hsl(0, 1%, 29%);
}
.warp .left,
.warp .right {
  flex: 1;
  display: flex;
  align-items: center;
}
.number {
  width: 50px;
  text-align: center;
}
.mv {
  flex: 1;
}
</style>