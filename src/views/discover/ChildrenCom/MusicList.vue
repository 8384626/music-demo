<template>
  <div>
    <div class="music-list" v-if="musicList.length > 0">
      <div
        class="list-item"
        v-for="(item, index) in musicList"
        :key="item.id"
        @click="entryDetail(index)"
      >
        <img :src="getImgUrl(item)" alt="" />
        <div class="title">{{ item.name }}</div>
        <div class="count">
          <img src="~assets/img/discover/music-count.svg" alt />
          {{ item.playCount }}
        </div>
      </div>
    </div>
    <div v-else>
      <h3>暂无数据</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    musicList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    entryDetail(index) {
      this.$router.push('/muscidetaillist/'+this.musicList[index].id+'/'+new Date().getTime())
    },
    getImgUrl(item) {
      return item.picUrl || item.coverImgUrl;
    },
  },
};
</script>

<style scoped>
.music-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}
.list-item {
  position: relative;
  margin: 5px 6px;
  width: 150px;
  padding-bottom: 10px;
  font-size: 13px;
}
img {
  width: 100%;
}
.count {
  position: absolute;
  top: 0px;
  right: 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: right;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
}
.count img {
  display: inline-block;
  height: 15px;
  width: 15px;
  transform: translateY(3px);
}
</style>