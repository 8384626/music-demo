<template>
  <div>
    <mv-item :mv-list="mvList"  class="mv"></mv-item>
  </div>
</template>

<script>
import MvItem from 'views/discover/ChildrenCom/MvItem.vue'
import { getSingerMv } from 'network/singer'
import { MV } from 'network/recmv'

export default {
  data() {
    return {
      artist: null,
      mvList: []
    };
  },
  components: { 
    MvItem
  },
  created() {
    this.artist = this.$route.query.artist || this.$store.state.artist;
    getSingerMv(this.artist.id).then(res => {
      let mvs = res.mvs;
      for (let i in mvs) {
        let mv = new MV(
          mvs[i].id,
          mvs[i].imgurl,
          mvs[i].name,
          mvs[i].artistName,
          mvs[i].playCount
        );
        this.mvList.push(mv);
      }
    });
  },
}
</script>

<style scoped>
.artist-mv {
  width: 100%;
}
.mv {
  padding-right: 40px;
}
</style>