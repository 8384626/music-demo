<template>
  <div class="play-mv" v-if="detail !== null">
    <div
      class="play-mv-scroll"
      v-infinite-scroll="load"
      infinite-scroll-delay="500"
    >
      <div class="layout-left">
        <div class="title">
          <div class="left-mv">MV</div>
          <div class="name">{{ detail.name }} ——{{ detail.artistName }}</div>
        </div>
        <div class="video" v-if="url !== null">
          <video
            :src="url"
            autoplay
            controls
            width="100%"
            class="video-play"
          ></video>
        </div>
        <div class="recommend">
          <p class="p">评论</p>
          <comment class="rec" :commend-list="commendList" />
        </div>
      </div>
      <div class="layout-right">
        <div class="desc">
          <p class="p">Mv介绍</p>
          <div class="base">
            <div class="date">发布时间: {{ detail.publishTime }}</div>
            <div class="playCount">播放次数: {{ detail.playCount }} 次</div>
            <div class="clear"></div>
          </div>
          <div class="mv-desc" v-if="detail.desc != null">
            <span>简介:</span>
            {{ detail.desc }}
          </div>
          <div class="alia">
            <p class="p">相关推荐</p>
            <!-- <simi-mv-item :mv-list="simiMv" /> -->
            <relevant-rec :mv-list="relevant"></relevant-rec>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
// 网络请求
import {
  getMvDetail,
  getMvUrl,
  getMvComment,
  getSimiMv,
  MV,
} from "network/recmv";

import Comment from "views/musicdetaillist/ChildrenCom/Comment";
import RelevantRec from "./ChildrenCom/RelevantRec.vue";

export default {
  name: "PlayMV",
  data() {
    return {
      id: 0,
      detail: null,
      url: null,
      commendList: [],
      offset: 1,
      limit: 20,
      relevant: [],
    };
  },
  methods: {
    getMvAllDetail() {
      getMvDetail(this.id).then((res) => {
        this.detail = res.data;
      });
      getMvUrl(this.id).then((res) => {
        this.url = res.data.url;
      });
      getMvComment(this.id, this.limit).then((res) => {
        this.commendList = res.comments;
      });
      getSimiMv(this.id).then((res) => {
        this.relevant =[]
        for (let i of res.mvs) {
          let mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount);
          this.relevant.push(mv);
          if (i == res.mvs.length - 1) return;
        }
      });
    },
    load() {
      getMvComment(this.id, this.offset * this.limit).then((res) => {
        this.commendList = res.comments;
        this.offset++;
      });
    },
  },
  watch: {
    $route() {
      this.id = this.$route.params.id;
      if (this.id != null) {
        this.getMvAllDetail();
      }
    },
  },
  components: {
    Comment,
    RelevantRec,
  },
  activated() {
    this.id = this.$route.params.id;
    if (this.id != 0) {
      this.getMvAllDetail();
    }
  },
  deactivated() {
    this.commendList = [];
    this.detail = null;
    this.relevant = [];
  },
};
</script>

<style scoped>
.play-mv {
  width: 100%;
  height: 100%;
  padding: 0px 150px;
  overflow: hidden;
}
.play-mv-scroll {
  height: calc(100vh - 114px);
  overflow-y: scroll;
}
.play-mv-scroll::-webkit-scrollbar {
  display: none;
}
.layout-left {
  display: inline-block;
  width: 50%;
}
.layout-left .title {
  display: flex;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 10px;
}
.title .left-mv {
  padding: 5px;
  display: inline-block;
  border: 1px solid red;
  color: red;
}
.title .name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 18px;
  margin-left: 5px;
}
.video-play {
  outline-style: none;
}
.recommend {
  margin-top: 10px;
}
.layout-right {
  width: 20%;
  float: right;
  transform: translateX(-140%);
}
.p {
  font-size: 18px;
  color: #f1f1f1;
  margin-bottom: 10px;
}
.base {
  font-size: 12px;
  color: #828385;
  margin-bottom: 10px;
}
.base .date {
  float: left;
}
.base .playCount {
  float: right;
}
.mv-desc {
  max-height: 288px;
  width: 100%;
  overflow: hidden;
  line-height: 1.2em;
  font-size: 13px;
  color: #828385;
  margin-bottom: 15px;
  text-overflow: ellipsis;
}
.mv-desc span {
  color: #2e6bb0;
  font-size: 14px;
}
.clear {
  clear: both;
}
</style>