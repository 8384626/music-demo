<template>
  <div class="hot">
    <div class="hot-list">
      <h3>热搜榜</h3>
      <table>
        <tr v-for="(item,index) in topSearchList" :key="index">
          <td :class="{red:index <= 2}">{{getterIndex(index)}}</td>
          <td class="top">
            <div class="top-name">{{item.searchWord}}</div>
            <div class="top-score">{{item.score}}</div>
            <div class="top-url">
              <img :src="item.iconUrl" alt />
            </div>
          </td>
          <div class="bottom">{{item.content}}</div>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { TopSearch } from "network/login.js";
export default {
  data() {
    return {
      topSearchList: [],
    };
  },
  methods: {
    getTopSeachList() {
      TopSearch().then((res) => {
        if(res.code === 200){
          this.topSearchList = res.data
        }
      });
    },
    getterIndex(index){
      let currentIndex = index +1
      return currentIndex < 10 ? '0' + currentIndex : currentIndex;
    }
  },
  created() {
    this.getTopSeachList();
  },
};
</script>

<style scoped>
.hot {
  position: absolute;
  top: 54px;
  z-index: 999;
  padding: 5px 20px 0px 20px;
  width: 400px;
  height: 530px;
  line-height: 30px;
  color: #828385;
  background: #2d2f33;
  overflow-y: scroll;
}
.hot::-webkit-scrollbar{
  display: none;
}
.hot-list {
  margin-top: 1px;
}
h3{
  font-size: 20px;
}
.red {
  color: #dd3a3a;
}
.hot-list tr {
  height: 50px;
  font-size: 13px;
}
table {
  width: 100%;
}
tr td:nth-child(1) {
  width: 30px;
  font-size: 1.3em;
}
tr:hover {
  background: #2a2c30;
}
.top {
  display: flex;
  height: 25px;
}
.top div {
  margin-right: 5px;
}
.top img {
  height: 16px;
}
.top-name {
  color: #dcdde4;
  font-weight: 500;
}
</style>