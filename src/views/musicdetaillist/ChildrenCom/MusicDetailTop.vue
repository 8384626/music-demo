<template>
  <div class="music-detail-top" v-if="baseInfo != null">
    <div class="title-img">
      <img :src="baseInfo.img" alt />
    </div>
    <div class="detail-top-content">
      <div class="top">
        <span class="icon">歌单</span>
        <span>{{ baseInfo.name }}</span>
        <div class="right">
          <table>
            <tr>
              <td>
                <div class="right-text">歌曲数</div>
                {{ baseInfo.trackCount }}
              </td>
              <td>
                <div class="right-text">播放量</div>
                {{ baseInfo.playCount }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="center">
        <div class="bofang" @click="allPlay">
          <img src="~assets/img/musicDetailList/play.svg" alt />
          播放全部
        </div>
        <div class="sub">
          <img src="~assets/img/musicDetailList/collect.svg" alt />
          收藏({{ baseInfo.subscribedCount }})
        </div>
        <div class="share">
          <img src="~assets/img/musicDetailList/share.svg" alt />
          分享({{ baseInfo.shareCount }})
        </div>
      </div>
      <div class="desc">
        <div class="biaoqian">
          标签：
          <span>{{ baseInfo.tags }}</span>
        </div>
        <div class="desc-item">{{ baseInfo.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    baseInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    allPlay() {
      this.$emit("allPlay");
    },
  },
};
</script>

<style scoped>
.music-detail-top {
  width: 100%;
  display: flex;
}
.title-img {
  display: inline-block;
  width: 200px;
}
.title-img img {
  width: 100%;
}
.detail-top-content {
  flex: 1;
  padding: 0px 20px;
  position: relative;
}
.top span {
  font-size: 20px;
}
.top .icon {
  border: 1px solid red;
  border-radius: 4px;
  color: red;
  padding: 5px;
  font-size: 11px;
  margin-right: 10px;
}
.center {
  padding-top: 40px;
  display: flex;
  align-items: center;
}
.center div {
  padding: 5px 10px;
  background: #25272b;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
}
.center .bofang {
  background: #cd2929;
}
.center img {
  width: 18px;
  height: 18px;
  vertical-align: -4px;
}
.desc {
  position: absolute;
  bottom: 0px;
  color: #dcdde4;
}
.desc div {
  padding: 5px 0px;
}
.desc span {
  color: #2e6bb0;
}
.top .right {
  height: 30px;
  float: right;
}
.right td {
  text-align: center;
  font-size: 12px;
  padding: 5px;
  color: #4e4e52;
}
.right-text {
  margin-bottom: 5px;
}
.desc .desc-item {
  width: 1100px;
  line-height: 30px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>