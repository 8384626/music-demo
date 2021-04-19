<template>
  <div class="artist-list">
    <div
      class="art-item"
      v-for="(item,index) in artistslist"
      :key="index"
      :class="{backColor:getterBgColor(index)}"
      @click="enterArtistDetail(index)"
    >
      <div class="icon">
        <img :src="item.img1v1Url" alt />
      </div>
      <div class="artist">{{item.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ArtistList",
  props: {
    artistslist: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    getterBgColor(index){
      return index%2 === 0? false:true
    },
    enterArtistDetail(index) {
      this.$router.push({
        path: "/singer",
        query: {
          artist: this.artistslist[index]
        }
      });
      this.$store.commit("addArtist", this.artistslist[index]);
    }
  }
};
</script>
<style scoped>
.artist-list {
  width: 100%;
}
.art-item {
  display: flex;
  align-items: center;
  font-size: 13px;
}
.icon {
  width: 50px;
  height: 50px;
  margin-right: 8px;
}
.icon img {
  width: 100%;
}
.backColor {
  background: #1a1c20;
}
</style>