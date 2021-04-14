<template>
  <div class="detail">
    <div class="detail-content">
      <music-detail-list :baseInfo="baseInfo" @allPlay="PlayMusic()"></music-detail-list>
      <control-tab-bar
        :list="list"
        @controlBarClick="controlBarClick"
      ></control-tab-bar>
      <song-detail-list
        v-if="isShow === 'music'"
        :song-list="songList"
        @songItemClick="PlayMusic"
      ></song-detail-list>
      <comment
        v-if="isShow === 'commend'"
        :commend-list="commendList"
        :id="id"
      ></comment>
      <collect-list
        v-if="isShow === 'collect'"
        :collect-list="collectList"
      ></collect-list>
    </div>
  </div>
</template>

<script>
import {
  getMusicDetailList,
  baseInfo,
  getSongDetail,
  songDetail,
  getCommentList,
  getCollect,
} from "network/musicDetail";

import MusicDetailList from "./ChildrenCom/MusicDetailTop";
import ControlTabBar from "./ChildrenCom/ControlTabBar";
import SongDetailList from "./ChildrenCom/SongDetailList.vue";
import Comment from "./ChildrenCom/Comment.vue";
import CollectList from "./ChildrenCom/CollectList.vue";
import { indexMixin } from "./indexMixin";

export default {
  data() {
    return {
      id: null,
      MusicDetailList: null,
      baseInfo: null,
      list: [],
      songList: [],
      isShow: "music",
      limit: 30,
      commendList: [],
      collectList: [],
    };
  },
  mixins: [indexMixin],
  methods: {
    getCurrentDetail() {
      getMusicDetailList(this.id).then((res) => {
        this.MusicDetailList = res;
        this.baseInfo = new baseInfo(res.playlist);
        let str = "评论(" + res.playlist.commentCount + ")";
        this.list = ["歌曲列表", str, "收藏者"];
        for (let i of this.MusicDetailList.playlist.trackIds) {
          getSongDetail(i.id).then((res) => {
            let song = new songDetail(res.songs);
            this.songList.push(song);
          });
        }
      });
    },
    getComment() {
      getCommentList(this.id, this.limit).then((res) => {
        this.commendList = res.comments;
      });
    },
    getCollectList() {
      getCollect(this.id, 30).then((res) => {
        this.collectList = res.subscribers;
      });
    },
    controlBarClick(type) {
      this.isShow = type;
    },
  },
  components: {
    MusicDetailList,
    ControlTabBar,
    SongDetailList,
    Comment,
    CollectList,
  },
  activated() {
    this.id = this.$route.params.id;
    this.getCurrentDetail();
    this.getComment();
    this.getCollectList();
  },
  deactivated() {
    this.baseInfo = null;
    this.songList = [];
  },
};
</script>

<style scoped>
.detail {
  width: 100%;
  height: 100%;
  padding: 35px 35px 0px 35px;
  background: #16181c;
  color: #dcdde4;
  box-sizing: border-box;
}
.detail-content {
  height: calc(100vh - 160px);
  overflow-y: scroll;
}
.detail-content::-webkit-scrollbar {
  display: none;
}
</style>