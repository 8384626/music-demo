<template>
  <div class="singer-item" v-if="singerList">
    <div class="list-item" v-for="(item,index) in singerList" :key="index" @click="enterArtistDetail(item)">
      <img :src="getImgUrl(item)" alt />
      <div class="title">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    singerList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    getImgUrl(item) {
      return item.picUrl || item.coverImgUrl;
    },
    enterArtistDetail(artist) {
      this.$router.push({
        path: "/singer",
        query: {
          artist
        }
      });
      this.$store.commit('addArtist',artist);
    }
  }
}
</script>

<style scoped>
.singer-item{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.singer-item .list-item {
  position: relative;
  margin: 5px 6px;
  width: 150px;
  padding-bottom: 10px;
  font-size: 13px;
}
.list-item img {
  width: 100%;
}
</style>