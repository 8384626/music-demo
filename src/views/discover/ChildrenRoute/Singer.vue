<template>
  <div class="singer">
    <div class="singer-top">
      <div class="area">
        <span class="title">语种:</span>
        <div
          class="area-item"
          v-for="(item, index) in area"
          :key="index"
          @click="areaClick(index)"
          :class="{ action: areaIndex == index }"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="type">
        <span class="title">分类:</span>
        <div
          class="type-item"
          v-for="(item, index) in type"
          :key="index"
          @click="typeClick(index)"
          :class="{ action: typeIndex == index }"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="category-content"  v-infinite-scroll="load" >
        <singer-item :singerList="singerList"></singer-item>
      </div>
  </div>
</template>

<script>
import { getSingerList } from "network/singer.js";
import SingerItem from "../ChildrenCom/SingerItem.vue";
export default {
  data() {
    return {
      // 语种
      area: [
        { value: -1, name: "全部" },
        { value: 7, name: "华语" },
        { value: 96, name: "欧美" },
        { value: 8, name: "日本" },
        { value: 16, name: "韩国" },
        { value: 0, name: "其他" },
      ],
      // 分类
      type: [
        { value: -1, name: "全部" },
        { value: 1, name: "男歌手" },
        { value: 2, name: "女歌手" },
        { value: 3, name: "乐队" },
      ],
      limit: 30,
      page: 1,
      areaIndex: 0,
      typeIndex: 0,
      singerList: [],
    };
  },
  methods: {
    areaClick(index) {
      if (index !== this.areaIndex) {
        this.areaIndex = index;
        this.getSingerList();
      }
    },
    typeClick(index) {
      if (index !== this.typeIndex) {
        this.typeIndex = index;
        this.getSingerList();
      }
    },
    getSingerList() {
      getSingerList({
        type: this.type[this.typeIndex].value,
        area: this.area[this.areaIndex].value,
        limit: this.limit,
      }).then((res) => {
        this.singerList = res.artists;
      });
    },
    getSingerListPullUp() {
      getSingerList({
        type: this.type[this.typeIndex].value,
        area: this.area[this.areaIndex].value,
        limit: this.limit * this.page,
      }).then((res) => {
        if(res.artists.length === 0) return true;
          this.singerList = res.artists;
          this.page++;
      });
    },
    load(){
      this.getSingerListPullUp()
    },
    setControlTabCurrentId(){
      this.$store.commit("setConrtrolTabCurrentId", 4);
    }
  },
  components: { SingerItem },
  created() {
    this.getSingerList();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setControlTabCurrentId();
    });
  },
};
</script>

<style scoped>
.singer {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.singer-top {
  color: #828385;
  padding: 30px 150px;
}
.area {
  display: flex;
}
.type {
  margin-top: 10px;
  display: flex;
}
.title {
  color: #f1f1f1;
}
.area-item,
.type-item {
  padding: 0px 10px;
}
.action {
  color: #b82525;
}
.category-content{
  height: calc(100vh - 300px);
  overflow-y: scroll;
  padding: 0 100px;
}
.category-content::-webkit-scrollbar {
  display: none;
}
</style>