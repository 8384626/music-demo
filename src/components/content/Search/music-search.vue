<template>
  <div class="search">
    <div class="search-item">
      <input
        type="text"
        class="iptSearch"
        v-model="searchText"
        @focus="topSeacrchIsShow = true"
        @blur="topSeacrchIsShow = false"
        @keydown.enter="keyEnter()"
      />
      <div class="search-icon" @click="keyEnter()">
        <img src="~assets/img/navbar/search.svg" alt="" />
      </div>
    </div>
    <hot-search v-show="topSeacrchIsShow"></hot-search>
  </div>
</template>

<script>
import hotSearch from "./hotSearch";
export default {
  data() {
    return {
      searchText: "",
      topSeacrchIsShow: false,
    };
  },
  methods:{
    keyEnter(){
        if(this.searchText === ''||this.searchText === null) return ;
        this.$router.push("/search/" + this.searchText); 
        this.searchText = '';
        this.topSeacrchIsShow=false;
    },
  },
  components: {
    hotSearch,
  },
};
</script>

<style scoped>
.search {
  height: 100%;
  width: 450px;
  display: inline-block;
  position: relative;
}
.search-item {
  line-height: 54px;
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  border-radius: 10px;
}

.iptSearch {
  outline-style: none;
  color: #333;
  line-height: 16px;
  background: transparent;
  position: absolute;
  width: 80%;
  height: 100%;
  padding: 0px 10px;
  border: #f6f6f6;
  border-radius: 10px;
}
.search-icon {
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: -5px;
}
.search-icon img {
  width: 20px;
  height: 30px;
}
</style>