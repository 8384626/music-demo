<template>
  <div class="desc-detail" v-if="descDetail != null">
    <div class="desc">
      <h3>{{ artist.name }}简介</h3>
      <p>{{ descDetail.briefDesc }}</p>
    </div>
    <div class="content">
      <div
        class="intro-item"
        v-for="(item, index) in descDetail.introduction"
        :key="index"
      >
        <h3>{{ item.ti }}</h3>
        <div>
          <p v-for="(item, index) in formatText(item.txt)" :key="index">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingerDesc } from "network/singer";
export default {
  data() {
    return {
      artist: null,
      descDetail: null,
    };
  },
  methods: {
    formatText(text) {
      let newText = text.split("\n");
      return newText;
    },
  },
  created() {
    this.artist = this.$store.state.artist;

    if (this.artist != null) {
      getSingerDesc(this.artist.id).then(res => {
        this.descDetail = res;
      });
    }
  },
};
</script>

<style scoped>
.desc-detail {
  width: 100%;
  padding-right: 20px;
}
.desc-detail h3{
    padding: 10px 0px;
    color: #dcdde4;
}
.desc-detail p{
    margin-top: 10px;
    text-indent: 35px;
    line-height: 30px;
    color: #747577;
}
</style>