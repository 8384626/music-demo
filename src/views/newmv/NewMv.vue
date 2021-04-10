<template>
  <div class="new-mv">
    <div class="new-mv-content">
      <span>全部MV</span>
      <div class="mv-content">
        <new-mv-bar @getCategoryMv="getCategoryMv"></new-mv-bar>
        <div class="mv-item" v-infinite-scroll="load" infinite-scroll-delay="200">
          <mv-item :mv-list="itemList"></mv-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MvItem from "views/discover/ChildrenCom/MvItem.vue";
import NewMvBar from "./ChildrenCom/NewMvBar.vue";

import { getCategoryAllMv, MV } from "network/recmv";

export default {
  data() {
    return {
      itemList: [],
      sondata:null,
      limit: 24,
      offset: 1
    };
  },
  methods: {
    getCategoryMv(data, offset=1 ,clear = false) {
      this.sondata = data
      if(!clear) this.itemList=[]
      getCategoryAllMv(data, this.limit * offset).then((res) => {
        for (let i of res.data) {
          let mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount);
          this.itemList.push(mv);
        }
      });
    },
    load(){
      let currentOffset = this.offset++
      this.getCategoryMv(this.sondata,currentOffset,true)
    },
    setLeftMenuId(){
      this.$store.commit('setLeftMenuId', 3);
    }
  },
  watch:{
    sondata(newValue,oldValue){
      this.offset = 0
    }
  },
  components: {
    NewMvBar,
    MvItem,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setLeftMenuId();
    });
  },
};
</script>

<style scoped>
.new-mv {
  width: 100%;
  height: 100%;
}
.new-mv-content {
  padding: 20px 150px;
}
.mv-item {
  height: calc(100vh - 310px);
  padding: 20px 0;
  overflow-y: scroll;
}
.mv-item::-webkit-scrollbar {
  display: none;
}
</style>