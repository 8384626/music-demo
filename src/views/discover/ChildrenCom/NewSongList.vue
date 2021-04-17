<template>
  <div class="new-songs">
    <div class="content">
      <div class="item" v-for="(item, index) in newsongList" :key="index" @click="playMusic(index)">
        <div class="number">{{ getterIndex(index) }}</div>
        <div class="title">
          <img :src="item.picUrl" alt />
          <div class="icon">
            <img src="~assets/img/discover/newson-playicon.svg" alt />
          </div>
        </div>
        <div class="mess">
          <div>{{ item.name }}</div>
          <br />
          <div class="bottom">{{ item.song.album.company }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newsongList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    getterIndex(index) {
      return index + 1 < 10 ? "0" + (index + 1) : index;
    },
    playMusic(index) {
      this.$emit("playMusic", index);
    }
  },
};
</script>

<style scoped>
.new-songs {
  width: 100%;
  margin-top: 20px;
}
.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.item {
  padding: 10px 10px;
  width: 45%;
  height: 70px;
  display: flex;
}
.item:hover {
  background-color: hsl(0, 1%, 29%);
}
.number {
  height: 70px;
  width: 40px;
  text-align: center;
  line-height: 70px;
}
.title {
  position: relative;
  height: 100%;
}
.title img {
  height: 100%;
}
.icon {
  background: rgba(00, 0, 0, 0.3);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transform: translate(-50%, -50%);
  margin: auto;
}
.icon img {
  width: 28px;
  height: 28px;
}
.mess {
  flex: 1;
  align-items: center;
  margin-left: 10px;
  font-size: 13px;
}
</style>