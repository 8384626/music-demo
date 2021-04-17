<template>
  <div class="comment">
    <div class="desc">
      <div class="language">
        <textarea
          name
          id
          cols="30"
          rows="10"
          @keydown.enter="pushCommend"
          v-model="content"
          placeholder="请输入您的评论"
        ></textarea>
      </div>
      <div class="sub" @click="pushCommend">评论</div>
    </div>
    <div class="content">
      <h3>精彩评论:</h3>
      <div class="item" v-for="(item, index) in commendList" :key="index">
        <div class="icon">
          <img :src="item.user.avatarUrl" alt />
        </div>
        <div class="mess">
          <div class="top">
            <span>{{ item.user.nickname }}：</span>
            {{ item.content }}
          </div>
          <div class="bottom">{{ formatDate(item.time) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../../common/tool";
import { addComment } from "network/musicDetail";
export default {
  props: {
    commendList: {
      type: Array,
      default() {
        return [];
      },
    },
    id: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    formatDate(data) {
      return formatDate(new Date(data), "yyyy年MM月dd日 hh:mm:ss");
    },
    pushCommend() {
      let cookie = sessionStorage.getItem('cookie')
      let time = new Date().getTime();
      if (cookie !== null) {
        addComment(cookie, this.id, this.content, time).then((res) => {
              this.$message.success('评论成功')
              this.content = "";
        });
      } else {
        this.$message.warning("请先登陆");
      }
    },
  },
};
</script>

<style scoped>
.comment {
  width: 100%;
}
.comment .desc {
  padding: 10px;
  height: 115px;
  background: #1c1e23;
}
.comment .desc .language {
  height: 80px;
}
.desc .language textarea {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  outline-style: none;
  background: #2b2c31;
  color: #fff;
  border: none;
}
.sub {
  float: right;
  margin-top: 5px;
  cursor: pointer;
}
.comment .content {
  width: 100%;
  font-size: 13px;
  color: var(--color-text-tint);
}
.comment .content h3 {
  padding-top: 30px;
  color: #f1f1f1;
}
.item {
  padding: 10px 0 10px 30px;
  border: 1px solid #23262c;
  display: flex;
  position: relative;
}
.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
}
.icon img {
  width: 100%;
  border-radius: 50%;
}
.mess {
  flex: 1;
}
.top {
  margin-bottom: 10px;
}
.top span {
  color: #2e6bb0;
}
.bottom {
  position: absolute;
  bottom: 0px;
}
</style>