<template>
  <div class="music-list">
    <div class="category" v-if="HotTags.length !== 0">
      <div class="tags">
        <span>热门标签：</span>
        <div
          class="tag-item"
          v-for="(item, index) in HotTags"
          :key="index"
          @click="tagClick(index)"
          :class="{ tagCur: currentIndex == index }"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="category-content"  v-infinite-scroll="load"  infinite-scroll-delay="500">
        <music-list :musicList="musicList"></music-list>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotTags,getHotTagsList } from "network/musiclist";
import MusicList from "../ChildrenCom/MusicList.vue";
export default {
  components: { MusicList },
  data() {
    return {
      HotTags: [],
      currentIndex: 0,
      page:1,
      limit:10,
      musicList:[]
    };
  },
  methods: {
    // 获取热门标签列表
    getHotTags() {
      getHotTags().then((res) => {
        if (res.code !== 200) return this.$message.error("当前网络不佳,请稍后重试");
        this.HotTags = res.tags;
        console.log(this.HotTags);
        this.getHotTagsList()
      });
    },
    tagClick(index) {
      this.currentIndex = index;
      this.getHotTagsList()
    },
    // 获取热门标签列表中的详细数据
    getHotTagsList(){
      getHotTagsList({
        cat:this.HotTags[this.currentIndex].name,
        limit:this.limit * this.page
      }).then(res=>{
        if (res.code !== 200) return this.$message.error("当前网络不佳,请稍后重试");
        this.page++
        this.musicList = res.playlists
        console.log(this.musicList);
      })
    },
    load(){
      this.getHotTagsList()
    },
    // 当页面再此页面的时候改变ConrtrolTabCurrentId
    setControlTabCurrentId() {
      this.$store.commit("setConrtrolTabCurrentId", 2);
    },
  },
  created() {
    this.getHotTags();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setControlTabCurrentId();
    });
  },
};
</script>

<style scoped>
.category {
  width: 100%;
  height: 100%;
}
.category .tags {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 20px 100px;
}
.tags .tag-item {
  padding: 0px 10px;
  color: #828385;
  cursor: pointer;
}
.tagCur {
  color: #b82525 !important;
}
.category-content{
  height: calc(100vh - 250px);
  overflow-y: scroll;
  padding: 0 100px;
}
.category-content::-webkit-scrollbar {
  display: none;
}
</style>