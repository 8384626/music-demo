<template>
  <div class="new-mv-bar">
    <div class="type">
      <span>地区:</span>
      <div
        class="item"
        v-for="(item, index) in areaList"
        :key="index"
        :class="{ action: index == areaIndex }"
        @click="tagClick('area', index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="type">
      <span>类型:</span>
      <div
        class="item"
        v-for="(item, index) in typeList"
        :key="index"
        :class="{ action: index == typeIndex }"
        @click="tagClick('type', index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="type">
      <span>排序:</span>
      <div
        class="item"
        v-for="(item, index) in orderList"
        :key="index"
        :class="{ action: index == orderIndex }"
        @click="tagClick('order', index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      areaList: ["全部", "内地", "港台", "欧美", "韩国", "日本"],
      typeList: ["全部", "官方版", "原声", "现场版", "网易出品"],
      orderList: ["上升最快", "最热", "最新"],
      // 记录地区当前点击
      areaIndex: 0,
      // 记录类型当前点击
      typeIndex: 0,
      // 记录排序当前点击
      orderIndex: 0,
    };
  },
  methods: {
    tagClick(type, index) {
      switch (type) {
        case "area":
          this.areaIndex = index;
          break;
        case "type":
          this.typeIndex = index;
          break;
        default:
          this.orderIndex = index;
          break;
      }
      const tagData = {
        area: this.areaList[this.areaIndex],
        type: this.typeList[this.typeIndex],
        order: this.orderList[this.orderIndex],
      };
      this.sentEvent(tagData);
    },
    sentEvent(tagData) {
      this.$emit("getCategoryMv", tagData);
    },
  },
  created() {
    const tagData = {
      area: this.areaList[this.areaIndex],
      type: this.typeList[this.typeIndex],
      order: this.orderList[this.orderIndex],
    };
    this.sentEvent(tagData);
  },
};
</script>

<style scoped>
.new-mv-bar {
  width: 100%;
  font-size: 14px;
  padding-bottom: 20px;
}
.type {
  display: flex;
  margin-top: 10px;
}
.type span {
  color: #f1f1f1;
}
.item {
  padding: 0px 10px;
  margin-left: 10px;
  color: #828385;
  text-align: center;
}
.action {
  color: #000;
  background: #54575f;
}
</style>