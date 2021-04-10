<template>
  <div class="menuleft">
    <dl>
      <router-link :to="item.link" v-for="(item,index) in menuList" :key="item.id">
        <dd
          :class="{ title: item.image == '', action: $store.state.leftMenuId == item.id }"
          @click="currentClick(index)"
        >
          <div v-if="item.image">
            <img :src="item.image" alt />
          </div>
          {{ item.text }}
        </dd>
      </router-link>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        { id: 1, link: "", image: "", text: "推荐" },
        {
          id: 2,
          link: "/discover",
          image: require("assets/img/menuLeft/discovr-music.svg"),
          text: "发现音乐",
        },
        {
          id: 3,
          link: "/newmv",
          image: require("assets/img/menuLeft/MV.svg"),
          text: "LOOK MV",
        },
        {
          id: 4,
          link: "",
          image: require("assets/img/menuLeft/live.svg"),
          text: "直播",
        },
        {
          id: 5,
          link: "",
          image: require("assets/img/menuLeft/video.svg"),
          text: "视频",
        },
        {
          id: 6,
          link: "",
          image: require("assets/img/menuLeft/ranking.svg"),
          text: "排行榜",
        },
        { id: 7, link: "", image: "", text: "我的音乐" },
        {
          id: 8,
          link: "",
          image: require("assets/img/menuLeft/localmusic.svg"),
          text: "本地音乐",
        },
        {
          id: 9,
          link: "",
          image: require("assets/img/menuLeft/download.svg"),
          text: "下载管理",
        },
      ],
    };
  },
  methods: {
    currentClick(index) {
      if (this.menuList[index].image == "") return;
      this.$store.commit('setLeftMenuId', this.menuList[index].id);
    },
  },
};
</script>

<style scoped>
.menuleft {
  float: left;
  width: 300px;
  height: calc(100% - 70px);
  background-color: #181818;
}
dl {
  width: 100%;
  height: 100%;
  transform: translateX(-10%);
}
dl a {
  color: #fff;
  text-decoration: none;
}
.title {
  font-size: 13px;
  margin-top: 10px;
  opacity: 0.6;
  padding-left: 1px;
}
dd {
  height: 30px;
  line-height: 30px;
  padding: 5px 15px;
  font-size: 14px;
  opacity: 0.6;
  display: flex;
  align-items: center;
}
dd:hover {
  opacity: 1;
  background: #26282c;
}
dd div {
  margin-top: 10px;
  margin-right: 10px;
}
dd img {
  width: 20px;
  height: 20px;
}
.action {
  border-left: 2px solid #b82525;
  background: #26282c;
}
</style>