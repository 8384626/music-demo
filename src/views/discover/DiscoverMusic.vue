<template>
  <div class="discover-music">
    <control-tab :titles="controltab"></control-tab>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import ControlTab from './ChildrenCom/ControlTab.vue';
export default {
  data() {
    return {
      controltab: [
        { id: 1, link: "/discover/personal", name: "个性推荐" },
        { id: 2, link: "/discover/category", name: "歌单" },
        { id: 3, link: "/discover/ranklist", name: "排行榜" },
        { id: 4, link: "/discover/singer", name: "歌手" },
        { id: 5, link: "/discover/newsongs", name: "新歌速递" },
        { id: 6, link: "/discover/recmv", name: "推荐MV" },
      ],
    };
  },
  components: { ControlTab },
};
</script>

<style scoped>
.discover-music{
  width: 100%;
  height: 100%;
}
.content {
  width: 100%;
  height: calc(100% - 49px);
  margin-top: 10px;
}
</style>